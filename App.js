/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component, Fragment } from 'react';
import {
  Button,
  Text,
  TextInput,
  View,
  ScrollView,
  TouchableOpacity,
  Image
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { DOMParser } from 'xmldom'
import SoundPlayer from 'react-native-sound-player'

export default class App extends Component {
  state = {
    terms: undefined,
    podcast: undefined,
    podcastDocument: undefined,
    podcasts: undefined,
    subscriptions: [],
    tab: "search",
    isPaused: false,
  }

  // Runs when the app first launches
  async componentDidMount() {
    const subscriptions = await AsyncStorage.getItem("subscriptions")

    const parsed = subscriptions ? JSON.parse(subscriptions) : []
    this.setState({
      subscriptions: parsed,
      tab: parsed.length > 0 ? "listen" : "search",
    })
  }

  onChangeTerms = e => {
    this.setState({ terms: e.nativeEvent.text })
  }

  onPressSearch = async () => {
    const { terms } = this.state
    const uri = `https://itunes.apple.com/search?media=podcast&term=${terms}`
    const result = await fetch(uri)
    const json = await result.json()
    this.setState({ podcasts: json.results, })
  }

  onPressSearchPodcast = async podcast => {
    const { subscriptions: previous } = this.state

    const subscriptions = [...previous, podcast]

    this.setState({ subscriptions, })

    await AsyncStorage.setItem(
      "subscriptions",
      JSON.stringify(subscriptions),
    )
  }
  renderSearchPodcasts = () => {
    const { podcasts, subscriptions } = this.state

    if (podcasts === undefined) {
      return null
    }

    if (podcasts.length < 1) {
      return (
        <View>
          <Text>There are no podcasts matching these terms</Text>
        </View>
      )
    }

    const subscriptionIds = subscriptions.length ? subscriptions.map(podcast => podcast.collectionId) : []
    console.log(podcasts)

    return (
      <ScrollView style={{ flexGrow: 0, width: "100%", height: "50%", }}>
        {podcasts.map(podcast =>
          this.renderSearchPodcast(
            podcast, subscriptionIds.includes(
              (podcast.collectionId ? podcast.collectionId : "")),
          ),
        )}
      </ScrollView>
    )
  }

  renderSearchPodcast = (podcast, isSubscribed) => {
    if (podcast) {
      return (
        <TouchableOpacity key={podcast.collectionId} onPress={() => {
          if (isSubscribed) {
            return
          }

          this.onPressSearchPodcast(podcast)
        }}
        >
          <View style={{
            paddintTop: 10,
            paddingBottom: 10,
          }}
          >
            <Text style={{
              color: isSubscribed ? "#e0e0e0" : "#007afb",
              fontSize: 18,
            }}
            >
              {podcast.collectionName}
            </Text>
          </View>
        </TouchableOpacity>
      )
    } else {
      return (
        <View>
          <Text>Could not provide renderSearchPodcast</Text>
        </View>
      )
    }
  }

  render() {
    const { tab } = this.state

    if (tab === "search") {
      return this.renderSearch()
    }

    return this.renderListen()
  }

  renderSearch() {
    return (
      <View style={{
        width: "100%",
        height: "100%",
        justifyContent: "center",
        padding: 25,
      }}
      >
        {this.renderTabs()}
        <TextInput style={{ width: "100%", borderColor: "#e0e0e0", borderWidth: 1, borderRadius: 4, padding: 10, }} onChange={this.onChangeTerms} />
        <Button title="Search" onPress={this.onPressSearch} />
        {this.renderSearchPodcasts()}
      </View>
    );
  }

  renderTabs = () => {
    const { tab } = this.state

    return (
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <TouchableOpacity
          onPress={() => this.setState({
            tab: "search"
          })}
        >
          <View style={{
            paddintTop: 10,
            paddingBottom: 10,
          }}
          >
            <Text style={{
              color: tab === "search" ? "#e0e0e0" : "#007afb",
              fontSize: 18,
              fontWeight: "bold",
            }}
            >
              Search
              </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.setState({
            tab: "listen"
          })}
        >
          <View style={{
            paddingTop: 10,
            paddingBottom: 10,
          }}
          >
            <Text style={{
              color: tab === "listen" ? "#e0e0e0" : "#007afb",
              fontSize: 18,
              fontWeight: "bold",
            }}
            >
              Listen
                </Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  renderListen = () => {
    const { subscriptions, podcast } = this.state

    return (
      <View style={{
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        padding: 25,
      }}
      >
        {this.renderTabs()}
        <ScrollView style={{
          flexGrow: 0,
          width: "100%",
          height: "50%",
        }}
        >
          {podcast ? this.renderPodcastTracks()
            : subscriptions.map(podcast =>
              this.renderlistenPodcast(podcast),
            )}
        </ScrollView>
        {this.renderButtons()}
      </View>
    )
  }

  renderlistenPodcast = podcast => {
    return (
      <TouchableOpacity key={podcast.collectionId}
        onPress={() => this.onPressListenPodcast(podcast)}
      >
        <View style={{
          width: "100%",
          height: 200,
        }}
        >
          <Image style={{
            width: "100%",
            height: "100%",
          }}
            resizeMode="cover"
            source={{
              uri: podcast.artworkUrl600,
            }}
          />
        </View>
      </TouchableOpacity>
    )
  }

  onPressListenPodcast = async podcast => {
    const result = await fetch(podcast.feedUrl)
    const text = await result.text()

    const podcastDocument = new DOMParser().parseFromString(
      text,
      "text/xml",
    )

    this.setState({ podcast, podcastDocument })
  }

  renderPodcastTracks = () => {
    const { podcast, podcastDocument } = this.state

    const items = podcastDocument.getElementsByTagName("item")

    return (
      <View>
        <View style={{
          width: "100%",
          height: 100,
        }}
        >
          <Image style={{
            width: "100%",
            height: "100%",
          }}
            resizeMode="cover"
            source={{
              uri: podcast.artworkUrl600,
            }}
          />
        </View>
        {Array.prototype.slice.call(items).map(this.renderPodcastTrack)}
      </View>
    )
  }

  renderPodcastTrack = track => {
    const guid = Array.prototype.slice.call(
      track.getElementsByTagName("guid"),
    )

    const titles = Array.prototype.slice.call(
      track.getElementsByTagName("title")
    )

    return (
      <TouchableOpacity
        key={guid[0].childNodes[0].nodeValue}
        onPress={() => this.onPressPodcastTrack(track)}
      >
        <View style={{
          paddingTop: 10,
          paddingBottom: 10,
        }}
        >
          <Text style={{
            color: "#007afb",
            fontSize: 18,
          }}
          >
            {titles[0].childNodes[0].nodeValue}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }

  onPressPodcastTrack = async track => {

    const enclosures = Array.prototype.slice.call(
      track.getElementsByTagName("enclosure"),
    )

    SoundPlayer.onFinishedLoading(() => {
      console.log("Finished loading track")
    })

    SoundPlayer.playUrl(enclosures[0].getAttribute("url"))

    this.setState({
      isPaused: false,
      track,
    })
  }

  onPressPausePodcastTrack = () => {
    SoundPlayer.pause()

    this.setState({
      isPaused: true,
    })
  }

  onPressResumePodcastTrack = () => {
    SoundPlayer.resume()

    this.setState({
      isPaused: false,
    })
  }

  onPressStopPodcastTrack = () => {
    SoundPlayer.stop()
    SoundPlayer.unmount()

    this.setState({
      track: undefined,
    })
  }

  onPressBackToPodcasts = () => {
    this.setState({
      podcast: undefined,
      podcastDocument: undefined,
    })
  }

  renderButtons = () => {
    const { podcast, track, isPaused } = this.state
    const styles = {
      view: {
        paddingTop: 10,
        paddingBottom: 10,
      },
      text: {
        color: "#007afb",
        fontSize: 18,
      },
    }

    if (!podcast) {
      return null
    }

    if (!track) {
      return (
        <TouchableOpacity onPress={this.onPressBackToPodcasts}
        >
          <View style={styles.view}>
            <Text style={styles.text}>Back</Text>
          </View>
        </TouchableOpacity>
      )
    }

    return (
      <Fragment>
        <TouchableOpacity onPress={this.onPressStopPodcastTrack}
        >
          <View style={styles.view}>
            <Text style={styles.text}>Stop</Text>
          </View>
        </TouchableOpacity>
        {isPaused ? (
          <TouchableOpacity onPress={this.onPressResumePodcastTrack}
          >
            <View style={styles.view}>
              <Text style={styles.text}>Resume</Text>
            </View>
          </TouchableOpacity>
        ) : (
            <TouchableOpacity onPress={this.onPressPausePodcastTrack}
            >
              <View style={styles.view}>
                <Text style={styles.text}>Pause</Text>
              </View>
            </TouchableOpacity>
          )}
      </Fragment>
    )
  }
}