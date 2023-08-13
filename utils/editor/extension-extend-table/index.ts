import { Table, createTable } from '@tiptap/extension-table'
import type { NodeType } from '@tiptap/pm/model'
import { TextSelection } from '@tiptap/pm/state'

export default Table.extend({
  addCommands() {
    return {
      ...this.parent?.(),
      insertTable: ({ rows = 3, cols = 3, withHeaderRow = true } = {}) => ({ editor, tr, dispatch }) => {
        const tableNode = createTable(editor.schema, rows, cols, withHeaderRow)
        const node = (this.editor.schema.cached.tableNodeTypes?.tableContainer as NodeType).createChecked(null, [tableNode])

        if (dispatch) {
          const offset = tr.selection.anchor + 1

          tr.replaceSelectionWith(node)
            .scrollIntoView()
            .setSelection(TextSelection.near(tr.doc.resolve(offset)))
        }

        return true
      },
      deleteTable: () => ({ state, dispatch }) => {
        const $pos = state.selection.$anchor
        for (let d = $pos.depth; d > 0; d--) {
          const node = $pos.node(d)
          if (node.type.name === 'tableContainer') {
            if (dispatch) {
              dispatch(
                state.tr.delete($pos.before(d), $pos.after(d)).scrollIntoView(),
              )
            }
            return true
          }
        }
        return false
      },
    }
  },
})
