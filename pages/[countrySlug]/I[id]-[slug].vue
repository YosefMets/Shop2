<script setup>
import NLink from "~/components/controls/NLink.vue";
import NButton from "~/components/controls/NButton.vue";
import SvgLove from "~/components/imgs/svg-love.vue";
import SvgCart1 from "~/components/imgs/svg-cart1.vue";

const { params } = useRoute();
const localePath = useLocalePath();
const route = useRoute();

const { t } = useI18n()

const appStore = useAppStore();
const { db, activeItem: item, country } = storeToRefs( appStore );
const cartStore = useCartStore();
const { items: cartItems } = storeToRefs( cartStore );
const { viewed } = storeToRefs( useUserStore() );

const entity = db.value?.['I' + params.id];
if (entity) appStore.activateItem( entity );

// Add to viewed
viewed.value.removeElement(item.value).unshift(item.value);

// appStore.activateGroup( null );
// appStore.activateBrand( null );

if (item.value?.S !== params.slug) {
  showError({ statusCode: 404, statusMessage: 'Page Not Found', fatal: true });
}

const brand = computed( () => db.value?.[item.value?.B] );
const brandLogo = computed( () => brand.value?.l ? `/i/${brand.value.I}-l.${brand.value?.l}` : null )

const kashruts = computed( () => [item.value?.k].flat().map( id => db.value?.[id] ))

const thisItemInCard = computed( () => cartItems.value?.find( ({ item: itm }) => itm === item.value ) )

const unit = computed( () => {
  const wKg = item.value.w ? !(item.value.w < 500) : null
  const vL = item.value.v ? !(item.value.v < 500) : null
  return wKg !== null
        ? (wKg ? item.value.w / 1000 + ' ' + t('kg') : item.value.w + ' ' + t('g'))
        : vL !== null
          ? (vL ? item.value.v / 1000 + ' ' + t('l') : item.value.v + ' ' + t('ml'))
          : null
})

// onUnmounted( () => { appStore.activateItem( null ) })
</script>

<template>
  <div class="ai">
    <Crumbs :entity="item" class="ai-crumbs" />

    <div class="ai-gal-wr">
      <ItemGallery v-if="item.M" :item="item" class="ai-imgs" />
    </div>

    <div class="ai-info">
      <div class="ai-info-top">

        <h1 class="ai-ttl">
          <NuxtImg :src="`/${brand.I}.avif`" class="ai-brand-logo" />
          <span>{{ item?.N }}</span>
<!--          <div v-if="brand" class="ai-brand"></div>-->
          <CharsMain :item="item" class="ai-chars-main" />
        </h1>
      </div>

      <div class="ai-info-bottom">

        <div class="ai-price-acts">
          <ul v-if="kashruts.length" class="ai-kashruts">
            <li v-for="kashrut in kashruts" class="ai-kashrut">
              <NuxtImg :src="`/${kashrut.I}.${kashrut.LG || 'avif'}`" class="ai-kashrut-sign" />
            </li>
          </ul>
          <div class="ai-price-wr">
            <Price v-if="item?.price" :amount="item?.price" class="ai-price" />
            <span v-if="item.J">&#160;{{ $t(item.J) }}</span>{{}}
          </div>
        </div>

          <div class="ai-acts">
            <transition name="ai-qty">
              <div v-if="thisItemInCard" class="ai-qty-wr">
                <div class="ai-qty-anim-wr">
                  <CartItemQuantity :cart-item="thisItemInCard" class="ai-qty" />
                </div>
              </div>
            </transition>
            <template v-if="!thisItemInCard">
              <NButton @click="cartStore.add(item)" class="ai-cart-btn">
                {{ $t('addToCart') }}
              </NButton>
            </template>
            <template v-else>
              <NButton @click="navigateTo({ query: {...route.query, ['cart']: null} })"
                       :style="'style3'"
                       class="ai-cart-btn">{{ $t('toCart') }}</NButton>
            </template>
            <!--          <NButton @click="addToFavorites(item)" :style="'style3'" class="ai-fav">-->
            <!--            <SvgLove :class="['ai-heart', { love: item?.$f }]" />-->
            <!--            <span class="ai-fav-lbl">{{ item?.$f ? $t('savedForLater') : $t('saveForLater') }}</span>-->
            <!--          </NButton>-->
          </div>
      </div>

<!--      <div class="ai-info-wr">-->
<!--        <NLink :to="brand" class="ai-brand">-->
<!--          <img v-if="brandLogo" :src="brandLogo" :alt="brand?.N" class="ai-brand-logo" />-->
<!--          {{ brand?.N }}-->
<!--        </NLink>-->



<!--        <Chars :item="item" class="ai-chars" />-->

<!--      </div>-->
    </div>

    <div class="ai-descr">
<!--      <div style="height: 1000px">{{ item }}</div>-->
<!--      {{ cartStore.items }}-->
    </div>

  </div>
