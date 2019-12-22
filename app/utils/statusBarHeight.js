import { NativeModules, Platform } from "react-native";
let statusBar = 0


export default  () => {
  switch (Platform.OS) {
    case 'ios':
      NativeModules.StatusBarManager.getHeight((statusBarHeight) => hhh(statusBarHeight))
      const hhh = (statusBarHeight) => {
        statusBar = statusBarHeight.height
      }
      return statusBar
    default:
      return NativeModules.StatusBarManager.HEIGHT
  }
}