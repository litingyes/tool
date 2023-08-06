<script lang="ts" setup>
import { EditorContent, useEditor } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'

const editor = useEditor({
  content: 'Tip Tap',
  extensions: [
    StarterKit.configure({
      code: {
        HTMLAttributes: {
          class: '',
        },
      },
    }),
  ],
  editorProps: {
    attributes: {
      class: 'prose dark:prose-invert mt-16 focus:outline-none prose-code:before:content-none prose-code:after:content-none prose-code:rounded prose-code:p-1 prose-code:text-primary-500 prose-code:bg-cool-100 dark:prose-code:bg-cool-700',
    },
  },
})
onBeforeUnmount(() => {
  editor.value?.destroy()
})

const topMeau = [
  {
    icon: 'i-healthicons-t',
    event: () => {
      editor.value?.chain().focus().clearNodes().unsetAllMarks().run()
    },
  },
  {
    icon: 'i-material-symbols-format-h1-rounded',
    event: () => {
      editor.value?.chain().focus().toggleHeading({ level: 1 }).run()
    },
  },
  {
    icon: 'i-material-symbols-format-h2-rounded',
    event: () => {
      editor.value?.chain().focus().toggleHeading({ level: 2 }).run()
    },
  },
  {
    icon: 'i-material-symbols-format-h3-rounded',
    event: () => {
      editor.value?.chain().focus().toggleHeading({ level: 3 }).run()
    },
  },
  {
    icon: 'i-material-symbols-format-h4-rounded',
    event: () => {
      editor.value?.chain().focus().toggleHeading({ level: 4 }).run()
    },
  },
  {
    icon: 'i-material-symbols-format-h5-rounded',
    event: () => {
      editor.value?.chain().focus().toggleHeading({ level: 5 }).run()
    },
  },
  {
    icon: 'i-material-symbols-format-h6-rounded',
    event: () => {
      editor.value?.chain().focus().toggleHeading({ level: 6 }).run()
    },
  },
  {
    icon: 'i-material-symbols-format-bold-rounded',
    event: () => {
      editor.value?.chain().focus().toggleBold().run()
    },
  },
  {
    icon: 'i-material-symbols-format-italic-rounded',
    event: () => {
      editor.value?.chain().focus().toggleItalic().run()
    },
  },
  {
    icon: 'i-material-symbols-code-blocks-outline-rounded',
    event: () => {
      editor.value?.chain().focus().toggleCode().run()
    },
  },
  {
    icon: 'i-material-symbols-strikethrough-s-rounded',
    event: () => {
      editor.value?.chain().focus().toggleStrike().run()
    },
  },
]
</script>

<template>
  <div class="h-full overflow-auto">
    <ul class="fixed mt-4 flex gap-2">
      <li v-for="item in topMeau" :key="item.icon">
        <UButton :icon="item.icon" size="xs" color="primary" square variant="soft" @click="item.event" />
      </li>
    </ul>
    <EditorContent :editor="editor" />
  </div>
</template>
