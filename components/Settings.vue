<script setup>
const { t } = useI18n()
const route = useRoute();
const { locale, locales } = useI18n();
const { currencies, country, currency } = storeToRefs( useAppStore() );
</script>

<template>
  <NuxtLink :to="{ query: {...route.query, ['settings']: null} }" class="ccs-call-wr">
    <div class="ccs-call">
      <NuxtImg :src="`/${country.ISO}.svg`" loading="lazy" class="ccs-flag" :alt="country.ISO" />
      <span class="ccs-current-settings">
        {{ $t(`countries.${country.ISO}`) }}
      </span>
    </div>
    <div class="ccs-call">
      {{ currency?.S }}&nbsp;{{ $t(`currencies.${currency.ISO}`) }}
    </div>
    <div class="ccs-call">
      {{ locales.find( ({ code }) => code === locale )?.N }}
    </div>
  </NuxtLink>
    <!--  <NuxtLink :to="{ query: {...route.query, settings: null} }" class="ccs-call">-->
<!--    <img :src="`/flags/${country.ISO}.svg`" loading="lazy" class="ccs-flag" :alt="country.ISO" />-->
<!--    <span class="ccs-current-settings">-->
<!--      {{ $t(`countries.${country.ISO}`) }} &bull;-->
<!--      {{ locales.find( ({ code }) => code === locale )?.N }} &bull;-->
<!--      {{ currency?.S }}&nbsp;{{ $t(`currencies.${currency.ISO}`) }}-->
<!--    </span>-->
<!--  </NuxtLink>-->

  <Modal :show="route.query?.['settings'] !== undefined"
         :width="'var(--mobar-size)'"
         :side="'left'"
         @close="navigateTo({ query: {...route.query, ['settings']: undefined} })">

    <Langs />
    <Countries />
    <Currencies />

  </Modal>
</template>

<style scoped>
.ccs-call-wr {
  margin-left: -1rem;
  padding: 0 .5rem 0 1rem;
  display: grid;
  grid-template-columns: 1fr auto auto;
  grid-template-rows: auto;
  grid-gap: .3rem;
}
.ccs-call-wr:hover {
  color: #000;
  background-color: var(--hover-bg-dark);
}
.ccs-call {
  display: flex;
  grid-gap: .5rem;
  align-items: center;
  cursor: pointer;
  padding: .4rem .3rem;
  /*height: 100%;*/
  text-decoration: none;
  transition: all .2s;
  border-radius: var(--br);
  /*white-space: nowrap;*/
  overflow: hidden;
  /*text-overflow: ellipsis;*/
}
.ccs-flag {
  width: 1.4rem;
  height: 1.4rem;
  border-radius: 50%;
  box-shadow: 0 0 0 0.15rem #fff;
}
.ccs-current-settings {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  /*width: 100%;*/

  /*display: -webkit-box;*/
  /*-webkit-line-clamp: 2;*/
  /*-webkit-box-orient: vertical;*/
  /*overflow: hidden;*/
  /*text-overflow: ellipsis;*/
  /*line-height: 1.2em;*/
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