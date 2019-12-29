import _ from "lodash";
import SQLite from 'react-native-sqlite-storage';

import { convertHash, Lenguaje } from ".";

const DB = SQLite.openDatabase(
  { name: "db.sqlite3", createFromLocation: 1, location: 'Library' }, openCB, errorCB);

const closeDatabase = () => {
  if (DB) {
    console.log("Closing database ...");
    DB.close(closeCB, errorCB);
  } else {
    console.log("Database was not OPENED");
  }
}
const errorCB = (err) => {
  console.log("SQL Error: " + err);
}
const openCB = () => {
  console.log("Database OPENED");
}
const closeCB = () => {
  console.log("Database CLOSED");
}
export default (character, setTypeClass) => {
  const idGender = convertHash(character.genderHash);
  const idClass = convertHash(character.classHash);
  DB.transaction((tx) => {
    tx.executeSql(`SELECT json FROM DestinyGenderDefinition where id =${idGender}`, [], (tx, results) => {
      var len = results.rows.length;
      for (let i = 0; i < len; i++) {
        let row = results.rows.item(i);
        let gender = JSON.parse(row.json).displayProperties.name
        tx.executeSql(`SELECT json FROM DestinyClassDefinition where id =${idClass}`, [], (tx, results) => {
          var len = results.rows.length;
          for (let i = 0; i < len; i++) {
            let row = results.rows.item(i);
            setTypeClass(JSON.parse(row.json).genderedClassNames[gender])
          }
        }, errorCB, closeDatabase);
      }

    }, errorCB);
  });
};
