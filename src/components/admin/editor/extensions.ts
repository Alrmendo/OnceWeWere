import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { Placeholder } from "@tiptap/extensions";
import { HardBreakOnEnter } from "./hardBreakOnEnter";
import { ImageNodeView } from "./ImageNodeView";

const DeletableImage = Image.extend({
  addNodeView() {
    return ReactNodeViewRenderer(ImageNodeView);
  },
});

export function buildEditorExtensions() {
  return [
    HardBreakOnEnter,
    StarterKit.configure({
      blockquote: false,
      code: false,
      codeBlock: false,
      heading: { levels: [2] },
      horizontalRule: false,
      strike: false,
      underline: false,
      link: false,
    }),
    DeletableImage.configure({
      inline: false,
      allowBase64: false,
      HTMLAttributes: { alt: "" },
    }),
    Placeholder.configure({
      placeholder: "Viết ở đây. Xuống dòng sẽ được giữ nguyên như khi đăng.",
    }),
  ];
}
