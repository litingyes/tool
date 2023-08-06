<template>
  <main class="flex h-screen w-screen">
    <Sidebar />
    <div class="flex-1 overflow-auto p-4">
      <slot />
    </div>
  </main>
</template>
