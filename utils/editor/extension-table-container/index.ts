import { Node } from '@tiptap/core'
import { VueNodeViewRenderer, mergeAttributes } from '@tiptap/vue-3'
import type { MarkdownNodeSpec } from 'tiptap-markdown'
import type * as MarkdownIt from 'markdown-it'
import TableContainerVue from '~/components/editor/TableContainer.vue'

export default Node.create({
  name: 'tableContainer',

  content: 'table',

  tableRole: 'tableContainer',

  group: 'block',

  isolating: true,

  addStorage() {
    return {
      markdown: ({
        serialize(state, node) {
          state.renderContent(node)
        },
        parse: {
          setup(markdownIt: MarkdownIt) {
            markdownIt.renderer.rules.table_open = () => {
              return '<div data-node-name="table-container"><table>'
            }
            markdownIt.renderer.rules.table_close = () => {
              return '</table></div>'
            }
          },
        },
      }) as MarkdownNodeSpec,
    }
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-node-name="table-container"]',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes, { 'data-node-name': 'table-container' }), 0]
  },

  addNodeView() {
    return VueNodeViewRenderer(TableContainerVue)
  },
})
