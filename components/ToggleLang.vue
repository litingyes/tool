<script lang="ts" setup>
const { locale } = useI18n()

const langMenu = [
  [
    {
      id: 'en',
      label: 'English',
      click: () => {
        locale.value = 'en'
      },
    },
  ],
  [
    {
      id: 'zh',
      label: '简体中文',
      click: () => {
        locale.value = 'zh'
      },
    },
  ],
]
</script>

<template>
  <UDropdown :items="langMenu" :ui="{ width: 'w-24' }">
    <UButton icon="i-material-symbols-language" size="sm" variant="ghost" square />

    <template #item="{ item }">
      <span :class="{ 'text-primary-600 dark:text-primary-400': item.id === locale }">{{ item.label }}</span>
    </template>
  </UDropdown>
</template>
