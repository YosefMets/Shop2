<script setup>
import NLink from "~/components/controls/NLink.vue";
import NButton from "~/components/controls/NButton.vue";
import SvgLove from "~/components/imgs/svg-love.vue";

const { params } = useRoute();
const localePath = useLocalePath();

const appStore = useAppStore();
const { db, activeItem: item, country } = storeToRefs( appStore );
const cartStore = useCartStore();
const { viewed } = storeToRefs( useUserStore() );

const entity = db.value['I' + params.id];
if (entity) appStore.activateItem( entity );

// Add to viewed
viewed.value.removeElement(item.value).unshift(item.value);

// appStore.activateGroup( null );
// appStore.activateBrand( null );

if (item.value?.S !== params.slug) {
  showError({ statusCode: 404, statusMessage: 'Page Not Found', fatal: true });
}

const brand = computed( () => db.value[item.value?.B] );
const brandLogo = computed( () => brand.value?.l ? `/i/${brand.value.I}-l.${brand.value?.l}` : null )

// onUnmounted( () => { appStore.activateItem( null ) })
</script>

<template>
  <div class="ai">

<!--    <Gallery :item="item" class="ai-imgs" />-->
    <ItemGallery :item="item" class="ai-imgs" />

    <div class="ai-info">
      <Crumbs :entity="item" class="ai-crumbs" />

      <div class="ai-info-wr">
<!--        <NLink :to="brand" class="ai-brand">-->
<!--          <img v-if="brandLogo" :src="brandLogo" :alt="brand?.N" class="ai-brand-logo" />-->
<!--          {{ brand?.N }}-->
<!--        </NLink>-->

        <h1 class="ai-ttl">{{ item?.N }}</h1>

        <div class="ai-price-wr">
          <Price v-if="item?.price" :amount="item?.price" class="ai-price" />
        </div>

        <div class="ai-acts">
          <NButton @click="cartStore.add(item)">{{ $t('addToCart') }}</NButton>
          <NButton @click="addToFavorites(item)" :style="'style3'" class="ai-fav">
            <SvgLove :class="['ai-heart', { love: item?.$f }]" />
            <span class="ai-fav-lbl">{{ item?.$f ? $t('savedForLater') : $t('saveForLater') }}</span>
          </NButton>
        </div>

        <Chars :item="item" />

      </div>
    </div>

    <div class="ai-descr">
      <div style="height: 1000px">qwe</div>
      {{ cartStore.items }}
    </div>

  </div>
</template>

<style scoped>
.ai {
  display: grid;
  grid-template-columns: 30rem 1fr;
  /*grid-template-rows: auto auto 1fr;*/
  grid-column-gap: 2rem;
  padding: .5rem 2rem;
}
.ai-crumbs {
  /*height: var(--mobar-el-size);*/
  /*height: 2rem;*/
  grid-column: 1 / -1;
  margin-bottom: 1rem;
}
.ai-imgs {
}
.ai-info {
  padding-top: .5rem;
}
.ai-ttl {
  font-size: 2.6rem;
  font-weight: 400;
  line-height: 1.2em;
  margin: 1rem 0;
}
.ai-price-wr {
  margin: 1rem 0;
}
.ai-price {
  font-size: 2rem;
}
.ai-acts {
  margin: 1rem 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}
.ai-descr {
  grid-column: 1 / -1;
  position: sticky;
  top: 0;
}

.ai-info-wr {
  position: sticky;
  top: 3rem;
}

.ai-brand {
  display: flex;
  align-items: center;
  color: #000;
  gap: 1rem;
}
.ai-brand-logo {
  height: 3rem;
}

.ai-fav {
  container: fav / size;
}
.ai-heart { stroke-width: .2rem; }
.ai-heart.love { fill: #000; }
@container fav (max-width: 10rem) {
  .ai-fav-lbl { display: none; }
}
</style>