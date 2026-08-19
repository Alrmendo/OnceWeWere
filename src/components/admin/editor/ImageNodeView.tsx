"use client";

import { NodeViewWrapper } from "@tiptap/react";
import type { NodeViewProps } from "@tiptap/react";
import { CloseIcon } from "./icons";

export function ImageNodeView({ node, deleteNode, selected }: NodeViewProps) {
  return (
    <NodeViewWrapper
      className={selected ? "editor-image editor-image--selected" : "editor-image"}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={node.attrs.src} alt={node.attrs.alt ?? ""} />
      <button
        type="button"
        className="editor-image__delete"
        contentEditable={false}
        onClick={(event) => {
          event.preventDefault();
          deleteNode();
        }}
        aria-label="Xoá ảnh khỏi bài"
        title="Xoá ảnh khỏi bài"
      >
        <CloseIcon />
      </button>
    </NodeViewWrapper>
  );
}
