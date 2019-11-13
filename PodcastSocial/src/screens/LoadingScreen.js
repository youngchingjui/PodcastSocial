import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  AsyncStorage
} from "react-native";

import { AppLoading } from "expo";
import { Asset } from "expo-asset";

const LoadingScreen = ({ navigation }) => {
  const { isReady, setIsReady } = useState(false);
  const checkAuth = async () => {
    const userToken = await AsyncStorage.getItem("userToken");
    console.log("userToken: " + userToken);
    navigation.navigate(userToken ? "mainTabFlow" : "Authentication");
  };
  useEffect(() => {
    checkAuth();
  }, []);

  const _cacheResourceAsync = async () => {
    const images = [require("../../assets/Logo.png")];
    const cacheImages = images.map(image => {
      return Asset.fromModule(image).downloadAsync();
    });
    return Promise.all(cacheImages);
  };

  if (!isReady) {
    return (
      <AppLoading
        startAsync={_cacheResourceAsync}
        onFinish={() => setIsReady(true)}
        onError={console.warn}
      />
    );
  }
  return (
    <View style={styles.root}>
      <Text style={styles.title}>Welcome to Social Podcast</Text>
      <Image source={require("../../assets/Logo.png")} />
      <ActivityIndicator size="large" />
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

export default LoadingScreen;
