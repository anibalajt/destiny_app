import { NativeModules, Platform } from "react-native";
export default () => {
	let lenguaje = "en";
	if (Platform.OS === "android") {
		lenguaje = NativeModules.I18nManager.localeIdentifier.split("_")[0];
	} else {
		let locale = NativeModules.SettingsManager.settings.AppleLocale // "fr_FR"
		if (locale === undefined) {
			// iOS 13 workaround, take first of AppleLanguages array  ["en", "en-NZ"]
			locale = NativeModules.SettingsManager.settings.AppleLanguages[0]
			if (locale == undefined) {
				lenguaje = "en" // default language
			}
		}
	}
	lenguaje !== "en" && lenguaje !== "es" && (lenguaje = "en");
	return lenguaje;
};
