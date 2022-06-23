import React, { useEffect, useRef, useState } from "react";

// import ClassicEditor from "ckeditor5-build-classic-mathtype";

function Editor({ onChange, editorLoaded, name, value }) {
  const editorRef = useRef();
  const [check, setCheck] = useState(true);
  const { CKEditor, ClassicEditor } = editorRef.current || {};
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        editorRef.current = {
          CKEditor: require("@ckeditor/ckeditor5-react").CKEditor, // v3+
          ClassicEditor: require("ckeditor5-build-classic-mathtype/build/ckeditor"),
        };
      }
      setCheck(true);
    } catch (error) {
      setCheck(false);
      window.location.reload();
    }
  }, []);

  return (
    <>
      {check ? (
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
      ) : (
        <div>Đang tải</div>
      )}
    </>
  );
}

export default Editor;
