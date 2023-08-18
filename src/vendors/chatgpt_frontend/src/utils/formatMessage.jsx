import { renderToString } from 'react-dom/server';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import hljs from 'highlight.js';

export function formatMessageContent(content) {
  const sections = content.split(/(```[\s\S]*?```|`[\s\S]*?`)/g);

  const detectLanguage = (code) => {
    const language = hljs.highlightAuto(code).language;
    return language ? language : 'plaintext';
  };

  return sections
    .map((section) => {
      if (section.startsWith('```') && section.endsWith('```')) {
        section = section.split('\n').slice(1).join('\n');
        const code = section.substring(0, section.length - 3);
        return renderToString(
          <SyntaxHighlighter language={detectLanguage(code)} style={vscDarkPlus}>
            {code}
          </SyntaxHighlighter>,
        );
      } else if (section.startsWith('`') && section.endsWith('`')) {
        const code = section.substring(1, section.length - 1);
        return `<code class="inline-code">${code}</code>`;
      } else {
        return section.replace(/\n/g, '<br>');
      }
    })
    .join('');
}
