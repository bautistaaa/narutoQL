import { FC } from 'react';
import CodeSnippet from '../CodeSnippet';

const code = `{
  village(id: "5f9fa4177f9c8a2e250e0124") {
    _id
    name
  }
}`;
const json = `{
  "data": {
    "village": {
      "_id": "5f9fa4177f9c8a2e250e0124",
      "name": "leaf village"
    }
  }
}
`;
const VillageSingle: FC = () => {
  return (
    <>
      <p>
        Getting a single village is simple. We recommend using the{' '}
        <code className="code-text">clans</code> query to find the village ID
        you're looking for.
      </p>
      <strong>Sample Query/Response</strong>
      <CodeSnippet language="graphql" code={code} />
      <CodeSnippet language="json" code={json} />
    </>
  );
};

export default VillageSingle;
