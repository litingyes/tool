import { useEditor as useTiptap } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'
import Underline from '@tiptap/extension-underline'
import Superscript from '@tiptap/extension-superscript'
import Subscript from '@tiptap/extension-subscript'
import Highlight from '@tiptap/extension-highlight'
import TextAlign from '@tiptap/extension-text-align'
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import CharacterCount from '@tiptap/extension-character-count'
import Typography from '@tiptap/extension-typography'

export function useEditor() {
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
      Table.configure({
        resizable: true,
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
