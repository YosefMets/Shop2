export default defineEventHandler( (event) => {
  const lang = getRouterParam(event, 'lang');
  const fetchUri = 'https://script.google.com/macros/s/AKfycbz-VM0OrruV_b4kIOwlkUZz8k41srw116sdUn0a1W30v5WwUtNi3ymYIIkO5iCCBsuNQA/exec';

  return $fetch( `${fetchUri}?lang=${lang}`);
})