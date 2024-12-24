
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
  await db.prepare( `DELETE FROM Sessions WHERE SessionExp < ?1` ).bind( Date.now() ).run();

  // setCookie( event,  'serverLogs',  Date.now().toString() );

  return { customer, firstName };
})