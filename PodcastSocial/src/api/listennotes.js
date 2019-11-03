import axios from "axios";
import getEnvVars from "../../environment";
const { LISTEN_NOTES_API_KEY } = getEnvVars();

export default axios.create({
  baseURL: "https://listen-api.listennotes.com/api/v2",
  headers: { "X-ListenAPI-Key": LISTEN_NOTES_API_KEY }
});
