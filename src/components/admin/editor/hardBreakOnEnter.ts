import { Extension } from "@tiptap/core";

/**
 * The site's entire reading experience depends on preserving line breaks
 * exactly as typed (see CLAUDE.md mục 2). Tiptap's default Enter behavior
 * splits into a new <p>, which would silently break that rhythm.
 *
 * `priority: 1000` guarantees this runs before StarterKit's own keymaps
 * (default priority 100), so this is always the first handler to see Enter.
 */
export const HardBreakOnEnter = Extension.create({
  name: "hardBreakOnEnter",
  priority: 1000,

  addKeyboardShortcuts() {
    return {
      Enter: () => {
        const { $from } = this.editor.state.selection;
        const inListItem = $from.node(-1)?.type.name === "listItem";

        if (inListItem) {
          const isEmptyItem =
            $from.parent.type.name === "paragraph" && $from.parent.content.size === 0;

          if (isEmptyItem) {
            return this.editor.commands.liftListItem("listItem");
          }
          return this.editor.commands.splitListItem("listItem");
        }

        return this.editor.commands.setHardBreak();
      },
    };
  },
});
