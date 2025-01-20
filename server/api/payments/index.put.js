export default defineEventHandler( async (event) => {
  const { session } = event;
  if ( !session.CustomerId ) throw createError({ statusCode: 401, statusMessage: 'Unauthorized' });

  const db = hubDatabase();
  const body = await readBody(event);

  return body

  const {
    methodTypeName,
    providerName,
    accountIdentifier,
    expiryDate,
    isDefault = 1
  } = body;

  if (!methodTypeName || !providerName || !accountIdentifier || !expiryDate) {
    throw createError({ statusCode: 400, message: 'Missing required fields' });
  }

  try {
    // Используем подзапрос для получения MethodTypeId и ProviderId
    const stmt = db.prepare(
      `INSERT INTO PaymentMethods (
        CustomerId,
        MethodTypeId,
        ProviderId,
        AccountIdentifier,
        ExpiryDate,
        IsDefault
      )
      SELECT
        ?1,
        (SELECT Id FROM PaymentMethodTypes WHERE Name = ?2 LIMIT 1),
        (SELECT Id FROM PaymentProviders WHERE Name = ?3 LIMIT 1),
        ?4,
        ?5,
        ?6
      `
    );

    const result = await stmt.bind(
      session.CustomerId,  // CustomerId
      methodTypeName,          // methodType
      providerName,            // provider
      accountIdentifier,   // accountIdentifier
      expiryDate,          // expiryDate
      isDefault            // isDefault
    ).run();

    return result;
  } catch (error) {
    console.error(error);
    throw createError({ statusCode: 500, message: 'Database error' });
  } finally {
    // db.close(); // Закрытие соединения, если это необходимо
  }
})