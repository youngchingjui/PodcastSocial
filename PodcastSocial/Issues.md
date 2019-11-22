# Current issues

### Bug with minify-ing program

When running the app with `expo start --no-minify --dev`, the app runs fine.

However, when we run `expo start --minify --dev`, we get 2 error messages in the developer console.

**1st error**

```
ExceptionsManager.js:74 Cannot use t "__Schema" from another module or realm.

Ensure that there is only one instance of "graphql" in the node_modules
directory. If different versions of "graphql" are the dependencies of other
relied on modules, use "resolutions" to ensure only one version is installed.

https://yarnpkg.com/en/docs/selective-version-resolutions

Duplicate "graphql" modules cannot be used at the same time since different
versions may have different capabilities and behavior. The data from one
version used in the function from another could produce confusing and
spurious results.
```

**2nd error**

```
ExceptionsManager.js:74 Application main has not been registered.

Hint: This error often happens when you're running the packager (local dev server) from a wrong folder. For example you have multiple apps and the packager is still running for the app you were working on before.
If this is the case, simply kill the old packager instance (e.g. close the packager terminal window) and start the packager in the correct app folder (e.g. cd into app folder and run 'npm start').

This error can also happen due to a require() error during initialization or failure to call AppRegistry.registerComponent.
```

For 1st error, it looks like there's some issue with the `GraphQL` package. `GraphQL` is used by some of the `aws amplify` packages, so that might be worth investigating.

For the 2nd error, on some quick googling, it seems this error sometimes occurs when the name of the App has changed.

Truth is, I DID change the name in the middle of the app development, from `Podcast Social` to `Social Podcast`. I tried updating the names where I could, but I cannot recall where I did this exactly.

But with expo, all of the names of the application should be fully managed.

One clue might be here: When I put a breakpoint at the `registerRootComponent(App)` line within `node_modules/expo/expo/AppEntry.js`, I'll reach the breakpoint when I run the non-minified code. But when I minify the code, I do not hit this breakpoint. So something is happening before this.

---

### Notes while debugging

I tried debugging this for awhile, and left my rough notes below. Apologies for the stream-of-conscious style writing.

in the `package.json` file for `aws-amplify-react-native` file, these are the dependencies:

```JSON
  "dependencies": {
    "babel-preset-es2015": "^6.24.1",
    "buffer": "^5.2.1",
    "react-native-elements": "^0.19.1",
    "react-native-vector-icons": "^5.0.0"
  },
```

So what if I take out `aws-amplify-react-native` from `package.json`?

Did that, and took out all imports of `aws-amplify-react-native`, deleted `node_modules` folder, and ran `npm i` to re-install all the packages. Ran `expo start --no-minify --dev` again

