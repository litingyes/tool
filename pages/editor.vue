<script lang="ts" setup>
import { EditorContent } from '@tiptap/vue-3'
import { isMacOS } from '@tiptap/core'
import { z } from 'zod'

const { t } = useI18n()
const toast = useToast()

const { editor } = useEditor()

onMounted(() => {
  editor.value?.commands.focus()
})
onBeforeUnmount(() => {
  editor.value?.destroy()
})

const insertLinkOpen = ref(false)
const insertLinkFormRef = ref()
const insertLinkForm = reactive({
  url: '',
})
const insertLinkFormSchema = z.object({
  url: z.string().url(t('editor.modal.link.validateErrorMessage')),
})
function insertLinkFormValidate() {
  return insertLinkFormRef.value?.validate()
}
function insertLink() {
  insertLinkFormValidate().then(() => {
    editor.value?.chain().focus().setLink({ href: insertLinkForm.url }).run()
    insertLinkForm.url = ''
    insertLinkOpen.value = false
  })
}
function closeInsertLinkModel() {
  insertLinkForm.url = ''
  insertLinkOpen.value = false
}

const { upload } = useUpload()
const uploadImageOpen = ref(false)
const uploadImageUrl = ref('')
function uploadImage() {
  upload({
    accept: 'image/*',
    format: 'DATA_URL',
    cb: (data) => {
      uploadImageUrl.value = data
    },
  })
}
function insertImage() {
  editor.value?.chain().focus().setImage({ src: uploadImageUrl.value }).run()
  uploadImageUrl.value = ''
  uploadImageOpen.value = false
}
function closeUploadImageModal() {
  uploadImageUrl.value = ''
  uploadImageOpen.value = false
}

