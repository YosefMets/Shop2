<script setup>
import NButton from "~/components/controls/NButton.vue";

const route = useRoute();
const { items } = storeToRefs( useCartStore() );
const { total } = storeToRefs( useCartStore() );
</script>

<template>

  <Modal :show="route.query?.['cart'] !== undefined"
         :width="'40rem'"
         @close="navigateTo({ query: {...route.query, ['cart']: undefined} })">

    <template #header>{{ $t('cart') }}</template>

    <div class="cart-layout">
      <TransitionGroup name="adding" tag="div" class="cart-items">
        <CartItem  v-for="item in items" :key="item" :cartItem="item" />

        <NButton>
          <PriceRegular :amount="total" />
          {{ $t('checkout') }}
        </NButton>
      </TransitionGroup>
    </div>

  </Modal>

</template>

<style scoped>

.cart-layout {
}
.cart-items {
  display: flex;
  flex-direction: column;
  gap: .5rem;
}
</style>