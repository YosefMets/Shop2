<script setup>
const { params } = useRoute();
const { db } = storeToRefs( useAppStore() );

const entity = db.value['01' + params.id];
</script>

<template>
  <div>{{ entity }}</div>
</template>

<style scoped>

</style>