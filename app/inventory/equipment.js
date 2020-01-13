import _ from "lodash";
import SQLite from 'react-native-sqlite-storage';

import { convertHash, Lenguaje } from "../utils";

let DB;

const closeDatabase = () => {
  // console.log('Closing', DB)
  if (DB) {
    // console.log("Closing database ...");
    DB.close(closeCB, errorCB);
  } else {
    // console.log("Database was not OPENED");
  }
}
const errorCB = (err) => {
  // console.log("SQL Error: ", err);
}
const openCB = () => {
  // console.log("Database OPENED");
}
const closeCB = () => {
  // console.log("Database CLOSED");
}
export default async (character_equipment, self) => {
  DB = SQLite.openDatabase(
    { name: "db.sqlite3", createFromLocation: 1, location: 'Library' }, openCB, errorCB);
  character_equipment.map((item, i) => {
    const idEquip = convertHash(item.itemHash);

    DB.transaction((tx) => {
      tx.executeSql(`SELECT json FROM DestinyInventoryItemDefinition where id =${idEquip}`, [], (tx, results) => {
        var len = results.rows.length;
        for (let i = 0; i < len; i++) {
          let row = results.rows.item(i);
          let equip = JSON.parse(row.json)

          equip.bucketHash = item.bucketHash;
          equip.location = item.location;
          equip.itemHash = item.itemHash;
          equip.itemInstanceId = item.itemInstanceId;
          // equip.instances = instances[item.itemInstanceId]
          //   ? instances[item.itemInstanceId]
          //   : null;
          switch (equip.itemType) {
            case 3:
            case 16:
              self.setState({ weapons: [...self.state.weapons, equip] });
              break;
            case 2:
              self.setState({ armor: [...self.state.armor, equip] });
              break;
            default:
              self.setState({ misc: [...self.state.misc, equip] });
              break;
          }
        }
        // setWeapons(weapons);
        // setArmor(armor);
        // setMisc(misc);
      }, errorCB, closeDatabase);
    });

  })


};
