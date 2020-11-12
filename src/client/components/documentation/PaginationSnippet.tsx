import { FC } from 'react';
import CodeSnippet from '../CodeSnippet';

const code = `{
  character(id: "1234") {
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
    "character": {
      "info": {
        "count": 3,
        "pages": 1,
        "next": null,
        "prev": null
      }
    }
  }
}
`;
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


