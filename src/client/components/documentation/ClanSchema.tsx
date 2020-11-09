import { FC } from 'react';
import CodeSnippet from '../CodeSnippet';

const code = `p { color: red  }`;
const ClanSchema: FC = () => {
  return (
    <pre>
      <code className="language-css">{code}</code>
    </pre>
  );
};

export default ClanSchema;
