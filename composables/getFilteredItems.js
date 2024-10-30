import {useAppStore} from "~/stores/appStore";

export default () => {
  const { scopedItems, filters, priceMin, priceMax } = storeToRefs( useAppStore() );

  return scopedItems.value.filter( function (item) {
    return Object.keys(this).reduce( (res, filter) => {
        return res && [item[filter]]
          .flat()
          .reduce( (rres, ffilter) => {
              // console.log( this[filter], ffilter );
            return rres || this[filter].includes(ffilter+'')
          }, false)
      }, true)
      && (priceMin.value ? priceMin.value <= item.price : true)
      && (priceMax.value ? priceMax.value >= item.price : true)
  }, filters.value)

}