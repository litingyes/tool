<script lang="ts" setup>
const { locale } = useI18n()
</script>

<template>
  <ClientOnly>
    <UPopover>
      <UButton variant="ghost" square>
        <UIcon name="i-material-symbols-language" class="text-primary-500 dark:text-primary-400 h-5 w-5" />
      </UButton>

      <template #panel>
        <ul class="w-20 text-sm">
          <li
            class="cursor-pointer p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
            :class="[locale === 'en' && 'text-primary-500 dark:text-primary-400']" @click="locale = 'en'"
          >
            English
          </li>
          <li
            class="cursor-pointer p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
            :class="[locale === 'zh' && 'text-primary-500 dark:text-primary-400']" @click="locale = 'zh'"
          >
            简体中文
          </li>
        </ul>
      </template>
    </UPopover>
  </ClientOnly>
</template>
