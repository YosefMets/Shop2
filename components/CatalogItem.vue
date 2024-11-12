<script setup>
import SvgV from "~/components/imgs/svg-v.vue";
import NLink from "~/components/controls/NLink.vue";

const { db, activeGroup: group } = storeToRefs( useAppStore() );

const props = defineProps({
  dir: Object,
  activeDir: Object,
  depth: {
    type: Number,
    default: 0
  }
})

const emit = defineEmits(['x', 'activate', 'deactivate']);

const activate = (actDir) => {
  emit('activate', actDir);
}
const deactivate = (actDir) => {
  emit('deactivate', actDir);
}

const back = () => {
  emit('activate', props.dir.P ? db.value?.[props.dir.P] : null);
}

const chain = computed( () => {
  let dir = props.activeDir
  const chain = [ dir?.I ]
  while (dir?.P) {
    dir = db.value?.[dir.P];
    chain.push( dir?.I );
  }
  return chain
});

const isInChain = computed( () => {
  return chain.value.includes( props.dir.I );
})
</script>

<template>
  <li class="cat-item" @click.stop="activate(dir)"><!--, { 'in-chain': isInChain }-->

    <div v-if="dir.children"
         :class="['cat-link', { 'cat-link-curr': dir === group }]"
         @click="activeDir = dir">
      <i class="cat-ic">{{ dir.IC }}</i>
      {{ dir.N }}
      <svg-v v-if="dir.children" />
    </div>
    <NLink v-else
           :to="dir"
           :min="null"
           :max="null"
           :class="['cat-link', { 'cat-link-curr': dir === group }]"
           @click="emit('x')">
      <i class="cat-ic">{{ dir.IC }}</i>
      {{ dir.N }}
    </NLink>

    <Transition name="sub-menu">
      <CatalogList v-if="dir.children && isInChain"
                   :dir="dir"
                   :activeDir="activeDir"
                   :depth="depth+1"
                   @x="$emit('x')"
                   @activate="activate"
                   @deactivate="deactivate"
                   @back="back" />
    </Transition>
  </li>
</template>

<style scoped>
.cat-link {
  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-gap: .5rem;
  padding: .4em 0;
  text-decoration: none;
  color: #fff;
  align-items: center;
  line-height: 1.2em;
  font-size: 1.1rem;
  cursor: pointer;
  border-radius: var(--br);
  transition: all .2s;
}
.cat-item:hover > .cat-link {
  padding-left: .3rem;
  padding-right: .3rem;
  background-color: var(--hover-bg-dark);
}
.cat-ic {
  font-style: normal;
  width: 1.6rem;
  text-align: center;
  /*aspect-ratio: 1 / 1;*/
}
/*
.cat-item:hover > .cat-link:not(.cat-link-curr) {
  color: var(--active-hover);
}
*/
.active > .cat-link,
.cat-link:active {
  color: var(--active);
}
.cat-link > svg {
  width: 1rem;
  height: .5rem;
  transform: rotateZ(-90deg);
  stroke: #fff;
}
.cat-link-curr {
  /*background-color: var(--active-light);*/
  /*color: var(--active-hover);*/
}
.cat-link.router-link-exact-active {
  /*padding-left: .5rem;*/
  /*padding-right: .5rem;*/
  /*background-color: var(--active-bg-dark);*/
  color: var(--active);
}

.sub-menu-enter-active,
.sub-menu-leave-active {
  transition: transform .3s;
}
.sub-menu-enter-from,
.sub-menu-leave-to {
  transform: translateX(100%);
}

@media (max-width: 480px) {
  .cat-link {
    font-size: 1.4rem;
    /*font-weight: 500;*/
  }
  /*
  .cat-item:hover > .cat-link {
    color: #000;
  }
  */
}
</style>