export default defineEventHandler( (event) => {
  const lang = getRouterParam(event, 'lang');
  const fetchUri = 'https://res.cloudinary.com/deucrhprn/raw/upload/v1732216901/db/db.json';

  return $fetch( fetchUri );
})