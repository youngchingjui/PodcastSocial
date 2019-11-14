import createDataContext from "./createDataContext";

import { AsyncStorage } from "react-native";

import listenNotes from "../api/listennotes";

const playlistReducer = (state, action) => {
  switch (action.type) {
    case "getSubscriptions":
      return { ...state, subscriptions: action.payload };
    case "updateSubscriptions":
      return { ...state, subscriptions: action.payload };
    case "updateUpNextList":
      return { ...state, upNextList: action.payload };
    case "loadPlaylistState":
      return {
        ...state,
        subscriptions: action.payload.subscriptions,
        upNext: action.payload.upNext
      };
    default:
      return state;
  }
};

const getSubscriptions = dispatch => {
  return async () => {
    console.log("Getting subscriptions");
    try {
      const subscriptions = await AsyncStorage.getItem("subscriptions");
      if (subscriptions !== null) {
        dispatch({
          type: "getSubscriptions",
          payload: JSON.parse(subscriptions)
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
};

const updateSubscriptions = dispatch => {
  return async (subscription, subscriptions, action) => {
    if (!subscriptions) {
      subscriptions = new Array();
    }
    if (action == "add") {
      console.log("Adding subscription");
      subscriptions.push(subscription);
      try {
        await AsyncStorage.setItem(
          "subscriptions",
          JSON.stringify(subscriptions)
        );
        dispatch({ type: "updateSubscriptions", payload: subscriptions });
      } catch (err) {
        console.log(err);
      }
    } else if (action == "remove") {
      console.log("Removing subscription");
      subscriptions = subscriptions.filter(
        pod => pod.collectionId !== subscription.collectionId
      );
      try {
        await AsyncStorage.setItem(
          "subscriptions",
          JSON.stringify(subscriptions)
        );
        dispatch({ type: "updateSubscriptions", payload: subscriptions });
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log(
        "Error with updating subscriptions. Did not provide correct action. Provide either add or remove"
      );
    }
  };
};

const loadUpNextList = dispatch => {
  console.log("Loading upNext List");
  return async () => {
    try {
      const upNext = await AsyncStorage.getItem("upNext");
      dispatch({ type: "updateUpNextList", payload: JSON.parse(upNext) });
    } catch (err) {
      console.log(err);
    }
  };
};

const updateUpNextList = dispatch => {
  console.log("Updating upNext List");
  return async subscriptions => {
    var allPodcastEpisodes = [];
    if (!subscriptions) {
      subscriptions = new Array();
    }
    if (subscriptions.length > 1) {
      for (var subscription of subscriptions) {
        try {
          const response = await listenNotes.get(`podcasts/${subscription.id}`);
          const { episodes, ...podcast } = response.data;
          for (const episode of episodes.slice(0, 3)) {
            allPodcastEpisodes.push({ ...episode, podcast });
          }
        } catch (err) {
          console.log("Error in getting recent podcasts");
          console.log(err.message);
        }
      }
      allPodcastEpisodes = allPodcastEpisodes.sort((a, b) =>
        new Date(a.pub_date_ms[0]) > new Date(b.pub_date_ms[0]) ? 1 : -1
      );
      await AsyncStorage.setItem(
        "upNext",
        JSON.stringify(allPodcastEpisodes.slice(0, 10))
      );
      dispatch({
        type: "updateUpNextList",
        payload: allPodcastEpisodes.slice(0, 10)
      });
    } else {
      console.log("No subscriptions");
    }
  };
};

const loadPlaylistState = dispatch => async () => {
  console.log("Updating Playlist State");

  // As we add more variables stored on local storage, add them here.
  const sub = await AsyncStorage.getItem("subscriptions");
  const subscriptions = JSON.parse(sub);

  const upn = await AsyncStorage.getItem("upNext");
  const upNext = JSON.parse(upn);

  dispatch({ type: "loadPlaylistState", payload: { subscriptions, upNext } });
};

export const initialState = { upNextList: null, subscriptions: [] };

export const { Context, Provider } = createDataContext(
  playlistReducer,
  {
    getSubscriptions,
    updateSubscriptions,
    loadUpNextList,
    updateUpNextList,
    loadPlaylistState
  },
  initialState
);
