export default defineEventHandler( async (event) => {
  const { session } = event;
  if ( !session.CustomerId ) throw createError({ statusCode: 401, statusMessage: 'Unauthorized' });

  const db = hubDatabase();
  const isDefault = db.prepare(`SELECT * FROM Shippings WHERE CustomerId = ?;`)
    .bind(session.CustomerId).all();
  return isDefault;
})