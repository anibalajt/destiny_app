import AsyncStorage from '@react-native-community/async-storage';
import RNFetchBlob from 'rn-fetch-blob'
import SQLite from 'react-native-sqlite-storage';
import { unzip } from 'react-native-zip-archive'
// import SQLite from 'react-native-sqlite-storage';

import { request } from "./request"
import { payload_Get } from "./payloads"
import Lenguaje from "./lenguaje"
import endpoints from "./endpoints"
const lc = Lenguaje()

export default async () => {
  console.log('ENTRAAAAAAAAAAAAAAA ', 'manifest')
  // await fileExist(targetPathLibrary + '/db.sqlite3')
  let dirs = RNFetchBlob.fs.dirs
  const targetPath = dirs.DocumentDir + '/LocalDatabase'
  const targetPathLibrary = dirs.LibraryDir

  // await SQLite.deleteDatabase('db.sqlite3')
  // RNFetchBlob.fs.unlink(targetPath)
  // RNFetchBlob.fs.unlink(targetPathLibrary + '/db.sqlite3')
  // await AsyncStorage.removeItem("manifest");
  // return false
  try {
    const res = await request(payload_Get(endpoints.getManifest))
    if (res.data.Response.version) {
      const manifest = await AsyncStorage.getItem("manifest");

      // if (manifest) {
      const { versionManifest, languaje } = JSON.parse(manifest) || { versionManifest: "0.0.1", languaje: lc }
      // console.log('versionManifest', versionManifest)
      console.log(versionManifest, '!== ', res.data.Response.version)
      if (versionManifest !== res.data.Response.version) {
        await SQLite.deleteDatabase('db.sqlite3')
        await RNFetchBlob.fs.unlink(targetPathLibrary + '/db.sqlite3')
        // GET FILE NAME
        let fileName = res.data.Response.mobileWorldContentPaths[lc];
        fileName = fileName.split("/")
        fileName = fileName[fileName.length - 1]
        ////// END GET FILE NAME
        const Sqlite3Exist = await downloadDB(res.data.Response.mobileWorldContentPaths[lc], fileName)
        console.log('Sqlite3Exist', Sqlite3Exist)
        if (Sqlite3Exist) {
          await AsyncStorage.setItem("manifest", JSON.stringify({ versionManifest: res.data.Response.version, languaje: lc }));


          return true
        }
      } else {
        console.log('same version')
        return true
      }
    }
    // }
  } catch (error) {
    console.log('manifest error', error)
    return false;
  }

}
const downloadDB = async (mobileWorldContentPaths, fileName) => {
  console.log('downloadDB')
  try {
    let dirs = RNFetchBlob.fs.dirs
    const targetPath = dirs.DocumentDir + '/LocalDatabase'
    const targetPathLibrary = dirs.LibraryDir

    const fileSqlite3 = await fileExist(targetPathLibrary + '/db.sqlite3')

    if (!fileSqlite3) {
      console.log('fileSqlite3', fileSqlite3)
      const res_download = await RNFetchBlob
        .config({ fileCache: true, path: targetPath + '/db.zip', })
        .fetch('GET', `${endpoints.assets}${mobileWorldContentPaths}`)
      if (res_download.respInfo.status === 200) {
        var sourcePath = res_download.path();

        const fileDownloadExist = await fileExist(sourcePath);
        if (fileDownloadExist) {
          // console.log('fileDownloadExist')
          await fileUnzip(targetPath + '/db.zip', targetPath)

          await fileExist(`${targetPath}/${fileName}`)

          await fileCP(`${targetPath}/${fileName}`, targetPathLibrary + '/db.sqlite3')

          const fileSqlite3Exist = await fileExist(targetPathLibrary + '/db.sqlite3')
          // console.log('fileSqlite3 exist', fileSqlite3Exist)
          return fileSqlite3Exist
        }
      }
    }
  } catch (error) {
    console.log('downloadDB error', error)
    return false
  }
}
const fileExist = async (Path) => {
  return await RNFetchBlob.fs.exists(Path);
}
const fileUnzip = async (SRC_PATH, DEST_PATH) => {
  return await unzip(SRC_PATH, DEST_PATH);
}
const fileCP = async (SRC_PATH, DEST_PATH) => {
  return await RNFetchBlob.fs.cp(SRC_PATH, DEST_PATH)
}