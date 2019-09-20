import React, { useState } from "react";
import { StyleSheet, View, ScrollView, FlatList } from "react-native";
import PurpleBackdrop from "../components/PurpleBackdrop";
import ScreenTitle from "../components/ScreenTitle";
import useResults from "../hooks/useResults";
import SearchResultDetail from "../components/SearchResultDetail";
import SearchBar from "../components/SearchBar";

const SearchScreen = () => {
  const [term, setTerm] = useState("");
  const [searchApi, results, errorMessage] = useResults();

  return (
    <View style={styles.root}>
      <PurpleBackdrop />
      <ScreenTitle title="Discover" />
      <View style={styles.searchBar}>
        <SearchBar
          term={term}
          setTerm={setTerm}
          onEndEditing={() => {
            searchApi(term);
          }}
          errorMessage={errorMessage}
        />
      </View>
      <ScrollView style={styles.scrollView}>
        <FlatList
          data={results}
          keyExtractor={result => `${result.collectionId}`}
          renderItem={({ item }) => {
            return (
              <View>
                <SearchResultDetail
                  artistName={item.artistName}
                  collectionName={item.collectionName}
                  imageUrl={item.artworkUrl100}
                />
              </View>
            );
          }}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1
  },
  iconStyle: {
    fontSize: 35,
    alignSelf: "center",
    marginHorizontal: 15,
    color: "red"
  },
  searchBar: {
    top: 88,
    left: 28,
    width: 333
  },
  scrollView: {
    top: 120,
    backgroundColor: "white"
  }
});

export default SearchScreen;
