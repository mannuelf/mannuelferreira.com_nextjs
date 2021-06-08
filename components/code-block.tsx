import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/cjs/styles/prism';

const CodeBlock = ({ language, value }: CodeBlockProps) => {
  return (
    <SyntaxHighlighter
      language={language}
      style={tomorrow}
      wrapLines={true}
      showLineNumbers={true}
    >
      {value}
    </SyntaxHighlighter>
  );
};

export default CodeBlock;
