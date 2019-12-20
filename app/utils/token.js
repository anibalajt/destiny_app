import axios from "axios"

export const request = async (payload) => {
	return axios(payload).then(res => res).catch(err =>{console.log('err', err)});
}

export const hasTokenExpired = async (tokens, context) => {
	try {
		const { accessToken } = tokens
		const now = Date.now();
		const { inception, expires } = accessToken;
		return now >= inception + expires * 1000;
	} catch (error) {
		console.log("ehasTokenExpired rror :", error);
		return true;
	}
};

