import {routes} from "vue-router/auto-routes";

export default defineEventHandler( async (event) => {
  const db = hubDatabase();
  const { session } = event;
  if ( !session.CustomerId ) throw createError({ statusCode: 401, statusMessage: 'Unauthorized' });

  const { shippingId } = getRouterParams(event);
  return shippingId;
})