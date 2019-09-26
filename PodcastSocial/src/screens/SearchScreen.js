import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  FlatList,
  TouchableOpacity
} from "react-native";
import PurpleBackdrop from "../components/PurpleBackdrop";
import ScreenTitle from "../components/ScreenTitle";
import useResults from "../hooks/useResults";
import SearchResultDetail from "../components/SearchResultDetail";
import SearchBar from "../components/SearchBar";
import { Context as PlaylistContext } from "../context/PlaylistContext";

const SearchScreen = ({ navigation }) => {
  const [term, setTerm] = useState("");
  const [searchApi, results, errorMessage] = useResults();
  const { state, getSubscriptions } = useContext(PlaylistContext);

  useEffect(() => {
    getSubscriptions();
  }, []);

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
              <TouchableOpacity
                onPress={() => {
                  console.log("Pressed for podcast channel");
                  navigation.navigate("PodcastChannel", {
                    podcast_channel: item
                  });
                }}
              >
                <SearchResultDetail podcast_channel={item} />
              </TouchableOpacity>
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
