import React from "react";
import { AsyncStorage } from "react-native";
import { Auth } from "aws-amplify";
import { Authenticator } from "aws-amplify-react-native";

const AuthenticatorScreen = ({ navigation }) => {
  const checkAuth = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      // await AsyncStorage.setItem("userToken", JSON.stringify(user));
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Authenticator
      onStateChange={authState => {
        // checkAuth();
        if (authState == "signedIn") {
          navigation.navigate("MyPlaylist");
        } else if (authState == "signIn") {
          console.log("User needs to sign in.");
        } else {
          console.warn(
            "Something strange happened with signing in within AuthenticatorScreen"
          );
        }
      }}
    />
  );
};

export default AuthenticatorScreen;
