import React, { Component, Fragment } from "react";
import {
  Text,
  View,
  ImageBackground,
  TouchableHighlight,
  Image,
  ActivityIndicator
} from "react-native";
import { OAuth_Authorization_URL, OAuth_client_id } from "../utils/api_key"
import Translate from "../assets/translation";

const Login = ({ navigation }) => {
  return (
    <ImageBackground style={{ flex: 1, backgroundColor: "#0F1317" }}>
      <Fragment>
        <View
          style={{
            position: "relative",
            zIndex: 0,
            flex: 1,
            justifyContent: "flex-end",
            alignItems: "center",
            paddingBottom: 100
          }}
        >
          <Image
            source={require("../assets/vault.png")}
            style={{ marginBottom: 50, resizeMode: "contain" }}
          />
          <Text
            style={{
              fontSize: 18,
              color: "#ffffff57",
              marginTop: 10,
              marginBottom: 10
            }}
          >
            Vault Item Manager
        </Text>
          <TouchableHighlight
            underlayColor="#f5dc56c7"
            style={{
              backgroundColor: "#d0aa21",
              paddingVertical: 10,
              paddingHorizontal: 15,
              borderRadius: 2
            }}
            onPress={e => {
              console.log("tesss")
              navigation.replace("WebView", {
                uri:
                  `${OAuth_Authorization_URL}?client_id=${OAuth_client_id}&response_type=code`
              });
            }}
          >
            <Fragment>
              <Text style={{ fontSize: 18, color: "#000" }}>
                {Translate['en'].Login.authoriza}
              </Text>
            </Fragment>
          </TouchableHighlight>
          <Text style={{ fontSize: 18, color: "#ffffff57", marginTop: 10 }}>
            Destiny 2
        </Text>
        </View>
      </Fragment>
    </ImageBackground>
  )
}
export default Login
