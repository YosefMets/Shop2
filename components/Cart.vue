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
          <div class="chck-btn-cont">
            <i></i>
            {{ $t('checkout') }}
            <PriceRegular :amount="total" class="chck-btn-price" />
          </div>
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
.chck-btn-cont {
  width: 100%;
  display: grid;
  grid-template-columns: 5rem 1fr 5rem;
}
.chck-btn-price {
  justify-self: end;
}
</style>