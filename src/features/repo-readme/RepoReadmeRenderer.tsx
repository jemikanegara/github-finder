import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

function RepoReadme({ content }: { content: string; }) {
  return <ReactMarkdown children={content} remarkPlugins={[remarkGfm]} />;
}

export default RepoReadme
