<script setup>
import SvgV from "~/components/imgs/svg-v.vue";
import SvgArr from "~/components/imgs/svg-arr.vue";
import NLink from "~/components/controls/NLink.vue";

const { db, activeGroup: group, dirs } = storeToRefs( useAppStore() );

const props = defineProps({
  dir: Object,
  activeDir: Object,
  depth: {
    type: Number,
    default: 0
  }
})

const emit = defineEmits(['x', 'activate', 'deactivate', 'back'])

const dirs_ = computed(() => props.dir ? props.dir.children?.map( id => db.value[id] ) : dirs.value.filter( dir => !dir.P ))

</script>

<template>
  <ul :class="['cat-list', 'scroll', 'cat-'+depth ]">

    <li v-if="dir" class="cat-back" @click.stop="$emit('back')">
      <svg-arr class="cat-back-ic" />
      {{ dir.P && db[dir.P] ? db[dir.P].N : $t('mainMenu') }}
    </li>

    <li v-if="dir" class="cat-subtitle">{{ dir?.N }}</li>

    <li v-if="dir" class="cat-item">
      <NLink :to="dir"
             :min="null"
             :max="null"
             :class="['cat-link', { 'cat-link-curr': dir === group }]">{{ $t('shopAll')}}</NLink>
    </li>

    <CatalogItem v-for="dr in dirs_"
                 :dir="dr"
                 :activeDir="activeDir"
                 :depth="depth"
                 @x="$emit('x')"
                 @activate="(actDir) => emit('activate', actDir)"
                 @deactivate="(actDir) => emit('deactivate', actDir)" />

    <template v-if="!depth">
      <li v-for="hash in db.hashtags" class="cat-item">
        <NLink :to="hash" :class="['cat-link', { 'cat-link-curr': hash === group }]" @click="emit('x')"># {{ hash?.N }}</NLink>
      </li>
    </template>
  </ul>
</template>

<style scoped>
.cat-list {
  list-style: none;
  margin: 0;
  padding: .5rem 0;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  /*background-color: #fff;*/
  z-index: 910;

  position: absolute;
  left: 0;
  top: 0;
  /*transform: translateX(100%);*/
  /*transition: transform .2s;*/
  height: 100%;
  background-color: var(--dark);
}
.cat-item.in-chain > .cat-list {
  opacity: 1;
  z-index: 2;
  transform: translateX(0);
  transition: transform .2s;
}

.cat-sub { display: none }

.cat-sub {
  display: block;
  margin: -1rem 0 1rem;
  padding: .5rem;
  line-height: 1.2em;
  font-size: 1.1rem;
  /*font-weight: 400;*/
  /* text-transform: uppercase; */
  /*box-shadow: 0 .2rem 1rem -.7rem #000000;*/
}
.cat-back {
  display: flex;
  align-items: center;
  grid-gap: .5rem;
  padding: .5rem 0;
  margin: -.5rem 0 0;
  /*font-size: .9rem;*/
  /*text-transform: uppercase;*/
  /*background-color: var(--bg2);*/
  cursor: pointer;
  /*background-color: #fff;*/
  /*transition: background-color .2s;*/
  border-radius: var(--br);
  transition: all .2s;
}
.cat-back-ic {
  /*width: 2rem;*/
  /*height: 1.2rem;*/
  /*stroke-width: .15rem;*/
  stroke: #fff;
  transform: rotate(180deg);
  transition: transform .2s;
}
.cat-back:hover {
  /*padding-left: .5rem;*/
  /*padding-right: .5rem;*/
  /*background-color: var(--hover-bg-dark);*/
}
.cat-back:hover > .cat-back-ic {
  transform: rotate(180deg) translateX(.3rem);
}

.cat-subtitle {
  padding: .5rem 0 1rem;
  margin: 0 0 .5rem;
  font-size: 1.8rem;
  line-height: 1.2em;
  border-bottom: .1rem solid var(--hover-bg-dark);
  background-color: var(--dark);
}
.cat-back:hover {

}

.cat-item {
  padding: 0;
}
.cat-link {
  display: grid;
  grid-template-columns: 1fr auto;
  grid-gap: 2rem;
  padding: .5em 0;
  text-decoration: none;
  color: #fff;
  border-radius: var(--br);
  align-items: center;
  line-height: 1.2em;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all .2s;
}
.cat-item:hover > .cat-link {
  padding-left: .3rem;
  padding-right: .3rem;
  background-color: var(--hover-bg-dark);
}
.cat-link-curr {
  background-color: var(--bg2);
  /*color: var(--active-hover);*/
}


@media (max-width: 480px) {
  .cat-link { font-size: 1.4rem; }
  /*
  .cat-list:not(.cat-0) {
    opacity: 1;
    border-left: none;
    left: 0;
  }
  */

  /*
  .cat-item.in-chain > .cat-list {
    transform: translateX(0);
    transition: transform .2s;
  }
  */

  /*
  .cat-sub {
    display: block;
    margin: -1rem 0 1rem;
    padding: .5rem;
    line-height: 1.2em;
    font-size: 1.1rem;
    font-weight: 400;
     text-transform: uppercase;
    border-bottom: 0.1rem solid var(--contr);
    box-shadow: 0 .2rem 1rem -.7rem #000000;
  }
  .cat-back {
    display: flex;
    align-items: center;
    grid-gap: .5rem;
    padding: 0.5rem;
    font-size: .9rem;
    text-transform: uppercase;
    background-color: var(--bg2);
    border-radius: var(--border-radius);
  }
  .cat-back-ic {
    width: 1rem;
    height: 1rem;
    stroke-width: 0.1rem;
    transform: rotate(180deg);
  }
  .cat-subtitle {
    padding: 1rem .5rem .5rem;
    font-size: 1.4rem;
  }
  */
}
</style>