</template>

<style scoped>
.ai {
  display: grid;
  grid-template-columns: 30rem 25rem;
  /*grid-template-rows: auto auto 1fr;*/
  grid-column-gap: 2rem;
  padding: 1rem 2rem;
}
.ai-crumbs {
  /*height: var(--mobar-el-size);*/
  height: 1rem;
  grid-column: 1 / -1;
  margin-bottom: 1rem;
}
.ai-gal-wr {

}
.ai-imgs {
}
.ai-info {
  /*padding-top: .5rem;*/
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr auto;
  height: 30rem;
}
.ai-ttl {
  /*font-size: 2.6rem;*/
  font-size: 1.6rem;
  font-weight: 400;
  line-height: 1.2em;
  margin: 0 0 1rem 0;
  min-height: 4rem;
  /*display: grid;*/
  grid-template-columns: 1fr auto;
  grid-template-rows: auto auto;
  /*grid-auto-columns: auto;*/
  /*grid-auto-flow: column;*/
  align-items: flex-start;
  column-gap: 2rem;
  row-gap: .5rem;
}
.ai-chars-main {
  margin: 1rem 0 0;
  grid-column: 1 / -1;
}
.ai-kashruts {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  gap: .5rem;
  height: 3.6rem;
}
.ai-kashrut {
  height: 100%;
  max-width: 5rem;
}
.ai-kashrut-sign {
  object-fit: contain;
  object-position: 50% 50%;
  width: 100%;
  height: 100%;
}
.ai-price-wr {
  margin: 2rem 0 1rem;
}
.ai-price {
  font-size: 2rem;
}
.ai-acts {
  margin: 1rem 0 0;
  display: flex;
  /*gap: .5rem;*/
}
.ai-qty-wr {
  width: 10rem;
}
.ai-qty-anim-wr {
  width: 100%;
  padding-right: .5rem;
}
.ai-qty {
  width: 100%;
}
.ai-cart-btn {
  flex-grow:1;
}
.ai-cart-wr {
  width: calc( var(--cntl-h) + .5rem );
  height: var(--cntl-h);
}
.ai-cart-anim-wr {
  width: 100%;
  height: 100%;
  padding-left: .5rem;
}
.ai-cart {
  width: 100%;
  height: 100%;
  background-color: #000;
  display: flex;
  justify-content: center;
  align-items: center;
}
.ai-cart-ic {
  width: 2rem;
  stroke: #fff;
  stroke-width: .15rem;
}


.ai-chars {
  margin-top: 2rem;
}
.ai-descr {
  grid-column: 1 / -1;
  position: sticky;
  top: 0;
}

.ai-info-wr {
  position: sticky;
  top: 3rem;
  width: 20rem;
}

.ai-brand {
  width: 5rem;
  height: 5rem;
}
.ai-brand-logo {
  /*object-fit: contain;*/
  /*object-position: 100% 0;*/
  /*width: 100%;*/
  /*height: 100%;*/
  max-width: 5rem;
  max-height: 5rem;
  float: right;
  margin: 0 0 1rem 1rem;
}

.ai-fav {
  container: fav / size;
}
.ai-heart { stroke-width: .2rem; }
.ai-heart.love { fill: #000; }

@container fav (max-width: 10rem) {
  .ai-fav-lbl { display: none; }
}

.ai-qty-enter-active,
.ai-qty-leave-active {
  transition: width .2s;
}

.ai-qty-enter-from,
.ai-qty-leave-to {
  width: 0;
}


@media (max-width: 480px) {
  .ai {
    padding: 0 1rem 1rem;
    grid-template-columns: 1fr;
    grid-template-areas:
        "gal"
        "cumb"
        "info";
  }
  .ai-crumbs {
    grid-area: cumb;
    margin-top: 1rem;
    /*display: none;*/
  }
  .ai-gal-wr {
    grid-area: gal;
    aspect-ratio: 1 / 1;
    margin: 0 -1rem;
  }
  .ai-gal-info {
    grid-area: info;
  }
  .ai-info {
    height: unset;
  }
  .ai-ttl {
    margin: 0 0 1rem 0;
    /*align-items: center;*/
  }
  .ai-brand-logo {
    translate: 0 -1.5rem;
  }
  .ai-chars-main {
    /*margin: 0;*/
  }
  .ai-price-acts {
    display: grid;
    grid-template-columns: 1fr auto;
    grid-template-areas: "acts price";
    align-items: center;
    gap: 1rem;
    margin: 0;
    /*padding: 1rem 0;*/
  }
  .ai-acts {
    grid-area: acts;
    margin: 0;
    padding: 1rem 0;
    background-color: #fff;
    position: sticky;
    bottom: 0;
  }
  .ai-qty-wr {
    width: 12rem;
  }
  .ai-price-wr {
    grid-area: price;
    margin: 0;
    line-height: 1em;
  }
}
</style>