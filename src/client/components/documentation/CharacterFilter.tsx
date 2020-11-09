import { FC } from 'react';
import CodeSnippet from '../CodeSnippet';

const code = `{
  characters(filter: {name: "sasuke", village: "leaf"}) {
    info {
      count
      pages
      next
      prev
    }    
    results {
     _id
      name
      avatarSrc
      description
      rank
      village
    }
  }
}`;
const json = `{
  "data": {
    "characters": {
      "info": {
        "count": 2,
        "pages": 1,
        "next": null,
        "prev": null
      },
      "results": [{
        "_id": "5f9fa4187f9c8a2e250e02db",
        "name": "Sarutobi Sasuke",
        "avatarSrc": "https://narutoql.s3.amazonaws.com/NAI.jpg",
        "description": "Sarutobi Sasuke was the well known father of Sarutobi Hiruzen, the Sandaime Hokage. Uchiha Mikoto and Fugaku would later name their second son after the man.",
        "rank": "",
        "village": "leaf village"
      },
      {
        "_id": "5f9fa4187f9c8a2e250e0206",
        "name": "Uchiha Sasuke",
        "avatarSrc": "https://narutoql.s3.amazonaws.com/Sasuke.jpg",
        "description": "A Genin from the village of Konoha, Uchiha Sasuke is one of the last surviving members of the Uchiha clan. This clan is known for the genetic ability to use the Sharigan eye. This eye allows its users to copy any jutsu technique their opponent uses. Sasuke&apos;s clan was killed by his older brother Itachi, because of that he has devoted his life to killing his brother.",
      "rank": "Genin - Team 7",
      "village": "leaf village"
      }]
    }
  }
}
`;
const CharacterFilter: FC = () => {
  return (
    <>
      <p>
        A character query can take a <code className="code-text">Filter InputType</code>.
      </p>
      <p>Available parameters:</p>
      <ul className="show-bullets">
        <li>
          <code className="code-text">name</code> - name of character
        </li>
        <li>
          <code className="code-text">rank</code> - rank of character
        </li>
        <li>
          <code className="code-text">village</code> - village of character
        </li>
      </ul>
      <CodeSnippet language="graphql" code={code} />
      <CodeSnippet language="json" code={json} />
    </>
  );
};

export default CharacterFilter;
