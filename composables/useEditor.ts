import { useEditor as useTiptap } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'
import Underline from '@tiptap/extension-underline'
import Superscript from '@tiptap/extension-superscript'
import Subscript from '@tiptap/extension-subscript'
import Highlight from '@tiptap/extension-highlight'
import TextAlign from '@tiptap/extension-text-align'

import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import CharacterCount from '@tiptap/extension-character-count'
import Typography from '@tiptap/extension-typography'
import Placeholder from '@tiptap/extension-placeholder'
import { Markdown } from 'tiptap-markdown'
import { isMacOS } from '@tiptap/core'

import Table from '~/utils/editor/extension-extend-table'
import TableContainer from '~/utils/editor/extension-table-container'
import SlashMenu from '~/utils/editor/extension-slash-menu'
import type { Item as SlashMenuItem } from '~/components/SlashMenu.vue'

const Cmd = isMacOS() ? 'Cmd' : 'Control'
const Option = isMacOS() ? 'Option' : 'Alt'

export function useEditor() {
  const slashMenu: SlashMenuItem[] = [
    {
      label: 'Heading 1',
      icon: 'i-material-symbols-format-h1-rounded',
      keys: ['Heading', 'H1'],
      shortcuts: [Cmd, Option, '1'],
      command: (editor) => {
        editor.chain().focus().toggleHeading({ level: 1 }).run()
      },
    },
    {
      label: 'Heading 2',
      icon: 'i-material-symbols-format-h2-rounded',
      keys: ['Heading', 'H2'],
      shortcuts: [Cmd, Option, '2'],
      command: (editor) => {
        editor.chain().focus().toggleHeading({ level: 2 }).run()
      },
    },
    {
      label: 'Heading 3',
      icon: 'i-material-symbols-format-h3-rounded',
      keys: ['Heading', 'H3'],
      shortcuts: [Cmd, Option, '3'],
      command: (editor) => {
        editor.chain().focus().toggleHeading({ level: 3 }).run()
      },
    },
    {
      label: 'Heading 4',
      icon: 'i-material-symbols-format-h4-rounded',
      keys: ['Heading', 'H4'],
      shortcuts: [Cmd, Option, '4'],
      command: (editor) => {
        editor.chain().focus().toggleHeading({ level: 4 }).run()
      },
    },
    {
      label: 'Heading 5',
      icon: 'i-material-symbols-format-h5-rounded',
      keys: ['Heading', 'H5'],
      shortcuts: [Cmd, Option, '5'],
      command: (editor) => {
        editor.chain().focus().toggleHeading({ level: 5 }).run()
      },
    },
    {
      label: 'Heading 6',
      icon: 'i-material-symbols-format-h6-rounded',
      keys: ['Heading', 'H6'],
      shortcuts: [Cmd, Option, '6'],
      command: (editor) => {
        editor.chain().focus().toggleHeading({ level: 6 }).run()
      },
    },
    {
      label: 'Ordered List',
      icon: 'i-material-symbols-format-list-numbered-rounded',
      keys: ['Ordered List', 'OL'],
      shortcuts: [Cmd, 'Shift', '7'],
      command: (editor) => {
        editor.chain().focus().toggleOrderedList().run()
      },
    },
    {
      label: 'Bullet List',
      icon: 'i-material-symbols-lists-rounded',
      shortcuts: [Cmd, 'Shift', '8'],
      keys: ['Bullet List', 'BL'],
      command: (editor) => {
        editor.chain().focus().toggleBulletList().run()
      },
    },
    {
      label: 'Task List',
      icon: 'i-lucide-list-todo',
      shortcuts: [Cmd, 'Shift', '9'],
      keys: ['Task List', 'TL'],
      command: (editor) => {
        editor.chain().focus().toggleTaskList().run()
      },
    },
  ]

  const editor = useTiptap({
    content: 'Edit Tool on <a href="https://tool.liting.ink" target="_blank">https://tool.liting.ink</a>',
    extensions: [
      StarterKit.configure({
        code: {
          HTMLAttributes: {
            class: 'text-primary-600 bg-gray-200 dark:bg-gray-700',
          },
        },
        strike: {
          HTMLAttributes: {
            class: 'decoration-primary-400 dark:decoration-primary-500',
          },
        },
      }),
      TaskList.configure({
        HTMLAttributes: {
          class: 'list-none pl-3',
        },
      }),
      TaskItem.configure({
        HTMLAttributes: {
          class: 'flex',
        },
      }),
      Underline,
      Superscript,
      Subscript,
      Highlight.configure({
        HTMLAttributes: {
          class: 'bg-primary-600 dark:bg-primary-400',
        },
      }),
      TextAlign.configure({
        types: ['heading', 'tableHeader', 'tableCell'],
      }),
      TableContainer,
      Table.configure({
        resizable: true,
        handleWidth: 10,
        cellMinWidth: 64,
      }),
      TableRow,
      TableHeader.configure({
        HTMLAttributes: {
          class: 'border-2 bg-primary-100 dark:bg-primary-900 border-primary-600 dark:border-primary-400',
        },
      }),
      TableCell.configure({
        HTMLAttributes: {
          class: 'border-2 border-primary-600 dark:border-primary-400',
        },
      }),
      Link.configure({
        HTMLAttributes: {
          class: 'cursor-pointer transition-colors text-primary-400 hover:text-primary-600 dark:text-primary-600 dark:hover:text-primary-400',
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'my-2',
        },
        allowBase64: true,
      }),
      CharacterCount,
      Typography,
      Placeholder.configure({
        placeholder: 'Input text or "/" for commands',
        emptyNodeClass: 'before:content-[attr(data-placeholder)] before:pointer-events-none before:float-left before:h-0 before:text-gray-300 dark:before:text-gray-700',
      }),
      Markdown,
      SlashMenu.configure({
        suggestion: {
          items: ({ query }) => {
            return slashMenu.filter(item => item.keys.some(key => key.toLowerCase().startsWith(query.toLowerCase())))
          },
        },
      }),
    ],
    editorProps: {
      attributes: {
        class: 'prose dark:prose-invert focus:outline-none max-w-none',
        spellcheck: 'false',
      },
    },
    autofocus: 'end',
  })

  return { editor }
}
