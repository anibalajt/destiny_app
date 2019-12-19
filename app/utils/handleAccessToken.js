import AsyncStorage from '@react-native-community/async-storage';
import { ActionTypes } from "../store/index";

export const handleAccessToken = async (response, context) => {
	console.log('handleAccessToken', response)
	if (response && response.access_token) {
		const data = response;
		const inception = Date.now();
		const accessToken = {
			value: data.access_token,
			expires: data.expires_in,
			name: "access",
			inception
		};

		const tokens = {
			status: true,
			accessToken,
			bungieMembershipId: data.membership_id
		};

		if (data.refresh_token) {
			tokens.refreshToken = {
				value: data.refresh_token,
				expires: data.refresh_expires_in,
				name: "refresh",
				inception
			};
		}
		try {
			await AsyncStorage.setItem("authorization", JSON.stringify(tokens));
			const { dispatch } = context;
			const r = await dispatch({ type: ActionTypes.ADD_AUTHORIZATION, text: tokens });

			return tokens
		} catch (error) {
			console.log("error :", error);
		}
		return true;
	} else {
		throw new Error(
			"No data or access token in response: " + JSON.stringify(response)
		);
	}
};
