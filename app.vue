<script setup>
const { currency, activeGroup } = storeToRefs( useAppStore() );
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>

<!--  <Countries />-->
</template>
