import React, { } from "react";
import { ActivityIndicator, View, SafeAreaView } from "react-native";
import { WebView } from 'react-native-webview';

const wView = ({ navigation }) => {
	const uri = navigation.getParam("uri")
	return (
		// <SafeAreaView style={{ flex: 1 }}>
			<WebView
				source={{ uri }}
				bounces={false}
				originWhitelist={["https://*", "http://*", "file://*", "sms://*"]}
				style={{ zIndex: 1, flex: 1 }}
				renderLoading={() => (
					<View
						style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
					>
						<ActivityIndicator size="large" color="#d0aa21" />
					</View>
				)}
				javaScriptEnabledAndroid={true}
				startInLoadingState={true}

			/>
		// </SafeAreaView>
	);
}

export default (wView);
