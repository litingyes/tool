<script lang="ts" setup>
import { EditorContent, useEditor } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Highlight from '@tiptap/extension-highlight'
import Superscript from '@tiptap/extension-superscript'
import Subscript from '@tiptap/extension-subscript'
import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'
import CharacterCount from '@tiptap/extension-character-count'
import Typography from '@tiptap/extension-typography'

const { t } = useI18n()

const editor = useEditor({
  content: 'Tip Tap',
  extensions: [
    StarterKit.configure({
      code: {
        HTMLAttributes: {
          class: 'text-primary-500 bg-gray-200 dark:bg-gray-700',
        },
      },
    }),
    Underline,
    Highlight.configure({
      HTMLAttributes: {
        class: 'bg-primary-500 dark:bg-primary-400',
      },
    }),
    Superscript,
    Subscript,
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
    CharacterCount,
    Typography,
  ],
  editorProps: {
    attributes: {
      class: 'prose dark:prose-invert focus:outline-none',
      spellcheck: 'false',
    },
  },
})
onMounted(() => {
  editor.value?.commands.focus()
})
onBeforeUnmount(() => {
  editor.value?.destroy()
})

const topMeau = computed(() => [
  {
    icon: 'i-healthicons-t',
    tooltip: t('editor.tooltip.text'),
    isActive: editor?.value?.isActive('text'),
    event: () => {
      editor.value?.chain().focus().clearNodes().unsetAllMarks().run()
    },
  },
  {
    icon: 'i-material-symbols-format-h1-rounded',
    tooltip: t('editor.tooltip.h1'),
    isActive: editor?.value?.isActive('heading', { level: 1 }),
    event: () => {
      editor.value?.chain().focus().toggleHeading({ level: 1 }).run()
    },
  },
  {
    icon: 'i-material-symbols-format-h2-rounded',
    tooltip: t('editor.tooltip.h2'),
    isActive: editor?.value?.isActive('heading', { level: 2 }),
    event: () => {
      editor.value?.chain().focus().toggleHeading({ level: 2 }).run()
    },
  },
  {
    icon: 'i-material-symbols-format-h3-rounded',
    tooltip: t('editor.tooltip.h3'),
    isActive: editor?.value?.isActive('heading', { level: 3 }),
    event: () => {
      editor.value?.chain().focus().toggleHeading({ level: 3 }).run()
    },
  },
  {
    icon: 'i-material-symbols-format-h4-rounded',
    tooltip: t('editor.tooltip.h4'),
    isActive: editor?.value?.isActive('heading', { level: 4 }),
    event: () => {
      editor.value?.chain().focus().toggleHeading({ level: 4 }).run()
    },
  },
  {
    icon: 'i-material-symbols-format-h5-rounded',
    tooltip: t('editor.tooltip.h5'),
    isActive: editor?.value?.isActive('heading', { level: 5 }),
    event: () => {
      editor.value?.chain().focus().toggleHeading({ level: 5 }).run()
    },
  },
  {
    icon: 'i-material-symbols-format-h6-rounded',
    tooltip: t('editor.tooltip.h6'),
    isActive: editor?.value?.isActive('heading', { level: 6 }),
    event: () => {
      editor.value?.chain().focus().toggleHeading({ level: 6 }).run()
    },
  },
  {
    icon: 'i-material-symbols-format-bold-rounded',
    tooltip: t('editor.tooltip.bold'),
    isActive: editor?.value?.isActive('bold'),
    event: () => {
      editor.value?.chain().focus().toggleBold().run()
    },
  },
  {
    icon: 'i-material-symbols-format-italic-rounded',
    tooltip: t('editor.tooltip.italic'),
    isActive: editor?.value?.isActive('italic'),
    event: () => {
      editor.value?.chain().focus().toggleItalic().run()
    },
  },
  {
    icon: 'i-material-symbols-code-blocks-outline-rounded',
    tooltip: t('editor.tooltip.code'),
    isActive: editor?.value?.isActive('code'),
    event: () => {
      editor.value?.chain().focus().toggleCode().run()
    },
  },
  {
    icon: 'i-material-symbols-strikethrough-s-rounded',
    tooltip: t('editor.tooltip.strike'),
    isActive: editor?.value?.isActive('strike'),
    event: () => {
      editor.value?.chain().focus().toggleStrike().run()
    },
  },
  {
    icon: 'i-material-symbols-format-underlined-rounded',
    tooltip: t('editor.tooltip.underline'),
    isActive: editor?.value?.isActive('underline'),
    event: () => {
      editor.value?.chain().focus().toggleUnderline().run()
    },
  },
  {
    icon: 'i-material-symbols-highlight-outline-rounded',
    tooltip: t('editor.tooltip.highlight'),
    isActive: editor?.value?.isActive('highlight'),
    event: () => {
      editor.value?.chain().focus().toggleHighlight().run()
    },
  },
  {
    icon: 'i-material-symbols-superscript-rounded',
    tooltip: t('editor.tooltip.superscript'),
    isActive: editor?.value?.isActive('superscript'),
    event: () => {
      editor.value?.chain().focus().toggleSuperscript().run()
    },
  },
  {
    icon: 'i-material-symbols-subscript-rounded',
    tooltip: t('editor.tooltip.subscript'),
    isActive: editor?.value?.isActive('subscript'),
    event: () => {
      editor.value?.chain().focus().toggleSubscript().run()
    },
  },
  {
    icon: 'i-material-symbols-lists-rounded',
    tooltip: t('editor.tooltip.bulletList'),
    isActive: editor?.value?.isActive('bulletList'),
    event: () => {
      editor.value?.chain().focus().toggleBulletList().run()
    },
  },
  {
    icon: 'i-material-symbols-format-list-numbered-rounded',
    tooltip: t('editor.tooltip.orderedList'),
    isActive: editor?.value?.isActive('orderedList'),
    event: () => {
      editor.value?.chain().focus().toggleOrderedList().run()
    },
  },
  {
    icon: 'i-lucide-list-todo',
    tooltip: t('editor.tooltip.taskList'),
    isActive: editor?.value?.isActive('taskItem'),
    event: () => {
      editor.value?.chain().focus().toggleTaskList().run()
    },
  },
])

const saveFileModalVisible = ref(false)
const fileName = ref('')
const { saveHtml, saveJson, saveText } = useFileSave()
const toast = useToast()
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
  <div class="h-full">
    <div class="fixed left-56 right-4 z-10 mt-4 flex justify-between">
      <ul class="flex gap-2">
        <li v-for="item in topMeau" :key="item.icon">
          <UTooltip :text="item.tooltip">
            <UButton :icon="item.icon" size="xs" variant="soft" :class="[item.isActive && 'bg-primary-300 dark:bg-primary-700']" square @click="item.event" />
          </UTooltip>
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
    <EditorContent class="tiptap overflow-auto" :editor="editor" />
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

<style lang="scss">
.tiptap {
  position: relative;
  top: 64px;
  height: calc(100% - 64px);

  .ProseMirror.prose {
    max-height: calc(100% - 64px);

    ul[data-type="taskList"] {
      li {
        padding-left: 0;
      }

      label {
        margin-top: 0;
      }

      div {
        margin: 0;
        margin-left: 8px;
      }

      p {
        margin: 0;
      }
    }
  }
}
</style>
