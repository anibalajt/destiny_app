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
export default (id, setVault, setvaultIcon) => {

  DB.transaction((tx) => {
    tx.executeSql(`SELECT json FROM DestinyVendorDefinition where id =${id}`, [], (tx, results) => {
      var len = results.rows.length;
      for (let i = 0; i < len; i++) {
        let row = results.rows.item(i);
        let vault = JSON.parse(row.json)
        setVault(vault.displayProperties.name)
        setvaultIcon(vault.displayProperties.icon)
      }

    }, errorCB, closeDatabase);
  });
};
