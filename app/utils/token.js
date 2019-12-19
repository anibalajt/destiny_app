import axios from "axios"
import { stringify } from "simple-query-string";
import { handleAccessToken } from "./handleAccessToken";
import { URL_get_token, OAuth_client_id as client_id, OAuth_client_secret as client_secret } from "./api_key"
export const token = async code => {
	let res = await axios({
		method: 'post',
		url: URL_get_token,
		data: stringify({
			grant_type: "authorization_code",
			code,
			client_id,
			client_secret
		}),
		headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		}
	});
	if (res.status === 200) {
		const tokens = await handleAccessToken(res.data)
		if (tokens) {
			return { status: true, tokens };
		}
		return { status: false, tokens: null };
	}
	return { status: false, tokens: null };
};
export const hasTokenExpired = async accessToken => {
	try {
		const now = Date.now();
		const { inception, expires } = accessToken;
		return now >= inception + expires * 1000;
	} catch (error) {
		console.log("ehasTokenExpired rror :", error);
		return true;
	}
};
export const refreshToken = async ({ value: refresh_token }) => {
	console.log('refreshToken')
	try {
		const response = await fetch(URL_get_token, {
			method: "POST",
			body: stringify({
				grant_type: "refresh_token",
				refresh_token,
				client_id,
				client_secret
			}),
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			}
		})
			.then(res => res.json())
			.then(handleAccessToken);
		console.log("refreshToken :", response);
		if (response) {
			return true;
		}
	} catch (error) {
		console.log("refreshToken error: ", error);
	}
};
