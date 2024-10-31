export default defineEventHandler( (event) => {
  const lang = getRouterParam(event, 'lang');
  const fetchUri = 'https://script.google.com/macros/s/AKfycbz5TNN0fEgSEk-0nb8DAbfhN5g4NIdHZA--3p1g5DvnxaE9GXaGW64yG40jj2zvlJqeUg/exec';

  return $fetch( `${fetchUri}?lang=${lang}`);
})