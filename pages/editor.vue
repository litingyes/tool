<script lang="ts" setup>
import { EditorContent, useEditor } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import CharacterCount from '@tiptap/extension-character-count'
import Typography from '@tiptap/extension-typography'

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
    CharacterCount,
    Typography,
  ],
  editorProps: {
    attributes: {
      class: 'prose dark:prose-invert mt-16 focus:outline-none prose-code:before:content-none prose-code:after:content-none prose-code:rounded prose-code:p-1 prose-code:text-primary-500 prose-code:bg-gray-200 dark:prose-code:bg-gray-700',
    },
  },
})
onMounted(() => {
  editor.value?.commands.focus()
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

const saveFileModalVisible = ref(false)
const fileName = ref('')
const { saveHtml, saveJson, saveText } = useFileSave()
const toast = useToast()
const { t } = useI18n()
const saveFileType = ref<'HTML' | 'JSON' | 'TEXT'>()
const outputList = [
  {
    label: 'HTML',
    event: () => {
      fileName.value = ''
      saveFileType.value = 'HTML'
      saveFileModalVisible.value = true
    },
  },
  {
    label: 'JSON',
    event: () => {
      fileName.value = ''
      saveFileType.value = 'JSON'
      saveFileModalVisible.value = true
    },
  },
  {
    label: 'TEXT',
    event: () => {
      fileName.value = ''
      saveFileType.value = 'TEXT'
      saveFileModalVisible.value = true
    },
  },
]
function saveFile() {
  try {
    if (saveFileType.value === 'HTML')
      saveHtml(fileName.value, editor.value?.getHTML() ?? '')
    else if (saveFileType.value === 'JSON')
      saveJson(fileName.value, JSON.stringify(editor.value?.getJSON(), null, 2))
    else
      saveText(fileName.value, editor.value?.getText() ?? '')

    toast.add({
      title: t('editor.output.success'),
      icon: 'i-mdi-check-circle-outline',
      color: 'green',
      timeout: 2000,
      ui: {
        title: 'text-green-500',
      },
    })

    saveFileModalVisible.value = false
  }
  catch (e) {
    toast.add({
      title: t('editor.output.failed'),
      icon: 'i-codicon-error',
      color: 'red',
      timeout: 2000,
      ui: {
        title: 'text-red-500',
      },
    })
  }
}
</script>

<template>
  <div class="h-full overflow-auto">
    <div class="fixed left-56 right-4 mt-4 flex justify-between">
      <ul class="flex gap-2">
        <li v-for="item in topMeau" :key="item.icon">
          <UButton :icon="item.icon" size="xs" variant="soft" square @click="item.event" />
        </li>
      </ul>
      <ul>
        <li>
          <UPopover>
            <UButton size="xs" variant="outline" :label="$t('editor.output.label')" />
            <template #panel>
              <ul class="text-primary-500 dark:text-primary-400 w-16 text-sm">
                <li
                  v-for="item in outputList" :key="item.label"
                  class="hover:bg-primary-50 dark:hover:bg-primary-950 cursor-pointer px-2 py-1 transition-colors"
                  @click="item.event"
                >
                  {{ item.label }}
                </li>
              </ul>
            </template>
          </UPopover>
        </li>
      </ul>
    </div>
    <ul class="text-primary-500 dark:text-primary-400 fixed bottom-4 right-4 w-28 text-sm">
      <li>{{ $t('editor.info.characters') }}: {{ editor?.storage.characterCount.characters() }}</li>
      <li>words: {{ editor?.storage.characterCount.words() }}</li>
    </ul>
    <EditorContent spellcheck="false" :editor="editor" />
    <UModal v-model="saveFileModalVisible">
      <UCard>
        <UInput v-model="fileName" :placeholder="$t('editor.output.placeHolder')" />
        <template #footer>
          <div class="flex justify-end gap-2">
            <UButton :disabled="!fileName" @click="saveFile">
              {{ $t('form.confirm') }}
            </UButton>
            <UButton variant="outline" @click="saveFileModalVisible = false">
              {{ $t('form.cancel') }}
            </UButton>
          </div>
        </template>
      </UCard>
    </UModal>
  </div>
</template>
