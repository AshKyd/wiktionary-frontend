export default function Footer({ edit = null }) {
  return (
    <footer>
      <p>
        Definitions from <a href="https://en.wiktionary.org/">Wiktionary</a> are
        available under the{" "}
        <a rel="nofollow" href="//creativecommons.org/licenses/by-sa/4.0/">
          Creative Commons Attribution-ShareAlike License
        </a>
        .
        {edit && (
          <>
            {" "}
            <a
              href={`https://en.wiktionary.org/wiki/${encodeURIComponent(
                edit
              )}`}
            >
              Edit {edit}
            </a>
            .
          </>
        )}
      </p>
    </footer>
  );
}
