import { render } from "preact";

import "./style.css";
import { Search } from "./components/Search/Search";
import { Results } from "./components/Results/Results";
import Footer from "./components/Footer/Footer";
import { useEffect } from "preact/hooks";

function App() {
  const query = new URLSearchParams(window.location.search).get("q");

  useEffect(() => {
    document.title = query ? `${query} - Dictionary` : "Dictionary";
  });

  if (!query) {
    return <Search />;
  }

  return <Results query={query} />;
}

function Page() {
  return (
    <>
      <App />
      <Footer />
    </>
  );
}

render(<Page />, document.getElementById("app"));
