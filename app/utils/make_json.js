import SQLite from 'react-native-sqlite-storage';
import RNFetchBlob from 'rn-fetch-blob';

let DB;
const closeDatabase = () => {
  if (DB) {
    DB.close(closeCB, errorCB);
  } else {
  }
};
const errorCB = err => {
  console.log('SQL Error: ', err);
};
const openCB = () => {
  // console.log("Database OPENED");
};
const closeCB = () => {
  // console.log("Database CLOSED");
};
const MakeJson = async () => {
  const fs = RNFetchBlob.fs;
  const dirs = RNFetchBlob.fs.dirs;
  const targetPath = dirs.CacheDir;

  console.log('make json');
  DB = SQLite.openDatabase(
    {name: 'db.sqlite3', createFromLocation: 1, location: 'Library'},
    openCB,
    errorCB,
  );
  DB.transaction(tx => {
    tx.executeSql(
      `SELECT * FROM DestinyInventoryItemDefinition`,
      [],
      (tx, results) => {
        console.log('results', results.rows.raw());
        fs.createFile(
          `${targetPath}/destinyInventoryItemDefinition.json`,
          JSON.stringify(results.rows.raw()),
          'utf8',
        );
      },
      errorCB,
      closeDatabase,
    );
  });
};

export default MakeJson;
