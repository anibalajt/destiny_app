# destiny_app

![](https://img.shields.io/github/license/anibalajt/destiny_app.svg?style=flat-square)
![](https://img.shields.io/github/stars/anibalajt/destiny_app.svg?style=flat-square)
![](https://img.shields.io/github/forks/anibalajt/destiny_app.svg?style=flat-square)


A [React Native](https://facebook.github.io/react-native/) app utilising [React Native CLI], [React Navigation](https://reactnavigation.org), [react-native-sqlite-storage](https://github.com/andpor/react-native-sqlite-storage), [rn-fetch-blob](https://github.com/joltup/rn-fetch-blob) and fetching data from [The Bungie.Net API](https://github.com/Bungie-net/api).
<br><br>
Built as a personal training project for [React Native](https://facebook.github.io/react-native/). Design and development by [Andres Jarava](https://www.linkedin.com/in/anibalajt/).

<img src="https://github.com/anibalajt/destiny_app/blob/master/app/assets/login.png" width="270" hspace="5"><img src="https://github.com/anibalajt/destiny_app/blob/master/app/assets/oauth.png" width="270" hspace="5" ><img src="https://github.com/anibalajt/destiny_app/blob/master/app/assets/home.png" width="270" hspace="5">

## Installation

If you want to test the app on a simulator running locally:

`git clone https://github.com/anibalajt/destiny_app.git`

create file api_key.js in `app/utils/`

```
module.exports = {
  Token_URL: "https://www.bungie.net/Platform/App/OAuth/token/",
  API_Key: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  OAuth_Authorization_URL: "https://www.bungie.net/en/OAuth/Authorize",
  OAuth_client_id: "xxxxxxxxx",
  OAuth_client_secret: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
}
```

```bash
$ cd destiny_app

$ yarn install

$ cd ios

$ pod install

$ cd ..

$ react-native run-ios
```


## How can I get an API Key?

info -> [Bungie](https://github.com/Bungie-net/api)

## Contribute

If you find a bug, feel free to open an issue or submit a pull request.

New ideas are always welcome, if you have an idea to change or add a feature, let me know by opening an issue or messaging me on [Twitter](https://twitter.com/anibalajt).

## Licence

MIT License

See [LICENSE](LICENSE)
