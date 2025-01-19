import {routes} from "vue-router/auto-routes";

export default defineEventHandler( async (event) => {
  const { session } = event;
  if ( !session.CustomerId ) throw createError({ statusCode: 401, statusMessage: 'Unauthorized' });

  const db = hubDatabase();
  const { shippingId } = getRouterParams(event);

  const res = await db.prepare(`
    BEGIN TRANSACTION;
    WITH DefaultShipping AS (
        SELECT Id
        FROM Shippings
        WHERE Id = 5
          AND IsDefault = 1
    )
    DELETE FROM Shippings
    WHERE Id = 5;
    
    UPDATE Shippings
    SET IsDefault = 1
    WHERE CustomerId = (SELECT CustomerId FROM Shippings WHERE Id = 5)
      AND Id != 5
      AND IsDefault = 0
    LIMIT 1;
    
    COMMIT;`)
    .bind(shippingId, session.CustomerId).run();


  // const res = await db.prepare(`DELETE FROM Shippings WHERE Id = ? AND CustomerId = ?;`)
  //   .bind(shippingId, session.CustomerId).run();

  return res;
})