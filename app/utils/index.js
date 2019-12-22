import { handleAccessToken } from "./handleAccessToken";
import { hasTokenExpired, request } from "./request";
import { getAuthorization } from "./getAuthorization";
import endpoints from "./endpoints"
import Lenguaje from "./lenguaje";
import statusBarHeight from "./statusBarHeight"
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
  membershipType
};
