<script lang="ts" setup>
import { EditorContent, useEditor } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'

const editor = useEditor({
  content: 'Tip Tap',
  extensions: [
    StarterKit,
  ],
  editorProps: {
    attributes: {
      class: 'prose dark:prose-invert m-5 focus:outline-none',
    },
  },
})

onBeforeUnmount(() => {
  editor.value?.destroy()
})
</script>

<template>
  <div class="h-full overflow-auto">
    <EditorContent :editor="editor" />
  </div>
</template>
