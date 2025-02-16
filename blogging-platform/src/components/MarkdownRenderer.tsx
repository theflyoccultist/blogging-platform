import ReactMarkdown from "react-markdown";
import rehypePrism from "rehype-prism";

const MarkdownRenderer = ({ content }: { content: string }) => {
    return (
        <ReactMarkdown rehypePlugins={[rehypePrism]}>
            {content}
        </ReactMarkdown>
    );
};

export default MarkdownRenderer;