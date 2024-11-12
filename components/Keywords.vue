<script setup>
import NLink from "~/components/controls/NLink.vue";

const appStore = useAppStore();
const { db, activeGroup, activeBrand, filters } = storeToRefs( appStore );

const keywords = computed( () => activeBrand.value ? getKeywords() : activeGroup.value?.keywords );
</script>

<template>
  <div v-if="keywords" class="keywords">

    <NLink v-for="keyword in keywords"
           :to="activeGroup"
           :brand="activeBrand"
           :filters="keyword"
           :class="['keyword', { curr: filters?.[keyword.char]?.includes(keyword.value), ava: db?.[keyword.value]?.ISO || db?.[keyword.value]?.A }]">

      <i v-if="db?.[keyword.value]?.ISO || db?.[keyword.value]?.A" :class="['kw-a', { flag: db?.[keyword.value]?.ISO }]">
        <img :src="db?.[keyword.value]?.ISO ? `/flags/${db?.[keyword.value]?.ISO}.svg` :  db?.[keyword.value]?.A ? `/i/${db?.[keyword.value]?.I}.${db?.[keyword.value]?.A}` : ''"
             alt="" />
      </i>

      {{ db?.[keyword.value]?.N || keyword.value }}

    </NLink>

    <PriceFilter />

  </div>
</template>

<style scoped>
.keywords {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  align-items: stretch;
  grid-gap: .5rem;
  height: var(--cntl-h);
}
.keyword {
  position: relative;
  cursor: pointer;
  background-color: var(--bg2);
  display: flex;
  align-items: center;
  border-radius: var(--br);
  color: #000;
  height: var(--cntl-h);
  padding: 0 1rem;
  /*box-shadow: inset 0 0 0 .05rem #000000;*/
  overflow: hidden;
}
.keyword.ava {
  display: flex;
  grid-gap: 1rem;
}
.keyword.curr {
  background-color: #000;
  color: #fff;
}

.kw-a {
  height: 90%;
  aspect-ratio: 1 / 1;
  /*background-color: #635bff;*/
  border-radius: var(--br);
  overflow: hidden;
  margin: 0 -.5rem 0 -.8rem;
}
.kw-a.flag {
  border-radius: 50%;
  height: 50%;
  margin-left: -.5rem;
}
.kw-a > img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% 50%;
}
</style>