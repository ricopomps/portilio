"use client";

import { ContentState, EditorState, convertFromHTML } from "draft-js";
import dynamic from "next/dynamic";
import { forwardRef, useState } from "react";
import { EditorProps } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false },
);

type RichTextEditorProps = EditorProps & {
  initialState: string;
};

export default forwardRef<Object, RichTextEditorProps>(
  function RichTextEditor(props, ref) {
    const blocksFromHTML = convertFromHTML(props.initialState);
    const [editorState, setEditorState] = useState(
      props.initialState
        ? EditorState.createWithContent(
            ContentState.createFromBlockArray(
              blocksFromHTML.contentBlocks,
              blocksFromHTML.entityMap,
            ),
          )
        : EditorState.createEmpty(),
    );
    return (
      <Editor
        editorState={editorState}
        onEditorStateChange={setEditorState}
        toolbar={{
          options: ["inline", "list", "link", "history"],
          inline: {
            options: ["bold", "italic", "underline"],
          },
        }}
        editorRef={(r) => {
          if (typeof ref === "function") {
            ref(r);
          } else if (ref) {
            ref.current = r;
          }
        }}
        {...props}
      />
    );
  },
);
