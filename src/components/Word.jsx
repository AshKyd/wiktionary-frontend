export function Word({ data }) {
  const { word, hyphenation, pos, etymologyText, senses } = data;
  return (
    <article class="word">
      <h1 class="word__name">{word}</h1>
      <h2 class="word__subheading">
        {hyphenation} {hyphenation && pos && "|"} {pos}
      </h2>
      <ol class="word__definitions">
        {senses.map(({ tags, glosses, examples }) => (
          <li class="word__definition">
            {glosses}
            {examples?.length > 0 && (
              <ul class="word__examples">
                {examples.map(({ text, type, ref }) => {
                  if (type === "quote") {
                    return (
                      <li class="word__quote">
                        <blockquote>“{text}”</blockquote>
                        <p>
                          - <cite>{ref}</cite>
                        </p>
                      </li>
                    );
                  }

                  return <li class="word__example">{text}</li>;
                })}
              </ul>
            )}
          </li>
        ))}
      </ol>

      {etymologyText && (
        <>
          <h2 class="word__subheading"> Etymology</h2>
          {etymologyText}
        </>
      )}
    </article>
  );
}
