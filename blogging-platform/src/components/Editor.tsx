import React from "react";
import MarkdownRenderer from "./MarkdownRenderer";

interface EditorProps {
    value: string;
    handleChange: (content: string) => void;
}

const Editor: React.FC<EditorProps> = ({ value, handleChange }) => {

    return (
        <div className="text-editor">
            <textarea
                value={value}
                onChange={(e) => handleChange(e.target.value)}
                placeholder="Write your article in Markdown..."
                style={{ width: "100%", height: "300px", fontFamily: "monospace" }}
            />
            <h3>Preview:</h3>
            <MarkdownRenderer content={value} />
        </div>
    );
};

export default Editor;