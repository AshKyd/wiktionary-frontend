import { useState } from "preact/hooks";

export function Word({ data }) {
  const { word, hyphenation, pos, etymologyText, senses } = data;
  const [examplesExpanded, setExamplesExpanded]= useState(false);

  function getExamples(examples){
    if(examplesExpanded){
    return examples;
    }

    return examples.slice(0,1)
  }

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
                {getExamples(examples).map(({ text, type, ref },i) => {
                  if (type === "quote") {
                    return (
                      <li class={`word__quote word__quote--${i > 0 ? 'subsequent' : 'first'}`}>
                        <blockquote>“{text}”</blockquote>
                        <p>
                          - <cite>{ref}</cite>
                        </p>
                      </li>
                    );
                  }

                  return <li class={`word__example word__example--${i > 0 ? 'subsequent' : 'first'}`}>{text}</li>;
                })}
                  {examples.length>1 && !examplesExpanded && <li><button onClick={() => setExamplesExpanded(true)}>More examples</button></li>}
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
