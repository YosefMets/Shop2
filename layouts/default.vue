<script setup>
</script>

<template>
  <div class="store-layout">
    <section class="body-store-layout">
      <slot />
    </section>
    <div class="mr-store-layout">
      <Mobar />
    </div>
  </div>
</template>

<style scoped>
.store-layout {
  min-height: 100vh;
  display: grid;
  grid-template-columns: var(--mobar-size) 1fr;
  grid-template-areas: "mr body";
}
.mr-store-layout {
  grid-area: mr;
  position: sticky;
  top: 0;
  height: 100vh;
  z-index: 200;
  padding: .5rem 0 .5rem .5rem;
}
.vd-store-layout { grid-area: vd; }
.body-store-layout { grid-area: body; }
</style>