const Cmd = isMacOS() ? 'Cmd' : 'Control'
const Option = isMacOS() ? 'Option' : 'Alt'
const topMenu = computed(() => [
  {
    icon: 'i-healthicons-t',
    tooltip: t('editor.tooltip.text'),
    shortcuts: [Cmd, Option, '0'],
    isActive: editor?.value?.isActive('text'),
    event: () => {
      editor.value?.chain().focus().clearNodes().unsetAllMarks().run()
    },
  },
  {
    icon: 'i-material-symbols-format-h1-rounded',
    tooltip: t('editor.tooltip.h1'),
    shortcuts: [Cmd, Option, '1'],
    isActive: editor?.value?.isActive('heading', { level: 1 }),
    event: () => {
      editor.value?.chain().focus().toggleHeading({ level: 1 }).run()
    },
  },
  {
    icon: 'i-material-symbols-format-h2-rounded',
    tooltip: t('editor.tooltip.h2'),
    shortcuts: [Cmd, Option, '2'],
    isActive: editor?.value?.isActive('heading', { level: 2 }),
    event: () => {
      editor.value?.chain().focus().toggleHeading({ level: 2 }).run()
    },
  },
  {
    icon: 'i-material-symbols-format-h3-rounded',
    tooltip: t('editor.tooltip.h3'),
    shortcuts: [Cmd, Option, '3'],
    isActive: editor?.value?.isActive('heading', { level: 3 }),
    event: () => {
      editor.value?.chain().focus().toggleHeading({ level: 3 }).run()
    },
  },
  {
    icon: 'i-material-symbols-format-h4-rounded',
    tooltip: t('editor.tooltip.h4'),
    shortcuts: [Cmd, Option, '4'],
    isActive: editor?.value?.isActive('heading', { level: 4 }),
    event: () => {
      editor.value?.chain().focus().toggleHeading({ level: 4 }).run()
    },
  },
  {
    icon: 'i-material-symbols-format-h5-rounded',
    tooltip: t('editor.tooltip.h5'),
    shortcuts: [Cmd, Option, '5'],
    isActive: editor?.value?.isActive('heading', { level: 5 }),
    event: () => {
      editor.value?.chain().focus().toggleHeading({ level: 5 }).run()
    },
  },
  {
    icon: 'i-material-symbols-format-h6-rounded',
    tooltip: t('editor.tooltip.h6'),
    shortcuts: [Cmd, Option, '6'],
    isActive: editor?.value?.isActive('heading', { level: 6 }),
    event: () => {
      editor.value?.chain().focus().toggleHeading({ level: 6 }).run()
    },
  },
  {
    icon: 'i-material-symbols-format-list-numbered-rounded',
    tooltip: t('editor.tooltip.orderedList'),
    shortcuts: [Cmd, 'Shift', '7'],
    isActive: editor?.value?.isActive('orderedList'),
    event: () => {
      editor.value?.chain().focus().toggleOrderedList().run()
    },
  },
  {
    icon: 'i-material-symbols-lists-rounded',
    tooltip: t('editor.tooltip.bulletList'),
    shortcuts: [Cmd, 'Shift', '8'],
    isActive: editor?.value?.isActive('bulletList'),
    event: () => {
      editor.value?.chain().focus().toggleBulletList().run()
    },
  },
  {
    icon: 'i-lucide-list-todo',
    tooltip: t('editor.tooltip.taskList'),
    shortcuts: [Cmd, 'Shift', '9'],
    isActive: editor?.value?.isActive('taskItem'),
    event: () => {
      editor.value?.chain().focus().toggleTaskList().run()
    },
  },
  {
    icon: 'i-material-symbols-format-bold-rounded',
    tooltip: t('editor.tooltip.bold'),
    shortcuts: [Cmd, 'B'],
    isActive: editor?.value?.isActive('bold'),
    event: () => {
      editor.value?.chain().focus().toggleBold().run()
    },
  },
  {
    icon: 'i-material-symbols-code-blocks-outline-rounded',
    tooltip: t('editor.tooltip.code'),
    shortcuts: [Cmd, 'E'],
    isActive: editor?.value?.isActive('code'),
    event: () => {
      editor.value?.chain().focus().toggleCode().run()
    },
  },
  {
    icon: 'i-material-symbols-format-italic-rounded',
    tooltip: t('editor.tooltip.italic'),
    shortcuts: [Cmd, 'I'],
    isActive: editor?.value?.isActive('italic'),
    event: () => {
      editor.value?.chain().focus().toggleItalic().run()
    },
  },
  {
    icon: 'i-material-symbols-format-underlined-rounded',
    tooltip: t('editor.tooltip.underline'),
    shortcuts: [Cmd, 'U'],
    isActive: editor?.value?.isActive('underline'),
    event: () => {
      editor.value?.chain().focus().toggleUnderline().run()
    },
  },
  {
    icon: 'i-material-symbols-superscript-rounded',
    tooltip: t('editor.tooltip.superscript'),
    shortcuts: [Cmd, '.'],
    isActive: editor?.value?.isActive('superscript'),
    event: () => {
      editor.value?.chain().focus().toggleSuperscript().run()
    },
  },
  {
    icon: 'i-material-symbols-subscript-rounded',
    tooltip: t('editor.tooltip.subscript'),
    shortcuts: [Cmd, ','],
    isActive: editor?.value?.isActive('subscript'),
    event: () => {
      editor.value?.chain().focus().toggleSubscript().run()
    },
  },
  {
    icon: 'i-material-symbols-highlight-outline-rounded',
    tooltip: t('editor.tooltip.highlight'),
    shortcuts: [Cmd, 'Shift', 'H'],
    isActive: editor?.value?.isActive('highlight'),
    event: () => {
      editor.value?.chain().focus().toggleHighlight().run()
    },
  },
  {
    icon: 'i-material-symbols-strikethrough-s-rounded',
    tooltip: t('editor.tooltip.strike'),
    shortcuts: [Cmd, 'Shift', 'X'],
    isActive: editor?.value?.isActive('strike'),
    event: () => {
      editor.value?.chain().focus().toggleStrike().run()
    },
  },
  {
    icon: 'i-material-symbols-format-align-left-rounded',
    tooltip: t('editor.tooltip.textAlignLeft'),
    shortcuts: [Cmd, 'Shift', 'L'],
    isActive: editor?.value?.isActive({ textAlign: 'left' }),
    event: () => {
      editor.value?.chain().focus().setTextAlign('left').run()
    },
  },
  {
    icon: 'i-material-symbols-format-align-center-rounded',
    tooltip: t('editor.tooltip.textAlignCenter'),
    shortcuts: [Cmd, 'Shift', 'E'],
    isActive: editor?.value?.isActive({ textAlign: 'center' }),
    event: () => {
      editor.value?.chain().focus().setTextAlign('center').run()
    },
  },
  {
    icon: 'i-material-symbols-format-align-right-rounded',
    tooltip: t('editor.tooltip.textAlignRight'),
    shortcuts: [Cmd, 'Shift', 'R'],
    isActive: editor?.value?.isActive({ textAlign: 'right' }),
    event: () => {
      editor.value?.chain().focus().setTextAlign('right').run()
    },
  },
  {
    icon: 'i-material-symbols-format-align-justify-rounded',
    tooltip: t('editor.tooltip.textAlignJustify'),
    shortcuts: [Cmd, 'Shift', 'J'],
    isActive: editor?.value?.isActive({ textAlign: 'justify' }),
    event: () => {
      editor.value?.chain().focus().setTextAlign('justify').run()
    },
  },
  {
    icon: 'i-majesticons-table-line',
    isActive: editor?.value?.isActive('table'),
    event: () => {
      if (!editor?.value?.isActive('table')) {
        editor.value?.chain().focus().insertTable({
          rows: 3,
          cols: 5,
          withHeaderRow: true,
        }).run()
      }
    },
  },
  {
    icon: 'i-material-symbols-link-rounded',
    tooltip: t('editor.tooltip.link'),
    isActive: editor?.value?.isActive('link'),
    event: () => {
      insertLinkOpen.value = true
    },
  },
  {
    icon: 'i-material-symbols-imagesmode-outline-rounded',
    tooltip: t('editor.tooltip.image'),
    isActive: editor?.value?.isActive('table'),
    event: () => {
      uploadImageOpen.value = true
    },
  },
])

