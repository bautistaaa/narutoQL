import { FC } from 'react';
import CodeSnippet from '../CodeSnippet';

const code = `{
  clan(id: "5f9fa4177f9c8a2e250e0135") {
    avatarSrc
    description
    name
    signatureAbilities
    village
  }
}`;
const json = `{
  "data": {
    "clan": {
      "avatarSrc": "http://www.leafninja.com/images/information/Aburame.jpg",
      "description": "This clan from Konoha Village is known for its ties to insect. At birth clan members form an agreement with bugs to inhabit and feed on the chakra their body creates. In return the bugs will serve the commands of the clan member.",
      "name": "Aburame Clan",
      "signatureAbilities": "Kikaichuu no Jutsu",
      "village": "leaf village"
    }
  }
}
`;
const ClanSingle: FC = () => {
  return (
    <>
      <p>
        Getting a single character is simple. We recommend using the{' '}
        <code className="code-text">clans</code> query to find the
        character ID you're looking for.
      </p>
      <strong>Sample Query/Response</strong>
      <CodeSnippet language="graphql" code={code} />
      <CodeSnippet language="json" code={json} />
    </>
  );
};

export default ClanSingle;
