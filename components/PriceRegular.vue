<script setup>
import {storeToRefs} from "pinia";
import {useAppStore} from "@/stores/appStore";

const { currency } = storeToRefs(useAppStore())
const p = defineProps({
  price: {
    type: Number,
    required: true,
  },
  convert: {
    type: Boolean,
    default: true
  }
})

const currentCurrencyPrice = computed( () => p.convert ? usePriceInCurrentCurrency(p.price) : p.price);
</script>

<template>
  <i18n-n :value="currentCurrencyPrice" format="currency" tag="b" class="prc-out" :scope="'global'">
    <template v-slot:currency="slotProps">{{ currency.S }}</template>
  </i18n-n>
</template>

<style scoped>
.prc-out {
  font-weight: 400;
}
.prc-out > .currency {
  font-style: normal;
}
.prc-out > .literal {
  font-style: normal;
  font-size: .5rem;
  line-height: 1em;
}
</style>
