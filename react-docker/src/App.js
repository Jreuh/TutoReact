import "./App.css";
import "./Components/Header/header.css";
import { useState, useEffect } from "react";
import PokemonList from "./Components/PokemonList/PokemonList";
import axios from "axios";
import Pagination from "./Components/Pagination/Pagination";

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [currentPageURl, SetcurrentPageUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon/"
  );
  const [nextPageUrl, setNextPageUrl] = useState();
  const [previousPageURl, setpreviousPageUrl] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    let cancel;
    axios
      .get(currentPageURl, {
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      })
      .then((res) => {
        setLoading(false);
        setNextPageUrl(res.data.next);
        setpreviousPageUrl(res.data.previous);
        setPokemon(res.data.results.map((p) => p.name));
      });
    return () => cancel();
  }, [currentPageURl]);
  function goToNextPage() {
    SetcurrentPageUrl(nextPageUrl);
  }
  function goToPreviousPageUrl() {
    SetcurrentPageUrl(previousPageURl);
  }
  if (loading) return "Loading...";
  return (
    <>
      <PokemonList pokemon={pokemon} />
      <Pagination
        goToNextPage={nextPageUrl ? goToNextPage : null}
        goToPreviousPageUrl={previousPageURl ? goToPreviousPageUrl : null}
      />
    </>
  );
}

export default App;
