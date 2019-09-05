import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const SearchBar = ({ term, setTerm, onEndEditing, errorMessage }) => {
  return (
    <View style={styles.root}>
      <AntDesign name="search1" size={24} color="#866DCC" />
      <TextInput
        placeholder="Search podcast channels"
        style={styles.inputStyle}
        value={term}
        onChangeText={setTerm}
        autoCapitalize="none"
        autoCorrect={false}
        onEndEditing={onEndEditing}
      />
      {errorMessage ? (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 6,
    height: 36,
    alignItems: "center",
    padding: 4
  },
  inputStyle: { left: 5 },
  errorMessage: {
    top: 100,
    left: 28
  }
});

export default SearchBar;
