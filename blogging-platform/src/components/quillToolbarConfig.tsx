import ReactQuill from "react-quill";

export const toolbarOptions = [
    [{ header: [1, 2, false] }],
    ['bold', 'italic', 'underline'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link', 'image'],
    ['custom-code'],
];

export const quillModules = (quillRef: React.RefObject<ReactQuill>) => ({
    toolbar: {
        container: toolbarOptions,
        handlers: {
            'custom-code': () => {
                if (quillRef.current) {
                    const quill = quillRef.current.getEditor();
                    const range = quill.getSelection();
                    if (range) {
                        const selectedText = quill.getText(range.index, range.length);
                        quill.insertEmbed(range.index, 'code-block', selectedText);
                    }
                }
            },
        },
    },
});

export const addCustomButtonLabel = () => {
    setTimeout(() => {
        const customButton = document.querySelector('.ql-custom-code');
        if (customButton) {
            customButton.innerHTML = "code";
        }
    }, 0);
};