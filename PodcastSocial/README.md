# PodcastSocial

A podcast app where you can listen to podcasts and also respond back to podcasters.

Currently, in this app you can:

- Listen to podcast episodes
- Search for podcast channels
- Subscribe to podcast channels
- Fast forward and rewind by 10 seconds
- Record audio recordings
- Send a notification that you'd like your recording to be sent to the podcaster

There's still a lot more to build out, but I'm just getting ready to submit this to the App Store.

There is a major bug that occurs when we `minify` the project and bundle it to an `.ipa` file, so I'm working through that now.

### Current issues

Current issues can be found in [this markdown file](Issues.md)

### Folder structure

```
├── .expo: Not sure what to do with this folder? So many duplicate files...
├── .expo-shared: Also not sure what this is?
├── .git: Not sure why this is here?
├── .vscode: This probably
├── amplify: All files related to AWS Amplify
├── assets: All assets, such as logos, fonts, etc.
├── src: all main .js files for app:
├── api: for all api-related services
├── components: All reusable components
├── context: where we manage all of the state and data models. Context is provided globally through the app
├── hooks: a hook? TODO: Not too sure how to use this folder
├── screens: all main screens
├── NavigationService.js: Navigation hook. TODO: Move to `hooks` folder
└── ReactotronConfig.js: Some debugging tool that I uninstalled. TODO: Get rid of this.
```

### TODO

- merge this Add-Play-Button branch back to master at some point
- Fix bug from minifying code

### Notes

### AWS Amplify

This app is configured with AWS Amplify, specifically for Auth and Storage.

#### environment.js

All environment variables are saved here.
Required API keys:

- Airtable: https://airtable.com
- ListenNotes: https://www.listennotes.com

TODO: App might crash if keys not available?

#### To build and upload to App Store Connect

Steps to remind myself how to do this.

- Update the build number and version number in `app.json`
- Run start (`expo start`)
- In second terminal, run `expo build:ios`
- After done building, download .ipa file
- Upload the .ipa file through Transporter

#### Mail functionality in dev mode

- In dev environment, mail functionality does not work on the iPhone simulator. Mail is not installed on there. Will have to use real phone to test out mail functionality.

#### Testing

I've only tested in iOS so far. Not sure if it works on Android yet.
