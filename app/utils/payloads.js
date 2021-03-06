import { Token_URL, OAuth_client_id as client_id, OAuth_client_secret as client_secret, API_Key } from "./api_key"
import lenguaje from "./lenguaje";
const lc = lenguaje()

export const payload_authorization_code = JSON.stringify({
  method: "post",
  url: Token_URL,
  data: {
    grant_type: "authorization_code",
    client_id,
    client_secret
  },
  headers: {
    "Content-Type": "application/x-www-form-urlencoded"
  }
});

export const payload_refresh_token = JSON.stringify({
  method: "post",
  url: Token_URL,
  data: {
    grant_type: "refresh_token",
    client_id,
    client_secret
  },
  headers: {
    "Content-Type": "application/x-www-form-urlencoded"
  }
});
export const payload_Get = (url) => ({
  method: "GET",
  url
})
export const payload_GetMembershipsById = (accessToken, bungieMembershipId) => JSON.stringify({
  method: "GET",
  url: `https://www.bungie.net/Platform/User/GetMembershipsById/${bungieMembershipId}/254/?lc=${lc}`,
  headers: {
    Authorization: `Bearer ${accessToken.value}`,
    "x-api-key": API_Key
  }
});
export const payload_GetAccountDate = (accessToken, membershipType, membershipId) => JSON.stringify({
  method: "GET",
  url: `https://www.bungie.net/Platform/Destiny2/${membershipType}/Profile/${membershipId}/?components=100,102,103,200,201,202,205,300,301,304,305,306,307,308`,
  headers: {
    Authorization: `Bearer ${accessToken.value}`,
    "x-api-key": API_Key,
    "Content-Type": "application/json",
    Accept: "application/json"
  }
});