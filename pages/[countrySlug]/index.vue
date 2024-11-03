<script setup>
const { db, dbSlug, dirs } = storeToRefs( useAppStore() )
</script>

<template>
  <div class="landing">
    {{ db }}
  </div>
</template>

<style scoped>
</style>