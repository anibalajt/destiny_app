import { payload_GetMembershipsById } from "./payloads"
import { request } from "./request";
export default async (accessToken, bungieMembershipId) => {
  const payload = payload_GetMembershipsById(accessToken, bungieMembershipId)
  const res = await request(JSON.parse(payload))
  if (res.status === 200 && res.data.Response) {
    return res.data.Response;
  }
  return false;
};