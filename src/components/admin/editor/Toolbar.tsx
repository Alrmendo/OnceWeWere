"use client";

import { useRef, useState } from "react";
import type { Editor } from "@tiptap/react";
import { useEditorState } from "@tiptap/react";
import { uploadPostImage } from "@/app/admin/actions";
import {
  BoldIcon,
  ItalicIcon,
  HeadingIcon,
  BulletListIcon,
  OrderedListIcon,
  ImageIcon,
  SpinnerIcon,
} from "./icons";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_SIZE = 5 * 1024 * 1024;

export function EditorToolbar({ editor }: { editor: Editor | null }) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const active = useEditorState({
    editor,
    selector: ({ editor }) => ({
      bold: editor?.isActive("bold") ?? false,
      italic: editor?.isActive("italic") ?? false,
      heading: editor?.isActive("heading", { level: 2 }) ?? false,
      bulletList: editor?.isActive("bulletList") ?? false,
      orderedList: editor?.isActive("orderedList") ?? false,
    }),
  }) ?? {
    bold: false,
    italic: false,
    heading: false,
    bulletList: false,
    orderedList: false,
  };

  if (!editor) return null;

  // Since Enter never starts a new paragraph (see hardBreakOnEnter), a post
  // is usually one big paragraph. Toggling a list on directly would wrap
  // that *entire* paragraph into a single list item. Splitting the block
  // first isolates the list to a fresh paragraph, leaving prior text alone.
  function toggleList(type: "bulletList" | "orderedList") {
    if (!editor!.isActive(type)) {
      editor!.chain().focus().splitBlock().run();
    }
    if (type === "bulletList") {
      editor!.chain().focus().toggleBulletList().run();
    } else {
      editor!.chain().focus().toggleOrderedList().run();
    }
  }

  // Same reasoning as toggleList: isolate the heading to a fresh block
  // instead of turning everything typed so far into a heading.
  function toggleHeading() {
    if (!editor!.isActive("heading", { level: 2 })) {
      editor!.chain().focus().splitBlock().run();
    }
    editor!.chain().focus().toggleHeading({ level: 2 }).run();
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    setUploadError(null);

    if (!ALLOWED_TYPES.includes(file.type)) {
      setUploadError("Chỉ nhận ảnh jpg, png, webp hoặc gif.");
      return;
    }
    if (file.size > MAX_SIZE) {
      setUploadError("Ảnh vượt quá 5MB.");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    const result = await uploadPostImage(formData);
    setUploading(false);

    if ("error" in result) {
      setUploadError(result.error);
      return;
    }

    editor!.chain().focus().setImage({ src: result.url }).run();
  }

  return (
    <div>
      <div className="editor__toolbar">
        <button
          type="button"
          className={active.bold ? "editor__btn editor__btn--active" : "editor__btn"}
          onClick={() => editor.chain().focus().toggleBold().run()}
          aria-label="Đậm"
          aria-pressed={active.bold}
        >
          <BoldIcon />
        </button>
        <button
          type="button"
          className={active.italic ? "editor__btn editor__btn--active" : "editor__btn"}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          aria-label="Nghiêng"
          aria-pressed={active.italic}
        >
          <ItalicIcon />
        </button>

        <span className="editor__divider" aria-hidden="true" />

        <button
          type="button"
          className={active.heading ? "editor__btn editor__btn--active" : "editor__btn"}
          onClick={toggleHeading}
          aria-label="Tiêu đề"
          aria-pressed={active.heading}
        >
          <HeadingIcon />
        </button>

        <span className="editor__divider" aria-hidden="true" />

        <button
          type="button"
          className={
            active.bulletList ? "editor__btn editor__btn--active" : "editor__btn"
          }
          onClick={() => toggleList("bulletList")}
          aria-label="Danh sách gạch đầu dòng"
          aria-pressed={active.bulletList}
        >
          <BulletListIcon />
        </button>
        <button
          type="button"
          className={
            active.orderedList ? "editor__btn editor__btn--active" : "editor__btn"
          }
          onClick={() => toggleList("orderedList")}
          aria-label="Danh sách đánh số"
          aria-pressed={active.orderedList}
        >
          <OrderedListIcon />
        </button>

        <span className="editor__divider" aria-hidden="true" />

        <button
          type="button"
          className="editor__btn"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          aria-label="Chèn ảnh"
        >
          {uploading ? <SpinnerIcon /> : <ImageIcon />}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          hidden
          onChange={handleFileChange}
        />
      </div>
      {uploadError && <p className="editor__upload-error">{uploadError}</p>}
    </div>
  );
}
