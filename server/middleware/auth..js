import crypto from 'crypto';

const db = hubDatabase();

function generateSessionToken(length = 32) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let result = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = crypto.getRandomValues(new Uint32Array(1))[0] % charactersLength;
    result += characters[randomIndex];
  }

  return result;
}

function getCookieExpiryDate(days = 1) {
  return Date.now() + (86400000 * days);
}

const getOrder = async ( customerId, orderId ) => {
  let expOrder = {};
  if (customerId) {
    const order = db.prepare(
      `SELECT Orders.Id 
      FROM Orders 
      INNER JOIN Shippings ON Orders.ShippingId = Shippings.Id
      INNER JOIN Customer ON Shippings.CustomerId = Customer.Id
      WHERE Customer.CustomerId = ?1 AND Orders.Id != ?2`
    );
    expOrder = order.bind(customerId, order).first();
  }
  if ( !orderId || expOrder === {} ){
    expOrder = await db.prepare(`
        INSERT INTO Orders (CreateAt, ModifiedAt, ShippingId, PaymentStatus) 
        Values (?1, ?1, null, null);
    `).bind(Date.now()).run();
  }

  return expOrder;
}


export default defineEventHandler( async (event) => {
  const session = {};
  const cookies = parseCookies(event)
  let sessionId = cookies?.sessionId;
  let isExpired = true;

  if ( sessionId ) {
    const qwe = db.prepare(
      `SELECT * FROM Sessions WHERE SessionId = ?1`
    );
    const asd = qwe.bind(sessionId);
    const res = await asd.first();
    if (res) {
      Object.assign(session, res);
      isExpired = Date.now() > res.SessionExp;
    }
  }

  // create new session
  if ( !sessionId || isExpired ) {
    sessionId = generateSessionToken(64);
    session.SessionId = sessionId;
    const expDate = getCookieExpiryDate();
    session.SessionExp = expDate;
    session.CustomerId = null;

    const setSessionPrepare = db.prepare(
      `INSERT INTO Sessions ("SessionId", "SessionExp") VALUES ('${sessionId}', ${expDate})`
    );
    const res = await setSessionPrepare.run();
    const orderId  = await getOrder();
    setCookie( event,  'MidWereLogs',  orderId, { expires: new Date(expDate), secure: true, httpOnly: true });
    setCookie( event,  'sessionId',  sessionId, { expires: new Date(expDate), secure: true, httpOnly: true });
  }

  event.session = session;

})
