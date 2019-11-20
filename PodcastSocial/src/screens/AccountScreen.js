import React from "react";
import { StyleSheet, View, Text, Button } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";

// import { Auth } from "aws-amplify";
import Auth from "@aws-amplify/auth";

import ScreenTitle from "../components/ScreenTitle";
import PurpleBackdrop from "../components/PurpleBackdrop";

const AccountScreen = ({ navigation }) => {
  const signOut = async () => {
    console.log("Pushed sign out button");
    await Auth.signOut();
    navigation.navigate("Loading");
  };

  return (
    <View style={styles.root}>
      <PurpleBackdrop />
      <ScreenTitle title="My Account" />
      <Button onPress={signOut} title="Sign out" color="black"></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "white"
  }
});

AccountScreen.navigationOptions = {
  title: "Account",
  tabBarIcon: <MaterialCommunityIcons name="account" size={25} />
};

export default AccountScreen;
