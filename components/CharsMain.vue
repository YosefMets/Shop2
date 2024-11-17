<script setup>
const props = defineProps({ item: Object });

const { db } = storeToRefs( useAppStore() );
const { t, locale } = useI18n();

const dir = computed( () => props.item?.P ? db.value?.[props.item.P] : null );
const chars = computed( () => Object.keys(dir.value?.X || {})
                                    .filter( x => dir.value?.X[x]?.M && x in props.item )
                                    .reduce( (r, x) => {
                                      r[x] = [props.item?.[x]].flat();
                                      return r }, {}
                                    ));
</script>

<template>
  <div v-if="item && Object.keys(chars).length" class="main-chars">
    <template v-for="(val, attr) in chars">
      <template v-if="val && val.length" class="char">
        <template v-for="v in val">
          <NuxtImg v-if="attr === 'co'" :src="`/${v}.svg`" />
          <b v-else class="mch">
            <i class="mch-dig">
              {{ parseFloat(v).toLocaleString(locale) }}{{ attr === 'al' ? '%' : '' }}
            </i>
            <i class="mch-abc">
              {{ attr === 'v' ? $t( v < 1000 ? 'ml' : 'l' ) : '' }}
            </i>
          </b>
        </template>
      </template>
    </template>
  </div>
</template>

<style scoped>
.main-chars {
  display: flex;
  flex-wrap: wrap;
  gap: .5rem;
  align-items: end;
  font-weight: 400;
  font-size: 1.6rem;
}
.mch {
  font-weight: inherit;
}
.mch-dig {
  font-style: normal;
  font-family: 'Stint Ultra Condensed', 'Six Caps', 'Rubik', sans-serif;
  font-size: 3rem;
  line-height: 1em;
}
.mch-abc {
  font-style: normal;
}
img {
  display: inline-block;
  align-self: center;
  width: 2.2rem;
  height: 2.2rem;
  margin-right: .5rem;
  border-radius: 50%;
  border: .2rem solid #fff;
  box-shadow: 0 0 0 .1rem var(--dark);
}
</style>