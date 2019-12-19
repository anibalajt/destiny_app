import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack"
import Index from "../index";
import Home from "../home/index";
import WebView from "../login/webView";
import Authorization from "../authorization"

const Router = createStackNavigator(
  {
    Login: { screen: Index },
    WebView: { screen: WebView },
    Home: { screen: Home },
    Authorization: { screen: Authorization },
  },
  {
    // initialRouteName: "Login",
    headerMode: "none"
  }
);

export default createAppContainer(Router);
