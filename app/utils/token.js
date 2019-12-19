import axios from "axios"
import { stringify } from "simple-query-string";
import { handleAccessToken } from "./handleAccessToken";
import { Token_URL, OAuth_client_id as client_id, OAuth_client_secret as client_secret } from "./api_key"
export const token = async (code, context) => {
	let res = await axios({
		method: 'post',
		url: Token_URL,
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
		const tokens = await handleAccessToken(res.data, context)
		if (tokens) {
			return { status: true, tokens };
		}
		return { status: false, tokens: null };
	}
	return { status: false, tokens: null };
};
export const hasTokenExpired = async tokens => {
	try {
		const { refreshToken } = tokens
		const now = Date.now();
		const { inception, expires } = accessToken;
		const expired = now >= inception + expires * 1000;

		if (!expired) await dispatch({ type: ActionTypes.ADD_AUTHORIZATION, text: tokens });

		return expired
	} catch (error) {
		console.log("ehasTokenExpired rror :", error);
		return true;
	}
};
export const refreshToken = async ({ value: refresh_token, context }) => {
	try {
		let response = await axios({
			method: 'post',
			url: Token_URL,
			data: stringify({
				grant_type: "refresh_token",
				refresh_token,
				client_id,
				client_secret
			}),
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			}
		});
		if (response.status === 200) {
			const tokens = await handleAccessToken(response.data, context)
			if (tokens) {
				return true;
			}
			return false;
		}
		return false;
	} catch (error) {
		console.log("refreshToken error: ", error);
	}
};
