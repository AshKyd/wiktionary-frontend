import { useEffect, useState } from "preact/hooks";

export function Search({ value = "" }) {
  return (
    <form>
      <fieldset>
        <legend>Look up word</legend>
        <label>
          Find: <input name="q" type="text" value={value} />
        </label>
        <button type="submit">Search</button>
      </fieldset>
    </form>
  );
}
