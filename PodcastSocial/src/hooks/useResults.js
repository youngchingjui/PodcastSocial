import { useEffect, useState } from "react";
import itunes from "../api/itunes";
import listenNotes from "../api/listennotes";

export default () => {
  const [results, setResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const searchApi = async searchTerm => {
    try {
      const response = await listenNotes.get("/search", {
        params: {
          q: searchTerm,
          type: "podcast"
        }
      });
      setResults(response.data.results);
    } catch (err) {
      setErrorMessage(`Something went wrong: ${err}`);
    }
  };

  useEffect(() => {
    searchApi("finance");
  }, []);

  return [searchApi, results, errorMessage];
};
