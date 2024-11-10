<script setup>
import SvgX from "~/components/imgs/svg-x.vue";
import {useAppStore} from "~/stores/appStore";

const props = defineProps({
  show: Boolean,
  x: { type: Boolean, default: true },
  closeout: { type: Boolean, default: true },
  width: String,
  height: String,
});

const slots = useSlots();
const header = ref(!!slots.header);
const title = ref(!!slots.title);
const footer = ref(!!slots.footer);

const emit = defineEmits(['close']);

useHead({
  bodyAttrs: {
    // class: computed( () => 'modal-mode' ),
  },
});
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">

      <div class="fog" v-if="show">

        <div :class="['modal-container', width ? 'mc-w-'+width : undefined, height ? 'mc-h-'+height : undefined ]" >

          <h2 v-if="header" :class="['mdl-ttl', { 'mdl-ttl-x': x }]"><slot name="header" /></h2>
          <h3 v-if="title" :class="['mdl-ttl-min', { 'mdl-ttl-x': x }]"><slot name="title" /></h3>

          <svg-x v-if="x" class="mdlx" @click="emit('close')" />

          <slot/>

          <div v-if="footer" class="mdx-footer"><slot name="footer" /></div>

        </div>

        <div v-if="closeout" class="fog-x" @click="emit('close')" />

      </div>

    </Transition>
  </Teleport>
</template>

<style>
.fog {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  justify-items: center;
  align-items: center;
  overflow-y: auto;
  position: fixed;
  left: 0;
  right: 0;
  /*top: 0;*/
  bottom: 0;
  /*width: 100%;*/
  height: 100vh;
  /*background-color: #00000099;*/
  /*backdrop-filter: blur(.2rem);*/
  /*z-index: 1500;*/
  z-index: 1000;
}
.fog:after {
  content: '';
  background-color: var(--fog);
  /*backdrop-filter: blur(.2rem);*/
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
.modal-container {
  position: relative;
  background-color: var(--bg);
  /*background-color: #fff;*/
  padding: 3rem;
  border-radius: var(--Br);
  width: v-bind(width);
  /*max-width: 40rem;*/
  z-index: 10;
  max-height: 100vh;
  overflow: auto;
  box-shadow: 0 .2rem 1rem -.7rem #000000;

  display: grid;
  grid-template-rows: auto 1fr auto;
}

.mc-w-s { width: 30rem; }
.mc-w-m { width: 45rem; }
.mc-w-l { width: 60rem; }
.mc-w-full { width: 100%; }

.mc-h-full { height: 100%; }

.mdl-ttl {
  font-size: 1.6rem;
  font-weight: 500;
  margin: 0 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  grid-gap: 1rem;
  position: relative;
}
.mdl-ttl-min {
  font-size: 1.2rem;
  font-weight: 500;
  margin: 0 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  grid-gap: 1rem;
  position: relative;
}

.mdl-ttl-x {
  margin-right: 2rem;
}
svg.mdlx {
  position: absolute;
  right: 1.5rem;
  top: 1.5rem;
  cursor: pointer;
  z-index: 1;
  display: block;
  width: 1rem;
  height: 1rem;
}
.fog-x {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  cursor: default;
  z-index: 5;
}

.mdx-footer {
  position: sticky;
  bottom: 0;
  z-index: 50;
  padding-top: 3rem;
  background-color: #fff;
}
.mdx-footer:after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  top: 100%;
  height: 3rem;
  background-color: #fff;
}


.modal-enter-active {
  transition: opacity 0s, background-color .2s;
  overflow: hidden;
}
.modal-leave-active {
  transition: opacity 0s .2s, background-color .2s;
  overflow: hidden;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active:after,
.modal-leave-active:after {
  transition: opacity .2s;
}
.modal-enter-from:after,
.modal-leave-to:after {
  opacity: 0;
}

.modal-enter-active .modal-container,
.modal-leave-active .modal-container {
  transition: transform .2s, opacity .2s;
}
.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  transform: translateY(1rem);
  opacity: 0;
}

@media (max-width: 480px) {
  .fog {
    width: unset;
    height: 100vh; /* Fallback for browsers that do not support Custom Properties */
    height: calc(var(--vh, 1vh) * 100);
    /*height: 100dvh;*/
    right: 0;
    top: unset;
  }
  .modal-container {
    padding: 1.5rem;
    width: 100%;
    /*min-height: 100vh;*/
    /*border-radius: 0;*/
    border-radius: var(--border-radius) var(--border-radius) 0 0;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
  }
  .mdx-footer { padding-top: 1.5rem; }
  .mdx-footer:after { height: 1.5rem; }

  .mc-w-s,
  .mc-w-m,
  .mc-w-l,
  .mc-w-full { width: 100%; }

  .mc-h-full { border-radius: 0; }

  .modal-enter-active {
    transition: opacity 0s, background-color .4s;
    overflow: hidden;
  }
  .modal-leave-active {
    transition: opacity 0s .4s, background-color .4s;
    overflow: hidden;
  }
  .modal-enter-from,
  .modal-leave-to {
    opacity: 0;
  }

  .modal-enter-active:after,
  .modal-leave-active:after {
    transition: opacity .4s;
  }
  .modal-enter-from:after,
  .modal-leave-to:after {
    opacity: 0;
  }

  .modal-enter-active .modal-container,
  .modal-leave-active .modal-container {
    transition: transform .4s;
  }
  .modal-enter-from .modal-container,
  .modal-leave-to .modal-container {
    transform: translateY(100%);
    opacity: 1;
  }
}
</style>