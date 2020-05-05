import React from 'react';
import {ActivityIndicator, View, SafeAreaView} from 'react-native';
import {WebView} from 'react-native-webview';

const wView = ({route, navigation}) => {
  console.log('navigation :>> ', route);
  const {uri} = route.params;
  return (
    // <SafeAreaView style={{ flex: 1 }}>
    <WebView
      source={{uri}}
      bounces={false}
      originWhitelist={['https://*', 'http://*', 'file://*', 'sms://*']}
      style={{zIndex: 1, flex: 1}}
      renderLoading={() => (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color="#d0aa21" />
        </View>
      )}
      javaScriptEnabledAndroid={true}
      startInLoadingState={true}
      onNavigationStateChange={navState => {
        // Keep track of going back navigation within component
        console.log('navState :>> ', navState);
        if (navState.url.indexOf('appdestiny') > -1) {
          console.log('in navState :>> ', navState);
        }
      }}
    />
    // </SafeAreaView>
  );
};

export default wView;
