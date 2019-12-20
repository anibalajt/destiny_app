import { Token_URL, OAuth_client_id as client_id, OAuth_client_secret as client_secret } from "./api_key"

export const payload_authorization_code = {
  url: Token_URL,
  data: {
    grant_type: "authorization_code",
    client_id,
    client_secret
  },
  headers: {
    "Content-Type": "application/x-www-form-urlencoded"
  }
};
export const payload_refresh_token = {
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
};