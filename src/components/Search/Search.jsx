import { useEffect, useState } from "preact/hooks";
import Footer from "../Footer/Footer";

export function Search({ value = "" }) {
  return (
    <>
      <form class="search-form">
        <label for="q">Find:</label>
        <input id="q" name="q" type="text" value={value} />
        <button type="submit">Search</button>
      </form>

      <Footer />
    </>
  );
}