const tableMenu = computed(() => [
  [{
    label: t('editor.menu.table.addColumnBefore'),
    click: () => {
      editor.value?.chain().focus().addColumnBefore().run()
    },
  }],
  [{
    label: t('editor.menu.table.addColumnAfter'),
    click: () => {
      editor.value?.chain().focus().addColumnAfter().run()
    },
  }],
  [{
    label: t('editor.menu.table.deleteColumn'),
    click: () => {
      editor.value?.chain().focus().deleteColumn().run()
    },
  }],
  [{
    label: t('editor.menu.table.addRowBefore'),
    click: () => {
      editor.value?.chain().focus().addRowBefore().run()
    },
  }],
  [{
    label: t('editor.menu.table.addRowAfter'),
    click: () => {
      editor.value?.chain().focus().addRowAfter().run()
    },
  }],
  [{
    label: t('editor.menu.table.deleteRow'),
    click: () => {
      editor.value?.chain().focus().deleteRow().run()
    },
  }], [{
    label: t('editor.menu.table.deleteTable'),
    click: () => {
      editor.value?.chain().focus().deleteTable().run()
    },
  }],
  [{
    label: t('editor.menu.table.mergeCells'),
    click: () => {
      editor.value?.chain().focus().mergeCells().run()
    },
  }],
  [{
    label: t('editor.menu.table.splitCell'),
    click: () => {
      editor.value?.chain().focus().splitCell().run()
    },
  }],
  [{
    label: t('editor.menu.table.toggleHeaderColumn'),
    click: () => {
      editor.value?.chain().focus().toggleHeaderColumn().run()
    },
  }],
  [{
    label: t('editor.menu.table.toggleHeaderRow'),
    click: () => {
      editor.value?.chain().focus().toggleHeaderRow().run()
    },
  }],
  [{
    label: t('editor.menu.table.toggleHeaderCell'),
    click: () => {
      editor.value?.chain().focus().toggleHeaderCell().run()
    },
  }],
])

const importMenu = [
  [{
    label: 'HTML',
    icon: 'i-logos-html-5',
    click: () => {
      upload({
        accept: '.html',
        cb: (data) => {
          editor.value?.commands.setContent(data)
          toast.add({
            title: t('editor.import.success'),
            icon: 'i-mdi-check-circle-outline',
            color: 'green',
            timeout: 2000,
            ui: {
              title: 'text-green-500',
            },
          })
        },
      })
    },
  }],
  [{
    label: 'JSON',
    icon: 'i-vscode-icons-file-type-light-json',
    click: () => {
      upload({
        accept: '.json',
        cb: (data) => {
          try {
            editor.value?.commands.setContent(JSON.parse(data))
            toast.add({
              title: t('editor.import.success'),
              icon: 'i-mdi-check-circle-outline',
              color: 'green',
              timeout: 2000,
              ui: {
                title: 'text-green-500',
              },
            })
          }
          catch (e) {
            toast.add({
              title: t('editor.import.failed'),
              icon: 'i-codicon-error',
              color: 'red',
              timeout: 2000,
              ui: {
                title: 'text-red-500',
              },
            })
          }
        },
      })
    },
  }],
]

