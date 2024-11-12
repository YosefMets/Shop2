import {useAppStore} from "~/stores/appStore";

export default (paramsFilters) => {
  const { params } = useRoute();
  const { db, priceMin, priceMax } = storeToRefs( useAppStore() );

  return (paramsFilters || [])
      .map( filter => {
        const [ id, value ] = filter.split('-');
        if (id === 'min') { priceMin.value = value * 1; return null }
        if (id === 'max') { priceMax.value = value * 1; return null }
        const key = db.value?.[id];
        const res = (key?.P)
            ? [ db.value?.[key.P]?.I, key?.I || id ]
            : [ key?.I || id, value ]
        return (res?.[0] && res?.[0] !== 'min' && res?.[0] !== 'max' && res?.[1]) ? res : null
      })
      .filter( pair => pair )
      .reduce( (f, [ char, value ]) => {
        if (!f?.[char]) f[char] = [];
        f?.[char].push(value);
        return f
      }, {});
}