import { FC } from 'react';
import CodeSnippet from '../CodeSnippet';

const code = `{
  villages {
    results {
      _id
    }
  }
}`;
const json = `{
  "data": {
    "villages":[{
        "_id": "5f9fa4177f9c8a2e250e0124",
        "name": "leaf village"
      },
      {
        "_id": "5f9fa4177f9c8a2e250e0125",
        "name": "rock village"
      }]
    }
  }
}
`;
const VillageAll: FC = () => {
  return (
    <>
      <p>
        Use the <code className="code-text">village</code> query to get all
        villages.
      </p>
      <strong>Sample Query/Response</strong>
      <CodeSnippet language="graphql" code={code} />
      <CodeSnippet language="json" code={json} />
    </>
  );
};

export default VillageAll;
