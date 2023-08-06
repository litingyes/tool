<script lang="ts" setup>
import { EditorContent, useEditor } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'

const editor = useEditor({
  content: 'Tip Tap',
  extensions: [
    StarterKit,
  ],
})

onBeforeUnmount(() => {
  editor.value?.destroy()
})
</script>

<template>
  <div class="h-full">
    <EditorContent :editor="editor" />
  </div>
</template>
