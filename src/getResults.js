import soundex from "soundex";
import { levenshteinEditDistance } from "levenshtein-edit-distance";

async function getLineStream(url, { onLine, onProgress }) {
  const controller = new AbortController();
  const signal = controller.signal;
  const response = await fetch(url, {
    cache: "force-cache",
    signal,
  });
  const totalBytes = Number(response.headers.get("content-length"));
  let receivedBytes = 0;
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  return new Promise((resolve, reject) => {
    // Function to handle the stream
    function readStream() {
      reader
        .read()
        .then(({ done, value }) => {
          if (done) {
            resolve();
            return;
          }
          if (onProgress) {
            receivedBytes += value.length;
            onProgress({
              totalBytes,
              receivedBytes,
            });
          }

          // Decode the chunk into a string and append it to the buffer
          buffer += decoder.decode(value, { stream: true });

          // Split the buffer by newlines and log the words
          let words = buffer.split("\n");
          for (let i = 0; i < words.length - 1; i++) {
            const thisLine = words[i];
            onLine(thisLine, (arg) => {
              reader.cancel();
              controller.abort();
              resolve(arg);
            });
          }

          // Keep the leftover part in the buffer for the next read
          buffer = words[words.length - 1];

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

export async function search(inputWord, { onProgress }) {
  const word = inputWord.toLowerCase();
  let index = word.slice(0, 1);
  if (!index.match(/[a-z]/)) {
    index = 0;
  }
  const filename = `/data/defs-${index}.jsonl.br`;
  const matches = [];
  const words = [];

  function onLine(line) {
    const [thisWord, hyphenation, pos, etymologyText, encodedSenses] =
      JSON.parse(line);
    words.push(thisWord);
    if (word === thisWord.toLowerCase()) {
      const senses = encodedSenses.map(([tags, glosses, examples]) => ({
        tags,
        glosses,
        examples,
      }));
      matches.push({ word: thisWord, hyphenation, pos, etymologyText, senses });
    }
  }

  await getLineStream(filename, { onLine, onProgress });

  if (matches.length) {
    return { matches, similarWords: [] };
  }

  const inputSoundex = soundex(word, true);
  const similarWordsWorking = [];
  words.forEach((thisWord) => {
    const levenshteinDiff = levenshteinEditDistance(word, thisWord, true);
    if (soundex(thisWord, true) === inputSoundex) {
      similarWordsWorking.push({ thisWord, levenshteinDiff });
    }
    if (levenshteinDiff <= 2) {
      similarWordsWorking.push({ thisWord, levenshteinDiff });
    }
  });
  const similarWords = Array.from(
    new Set(
      similarWordsWorking
        .sort((a, b) => a.levenshteinDiff - b.levenshteinDiff)
        .map(({ thisWord }) => thisWord)
    )
  );

  return {
    matches,
    similarWords,
  };
}
