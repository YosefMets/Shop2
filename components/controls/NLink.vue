<script setup>
const route = useRoute();
const path = computed( () => route.path );
const localePath = useLocalePath();

const { db, filters, priceMin, priceMax, country } = storeToRefs( useAppStore() );
const { user } = storeToRefs( useUserStore() );

const props = defineProps({
  to: [Object, String],
  brand: Object,
  filters: [Object, Array, Boolean],
  min: [Object, Number],
  max: [Object, Number],
  query: Object,
});

const filtersQuery1 = computed( () => {
  if (!props.filters) return undefined;

  const dblFilters = JSON.parse(JSON.stringify(filters.value));
  const _filters = props.filters === true ? [] : [props.filters];

  _filters.flat().forEach( ({ char, value }) => {
    if (dblFilters[char]?.includes(value)) {
      dblFilters[char].splice(dblFilters[char].indexOf(value), 1);
      if (!dblFilters[char].length || value === undefined)
        delete dblFilters[char]
    }
    else {
      if (!dblFilters[char]) dblFilters[char] = [];
      dblFilters[char].push(value);
    }
  })

  return ( Object.keys( dblFilters ) || [] ).flatMap( key => {
    return dblFilters[key]?.map( value => {
      const dbValue = db.value?.[value];
      const res = dbValue?.P
          ? [ dbValue.I, dbValue.S ]
          : [ key, value ]
      return res.join('-')
    })
  }).join('/')
  // if (!Object.keys( dblFilters ).length) return undefined
  // return Object.values( dblFilters ).flat().map( value => `${db.value?.[value]?.I}-${db.value?.[value]?.S}` ).join('/');
});

const brandUrl = computed( () => props.brand?.I ? `/${props.brand.S}/${props.brand.I}` : '');
const filtersUrl = computed( () => filtersQuery1.value ? `/${filtersQuery1.value}` : '');
const min = computed( () => {
  const price = props.min === null ? null : props.min || priceMin.value || null;
  return price ? '/min-' + price : '';
});
const max = computed( () => {
  const price = props.max === null ? null : props.max || priceMax.value || null;
  return price ? '/max-' + price : '';
});

const url = computed( () => {
  let res;
  if (typeof( props.to ) === 'string') {
    if ((/^https?:\/\//i).test(props.to)) return props.to;
    res = `/${country.value.ISO}${props.to}`;
  } else if (props.to) {
    // res = '/'+country.value.ISO+brand.value+`/${props.to.I}-${props.to.S}`+min.value+max.value+(filtersQuery1.value ? `/${filtersQuery1.value}` : '' );
    res = '/'+country.value.ISO+brandUrl.value+`/${props.to.I}-${props.to.S}/`+min.value+max.value+filtersUrl.value;
  } else if (props.to === null) {
    res = `/${country.value.ISO}`;
  } else {
    res = path.value.replace(/^\/[a-z]{2}/, '');
  }

  return localePath( res );
} )

</script>

<template>
  <NuxtLink :to="{ path: url }" :key="url"><slot /></NuxtLink>
</template>

<style scoped>

</style>