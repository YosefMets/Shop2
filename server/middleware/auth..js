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
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date; // Возвращаем дату в формате UTC для cookie
}

// Установка cookie с этой датой:
// document.cookie = `myCookie=value; expires=${expiryDate}; path=/`;



export default defineEventHandler( async (event) => {
  const db = hubDatabase();
  const cookies = parseCookies(event)
  const session = cookies?.session;

  if ( !session ) {
    const token = generateSessionToken(64);

    const expDate = getCookieExpiryDate();
    console.log('expDate', expDate.toUTCString())

    const setSessionPrepare = db.prepare(
      `INSERT INTO Sessions ("SessionId", "SessionExp") VALUES (${token}, ${expDate})`
    );
    // const res = await setSessionPrepare.run();

    setCookie( event,  'session',  token, { expires: expDate, secure: true, httpOnly: true });
    console.log('DB set cookie: ', res )
  }
  console.log('New request: ', session, cookies )
})
