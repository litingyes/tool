<script setup lang="ts">
import ColorPickerPill from './ColorPickerPill.vue'
import colors from '#tailwind-config/theme/colors'

const appConfig = useAppConfig()
const colorMode = useColorMode()

const primaryColors = computed(() => useWithout(appConfig.ui.colors, 'primary').map(color => ({ value: color, text: color, hex: colors[(color as keyof typeof colors)][colorMode.value === 'dark' ? 400 : 500] })))
const primary = computed({
  get() {
    return primaryColors.value.find(item => item.value === appConfig.ui.primary)
  },
  set(item) {
    appConfig.ui.primary = item!.value
    useLocalStorage('nuxt-ui-primary', appConfig.ui.primary)
  },
})

const grayColors = computed(() => ['slate', 'cool', 'zinc', 'neutral', 'stone'].map(color => ({ value: color, text: color, hex: colors[color as keyof typeof colors][colorMode.value === 'dark' ? 400 : 500] })))
const gray = computed({
  get() {
    return grayColors.value.find(option => option.value === appConfig.ui.gray)
  },
  set(item) {
    appConfig.ui.gray = item!.value
    useLocalStorage('nuxt-ui-gray', appConfig.ui.primary)
  },
})
</script>

<template>
  <UPopover>
    <template #default="{ open }">
      <UButton variant="ghost" square :class="[open && 'bg-gray-50 dark:bg-gray-800']">
        <UIcon name="i-heroicons-swatch-20-solid" class="text-primary-500 dark:text-primary-400 h-5 w-5" />
      </UButton>
    </template>

    <template #panel>
      <div class="p-2">
        <div class="grid grid-cols-5 gap-px">
          <ColorPickerPill
            v-for="color in primaryColors" :key="color.value" :color="color" :selected="primary!.value"
            @select="primary = color"
          />
        </div>

        <hr class="my-2 border-gray-200 dark:border-gray-800">

        <div class="grid grid-cols-5 gap-px">
          <ColorPickerPill
            v-for="color in grayColors" :key="color.value" :color="color" :selected="gray!.value"
            @select="gray = color"
          />
        </div>
      </div>
    </template>
  </UPopover>
</template>
