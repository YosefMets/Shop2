export default defineEventHandler( async (event) => {
  const { session } = event;
  if ( !session.CustomerId ) throw createError({ statusCode: 401, statusMessage: 'Unauthorized' });

  const db = hubDatabase();
  const { settings } = getRouterParams(event);

  if (settings !== "settings") throw createError({ statusCode: 400, statusMessage: `Rout "${settings}" is undefined` });
  const {result} = await db.prepare(`
      SELECT 
        pmt.Id AS MethodTypeId,
        pmt.Name AS MethodTypeName,
        pp.Id AS ProviderId,
        pp.Name AS ProviderName
      FROM 
        AllowedPaymentMethods apm
      JOIN 
        PaymentMethodTypes pmt ON apm.PaymentMethodTypeId = pmt.Id
      JOIN 
        PaymentProviders pp ON apm.PaymentProviderId = pp.Id
      ORDER BY 
        pmt.Name, 
        pp.Name;
    `).all();

  return result;
})