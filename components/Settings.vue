<script setup>
const { t } = useI18n()
const route = useRoute();
const { locale, locales } = useI18n();
const { currencies, country, currency } = storeToRefs( useAppStore() );
</script>

<template>
  <NuxtLink :to="{ query: {...route.query, ['choose-country']: null} }" class="ccs-call">
    <NuxtImg :src="`/${country.ISO}.svg`" loading="lazy" class="ccs-flag" :alt="country.ISO" />
    <span class="ccs-current-settings">
      {{ $t(`countries.${country.ISO}`) }}
    </span>
  </NuxtLink>
  <NuxtLink :to="{ query: {...route.query, ['choose-currency']: null} }" class="ccs-call">
    {{ currency?.S }}&nbsp;{{ $t(`currencies.${currency.ISO}`) }}
  </NuxtLink>
  <NuxtLink :to="{ query: {...route.query, ['choose-language']: null} }" class="ccs-call">
    {{ locales.find( ({ code }) => code === locale )?.N }}
  </NuxtLink>
    <!--  <NuxtLink :to="{ query: {...route.query, settings: null} }" class="ccs-call">-->
<!--    <img :src="`/flags/${country.ISO}.svg`" loading="lazy" class="ccs-flag" :alt="country.ISO" />-->
<!--    <span class="ccs-current-settings">-->
<!--      {{ $t(`countries.${country.ISO}`) }} &bull;-->
<!--      {{ locales.find( ({ code }) => code === locale )?.N }} &bull;-->
<!--      {{ currency?.S }}&nbsp;{{ $t(`currencies.${currency.ISO}`) }}-->
<!--    </span>-->
<!--  </NuxtLink>-->

  <Langs />
  <Currencies />
  <Countries />
</template>

<style scoped>
.ccs-call {
  display: flex;
  grid-gap: .5rem;
  align-items: center;
  cursor: pointer;
  padding: .4rem .3rem;
  /*height: 100%;*/
  color: #fff;
  text-decoration: none;
  transition: all .2s;
  border-radius: var(--br);
  /*white-space: nowrap;*/
  overflow: hidden;
  /*text-overflow: ellipsis;*/
}
.ccs-call:hover {
  /*color: var(--active);*/
  background-color: var(--hover-bg-dark);
  /*padding-left: .3rem;*/
  /*padding-right: .3rem;*/
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