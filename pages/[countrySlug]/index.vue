<script setup>
const { db, dbSlug, dirs } = storeToRefs( useAppStore() )
</script>

<template>
  <div class="landing">
    {{ dirs }}
  </div>
</template>

<style scoped>
</style>