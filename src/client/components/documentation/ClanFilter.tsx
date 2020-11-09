import { FC } from 'react';
import CodeSnippet from '../CodeSnippet';

const code = `{
  clans(village: "leaf") {
    name    
    description
    avatarSrc
    village
  }
}`;
const json = `{
  "data": {
    "clans": [{
        "name": "Aburame Clan",
        "description": "This clan from Konoha Village is known for its ties to insect. At birth clan members form an agreement with bugs to inhabit and feed on the chakra their body creates. In return the bugs will serve the commands of the clan member.",
        "avatarSrc": "https://narutoql.s3.amazonaws.com/Aburame.jpg",
        "village": "leaf village"
      },
      {
        "name": "Akimichi Clan",
        "description": "This clan from Konoha Village is known for its ability to modify the size of its body, increasing their mass to a large spherical ball. In this form it is difficult for the clan user to take physical damage. The Akimichi clan have worked along side the Nara and Yamanaka clans for many generations. With each new generation, the clan member swears an oath to defend the honor of the previous generation and also raise a new generation to look after the village.",
        "avatarSrc": "https://narutoql.s3.amazonaws.com/AkimichiClan.jpg",
        "village": "leaf village"
      }]
    }
  }
}
`;
const ClanFilter: FC = () => {
  return (
    <>
      <p>
        A clans query can take a{' '}
        <code className="code-text">Filter InputType</code>.
      </p>
      <p>Available parameters:</p>
      <ul className="show-bullets">
        <li>
          <code className="code-text">village</code> - village of clan
        </li>
      </ul>
      <strong>Sample Query/Response</strong>
      <CodeSnippet language="graphql" code={code} />
      <CodeSnippet language="json" code={json} />
    </>
  );
};

export default ClanFilter;
