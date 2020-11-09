import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { FC } from 'react';

const customStyle = { fontSize: '14px' };
const CodeSnippet: FC<{ language: string; code: string }> = ({
  code,
  language = 'javascript',
}) => {
  return (
    <SyntaxHighlighter
      customStyle={customStyle}
      language={language}
      style={tomorrow}
    >
      {code}
    </SyntaxHighlighter>
  );
};

export default CodeSnippet;
