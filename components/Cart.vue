<script setup>
import NButton from "~/components/controls/NButton.vue";
import SvgTrack from "~/components/imgs/svg-track.vue";

const route = useRoute();
const { items } = storeToRefs( useCartStore() );
const { total } = storeToRefs( useCartStore() );
</script>

<template>

  <Modal :show="route.query?.['cart'] !== undefined"
         :width="'35rem'"
         @close="navigateTo({ query: {...route.query, ['cart']: undefined} })">

    <template #header>
        {{ $t('cart') }}
        <PriceRegular :amount="total" class="cart-total" />
    </template>

    <div class="cart-layout">
      <TransitionGroup name="adding" tag="div" class="cart-items">
        <CartItem  v-for="item in items" :key="item" :cartItem="item" />

        <div class="chck-delivery">
          <SvgTrack class="chck-delivery-ic" />
          <div class="chck-delivery-lbl">{{ $t('delivery') }}</div>
          <PriceRegular :amount="10" class="chck-delivery-price" />
        </div>

        <form action="" class="chck-form">
          <input type="email"
                 autocomplete="email"
                 required
                 class="chck-email"
                 :placeholder="$t('email4Checkout')" />
          <NButton>{{ $t('checkout') }}</NButton>
        </form>

<!--        <NButton>-->
<!--          <div class="chck-btn-cont">-->
<!--            <i></i>-->
<!--            {{ $t('checkout') }}-->
<!--            <PriceRegular :amount="total" class="chck-btn-price" />-->
<!--          </div>-->
<!--        </NButton>-->

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
  gap: 1rem;
}
.cart-total {
  margin-right: 1rem;
  font-size: 1rem;
  align-self: end;
  line-height: 1em;
}
.chck-btn-cont {
  width: 100%;
  display: grid;
  grid-template-columns: 5rem 1fr 5rem;
}
.chck-btn-price {
  justify-self: end;
}
.chck-delivery {
  display: grid;
  grid-template-columns: 4rem 1fr auto;
  align-items: center;
  padding: 1rem 1rem 1rem .5rem;
  border: .2rem solid #fff;
  gap: .5rem;
}
svg.chck-delivery-ic {
  stroke: #000;
  width: 2rem;
  height: 2rem;
  justify-self: center;
}
.chck-delivery-lbl {

}
.chck-delivery-price {

}
.chck-form {
  display: grid;
  grid-template-columns: 1fr 30%;
  position: sticky;
  bottom: 0;
}
.chck-email {
  appearance: none;
  background-color: #fff;
  border: .1rem solid var(--contr);
  padding: 0 1rem;
}
</style>