<script lang="ts" setup>
const { t } = useI18n()

const links = computed(() => [{
  label: t('editor.label'),
  icon: 'i-material-symbols-edit',
  to: '/editor',
  badge: 'WIP',
}])
</script>

<template>
  <div class="border-primary-300 w-52 border-r-2 px-4 py-8 dark:border-gray-700">
    <span class="ml-3 text-xl font-bold">{{ $t("title") }}</span>
    <div class="my-2 ml-3 flex items-center gap-2">
      <ToggleMode />
      <ColorPick />
      <ToggleLang />
      <UButton
        icon="i-mdi-github" size="sm" square variant="ghost" to="https://github.com/liting-yes/tool.git"
        target="_blank"
      />
    </div>
    <UVerticalNavigation :links="links" />
  </div>
</template>
