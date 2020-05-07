import _ from 'lodash';
import SQLite from 'react-native-sqlite-storage';

import {convertHash, Lenguaje} from '../utils';

let DB;
const closeDatabase = () => {
  // console.log('Closing', DB)
  if (DB) {
    // console.log("Closing database ...");
    DB.close(closeCB, errorCB);
  } else {
    // console.log("Database was not OPENED");
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
export default async (
  {equipment, other_equipment, instances},
  guardianMainWeapons,
  setGuardianMainWeapons,
  guardianOtherWeapons,
  setGuardianOtherWeapons,
  guardianMainArmor,
  setGuardianMainArmor,
  guardianOtherArmor,
  setGuardianOtherArmor,
  guardianMainMisc,
  setGuardianMainMisc,
  guardianOtherMisc,
  setGuardianOtherMisc,
) => {
  const character_equipment = equipment;

  // let { weapons, armor, misc, mainWeapons, mainArmor, mainMisc } = self.state
  DB = SQLite.openDatabase(
    {name: 'db.sqlite3', createFromLocation: 1, location: 'Library'},
    openCB,
    errorCB,
  );

  let weapons = {},
    armor = {},
    misc = {},
    mainWeapons = {},
    mainArmor = {},
    mainMisc = {};
  character_equipment.map((item, i) => {
    const idEquip = convertHash(item.itemHash);

    DB.transaction(tx => {
      tx.executeSql(
        `SELECT json FROM DestinyInventoryItemDefinition where id =${idEquip}`,
        [],
        (tx, results) => {
          var len = results.rows.length;
          for (let i = 0; i < len; i++) {
            let row = results.rows.item(i);
            let equip = JSON.parse(row.json);

            const idBucket = convertHash(item.bucketHash);

            tx.executeSql(
              `SELECT json FROM DestinyInventoryBucketDefinition where id =${idBucket}`,
              [],
              (tx, results) => {
                for (let i = 0; i < len; i++) {
                  let row = results.rows.item(i);
                  let bucketDefinition = JSON.parse(row.json);
                  equip.bucketDefinition = bucketDefinition;
                }
                equip.bucketHash = item.bucketHash;
                equip.location = item.location;
                equip.itemHash = item.itemHash;
                equip.itemInstanceId = item.itemInstanceId;
                equip.instances = instances[item.itemInstanceId]
                  ? instances[item.itemInstanceId]
                  : null;
                switch (equip.itemType) {
                  case 3:
                  case 16:
                    mainWeapons[item.bucketHash] = equip;
                    setGuardianMainWeapons({
                      ...guardianMainWeapons,
                      ...mainWeapons,
                    });
                    break;
                  case 2:
                    mainArmor[item.bucketHash] = equip;
                    setGuardianMainArmor({...guardianMainArmor, ...mainArmor});
                    // setGuardianMainArmor({mainArmor});
                    break;
                  default:
                    mainMisc[item.bucketHash] = equip;
                    setGuardianMainMisc({...guardianMainMisc, ...mainMisc});
                    break;
                }
              },
            );
          }
        },
        errorCB,
        closeDatabase,
      );
    });
  });

  other_equipment.map((item, i) => {
    const idEquip = convertHash(item.itemHash);
    DB.transaction(tx => {
      tx.executeSql(
        `SELECT json FROM DestinyInventoryItemDefinition where id =${idEquip}`,
        [],
        (tx, results) => {
          var len = results.rows.length;
          for (let i = 0; i < len; i++) {
            let row = results.rows.item(i);
            let equip = JSON.parse(row.json);

            equip.bucketHash = item.bucketHash;
            equip.location = item.location;
            equip.itemHash = item.itemHash;
            equip.itemInstanceId = item.itemInstanceId;
            equip.instances = instances[item.itemInstanceId]
              ? instances[item.itemInstanceId]
              : null;
            switch (equip.itemType) {
              case 3:
              case 16:
                if (!weapons[item.bucketHash]) {
                  weapons[item.bucketHash] = [];
                }
                weapons[item.bucketHash].push(equip);
                setGuardianOtherWeapons({...guardianOtherWeapons, ...weapons});
                break;
              case 2:
                if (!armor[item.bucketHash]) {
                  armor[item.bucketHash] = [];
                }
                armor[item.bucketHash].push(equip);
                setGuardianOtherArmor({...guardianOtherArmor, ...armor});
                break;
              default:
                if (!misc[item.bucketHash]) {
                  misc[item.bucketHash] = [];
                }
                misc[item.bucketHash].push(equip);
                setGuardianOtherMisc({...guardianOtherMisc, ...misc});
                break;
            }
          }
        },
        errorCB,
        closeDatabase,
      );
    });
  });
};

// export default async ({equipment, other_equipment, instances}, self) => {
//   const character_equipment = equipment;

//   // let { weapons, armor, misc, mainWeapons, mainArmor, mainMisc } = self.state
//   DB = SQLite.openDatabase(
//     {name: 'db.sqlite3', createFromLocation: 1, location: 'Library'},
//     openCB,
//     errorCB,
//   );

//   let weapons = {},
//     armor = {},
//     misc = {},
//     mainWeapons = {},
//     mainArmor = {},
//     mainMisc = {};
//   character_equipment.map((item, i) => {
//     const idEquip = convertHash(item.itemHash);

//     DB.transaction(tx => {
//       tx.executeSql(
//         `SELECT json FROM DestinyInventoryItemDefinition where id =${idEquip}`,
//         [],
//         (tx, results) => {
//           var len = results.rows.length;
//           for (let i = 0; i < len; i++) {
//             let row = results.rows.item(i);
//             let equip = JSON.parse(row.json);

//             const idBucket = convertHash(item.bucketHash);

//             tx.executeSql(
//               `SELECT json FROM DestinyInventoryBucketDefinition where id =${idBucket}`,
//               [],
//               (tx, results) => {
//                 for (let i = 0; i < len; i++) {
//                   let row = results.rows.item(i);
//                   let bucketDefinition = JSON.parse(row.json);
//                   equip.bucketDefinition = bucketDefinition;
//                 }
//                 equip.bucketHash = item.bucketHash;
//                 equip.location = item.location;
//                 equip.itemHash = item.itemHash;
//                 equip.itemInstanceId = item.itemInstanceId;
//                 equip.instances = instances[item.itemInstanceId]
//                   ? instances[item.itemInstanceId]
//                   : null;
//                 switch (equip.itemType) {
//                   case 3:
//                   case 16:
//                     mainWeapons[item.bucketHash] = equip;
//                     self.setState({mainWeapons});
//                     break;
//                   case 2:
//                     mainArmor[item.bucketHash] = equip;
//                     self.setState({mainArmor});
//                     break;
//                   default:
//                     mainMisc[item.bucketHash] = equip;
//                     self.setState({mainMisc});
//                     break;
//                 }
//               },
//             );
//           }
//         },
//         errorCB,
//         closeDatabase,
//       );
//     });
//   });

//   other_equipment.map((item, i) => {
//     const idEquip = convertHash(item.itemHash);

//     DB.transaction(tx => {
//       tx.executeSql(
//         `SELECT json FROM DestinyInventoryItemDefinition where id =${idEquip}`,
//         [],
//         (tx, results) => {
//           var len = results.rows.length;
//           for (let i = 0; i < len; i++) {
//             let row = results.rows.item(i);
//             let equip = JSON.parse(row.json);

//             equip.bucketHash = item.bucketHash;
//             equip.location = item.location;
//             equip.itemHash = item.itemHash;
//             equip.itemInstanceId = item.itemInstanceId;
//             equip.instances = instances[item.itemInstanceId]
//               ? instances[item.itemInstanceId]
//               : null;
//             switch (equip.itemType) {
//               case 3:
//               case 16:
//                 if (!weapons[item.bucketHash]) {
//                   weapons[item.bucketHash] = [];
//                 }
//                 weapons[item.bucketHash].push(equip);
//                 self.setState({weapons});
//                 break;
//               case 2:
//                 if (!armor[item.bucketHash]) {
//                   armor[item.bucketHash] = [];
//                 }
//                 armor[item.bucketHash].push(equip);
//                 self.setState({armor});
//                 break;
//               default:
//                 if (!misc[item.bucketHash]) {
//                   misc[item.bucketHash] = [];
//                 }
//                 misc[item.bucketHash].push(equip);
//                 self.setState({misc});
//                 break;
//             }
//           }
//         },
//         errorCB,
//         closeDatabase,
//       );
//     });
//   });
// };
