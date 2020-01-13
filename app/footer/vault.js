import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import vaultDefinition from "./vaultDefinition"

export default () => {
	const [vault, setVault] = useState('')
	const [vaultIcon, setvaultIcon] = useState('')
	useEffect(() => {
		if (vault === '') {
			vaultDefinition(1037843411, setVault, setvaultIcon);
		}
	}, [vault])
	return (
		<View style={styles.container}>
			<Image
				source={{ uri: `https://www.bungie.net${vaultIcon}` }}
				style={{
					resizeMode: "contain",
					width: 40,
					height: 40
				}}
			/>
			<Text style={styles.text}>{vault}</Text>
		</View>
	);
};
const styles = StyleSheet.create({
	container: {
		paddingTop: 5,
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: 10
	},
	text: {
		color: "#fff",
		fontSize: 12
	}
});