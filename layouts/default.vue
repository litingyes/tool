<script lang="ts" setup>
const links = [{
  label: 'Editor',
  children: [
    {
      label: 'BlockSuite',
      to: '/editor/blocksuite',
      badge: 'WIP',
    },
    {
      label: 'Tiptap',
      to: '/editor/tiptap',
      badge: 'WIP',
    },
  ],
}]
</script>

<template>
  <main class="flex h-screen w-screen">
    <Sidebar />
    <div class="flex-1 overflow-auto p-4">
      <slot />
    </div>
  </main>
</template>
