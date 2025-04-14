import { useMemo, useState } from "preact/hooks";

/**
 * Number of bytes after decompression.
 */
const TOTAL_BYTES = 396484354;
const dictionaries = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  "0",
].map((letter) => `/data/defs-${letter}.jsonl.br`);

const files = [...dictionaries];

export default function Install({}) {
  const [status, setStatus] = useState("ready");
  const [percent, setPercent] = useState(0);
  const [currentFile, setCurrentFile] = useState("");

  const startDownload = useMemo(
    () =>
      async function startDownload(e) {
        e.preventDefault();
        setStatus("installing");
        let receivedBytes = 0;
        for (const file of files) {
          setCurrentFile(file);
          const response = await fetch(file);
          const reader = response.body.getReader();
          await new Promise((resolve, reject) => {
            // Function to handle the stream
            function readStream() {
              reader
                .read()
                .then(({ done, value }) => {
                  if (done) {
                    resolve();
                    return;
                  }
                  receivedBytes += value.length;
                  setPercent((receivedBytes / TOTAL_BYTES) * 100);
                  // Continue reading
                  readStream();
                })
                .catch((error) => {
                  reject(error);
                });
            }

            // Start streaming
            readStream();
          });
        }

        console.log({ receivedBytes });
        setStatus("installed");
      },
    []
  );

  if (status === "installed") {
    return (
      <article key="installed" class="interface fadein">
        <h1>Installed</h1>
        <p>You can now use this app offline.</p>
        <div class="search-form">
          <button onClick={() => (window.location = "/")}>Continue</button>
        </div>
      </article>
    );
  }

  if (status === "installing") {
    return (
      <article key="installing" class="interface fadein">
        <h1>Installing</h1>
        <progress max="100" value={percent} style="width:100%" />
        <p>Downloading {currentFile}</p>
      </article>
    );
  }

  return (
    <article key="ready" class="interface fadein">
      <h1>Install dictionaries</h1>
      <p>
        This process will download all the dictionary files to your device for
        offline use. This will take about 85 megabytes.
      </p>
      <div class="search-form">
        <button onClick={startDownload}>Install</button>
        <button class="btn-subtle" onClick={() => (window.location = "/")}>
          Cancel
        </button>
      </div>
    </article>
  );
}
