import { FC } from 'react';
import CodeSnippet from '../CodeSnippet';

const code = `{
  characters(filter: {village: "leaf"}) {
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
        "count": 157,
        "pages": 8,
        "next": 2,
        "prev": null
      },
      "results": [{
        "_id": "5f9fa4187f9c8a2e250e0225",
        "name": "ANBU Captain",
        "avatarSrc": "https://narutoql.s3.amazonaws.com/ANBU2.jpg",
        "description": "This ANBU captain serves in Leaf Village.",
        "rank": "Jounin",
        "village": "leaf village"
      },
      {
        "_id": "5f9fa4187f9c8a2e250e0226",
        "name": "ANBU Member",
        "avatarSrc": "https://narutoql.s3.amazonaws.com/ANBUYakumo.jpg",
        "description": "This ANBU member was charged with protecting the villa housing Kurama Yakumo. He and medical ninja were directed to keep Yakumo at the villa so her strong Genjutsu powers would be contained.",
        "rank": "Unknown (Probable Chuunin)",
        "village": "leaf village"
      }]
    }
  }
}
`;
const CharacterAll: FC = () => {
  return (
    <>
      <p>
        Use the <code className="code-text">characters</code> query to get all
        characters. See <strong> filtering </strong> section below for available
        parameters.
      </p>
      <strong>Sample Query/Response</strong>
      <CodeSnippet language="graphql" code={code} />
      <CodeSnippet language="json" code={json} />
    </>
  );
};

export default CharacterAll;
