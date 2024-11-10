<script setup>
import {useCartStore} from "~/stores/cartStore";
import {useAppStore} from "~/stores/appStore";

const p = defineProps({
  cartItem: Object,
  small: Boolean
});
const qty = ref(p.cartItem.qty);

const { storage } = storeToRefs( useAppStore() );
const storageQty = computed( () => {
  const qtys = p.cartItem.item.Q?.[storage.value?.I]
  return p.cartItem.size ? qtys.find( q => q[0] === p.cartItem.size)?.[1] : qtys
} )

const cartStore = useCartStore();

// watch(qty, (newVal) => { p.cartItem.qty = newVal; });
watch(p.cartItem, (newVal) => {
  // console.log('storageQty', storageQty.value, 'p.cartItem', newVal);
  if (newVal.qty <= 0) cartStore.remove(newVal.item, newVal.size);
  else if (newVal.qty > storageQty.value) qty.value = newVal.qty = storageQty.value;
  else qty.value = newVal.qty;
}, { deep: true });

const minus = () => { --p.cartItem.qty }
const plus = () => { ++p.cartItem.qty }
const format = () => { qty.value = (qty.value.replace(/[\D]/g, '') * 1 || 1) }
</script>

<template>
  <div :class="{ 'qty-cntr-s': p.small }">
    <button @click="minus">&minus;</button>
    <input v-model="qty"
           @input="format"
           @change="p.cartItem.qty = qty"
           @keypress.enter="$event.target.blur()" />
    <button @click="plus">&plus;</button>
  </div>
</template>

<style scoped>
div {
  display: inline-grid;
  grid-template-columns: auto 1fr auto;
  align-items: stretch;
  width: 8rem;
  background-color: #fff;
  /*border-radius: var(--border-radius);*/
  color: #000;
  font-weight: 600;
  /*box-shadow: 0 0.05rem 0.1rem 0 #000000c7;*/
  border: 0.1rem solid var(--contr);
}

button {
  width: 3rem;
  min-height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 50%;
  background-color: transparent;
  color: inherit;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0;
}
.qty-cntr-s button {
  width: 2.2rem;
  height: 2.2rem;
}

input {
  border: none;
  background-color: transparent;
  width: 100%;
  padding: 0;
  text-align: center;
  font-weight: 600;
}

@media (max-width: 480px) {
  button {
    /*width: 4rem;*/
    /*height: 4rem;*/
  }
}
</style>
