import { useEffect, useState } from "react";
import itunes from "../api/itunes";

export default () => {
  const [results, setResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const searchApi = async searchTerm => {
    try {
      const response = await itunes.get("/search", {
        params: {
          media: "podcast",
          term: searchTerm
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