Still getting the same error message
`Unable to resolve "graphql/language/parser" from "node_modules/aws-amplify-react-native/dist/API/GraphQL/Connect.js"`
Another package still requires `aws-amplify-react-native`!
In [aws-amplify-react-native - npm](https://www.npmjs.com/package/aws-amplify-react-native), we see there are 2 dependents, but we can't see what those dependents are.

Anyways, there shouldn't be an issue with `aws-amplify-react-native`. There's probably an underlying problem.

From https://github.com/apollographql/react-apollo/issues/922 one solution recommended i do `npm i --save graphql`
I didn't add the `--save` flag. When running `npm help i`, I didn't see the `--save` flag, but only `--save-prod / --save-dev / etc.` `--save-dev` is default, which I assume is the same as `--save`. So I didn't include it.

Excellent! OK it works after installing graphql.

OK, let's try again with `--minify` flag
Nope, still same issues.

In my debugger console, I see 2 errors pop up:

```
ExceptionsManager.js:74 Cannot use t "__Schema" from another module or realm.

Ensure that there is only one instance of "graphql" in the node_modules
directory. If different versions of "graphql" are the dependencies of other
relied on modules, use "resolutions" to ensure only one version is installed.

https://yarnpkg.com/en/docs/selective-version-resolutions

Duplicate "graphql" modules cannot be used at the same time since different
versions may have different capabilities and behavior. The data from one
version used in the function from another could produce confusing and
spurious results.
```

and also

```
ExceptionsManager.js:74 Application main has not been registered.

Hint: This error often happens when you're running the packager (local dev server) from a wrong folder. For example you have multiple apps and the packager is still running for the app you were working on before.
If this is the case, simply kill the old packager instance (e.g. close the packager terminal window) and start the packager in the correct app folder (e.g. cd into app folder and run 'npm start').

This error can also happen due to a require() error during initialization or failure to call AppRegistry.registerComponent.
```

The graphql issue is coming from the file in `node_modules/aws-amplify/node_modules/graphql/jsutils/instanceOf.js`

Is this issue coming up because my `package.json` has a mixture of `@aws-amplify/***` packages with the regular `aws-amplify` package?

What happens when I take out the `@aws-amplify/***` packages?
OK, deleted `node_modules` folder, then re-installed with `npm i`

Try launching first with `expo start --no-minify --dev`
I get this error: `Unable to resolve "@aws-amplify/core" from "node_modules/aws-amplify-react-native/dist/Auth/withOAuth.js"`

OK fine, let me install `@aws-amplify/core`
I installed v1.2.4

run `expo start --no-minify --dev` again
Then I get this furthermore:
`Unable to resolve "@aws-amplify/auth" from "node_modules/aws-amplify-react-native/dist/Auth/withOAuth.js"`

Arg! Maybe instead of using `aws-amplify`, I should convert my code to using the more modular packages with `@aws-amplify/**` OK let's try that.

I converted all references of `aws-amplify` to their individual modules `@aws-amplify/**` in my code. This is cleaner anyways. Also took out `aws-amplify` from my `package.json`

Removed `node_modules` folder and reinstalled with `npm i`

ran `expo start --no-minify --dev`, got this error:
`Unable to resolve "aws-amplify" from "node_modules/aws-amplify-react-native/dist/index.js"`
GARR!!

OK add back in `aws-amplify`
after running `npm i --save aws-amplify` I got these warning messages:

```bash
npm WARN aws-amplify-react-native@2.2.3 requires a peer of graphql@0.13.0 but none is installed. You must install peer dependencies yourself.
npm WARN aws-amplify-react-native@2.2.3 requires a peer of react-native-sound@^0.10.9 but none is installed. You must install peer dependencies yourself.
npm WARN aws-amplify-react-native@2.2.3 requires a peer of react-native-voice@^0.2.6 but none is installed. You must install peer dependencies yourself.
npm WARN react-native-elements@0.19.1 requires a peer of react-native-vector-icons@^4.2.0 but none is installed. You must install peer dependencies yourself.
npm WARN react-native-fs@2.16.1 requires a peer of react-native-windows@^0.57.2 but none is installed. You must install peer dependencies yourself.
```

These are my current dependency versions:

```json
  "dependencies": {
    "@aws-amplify/auth": "^1.5.0",
    "@aws-amplify/core": "^1.2.4",
    "@aws-amplify/storage": "^1.2.4",
    "@react-native-community/async-storage": "^1.6.2",
    "aws-amplify": "^1.2.4",
    "aws-amplify-react-native": "^2.2.3",
    "aws-serverless-express": "^3.3.6",
    "axios": "^0.19.0",
    "expo": "^34.0.1",
    "expo-av": "^6.0.0",
    "expo-constants": "~6.0.0",
    "expo-file-system": "^6.0.2",
    "expo-mail-composer": "^6.0.0",
    "expo-permissions": "^6.0.0",
    "express": "^4.17.1",
    "graphql": "^14.5.8",
    "react": "16.8.3",
    "react-devtools": "^3.6.3",
    "react-dom": "^16.8.6",
    "react-native": "https://github.com/expo/react-native/archive/sdk-34.0.0.tar.gz",
    "react-native-fs": "^2.16.1",
    "react-native-gesture-handler": "~1.3.0",
    "react-native-reanimated": "~1.1.0",
    "react-native-sound": "^0.11.0",
    "react-native-svg": "~9.5.1",
    "react-native-vector-icons": "^6.6.0",
    "react-native-voice": "^0.3.0",
    "react-native-web": "^0.11.4",
    "react-native-xml2js": "^1.0.3",
    "react-navigation": "^4.0.0",
    "react-navigation-stack": "^1.5.1",
    "react-navigation-tabs": "^2.3.0",
    "xmldom": "^0.1.27"
  },
```

Great, it loads. At least converting to the modules didn't affect anything...on load. Haven't fully tested them yet. Need to test the storage module too when recording audio.

But let's try again with `minify`

Same 2 error messages:

```
Cannot use t "__Schema" from another module or realm.

Ensure that there is only one instance of "graphql" in the node_modules
directory. If different versions of "graphql" are the dependencies of other
relied on modules, use "resolutions" to ensure only one version is installed.

https://yarnpkg.com/en/docs/selective-version-resolutions

Duplicate "graphql" modules cannot be used at the same time since different
versions may have different capabilities and behavior. The data from one
version used in the function from another could produce confusing and
spurious results.
```

and...

```
ExceptionsManager.js:74 Application main has not been registered.

Hint: This error often happens when you're running the packager (local dev server) from a wrong folder. For example you have multiple apps and the packager is still running for the app you were working on before.
If this is the case, simply kill the old packager instance (e.g. close the packager terminal window) and start the packager in the correct app folder (e.g. cd into app folder and run 'npm start').

This error can also happen due to a require() error during initialization or failure to call AppRegistry.registerComponent.
```

In checking `node_modules/graphql/package.json`, I see the version is 14.5.8, in line with my `package.json` requirements. Should I bring that down to v0.13.0?

In `package-lock.json` I see that this under `dependencies: {}`...

```json
"@aws-amplify/api": {
      "version": "1.2.4",
      "resolved": "https://registry.npmjs.org/@aws-amplify/api/-/api-1.2.4.tgz",
      "integrity": "sha512-dyrTz4KaQek1O0Uh/Jf5QBoM72UN8RcOQG/x6FwMyTBuadArqAgUO8UOydSfkjOHxHPGNjn+Bl0tiW6GsapxJg==",
      "requires": {
        "@aws-amplify/auth": "^1.5.0",
        "@aws-amplify/cache": "^1.1.4",
        "@aws-amplify/core": "^1.2.4",
        "@types/zen-observable": "^0.5.3",
        "axios": "^0.19.0",
        "graphql": "14.0.0",
        "uuid": "^3.2.1",
        "zen-observable": "^0.8.6"
      },
      "dependencies": {
        "graphql": {
          "version": "14.0.0",
          "resolved": "https://registry.npmjs.org/graphql/-/graphql-14.0.0.tgz",
          "integrity": "sha512-HGVcnO6B25YZcSt6ZsH6/N+XkYuPA7yMqJmlJ4JWxWlS4Tr8SHI56R1Ocs8Eor7V7joEZPRXPDH8RRdll1w44Q==",
          "requires": {
            "iterall": "^1.2.2"
          }
        }
      }
    },
```

So what if I change `graphql` version to `0.13.0`?
I'll change it in `package.json`

Delete `node_modules` and reinstall
Ran `expo start --no-minify --dev` - works OK
Ran `expo start --minify --dev`

SAME ERROR
https://github.com/aws-amplify/amplify-js/issues/820
This is the exact error that I'm seeing, opened May 2018

Trying this with another expo app I use as playground

Then added following to `package.json` in playground

```JSON
    "@aws-amplify/auth": "^1.5.0",
    "@aws-amplify/core": "^1.2.4",
    "@aws-amplify/storage": "^1.2.4",
    "aws-amplify": "^1.2.4",
    "aws-amplify-react-native": "^2.2.3",
```

ran `expo start --no-minify --dev` first
success
Next, `expo start --minify --dev`

OK, success!
OK, the `package-lock.json` for Playground only has graphql@14.0.0, while my app has 0.13.0. Both also have @aws-amplify/api that requires graphql@14.0.0. Maybe let me move my graphql version up to 14.0.0?

Nope. Didn't solve issue.

Is it my environment variables?
Currently, in my environment.js file:

```javascript
const ENV = {
  dev: {
    apiUrl: localhost,
    AIRTABLE_API_KEY: "keyDm2XbBComwG6aO",
    LISTEN_NOTES_API_KEY: "34694360e16041b898d7866a967391e7"
  },
  staging: {
    apiUrl: "https://staging.herokuapp.com",
    amplitudeApiKey: "[Enter your key here]",

    // Add other keys you want here
    AIRTABLE_API_KEY: "keyDm2XbBComwG6aO",
    LISTEN_NOTES_API_KEY: "34694360e16041b898d7866a967391e7"
  },
  prod: {
    apiUrl: "https://prod.herokuapp.com",
    amplitudeApiKey: "[Enter your key here]",

    // Add other keys you want here
    AIRTABLE_API_KEY: "keyDm2XbBComwG6aO",
    LISTEN_NOTES_API_KEY: "34694360e16041b898d7866a967391e7"
  }
};
```

Should I take out the random other variables for staging and production? But I'm using the --dev flag for all of them...this shouldn't affect it.

When I commented out those variables (`apiUrl` and `amplitudeApiKey`), it did not change the result.

What if I just change the name of my app in `app.json` for my Playground app?

```json
  "expo": {
    "name": "RecordAndEmaila",
    "slug": "RecordAndEmail",
    "privacy": "public",
    "sdkVersion": "35.0.0",
    "platforms": [
      "ios",
      "android",
      "web"
    ],
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "updates": {
      "fallbackToCacheTimeout": 0
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true
    }
  }
```

Nope. When I change both `name` and `slug`, neither of them break the Playground version.
