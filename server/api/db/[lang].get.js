export default defineEventHandler( (event) => {
  const lang = getRouterParam(event, 'lang');
  const fetchUri = 'https://script.google.com/macros/s/AKfycbzwSU28ScTWRWe-TFbuqR5fCjH7XXfoWfTxzRWdVhmPj7puLDqrbVekyx0hs_VJ7l7eqg/exec';

  return $fetch( `${fetchUri}?lang=${lang}`);
})