const saveFileModalVisible = ref(false)
const fileName = ref('')
const { saveHtml, saveJson, saveText } = useFileSave()
const saveFileType = ref<'HTML' | 'JSON' | 'TEXT'>()
const outputMenu = [
  [{
    label: 'HTML',
    icon: 'i-logos-html-5',
    click: () => {
      fileName.value = ''
      saveFileType.value = 'HTML'
      saveFileModalVisible.value = true
    },
  }],
  [{
    label: 'JSON',
    icon: 'i-vscode-icons-file-type-light-json',
    click: () => {
      fileName.value = ''
      saveFileType.value = 'JSON'
      saveFileModalVisible.value = true
    },
  }],
  [{
    label: 'TEXT',
    icon: 'i-fluent-text-12-filled',
    click: () => {
      fileName.value = ''
      saveFileType.value = 'TEXT'
      saveFileModalVisible.value = true
    },
  }],
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
        <li v-for="item in topMenu" :key="item.icon">
          <UDropdown v-if="item.icon === 'i-majesticons-table-line'" :items="tableMenu" mode="hover" :disabled="!editor?.isActive('table')" :popper="{ placement: 'bottom-start' }" :ui="{ width: 'w-44' }">
            <UButton :icon="item.icon" size="xs" variant="soft" class="transition-colors" :class="[item.isActive && '!bg-primary-200 dark:!bg-primary-800']" square @click="item.event" />
          </UDropdown>
          <UTooltip v-else :text="item.tooltip" :shortcuts="item.shortcuts">
            <UButton :icon="item.icon" size="xs" variant="soft" class="transition-colors" :class="[item.isActive && '!bg-primary-200 dark:!bg-primary-800']" square @click="item.event" />
          </UTooltip>
        </li>
      </ul>
      <ul class="flex gap-2">
        <li>
          <UDropdown
            :items="importMenu" mode="hover" :ui="{ width: 'w-24' }"
          >
            <UButton size="xs" variant="outline" :label="$t('editor.import.label')" />
          </UDropdown>
        </li>
        <li>
          <UDropdown :items="outputMenu" mode="hover" :popper="{ placement: 'bottom-start' }" :ui="{ width: 'w-24' }">
            <UButton size="xs" variant="outline" :label="$t('editor.output.label')" />
          </UDropdown>
        </li>
      </ul>
    </div>
    <EditorContent class="tiptap overflow-auto" :editor="editor" />
    <ul class="text-primary-600 dark:text-primary-400 fixed bottom-4 right-4 w-28 text-sm">
      <li>{{ $t('editor.info.characters') }}: {{ editor?.storage.characterCount.characters() }}</li>
      <li>{{ $t('editor.info.words') }}: {{ editor?.storage.characterCount.words() }}</li>
    </ul>
    <UModal v-model="insertLinkOpen">
      <UCard>
        <template #header>
          <h1>{{ $t('editor.modal.link.title') }}</h1>
        </template>
        <UForm ref="insertLinkFormRef" :state="insertLinkForm" :schema="insertLinkFormSchema">
          <UFormGroup name="url">
            <UInput v-model="insertLinkForm.url" :placeholder="t('editor.modal.link.placeholder')" @input="insertLinkFormRef?.validate" @blur="insertLinkFormRef?.validate" />
          </UFormGroup>
        </UForm>
        <template #footer>
          <div class="flex justify-end gap-2">
            <UButton
              variant="solid"
              @click="insertLink"
            >
              {{ $t('form.confirm') }}
            </UButton>
            <UButton
              variant="outline"
              @click="closeInsertLinkModel"
            >
              {{ $t('form.cancel') }}
            </UButton>
          </div>
        </template>
      </UCard>
    </UModal>
    <UModal v-model="uploadImageOpen">
      <UCard icon="i-ic-round-upload" variant="outline">
        <template #header>
          <h1>{{ $t('editor.modal.image.title') }}</h1>
        </template>
        <UInput v-model="uploadImageUrl" :ui="{ icon: { trailing: { pointer: '' } } }">
          <template #trailing>
            <UButton
              variant="link"
              icon="i-material-symbols-upload-rounded"
              :padded="false"
              @click="uploadImage"
            />
          </template>
        </UInput>
        <template #footer>
          <div class="flex justify-end gap-2">
            <UButton
              variant="solid"
              @click="insertImage"
            >
              {{ $t('form.confirm') }}
            </UButton>
            <UButton
              variant="outline"
              @click="closeUploadImageModal"
            >
              {{ $t('form.cancel') }}
            </UButton>
          </div>
        </template>
      </UCard>
    </UModal>
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
