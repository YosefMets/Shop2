
export default defineEventHandler( async (event) => {
  const body = await readBody(event);

  const res = { session: event.session, body }

  setCookie( event,  'serverLogs',  JSON.stringify( res ));

  return res;
})