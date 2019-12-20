import { handleAccessToken } from "./handleAccessToken";
import { hasTokenExpired, request } from "./request";
import { getAuthorization } from "./getAuthorization";
import Lenguaje from "./lenguaje";
const convertHash = hash => {
  return ("%u", hash & 0xffffffff).toString();
};
export {
  handleAccessToken,
  convertHash,
  request,
  hasTokenExpired,
  Lenguaje,
  getAuthorization
};
