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
      </p>

      <ul class="footer-links">
        {edit && (
          <li>
            {" "}
            <a
              href={`https://en.wiktionary.org/wiki/${encodeURIComponent(
                edit
              )}`}
            >
              Edit {edit}
            </a>
          </li>
        )}{" "}
        <li>
          <a href="/">Search again</a>
        </li>
        <li>
          <a href="https://ash.ms/">Source</a>
        </li>
        <li>
          <a href="?p=install">Install</a>
        </li>
      </ul>
    </footer>
  );
}
