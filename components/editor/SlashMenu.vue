<script lang="ts" setup>
import type { Editor, Range } from '@tiptap/core'

export interface Item {
  label: string
  icon: string
  keys: string[]
  shortcuts: string[]
  command: (editor: Editor, range: Range) => void
}

interface Props {
  items: Item[]
  command: (item: Item) => void
}

const { items, command } = defineProps<Props>()

const activeIndex = ref(0)
function onKeyDown(event: KeyboardEvent) {
  if (event.key === 'ArrowDown') {
    activeIndex.value = (activeIndex.value + 1) % items.length
    return true
  }
  else if (event.key === 'ArrowUp') {
    activeIndex.value = (activeIndex.value - 1 + items.length) % items.length
    return true
  }
  else if (event.key === 'Enter') {
    command!(items[activeIndex.value])
  }
  return false
}

defineExpose({
  onKeyDown,
})
</script>

<template>
  <ul class="bg-primary-100 shadow-primary-500/40 overflow-hidden rounded text-gray-950 shadow">
    <li v-for="(item, i) in items" :key="item.label" class="flex items-center gap-4 px-2 py-1" :class="{ 'bg-primary-500': activeIndex === i }" @click="command(item)">
      <UIcon :name="item.icon" />
      <span class="inline-block w-24">{{ item.label }}</span>
      <div class="flex items-center gap-2">
        <UKbd v-for="kbd in item.shortcuts" :key="kbd">
          {{ kbd }}
        </UKbd>
      </div>
    </li>
  </ul>
</template>
