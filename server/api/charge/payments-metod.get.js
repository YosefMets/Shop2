import Stripe from 'stripe';

export default defineEventHandler( async (event) => {
  const { session } = event;
  if ( !session.CustomerId ) throw createError({ statusCode: 401, statusMessage: 'Unauthorized' });

  const db = hubDatabase();
  const {results} = await db.prepare(`SELECT * FROM PaymentMethods WHERE CustomerId = ? AND ExpiryDate > ?;`)
    .bind(session.CustomerId, Date.now()).all();


  return results;
})