export default defineEventHandler( async (event) => {

  const db = hubDatabase()
  console.log( db );

  const req = await db.prepare('SELECT * FROM Customers').all()

  return req;

})