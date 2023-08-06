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
    <div class="border-primary-300 w-52 border-r-2 px-4 py-8 dark:border-gray-700">
      <span class="ml-3 text-xl font-bold">Tool</span>
      <div class="my-2 ml-3 flex items-center gap-2">
        <ToggleMode />
        <ColorPick />
        <UButton
          icon="i-mdi-github" size="sm" square variant="ghost" to="https://github.com/liting-yes/tool.git"
          target="_blank"
        />
      </div>
      <UVerticalNavigation :links="links">
        <template #default="{ link }">
          <div class="relative w-full text-left">
            <div class="mb-2">
              {{ link.label }}
            </div>
            <UVerticalNavigation :links="link.children" />
          </div>
        </template>
      </UVerticalNavigation>
    </div>

    <div class="flex-1 overflow-auto p-4">
      <slot />
    </div>
  </main>
</template>
