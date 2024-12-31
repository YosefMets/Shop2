const getOrder = async ( customerId, shippingId ) => {

  const db = hubDatabase();
  let orderId = null,
      expOrder = null;
  if ( customerId ) {
    const order = db.prepare(`
      SELECT Orders.Id FROM Orders 
      INNER JOIN Shippings ON Orders.ShippingId = Shippings.Id 
      INNER JOIN Customers ON Shippings.CustomerId = Customers.Id 
      WHERE Customers.CustomerId = ?1 AND PaymentStatus NOT IN ["1","2"]
      ORDER BY Id ASC
    `);
    expOrder = await order.bind( customerId ).first();
    orderId = expOrder?.Id
  }
  if ( !expOrder ) {
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
  const qwe = Object.assign( {}, shippings );

  if ( !shippings?.length ) { // если шипинга нет
    const creatingNewShipping = await db.prepare(
      `INSERT INTO Shippings ("CustomerId") VALUES ?1`
    ).bind( customerId ).run();
    const id = creatingNewShipping?.meta?.last_row_id;
    if ( !id ) throw ('')

    shippings = await shippingsPrepare.bind(customerId).all();
  }
  return { shippings, qwe }
}

const mapCustomerToOrder = ( sessionId, shippingId ) => {
  const db = hubDatabase();
  const sessions = db.prepare(
    `UPDATE Orders SET ShippingId = ?1 WHERE SessionId = ?2`
  ).bind( customer.Id ).all();

  if ( !shippings?.length ) { // если шипинга нет
    const creatingNewShipping = db.prepare(
      `INSERT INTO Shippings ("CustomerId") VALUES ?1`
    ).bind( customer.Id ).run();
  } else {

  }
}


export default defineEventHandler( async (event) => {
  const db = hubDatabase();
  const body = await readBody(event);
  const res = { session: event.session, body }

  const { email, pass, firstName } = body;

  const getCustomerPrepare = db.prepare(
    `SELECT * FROM Customers WHERE Email = ?1`
  );

  let customer = await getCustomerPrepare.bind( email ).first();

  if ( !customer ) {
    const putCustomerToCustomers = await db.prepare(
      `INSERT INTO Customers ("Email", "Pass") VALUES ( ?1, ?2 )`
    ).bind( email, pass ).run();

    customer = await getCustomerPrepare.bind( email ).first();
  }

  if ( customer?.Pass === pass ) {
    const putCustomerToSessionPrepare = db.prepare(
      `UPDATE Sessions SET CustomerId = ?1 WHERE SessionId = ?2`
    ).bind( customer.Id, event.session?.SessionId );

    const res = await putCustomerToSessionPrepare.run();
  }

  const shippings = getShippings( customer.Id );

  const order = getOrder( customer.Id, shippings.shippings[0]?.Id );

  // TODO: секция удаления старых данных
  await db.prepare( `DELETE FROM Sessions WHERE SessionExp < ?1` ).bind( Date.now() ).run();
  // TODO: удалить ордера
  // TODO: удалить корзины

  // setCookie( event,  'serverLogs',  Date.now().toString() );

  return { customer, shippings, order };
})