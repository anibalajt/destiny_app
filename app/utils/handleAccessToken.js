import AsyncStorage from '@react-native-community/async-storage';

export const handleAccessToken = async (response) => {
	// console.log('handleAccessToken', response)
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
			return tokens
		} catch (error) {
			console.log("handleAccessToken error :", error);
			return error
		}
	} else {
		throw new Error(
			"No data or access token in response: " + JSON.stringify(response)
		);
	}
};
