<script setup>
const { params } = useRoute();
// const localePath = useLocalePath();
// const { dbArray, country } = storeToRefs( useAppStore() );
//
// const entity = dbArray.value?.find( ent => ent.S === params.slug );
//
// if (entity) {
//   const path = `/${country.value.ISO}/${entity.S}/${entity.I}`
//   navigateTo( localePath({ path }), { replace: true } );
// }
// else {
//   showError({statusCode: 404, statusMessage: 'Page Not Found', fatal: true});
// }
</script>

<template>
  <div>{{params}}</div>
</template>