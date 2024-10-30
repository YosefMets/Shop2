<script setup>
const props = defineProps({ item: Object });

const { db } = storeToRefs( useAppStore() );

const dir = computed( () => props.item?.P ? db.value[props.item.P] : null );
const chars = computed( () => Object.keys(dir.value?.X || {})
                                    .filter( char => char in props.item )
                                    .reduce( (r, char) => {
                                      if (props.item[char]) r[char] = [props.item[char]].flat();
                                      return r }, {}
                                    ));

</script>

<template>
  <div v-if="item && Object.keys(chars).length" class="chars">
    <template v-for="(val, attr) in chars">
      <template v-if="val && val.length" class="char">
        <b class="attr">{{ db[attr]?.N }}:</b>
        <b :class="['val', { img: attr === 'co' }]">
          <!--        <img v-if="attr === 'ctry'" :src="'/flags/' + db[val[0]].iso.toLowerCase() + '.svg'" :alt="db[val[0]].N" />-->

          <template v-for="(subval, i) in val">

            <template v-if="db[subval]">
              <!--              <NLink2 :to="db[subval]" class="char-link">{{ db[subval].N }}{{db[attr].J}}</NLink2>{{ i[id] !== val.length-1 ? ', ' : '' }}-->
              <span class="char-link">{{ db[subval]?.N }}{{db[attr]?.J}}</span>{{ i !== val.length-1 ? ', ' : '' }}
            </template>

            <template v-else-if="typeof subval === 'boolean'">
              <span>{{ subval ? '✅' : '❌' }}</span>
            </template>

            <template v-else>
              <span>{{ subval }}{{ db[attr]?.J }}</span>{{ i !== val.length-1 ? ', ' : '' }}
            </template>

          </template>

        </b>
      </template>
    </template>
  </div>
</template>

<style scoped>

.chars {
  /*display: flex;*/
  /*flex-direction: column;*/
  /*grid-gap: .3rem;*/
  display: grid;
  /*grid-template-columns: .5fr 1fr;*/
  grid-template-columns: auto 1fr;
  grid-row-gap: 0.5rem;
  grid-column-gap: 1rem;
}
/*.char {*/
/*  display: flex;*/
/*  grid-gap: .5em;*/
/*}*/

.attr {
  font-weight: 400;
}
.val {
  font-weight: 500;
}

.val.img {display: flex}

.char-link {
  text-decoration: none;
}

img {
  display: inline-block;
  height: 1rem;
  margin-right: .5rem;
}
</style>