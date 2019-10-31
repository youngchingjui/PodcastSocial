import createDataContext from "./createDataContext";

import localServer from "../api/localServer";

import { parseString } from "react-native-xml2js";

const playlistReducer = (state, action) => {
  switch (action.type) {
    case "getSubscriptions":
      return { ...state, subscriptions: action.payload };
    case "addSubscription":
      var subscriptions = [...state.subscriptions, action.payload];
      return { ...state, subscriptions };
    case "updateUpNextList":
      return { ...state, upNextList: action.payload };
    default:
      return state;
  }
};

const getSubscriptions = dispatch => {
  return async () => {
    const response = await localServer.get("/subscriptions");
    dispatch({ type: "getSubscriptions", payload: response.data });
  };
};

const addSubscription = dispatch => {
  return async subscription => {
    console.log("Adding subscription");
    const response = await localServer.post("/subscriptions", subscription);
    console.log(response);
    dispatch({ type: "addSubscription", payload: response.data });
  };
};

const removeSubscription = dispatch => {
  return async id => {
    console.log("Removing subscription");
    await localServer.delete(`/subscriptions/${id}`);
    const response = await localServer.get("/subscriptions");
    dispatch({ type: "getSubscriptions", payload: response.data });
  };
};

const loadUpNextList = dispatch => {
  console.log("Loading upNext List");
  return async () => {
    const upNext = await localServer.get("/upNext");
    dispatch({ type: "updateUpNextList", payload: upNext.data });
  };
};

const updateUpNextList = dispatch => {
  console.log("Updating upNext List");
  return async () => {
    try {
      const subscriptions = await localServer.get("/subscriptions");
      console.log(subscriptions);

      var allPodcastEpisodes = [];
      for (var channel of subscriptions.data) {
        const response = await fetch(channel.feedUrl);
        const text = await response.text();

        var results;
        parseString(text, (err, result) => {
          console.log(result);
          results = result.rss.channel[0];
          const { item, ...channelData } = results;
          for (var i of item.slice(0, 3)) {
            allPodcastEpisodes.push({ ...channelData, ...i });
          }
        });
        // Sort podcast episodes in reverse chronological order
      }
      allPodcastEpisodes.sort((a, b) =>
        new Date(a.pubDate[0]) > new Date(b.pubDate[0]) ? 1 : -1
      );
      console.log(allPodcastEpisodes);
    } catch (err) {
      console.log("Error in getting recent podcasts");
      console.log(err.message);
    }
    try {
      const response = await localServer.post(
        "/upNext",
        allPodcastEpisodes.slice(0, 10)
      );
      console.log("here's the response");
      console.log(response);
      dispatch({
        type: "updateUpNextList",
        payload: allPodcastEpisodes.slice(0, 10)
      });
    } catch (err) {
      console.log("Error in updating upNext list");
      console.log(err.message);
    }
  };
};

export const initialState = { upNextList: null, subscriptions: [] };

export const { Context, Provider } = createDataContext(
  playlistReducer,
  {
    getSubscriptions,
    addSubscription,
    removeSubscription,
    loadUpNextList,
    updateUpNextList
  },
  initialState
);
