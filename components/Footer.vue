<script setup>
import NLink from "~/components/controls/NLink.vue";
</script>

<template>
  <footer class="app-footer">
    <div class="copy-group">
      <span>&copy; {{ $t('allRights') }} The company name</span>
      <NLink :to="'/terms'" class="copy-group-link">{{ $t('terms') }}</NLink>
      <NLink :to="'/privacy'" class="copy-group-link">{{ $t('privacy') }}</NLink>
    </div>
  </footer>
</template>

<style scoped>
.app-footer {
  padding: 1.8rem 2rem;
}
.copy-group {
  display: flex;
  gap: 1rem;
  color: var(--dark);
}
.copy-group > .copy-group-link {
  color: #000;
}

@media (max-width: 480px) {
  .app-footer {
    padding: 1rem;
    background-color: var(--bg);
  }
}
</style>