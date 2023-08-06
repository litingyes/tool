<script lang="ts" setup>
const { locale } = useI18n()
</script>

<template>
  <UPopover>
    <UButton icon="i-material-symbols-language" size="sm" variant="ghost" square />

    <template #panel>
      <ul class="w-20 text-sm">
        <li
          class="cursor-pointer px-2 py-1 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
          :class="[locale === 'en' ? 'text-primary-500 dark:text-primary-400' : 'hover:text-primary-600 hover:dark:text-primary-300']" @click="locale = 'en'"
        >
          English
        </li>
        <li
          class="cursor-pointer px-2 py-1 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
          :class="[locale === 'zh' ? 'text-primary-500 dark:text-primary-400' : 'hover:text-primary-600 hover:dark:text-primary-300']" @click="locale = 'zh'"
        >
          简体中文
        </li>
      </ul>
    </template>
  </UPopover>
</template>
