import React, { useEffect, useRef } from "react";

// import ClassicEditor from "ckeditor5-build-classic-mathtype";

function Editor({ onChange, editorLoaded, name, value }) {
  const editorRef = useRef();
  const { CKEditor, ClassicEditor } = editorRef.current || {};
  useEffect(() => {
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor, // v3+
      ClassicEditor: require("ckeditor5-build-classic-mathtype"),
    };
  }, []);

  return (
    <div>
      {editorLoaded ? (
        <CKEditor
          type=""
          name={name}
          editor={ClassicEditor}
          config={{
            toolbar: {
              shouldNotGroupWhenFull: true,
              items: [
                // "heading",
                // "|",
                // "fontfamily",
                // "fontsize",
                // "|",
                // "alignment",
                // "|",
                // "fontColor",
                // "fontBackgroundColor",
                // "|",
                // "bold",
                // "italic",
                // "strikethrough",
                // "underline",
                // "subscript",
                // "superscript",
                // "|",
                // "link",
                // "|",
                // "outdent",
                // "indent",
                // "|",
                // "bulletedList",
                // "numberedList",
                // "todoList",
                // "|",
                // "code",
                // "codeBlock",
                // "|",
                // "insertTable",
                // "|",
                // "uploadImage",
                // "blockQuote",
                // "|",
                //--------------------------------------
                "heading",
                "fontsize",
                "alignment",
                "fontColor",
                "fontBackgroundColor",
                "outdent",
                "indent",
                "|",
                "bold",
                "italic",
                "link",
                "bulletedList",
                "numberedList",
                // "imageUpload",
                "mediaEmbed",
                "insertTable",
                "blockQuote",
                "undo",
                "redo",
                "|",
                "MathType",
                "ChemType",
              ],
            },
          }}
          data={value}
          onChange={(event, editor) => {
            const data = editor.getData();
            // console.log({ event, editor, data })
            onChange(data);
          }}
        />
      ) : (
        <div>Editor loading</div>
      )}
    </div>
  );
}

export default Editor;
