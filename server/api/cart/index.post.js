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
  const cart_ = await readBody(event);
  const cart = cart_?.map( cartItem => ({ nestId: cartItem.id, qty: cartItem.qty, price: cartItem.price * 100 }) );
  const session = event.session;
  // TODO: 7.01.25 в session нет orderId
  const orderId = session.orderId;
  setCookie( event,  'Cart', JSON.stringify(cart), { maxAge: 10000000 } );
  setCookie( event,  'Session', JSON.stringify(session), { maxAge: 10000000 } );

  // const getSessionPrepare = db.prepare(
  //   `SELECT * FROM Sessions WHERE SessionId = ?1`
  // );
  // let session = await getSessionPrepare.bind( sessionId ).first();

  if ( !session.CustomerId ) throw createError({ statusCode: 403, statusMessage: 'Forbidden' });

  const { success: isDeleted } = await db.prepare(`DELETE FROM Carts WHERE OrderId = ?1`).bind( orderId ).run();
  setCookie( event,  'isDeleted', JSON.stringify(isDeleted), { maxAge: 10000000 } );
  if ( isDeleted ) {
    const nestIds = cart?.map( ({ nestId }) => nestId ).join(',');
    setCookie( event,  'NestIds', JSON.stringify(nestIds), { maxAge: 10000000 } );
    const updateCartPrepare = await db.prepare(`INSERT INTO Carts (ProductId, Qty, Price) VALUES ( ?1, ?2, ?3 )`);
    const { results: products } = await db.prepare( `SELECT * FROM Products WHERE NestId IN (?1)` ).bind( nestIds ).all();
    setCookie( event,  'Products', JSON.stringify(products), { maxAge: 10000000 } );
    let successInsert = true;
    products.forEach( async ( product ) => {
      const res = await updateCartPrepare.bind( product.Id, cart?.find( ({ nestId }) => nestId === product.nestId )?.qty, product.PriceActual ).run();
      if ( !res.success ) successInsert = false;
    });
    const { results: updatedCart } = await db.prepare(`SELECT * FROM Carts WHERE OrderId = ?1`).bind( orderId ).run();
    return updatedCart;
  }

})