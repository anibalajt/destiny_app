import React from 'react';
import {ActivityIndicator, View, SafeAreaView} from 'react-native';
import {WebView} from 'react-native-webview';

const wView = ({route, navigation}) => {
  console.log('navigation :>> ', navigation);
  const {uri} = route.params;
  return (
    // <SafeAreaView style={{flex: 1}}>
    <WebView
      source={{uri}}
      style={{zIndex: 1, flex: 1, paddingVertical: 20}}
      originWhitelist={['https://*', 'appdestiny://*']}
      renderLoading={() => (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color="#d0aa21" />
        </View>
      )}
      bounces={false}
      javaScriptEnabledAndroid={true}
      startInLoadingState={true}
      // onNavigationStateChange={event => {
      //  console.log('event :>> ', event);
      // }}
      onShouldStartLoadWithRequest={req => {
        const isHTTPS = req.url.search('https://') !== -1;
        console.log('req :>> ', req);
        if (isHTTPS) {
          return true;
        } else {
          if (req.url.startsWith('appdestiny://')) {
            const route = req.url.replace(/.*?:\/\//g, '');
            const code = route.match(/=([^&]+)/)[1];
            console.log('code :>> ', code);
            if (code) {
              navigation.replace('Authorization', {
                code,
              });
            }
            console.log('entraa');
          }
          return false;
        }
      }}
    />
    // </SafeAreaView>
  );
};

export default wView;
