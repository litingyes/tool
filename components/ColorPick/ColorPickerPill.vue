<script setup lang="ts">
defineProps<{ color: { value: string; hex: string }; selected: string }>()
defineEmits(['select'])
</script>

<template>
  <UTooltip :text="color.value" class="capitalize" :open-delay="500">
    <UButton
      color="gray" square :ui="{
        color: {
          gray: {
            solid: 'bg-gray-100 dark:bg-gray-800',
            ghost: 'hover:bg-gray-50 dark:hover:bg-gray-800/50',
          },
        },
      }" :variant="color.value === selected ? 'solid' : 'ghost'" @click.stop.prevent="$emit('select')"
    >
      <span class="inline-block h-3 w-3 rounded-full" :style="{ backgroundColor: color.hex }" />
    </UButton>
  </UTooltip>
</template>
