# PodcastSocial

### Folder structure

Currently have 3 main folders - my main Social Podcast project is in the `PodcastSocial` folder
The other 2 folders, `jsonserver` and `RecordAndEmail` we can now ignore
For background, `jsonserver` was used to just test APIs locally. But now I've migrated to
`RecordandEmail` is now used as a playground of sorts.

#### App structure

- PodcastSocial: Where my main React Native app resides:
  - .expo: Not sure what to do with this folder? So many duplicate files...
  - .expo-shared: Also not sure what this is?
  - .git: Not sure why this is here?
  - .vscode: This probably
  - amplify: All files related to AWS Amplify
  - assets: All assets, such as logos, fonts, etc.
  - src: all main .js files for app:
    - api: for all api-related services
    - components: All reusable components
    - context: where we manage all of the state and data models. Context is provided globally through the app
    - hooks: a hook? TODO: Not too sure how to use this folder
    - screens: all main screens
  - NavigationService.js: Navigation hook. TODO: Move to `hooks` folder
  - ReactotronConfig.js: Some debugging tool that I uninstalled. TODO: Get rid of this.
- jsonserver: I used to use this folder to test APIs locally. Now, I've migrated to AsyncStorage and amplify APIs, so this folder is no longer needed. TODO: Delete this folder.
- RecordAndEmail: Built quickly to test out a bug. Now, it's mainly used as a playground.
- Screenshots: Folder to store screenshots of app to load to App Store
- Sketch Files: Design files.
- Sketch to Code: React Native files converted from Sketch. No longer used. TODO: delete
- react-native: Another old project. TODO: delete

#### environment.js

All environment variables are saved here.
Required API keys:

- Airtable: https://airtable.com
- ListenNotes: https://www.listennotes.com

TODO: App might crash if keys not available?

### To build and upload to App Store Connect

Steps to remind myself how to do this.

- Update the build number and version number in `app.json`
- Run start (`expo start`)
- In second terminal, run `expo build:ios`
- After done building, download .ipa file
- Upload the .ipa file through Transporter

### Other notes (to self)

- In dev environment, mail functionality does not work on the iPhone simulator. Mail is not installed on there. Will have to use real phone to test out mail functionality.
