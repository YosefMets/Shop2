<script setup>
const { items } = storeToRefs( useCartStore() );
const { total } = storeToRefs( useCartStore() );
</script>

<template>
  <div class="cart">
    <Crumbs :entity="null" class="cart-crumbs" />

    <h1 class="cart-ttl">{{ $t('cart') }}</h1>

    <div class="cart-layout">
      <TransitionGroup name="adding" tag="div" class="cart-items">
        <CartItem  v-for="item in items" :key="item" :cartItem="item" />
      </TransitionGroup>

      <PriceRegular :amount="total" />
    </div>
  </div>
</template>

<style scoped>
.cart {
  /*display: grid;*/
  /*grid-template-columns: 30rem 1fr;*/
  /*grid-template-rows: auto auto 1fr;*/
  /*column-gap: 2rem;*/
  padding: 1rem 2rem;
}
.cart-crumbs {
  /*height: var(--mobar-el-size);*/
  /*height: 2rem;*/
  /*grid-column: 1 / -1;*/
  margin-bottom: 1rem;
}
.cart-ttl {
  /*grid-column: 1 / -1;*/
  font-size: 2.6rem;
  line-height: 1.2em;
  margin: 1rem 0;
}
.cart-layout {
  display: grid;
  grid-template-columns: 35rem 1fr;
  column-gap: 2rem;
}
.cart-items {
  display: flex;
  flex-direction: column;
  gap: .5rem;
}
</style>