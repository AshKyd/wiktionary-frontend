import { useEffect } from "preact/hooks";

export function Search({ value = "" }) {
  useEffect(() => {
    document.querySelector("input")?.focus();
  }, []);
  return (
    <>
      <form class="search-form">
        <label for="q">Find word:</label>
        <input id="q" name="q" type="text" value={value} />
        <button type="submit">Search</button>
      </form>
    </>
  );
}
