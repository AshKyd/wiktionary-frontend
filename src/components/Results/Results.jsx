import { useEffect, useState } from "preact/hooks";
import { search } from "../../getResults";
import { Word } from "../Word";
import { Search } from "../Search/Search";

export function Results({ query }) {
  const [results, setResults] = useState(null);
  useEffect(() => {
    search(query).then(setResults);
  }, [query]);

  if (results && results.length) {
    return results.map((result) => <Word data={result} />);
  }
  if (results && !results.length) {
    return (
      <>
        {" "}
        <h1>No results found</h1>
        <Search value={query} />
      </>
    );
  }
  return null;
}
