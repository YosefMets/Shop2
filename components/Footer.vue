<script setup>
import NLink from "~/components/controls/NLink.vue";
import Terms from "~/components/Terms.vue";
import NButton from "~/components/controls/NButton.vue";

const showArticle = ref(false);

const articleTitle = ref(null);
const articleBody = ref(null);

const showLaw = ( article ) => {
  articleTitle.value = article.title;
  articleBody.value = article.body;

  showArticle.value = true;
}
</script>

<template>
  <footer class="app-footer">
    <div class="copy-group">
      <span>&copy; {{ $t('allRights') }} The company name</span>
      <NLink :to="'/terms'" class="copy-group-link">
        <span @click.prevent="showLaw({ title: $t('terms'), body: Terms })">{{ $t('terms') }}</span>
      </NLink>
      <NLink :to="'/privacy'" class="copy-group-link">{{ $t('privacy') }}</NLink>
    </div>
  </footer>

  <Modal :show="showArticle"
         :width="'40rem'"
         :mobile-full-height="true"
         @close="showArticle = false">

    <template #header>{{ articleTitle }}</template>

    <Component v-if="typeof articleBody === 'object'" :is="articleBody"></Component>
    <template v-else>{{ articleBody }}</template>

    <template #footer>
      <NButton >Шеф, всё понял</NButton>
    </template>

  </Modal>
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