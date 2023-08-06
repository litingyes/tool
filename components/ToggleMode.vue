<script lang="ts" setup>
const colorMode = useColorMode()

const isDark = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set() {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  },
})
</script>

<template>
  <ClientOnly>
    <UButton variant="ghost" square @click="isDark = !isDark">
      <UIcon
        :name="isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'"
        class="text-primary-500 dark:text-primary-400 h-5 w-5"
      />
    </UButton>

    <template #fallback>
      <div class="h-8 w-8" />
    </template>
  </ClientOnly>
</template>
