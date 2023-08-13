<script setup lang="ts">
import type { NodeViewProps } from '@tiptap/vue-3'
import { NodeViewContent, NodeViewWrapper } from '@tiptap/vue-3'

const props = defineProps<NodeViewProps>()

const tableContainerRef = ref()
const isFocus = ref(false)

watchEffect(() => {
  if (props.editor.isActive('tableContainer')) {
    const { pos } = props.editor.state.selection.$anchor
    const currentFocusNode = props.editor.view.domAtPos(pos).node
    isFocus.value = (tableContainerRef.value.$el as HTMLTableElement).contains(currentFocusNode)
  }
  else {
    isFocus.value = false
  }
})

function deleteTable() {
  props.editor.chain().focus().deleteTable().run()
}
</script>

<template>
  <NodeViewWrapper ref="tableContainerRef" as="div" class="relative !mt-8" data-node-name="table-container">
    <div v-show="isFocus" class="absolute top-[-2rem] my-0 flex h-8 list-none items-center p-0">
      <UTooltip :text="$t('editor.menu.table.deleteTable')">
        <UButton icon="i-material-symbols-delete-outline-rounded" size="2xs" variant="ghost" @click="deleteTable" />
      </UTooltip>
    </div>
    <NodeViewContent class="mt-8" />
  </NodeViewWrapper>
</template>
