<script setup>
import SvgX from "./imgs/svg-x.vue";
import NLink from "~/components/controls/NLink";
import SvgTrash from "~/components/imgs/svg-trash.vue";

const props = defineProps({ cartItem: Object });

const appStore = useAppStore();
const { db, country } = storeToRefs( appStore );

const cartStore = useCartStore()

const item = ref(props.cartItem.item);
const size = ref(props.cartItem.size);
// const images = useImageURL(item.value, { preview: true });
const brandName = computed(()=> db.value[item.value.B]?.N )
</script>

<template>
  <div class="cart-item" :title="item.N">
    {{ item.N }}
    <CartItemQuantity :cart-item="cartItem" />
    <Price :amount="item.price" />
    <div class="ci-det">
      {{ item.N }}
    </div>
<!--    <div class="cart-item-acts">-->
<!--      <ControlQuantity :cartItem="cartItem" class="calc"/>-->
<!--    </div>-->
  </div>
</template>

<style scoped>
.cart-item {
  padding: .6rem;
  /*background-color: var(--bg);*/
  display: flex;
  flex-direction: column;
  grid-gap: .3rem;
  position: relative;
  transition: all .3s;
  z-index: 10;
  width: 100%;
  /*border-radius: var(--border-radius);*/
  color: #000;
  /*box-shadow: 0 .1rem .1rem -.1rem #000;*/
  border-bottom: 0.1rem solid var(--contr);
}

.ci-i-wr {
  /*grid-area: img;*/
  display: block;
  position: relative;
  /*border-radius: var(--border-radius);*/
  overflow: hidden;
  /*background-color: #fff;*/
}
.ci-i-wr:before {
  content: '';
  display: block;
  padding-top: 100%;
  position: relative;
  /*background-color: #00000008;*/
  z-index: 1;
}
.ci-i {
  object-fit: scale-down;
  object-position: 50% 50%;
  position: absolute;
  left: 50%;
  top: 50%;
  width: 100%;
  height: 100%;
  transform: translate(-50%, -50%);
  font-size: .7rem;
  line-height: 1.2em;
}

.ci-lbl {
  text-align: center;
  font-weight: 500;
}

.ci-price {
  /*grid-area: price;*/
  font-size: 1rem;
  /*align-self: self-end;*/
  align-self: center;
  /*position: absolute;*/
  /*left: 0;*/
  /*bottom: 0;*/
  color: #000;
}

.ci-size {
  position: absolute;
  right: 0;
  top: 0;
  padding: .2rem .5rem;
  line-height: 1em;
  background-color: #fff;
  z-index: 2;
  color: #000;
  font-weight: 500;
}

.ci-det {
  display: none;
  position: absolute;
  right: 100%;
  width: 20rem;
  height: 100%;
  background-color: #fff;
  border: solid var(--contr) .1rem;
  border-right-width: 0;
}

.cart-item:hover > .ci-det {
  display: block;
}

.cart-item-acts {
  display: grid;
  /*grid-template-columns: 1fr auto;*/
  grid-gap: .3rem;
  align-items: center;
}
.calc {
  /*grid-area: calc;*/
  width: 100%;
}
.cart-item-del {
  width: 1.2rem;
  height: 1.2rem;
  cursor: pointer;
}


@media (max-width: 480px) {
  .cart-item {
    grid-template-columns: 10rem 1fr 1fr;
    grid-template-rows: 1fr auto;
    grid-template-areas:
      "img name name"
      "img calc price";
    grid-gap: .8rem;
  }
  .cart-item-name {
    font-size: 1.1rem;
    line-height: 1.4em;
    /*font-weight: 500;*/
    /*padding-right: 2rem;*/
    text-overflow: unset;
    white-space: unset;
  }
  .image {
    height: auto;
    min-height: 8rem;
  }
  .price {
    font-size: 1.4rem;
    justify-self: flex-end;
  }
}
</style>
