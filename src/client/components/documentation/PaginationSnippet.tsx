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
  }
}`;
const json = `{
  "data": {
    "characters": {
      "info": {
        "count": 157,
        "pages": 4,
        "next": 2,
        "prev": null
      }
    }
  }
}`;
const PaginationSnippet: FC = () => {
  return (
    <>
      <strong>Sample Query/Response</strong>
      <CodeSnippet language="graphql" code={code} />
      <CodeSnippet language="json" code={json} />
    </>
  );
};

export default PaginationSnippet;
