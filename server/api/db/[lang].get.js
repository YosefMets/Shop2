export default defineEventHandler( (event) => {
  const lang = getRouterParam(event, 'lang');
  const fetchUri = 'https://script.google.com/macros/s/AKfycbxfYnIrcx1OhRwpGshVDPOPpLQ5GC3Y-ngLx3jzS7ZezKSwURYMZ5DgIWbG4OM1dVcWyw/exec';

  return $fetch( `${fetchUri}?lang=${lang}`);
})