import { handleAccessToken } from "./handleAccessToken";
import { token, refreshToken, hasTokenExpired } from "./token";
import { getAuthorization } from "./getAuthorization";

import Lenguaje from "./lenguaje";
const convertHash = hash => {
  return ("%u", hash & 0xffffffff).toString();
};
export {
  handleAccessToken,
  convertHash,
  token,
  refreshToken,
  hasTokenExpired,
  Lenguaje,
  getAuthorization
};
