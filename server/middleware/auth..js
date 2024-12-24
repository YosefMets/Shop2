import crypto from 'crypto';

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
  // const date = new Date();
  // date.setDate(date.getDate() + days);
  return Date.now() + (86400000 * days);
}

// Установка cookie с этой датой:
// document.cookie = `myCookie=value; expires=${expiryDate}; path=/`;



export default defineEventHandler( async (event) => {
  const db = hubDatabase();
  const cookies = parseCookies(event)
  let sessionId = cookies?.sessionId;

  if ( !sessionId ) {
    sessionId = generateSessionToken(64);
    const expDate = getCookieExpiryDate();

    const setSessionPrepare = db.prepare(
      `INSERT INTO Sessions ("SessionId", "SessionExp") VALUES ('${sessionId}', ${expDate})`
    );
    const res = await setSessionPrepare.run();
    setCookie( event,  'sessionId',  sessionId, { expires: new Date(expDate), secure: true, httpOnly: true });
  } else {
    const qwe = db.prepare(
      `SELECT * FROM Sessions WHERE SessionId = ?1`
    );
    const asd = qwe.bind(sessionId);
    const res = await asd.first();
    setCookie( event,  'serverLogs',  JSON.stringify( res ));
  }
})
