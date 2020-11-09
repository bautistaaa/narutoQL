import { FC } from 'react';
import CodeSnippet from '../CodeSnippet';

const code = `{
  character(id: "1234") {
    name
    avatarSrc
    description
    village
  }
}`;
const json = `{
  "data": {
    "character": {
      "name": "Aburame Shibi",
      "avatarSrc": "https://narutoql.s3.amazonaws.com/Aburame2.jpg",
      "description": "Aburame Shibi is the father of Aburame Shino. Like his son, his body is also inhabited by the destruction bugs.",
      "village": "leaf village"
    }
  }
}
`
const CharacterSingle: FC = () => {
  return (
    <>
      <p>
        Getting a single character is pretty trivial. We recommend using the{' '}
        <code className="code-text">characters</code> query to find the
        character ID you're looking for.
      </p>
      <CodeSnippet language="graphql" code={code} />
      <CodeSnippet language="json" code={json} />
    </>
  );
};

export default CharacterSingle;
