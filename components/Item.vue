<script setup>
import NLink from "~/components/controls/NLink.vue";
// const image = useImage();

const props = defineProps({ item: Object });

const img = computed( () => props.item.M ? `/i/${props.item.I}-0.${props.item.M[0]}` : null );

// const image = await $fetch(`http://localhost:5500/i/${props.item.I}-0.png`);
// console.log(image)
</script>

<template>
  <NLink :to="item" :min="null" :max="null" class="item">

    <i class="it-i">
      <img :src="img" :alt="item.N" :key="item.I" loading="lazy" />
    </i>

    <p class="it-n" :title="item.N">{{ item.N }}</p>

    <Price :amount="item?.price" />

  </NLink>
</template>

<style scoped>
.item {
  /*background-color: #fff;*/
  background-color: var(--bg);
  padding: .5rem;
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-rows: auto 1fr;
  grid-gap: 1rem;
  position: relative;
  color: #000;
  text-decoration: none;
  z-index: 10;
  overflow: hidden;
}

.it-i {
  grid-column: 1 / -1;
  display: block;
  width: 100%;
  position: relative;
  /*margin-bottom: -2rem;*/
  aspect-ratio: 1 / 1;
}
/*.it-i:before {*/
/*  content: '';*/
/*  display: block;*/
/*  padding-top: 100%;*/
/*  position: relative;*/
/*  z-index: 1;*/
/*  border-radius: var(--border-radius);*/
/*  transition: background-color .1s linear;*/
/*}*/
/*.item:hover > .it-i:before {*/
/*  background-color: transparent;*/
/*}*/
.it-i > img {
  object-fit: contain;
  object-position: 50% 50%;
  position: absolute;
  left: 50%;
  top: 50%;
  width: 90%;
  height: 90%;
  transform: translate(-50%, -50%);
  transition: transform .1s linear;
}
.item:hover > .it-i > img {
  transform: translate(-50%, -50%) scale(1.01);
}

.it-r,
.it-p {
  position: relative;
  z-index: 10;
  /*padding: 1rem 0 0;*/
  /*background: linear-gradient(0deg, #fff 0%, #ffffff00 100%);*/
  align-self: flex-start;
}

.it-n {
  /*grid-column: 1 / -1;*/
  margin: 0;
  font-size: 1.1rem;
  line-height: 1.2em;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

@media (max-width: 480px) {
  .item {
    /*padding: 2rem 1rem 1rem;*/
    /*display: grid;*/
    /*grid-template-columns: 1fr;*/
    /*grid-template-rows: 16rem auto auto;*/
    /*grid-template-areas:*/
    /*    "img"*/
    /*    "price"*/
    /*    "acts"*/
    /*    "name";*/
    /*height: auto;*/
  }
  .itimgs {
  }
  .itname {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .itprice {
  }
  .itactions {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: .5rem;
  }
  .itaction {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    background-color: var(--active-light);
    color: var(--active);
    border-radius: var(--border-radius);
    padding: 1rem 0.4rem;
    line-height: 1.2em;
  }
  .itaction:after {
    content: none;
  }
}
</style>
