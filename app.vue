<script setup>
const { currency, activeGroup } = storeToRefs( useAppStore() );
</script>

<template>
  <NuxtLayout>{{ currency }}
    <NuxtPage />
  </NuxtLayout>
</template>
