# destiny_app

![](https://img.shields.io/github/license/anibalajt/destiny_app.svg?style=flat-square)
![](https://img.shields.io/github/stars/anibalajt/destiny_app.svg?style=flat-square)
![](https://img.shields.io/github/forks/anibalajt/destiny_app.svg?style=flat-square)


A [React Native](https://facebook.github.io/react-native/) app utilising [React Native CLI], [React Navigation](https://reactnavigation.org), [react-native-sqlite-storage](https://github.com/andpor/react-native-sqlite-storage), [rn-fetch-blob](https://github.com/joltup/rn-fetch-blob) and fetching data from [The Bungie.Net API](https://github.com/Bungie-net/api).
<br><br>
Built as a personal training project for [React Native](https://facebook.github.io/react-native/). Design and development by [Andres Jarava](https://www.linkedin.com/in/anibalajt/).


create api_key.js in `app/utils/`

```
module.exports = {
  Token_URL: "https://www.bungie.net/Platform/App/OAuth/token/",
  API_Key: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  OAuth_Authorization_URL: "https://www.bungie.net/en/OAuth/Authorize",
  OAuth_client_id: "xxxxxxxxx",
  OAuth_client_secret: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
}
```
