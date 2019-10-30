import axios from "axios";
import getEnvVars from "../../environment";
const { AIRTABLE_API_KEY } = getEnvVars();

export default axios.create({
  baseURL: "https://api.airtable.com/v0/appCtM7xGsHSgEjki/",
  headers: {
    Authorization: `Bearer ${AIRTABLE_API_KEY}`,
    "Content-Type": "application/json"
  }
});
