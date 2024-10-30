<template>
  <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 2L18 18" />
    <path d="M18 2L2 18" />
  </svg>
</template>

<style scoped>
svg {
  width: 1.5rem;
  height: 1.5rem;
  display: inline-block;
  stroke: #000;
  stroke-width: .1rem;
}
svg > path {
  stroke: inherit;
  stroke-width: inherit;
  stroke-linecap: round;
  vector-effect: non-scaling-stroke;
}
</style>
