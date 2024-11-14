<script setup>
</script>

<template>
  <div class="store-layout">
    <section class="body-store-layout">
      <slot />
<!--      <Footer />-->
    </section>
    <div class="mr-store-layout">
      <Mobar />
    </div>
    <div class="footer-store-layout">
      <Footer />
    </div>
  </div>
</template>

<style scoped>
.store-layout {
  min-height: 100vh;
  display: grid;
  grid-template-columns: var(--mobar-size) 1fr;
  grid-template-rows: 1fr auto;
  grid-template-areas:
      "mr body"
      "mr footer";
}
.mr-store-layout {
  grid-area: mr;
  position: sticky;
  top: 0;
  height: 100vh;
  z-index: 200;
  /*padding: 0;*/
}
.vd-store-layout { grid-area: vd; }
.body-store-layout { grid-area: body; }
.ooter-store-layout { grid-area: footer; }
</style>