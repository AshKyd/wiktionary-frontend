import { render } from "preact";

import "./style.css";
import { Search } from "./components/Search/Search";
import { Results } from "./components/Results/Results";
import { useEffect } from "preact/hooks";
import Install from "./components/Install/Install";

function App() {
  const query = new URLSearchParams(window.location.search).get("q");
  const page = new URLSearchParams(window.location.search).get("p");

  useEffect(() => {
    document.title = query ? `${query} - Dictionary` : "Dictionary";
  });

  if (page === "install") {
    return <Install />;
  }

  if (!query) {
    return <Search />;
  }

  return <Results query={query} />;
}

render(<App />, document.getElementById("app"));

const registerServiceWorker = async () => {
  if ("serviceWorker" in navigator) {
    try {
      const registration = await navigator.serviceWorker.register("/sw.js", {
        scope: "/",
      });
      if (registration.installing) {
        console.log("Service worker installing");
      } else if (registration.waiting) {
        console.log("Service worker installed");
      } else if (registration.active) {
        console.log("Service worker active");
      }
    } catch (error) {
      console.error(`Registration failed with ${error}`);
    }
  }
};

// …

registerServiceWorker();
