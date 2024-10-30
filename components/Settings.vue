<script setup>
const { t } = useI18n()
const route = useRoute();
const { locale, locales } = useI18n();
const { currencies, country, currency } = storeToRefs( useAppStore() );
</script>

<template>
  <NuxtLink :to="{ query: {...route.query, settings: null} }" class="ccs-call">
    <img :src="`/flags/${country.ISO}.svg`" loading="lazy" class="ccs-flag" :alt="country.ISO" />
    <span class="ccs-current-settings">
      {{ $t(`countries.${country.ISO}`) }},
      {{ locales.find( ({ code }) => code === locale )?.N }},
      {{ currency?.S }}&nbsp;{{ $t(`currencies.${currency.ISO}`) }}
    </span>
  </NuxtLink>

  <Modal :show="route.query?.settings !== undefined"
         :width="'40rem'"
         @close="navigateTo({ query: {...route.query, settings: undefined} })">

    <Langs />

    <Currencies />

    <Countries />

  </Modal>
</template>

<style scoped>
.ccs-call {
  display: flex;
  grid-gap: .5rem;
  align-items: center;
  cursor: pointer;
  padding: 0 1rem;
  height: 100%;
  transition: background-color .1s linear;
  color: #000;
  text-decoration: none;
}
.ccs-call:hover {
  /*color: var(--active);*/
  background-color: var(--active-light);
}
.ccs-flag {
  width: 2.4rem;
  height: 2.4rem;
  border-radius: 50%;
}
.ccs-current-settings {
  /*text-overflow: ellipsis;*/
  /*white-space: nowrap;*/
  /*overflow: hidden;*/

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.2em;
}

.ccs-ttl {
  margin-top: 3rem;
  margin-bottom: 1rem;
  font-size: 1.6rem;
  line-height: 1em;
  font-weight: 500;
}
.ccs-ttl:first-of-type { margin-top: 0; }



@media (max-width: 480px) {
  .ccs-call {
    padding: 0;
    justify-content: center;
  }
  .ccs-flag {
    width: 2rem;
    height: 2rem;
  }
  .ccs-current-settings { display: none; }
}
</style>