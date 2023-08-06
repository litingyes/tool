<script lang="ts" setup>
const colorMode = useColorMode()
const isDark = computed({
  get: () => colorMode.value === 'dark',
  set: (val) => {
    if (val)
      colorMode.value = 'dark'
    else
      colorMode.value = 'light'
  },
})

const links = [{
  label: 'Editor',
  children: [
    {
      label: 'BlockSuite',
      to: '/editor/blocksuite',
      badge: 'WIP',
    },
    {
      label: 'TipTap',
      to: '/editor/tiptap',
      badge: 'WIP',
    },
  ],
}]
</script>

<template>
  <main class="flex h-screen w-screen">
    <div class="border-primary-300 dark:border-cool-700 w-52 border-r-2 px-4 py-8">
      <div class="mb-2 flex items-center gap-4 px-3">
        <span class="font-smiley text-xl font-bold">Tool</span>
        <UToggle
          v-model="isDark" off-icon="i-material-symbols-light-mode-outline"
          on-icon="i-material-symbols-dark-mode-outline"
        />
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
