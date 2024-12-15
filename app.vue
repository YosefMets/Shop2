<script setup>
const { currency, activeGroup } = storeToRefs( useAppStore() );

// if (process.server) {
  const qwe = hubDatabase()
  console.log( qwe );

  const req = qwe.prepare('SELECT * FROM Customers');
  const res = req.all();
// }

</script>

<template>={{res}}=
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>

<!--  <Countries />-->
</template>
