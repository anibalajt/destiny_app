import { NativeModules, Platform } from "react-native";

export default () => {
	let lenguaje = "en";
	if (Platform.OS === "android") {
		lenguaje = NativeModules.I18nManager.localeIdentifier.split("_")[0];
	} else {
		lenguaje = NativeModules.SettingsManager.settings.AppleLocale.split("_")[0];
	}
	lenguaje !== "en" && lenguaje !== "es" && (lenguaje = "en");
	return lenguaje;
};
