"use client";

import { useEditor, EditorContent, useEditorState } from "@tiptap/react";
import { buildEditorExtensions } from "./extensions";
import { EditorToolbar } from "./Toolbar";

export function PostEditor({
  name,
  defaultValue,
  disabled,
}: {
  name: string;
  defaultValue?: string;
  disabled?: boolean;
}) {
  const editor = useEditor({
    extensions: buildEditorExtensions(),
    content: defaultValue ?? "",
    editable: !disabled,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "editor__content",
      },
    },
  });

  const html =
    useEditorState({
      editor,
      selector: ({ editor }) => (editor ? editor.getHTML() : null),
    }) ?? (defaultValue ?? "");

  return (
    <div className="editor">
      <EditorToolbar editor={editor} />
      <EditorContent editor={editor} />
      <input type="hidden" name={name} value={html} />
    </div>
  );
}
