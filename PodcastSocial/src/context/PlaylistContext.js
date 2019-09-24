import createDataContext from "./createDataContext";
import localServer from "../api/localServer";

const playlistReducer = (state, action) => {
  switch (action.type) {
    case "getSubscriptions":
      console.log("Getting context");
      return action.payload;
    case "addSubscription":
      console.log("Adding subscription");
      return [...state, action.payload];
    case "removeSubscription":
      console.log("Removing subscription");
      return state.filter(subscription => subscription.id != action.payload);
    default:
      return state;
  }
};

const getSubscriptions = dispatch => {
  return async () => {
    const response = await localServer.get("/playlists");
    dispatch({ type: "getSubscriptions", payload: response.data });
  };
};

const addSubscription = dispatch => {
  return async subscription => {
    console.log("Adding subscription");
    const response = await localServer.post("/playlists", subscription);
    console.log(response);
    dispatch({ type: "addSubscription", payload: subscription });
  };
};

const removeSubscription = dispatch => {
  return async id => {
    console.log("Removing subscription");
    console.log(id);
    const response = await localServer.delete(`/playlists/${id}`);
    console.log(response);
    dispatch({ type: "removeSubscription", payload: id });
  };
};

export const initialState = [];

export const { Context, Provider } = createDataContext(
  playlistReducer,
  {
    getSubscriptions,
    addSubscription,
    removeSubscription
  },
  initialState
);
