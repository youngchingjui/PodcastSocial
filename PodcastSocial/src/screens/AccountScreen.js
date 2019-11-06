import React from "react";
import { StyleSheet, View, Text, Button } from "react-native";

import { Auth } from "aws-amplify";

const AccountScreen = ({ navigation }) => {
  const signOut = async () => {
    console.log("Pushed sign out button");
    await Auth.signOut();
    navigation.navigate("Loading");
  };

  return (
    <View style={styles.root}>
      <Text style={styles.title}>My Account</Text>
      <Button onPress={signOut} title="Sign out"></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "white"
  },
  title: {
    marginTop: 30,
    fontSize: 30,
    fontWeight: "bold"
  }
});

export default AccountScreen;
