import { handleAccessToken } from "./handleAccessToken";
import { hasTokenExpired, request } from "./request";
import { getAuthorization } from "./getAuthorization";
import endpoints from "./endpoints"
import Lenguaje from "./lenguaje";
import statusBarHeight from "./statusBarHeight"
import GetMembershipData from "./getMembershipData"
import getManifest from "./manifest"
const typeBucketHash = {
  weapons: [3284755031, 1498876634, 2465295065, 953998645
  ],
  armor: [3448274439, 3551918588, 14239492, 20886954, 1585787867
  ],
  general: [4023194814, 4292445962, 2025709351, 284967655, 4274335291, 375726501
  ],
  inventory: ["Consumables", "Modifications", "Shaders"]
}
const convertHash = hash => {
  return ("%u", hash & 0xffffffff).toString();
};
const membershipType = (membershipType) => [
  { name: "Xbox", id: 1 },
  { name: "PlayStation", id: 2 },
  { name: "Stean", id: 3 },
  { name: "Battle.net", id: 4 },
  { name: "Stadia", id: 5 }
].find(function (obj) {
  return obj.id === membershipType;
});
// console.log('statusBarHeight', statusBarHeight())
export {
  handleAccessToken,
  convertHash,
  request,
  hasTokenExpired,
  Lenguaje,
  getAuthorization,
  endpoints,
  statusBarHeight,
  membershipType,
  GetMembershipData,
  getManifest,
  typeBucketHash
};
