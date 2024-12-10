import React, { useEffect } from "react"
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

interface EditorProps {
    value: string;
    handleChange: (content: string) => void;
}

const Editor: React.FC<EditorProps> = ({ value, handleChange }) => {
    useEffect(() => {
        const languagePickerItems = Array.from(document.querySelectorAll('.ql-language .ql-picker-item')) as HTMLElement[];

        languagePickerItems.forEach(item => {
            if (item.dataset.value) {
                item.textContent = item.dataset.value;
            }
        });

        const pickerLabel = document.querySelector('ql-language .ql-picker-label');
        if (pickerLabel) {
            pickerLabel.innerHTML = `Language: ${pickerLabel.innerHTML}`;
        }
        }, []);

    return (
        <div className="text-editor">
            <ReactQuill
                theme="snow"
                value={value}
                onChange={handleChange}
                modules={quillModules}
                style={{ height: '300px' }}
            />
        </div>
    );
};

const toolbarOptions = [
    [{ 'language': ['bash', 'python', 'rust', 'typescript', 'javascript'] }], // Custom language dropdown
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote', 'code-block'],

    [{ 'header': 1 }, { 'header': 2 }],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    ['link'],
    [{ 'script': 'sub' }, { 'script': 'super' }],
    [{ 'indent': '-1' }, { 'indent': '+1' }],
    [{ 'direction': 'rtl' }],

    [{ 'size': ['small', false, 'large', 'huge'] }],
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

    [{ 'color': [] }, { 'background': [] }],
    [{ 'font': [] }],
    [{ 'align': [] }],

    ['clean'] // Remove formatting button
];

// Define a custom handler type
interface QuillHandler {
    quill: {
        getSelection: () => { index: number; length: number } | null;
        getText: (index: number, length: number) => string;
        deleteText: (index: number, length: number) => void;
        clipboard: {
            dangerouslyPasteHTML: (index: number, html: string) => void;
        };
        setSelection: (range: { index: number; length: number }) => void;
    };
}

const quillModules = {
    toolbar: {
        container: toolbarOptions,
        handlers: {
            language: function (this: QuillHandler, value: string) {
                if (this.quill && value) {
                    const range = this.quill.getSelection();
                    if (range) {
                        const codeBlockContent = this.quill.getText(range.index, range.length);
                        const codeHTML = `<pre class="ql-syntax">${value}<br/>${codeBlockContent}</pre>`;
                        this.quill.deleteText(range.index, range.length);
                        this.quill.clipboard.dangerouslyPasteHTML(range.index, codeHTML);
                        this.quill.setSelection({ index: range.index + codeHTML.length, length: 0 });
                    }
                }
            },
        },
    },
};

export default Editor;