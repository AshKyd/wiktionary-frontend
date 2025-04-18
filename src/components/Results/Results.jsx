import { useEffect, useState } from "preact/hooks";
import { search } from "../../getResults";
import { Word } from "../Word";
import { Search } from "../Search/Search";
import Footer from "../Footer/Footer";

export function Results({ query }) {
  const [results, setResults] = useState(null);
  const [receivedBytes, setReceivedBytes] = useState(0);
  useEffect(() => {
    search(query, {
      onProgress: ({ receivedBytes }) => setReceivedBytes(receivedBytes),
    }).then(setResults);
  }, [query]);

  if (!results) {
    return (
      <div class="loading fadein" key="loading">
        <p>Loading dictionary file</p>
        <p>
          <code>{receivedBytes}</code>
        </p>
      </div>
    );
  }

  if (results && results.matches.length) {
    return (
      <>
        <div class="results fadein">
          {results.matches.map((result) => (
            <Word data={result} />
          ))}
        </div>
        <Footer edit={query} />
      </>
    );
  }

  if (results && results.similarWords.length) {
    return (
      <>
        <div class="results fadein">
          <h1>Found similar words</h1>
          <ul>
            {results.similarWords.slice(0, 10).map((word) => (
              <li>
                <a href={`?q=${encodeURIComponent(word)}`}>{word}</a>
              </li>
            ))}
          </ul>
          <hr />
          <Search value={query} />
          <Footer />
        </div>
      </>
    );
  }

  if (results && !results.length) {
    return (
      <div class="results-404 fadein">
        {" "}
        <h1>No results found</h1>
        <Search value={query} />
      </div>
    );
  }
  return null;
}
