export default defineEventHandler( (event) => {

  const qwe = hubDatabase()
  console.log( qwe );

  const req = qwe.prepare('SELECT * FROM Customers');
  const res = req.all();

  return req;

})