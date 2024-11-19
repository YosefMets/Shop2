<script setup>
import SvgX from "~/components/imgs/svg-x.vue";
import {useAppStore} from "~/stores/appStore";

const props = defineProps({
  show: Boolean,
  x: { type: Boolean, default: true },
  closeout: { type: Boolean, default: true },
  width: String,
  height: String,
  side: String,
});

const slots = useSlots();
const header = ref(!!slots.header);
const title = ref(!!slots.title);
const footer = ref(!!slots.footer);

const sideClass = computed( () => props.side ? `modal-side-${props.side}` : null );
const selfWidth = ref( props.width || '30%' );

const emit = defineEmits(['close']);

useHead({
  bodyAttrs: {
    class: computed( () => props.show ? 'modal-mode' : undefined ),
  },
});
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">

      <div :class="['fog', sideClass]" v-if="show">

        <div class="modal-container scroll" :style="`--modal-width: ${width || '100%'}`">

          <h2 :class="['mdl-ttl', { 'mdl-ttl-x': x, empty: !header && !title }]"><slot name="header" /></h2>

          <svg-x v-if="x" class="mdlx" @click="emit('close')" />

          <div><slot/></div>

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
  justify-items: end;
  align-items: center;
  overflow-y: auto;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100dvh;
  z-index: 1000;
}
.fog.modal-side-left { justify-items: start; }

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
  padding: 3rem;
  width: var(--modal-width);
  height: 100%;
  z-index: 10;
  /*max-height: 100vh;*/
  overflow: auto;
  box-shadow: 0 .2rem 1rem -.7rem #000000;
  display: grid;
  grid-template-rows: auto 1fr auto;
}
/*
.mc-w-s { width: 30rem; }
.mc-w-m { width: 45rem; }
.mc-w-l { width: 60rem; }
.mc-w-full { width: 100%; }
*/
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
.mdl-ttl.empty { height: 0; overflow: hidden; margin: 0; }
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
  /*margin-right: 2rem;*/
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
  transform: translateX(100%);
}
.modal-enter-from.modal-side-left .modal-container,
.modal-leave-to.modal-side-left .modal-container {
  transform: translateX(-100%);
}

@media (max-width: 480px) {
  .fog {
    width: unset;
    height: 100dvh; /* Fallback for browsers that do not support Custom Properties */
    /*height: calc(var(--vh, 1vh) * 100);*/
    /*height: 100dvh;*/
    right: 0;
    top: unset;
  }
  .modal-container {
    padding: 1.5rem;
    width: 100%;
    height: unset;
    max-height: 100vh;
    /*border-radius: 0;*/
    border-radius: var(--br) var(--br) 0 0;
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
    transition: transform .2s;
  }
  .modal-enter-from .modal-container,
  .modal-leave-to .modal-container {
    transform: translateY(100%);
  }
  .modal-enter-from.modal-side-left .modal-container,
  .modal-leave-to.modal-side-left .modal-container {
    transform: translateY(100%);
  }
}
</style>