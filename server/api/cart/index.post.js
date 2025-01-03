const getOrder = async ( customerId, shippingId ) => {

  const db = hubDatabase();
  let orderId = null,
      expOrder = null;
  if ( customerId ) {
    const order = db.prepare(`
      SELECT Orders.Id FROM Orders 
      INNER JOIN Shippings ON Orders.ShippingId = Shippings.Id 
      INNER JOIN Customers ON Shippings.CustomerId = Customers.Id 
      WHERE Customers.Id = ?1 AND PaymentStatus NOT IN ('1','2')
      ORDER BY Orders.Id ASC
    `);
    expOrder = await order.bind( customerId ).first();
    orderId = expOrder?.Id
  }

  if ( !orderId ) {
    const newOrder = await db.prepare(`
        INSERT INTO Orders (CreatedAt, ModifiedAt, ShippingId, PaymentStatus) VALUES (?1, ?1, ?2, ?3);
    `).bind( Date.now(), shippingId, "0" ).run();
    orderId = newOrder?.meta?.last_row_id;
  }

  return orderId;
}

const getShippings = async ( customerId ) => {
  const db = hubDatabase();
  const shippingsPrepare = db.prepare(
    `SELECT * FROM Shippings WHERE CustomerId = ?1 ORDER BY Id ASC`
  );
  let shippings = await shippingsPrepare.bind( customerId ).all();
  // return shippings
  // const qwe = Object.assign( {}, shippings );

  if ( !shippings?.results?.length ) { // если шипинга нет
    const creatingNewShipping = await db.prepare(
      `INSERT INTO Shippings (CustomerId, AddressLine1, Zip, City, Country) VALUES (?1, "", "", "", "")`
    ).bind( customerId ).run();
    const id = creatingNewShipping?.meta?.last_row_id;
    if ( !id ) throw ('Error insert')

    shippings = await shippingsPrepare.bind(customerId).all();
  }
  return shippings?.results
}

const mapCustomerToOrder = ( sessionId, shippingId ) => {
  const db = hubDatabase();
  const sessions = db.prepare(
    `UPDATE Orders SET ShippingId = ?1 WHERE SessionId = ?2`
  ).bind( customer.Id ).all();

  if ( !shippings?.length ) { // если шипинга нет
    const creatingNewShipping = db.prepare(
      `INSERT INTO Shippings ("CustomerId") VALUES (?1)`
    ).bind( customer.Id ).run();
  } else {

  }
}

/*
[ { nestId, qty, price } ]
i34,i75,i84
 */

export default defineEventHandler( async (event) => {
  const db = hubDatabase();
  const cart = await readBody(event);
  const session = event.session;
  const orderId = session.orderId;

  // const getSessionPrepare = db.prepare(
  //   `SELECT * FROM Sessions WHERE SessionId = ?1`
  // );
  // let session = await getSessionPrepare.bind( sessionId ).first();

  if ( !session.CustomerId ) throw createError({ statusCode: 403, statusMessage: 'Forbidden' });

  const isDeleted = await db.prepare(`DELETE FROM Carts WHERE OrderId = ?1`).bind( orderId ).run();
  if ( isDeleted ) {
    const nestIds = cart?.map( ({ nestId }) => nestId ).join(',');
    const updateCartPrepare = await db.prepare(`INSERT INTO Carts (ProductId, Qty, Price) VALUES ( ?1, ?2, ?3 )`);
    const { results: products } = await db.prepare( `SELECT * FROM Products WHERE NestId IN (?1)` ).bind( nestIds ).all();
    products.forEach( async ( product ) => {
      await updateCartPrepare.bind( product.Id, cart?.find( ({ nestId }) => nestId === product.nestId )?.qty, product.PriceActual ).run();
    });
    const { results: updatedCart } = await db.prepare(`SELECT * FROM Carts WHERE OrderId = ?1`).bind( orderId ).run();
    return updatedCart;
  }

})