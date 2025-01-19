import { defineEventHandler, readBody, createError } from 'h3';
import Stripe from 'stripe';

const stripe = new Stripe('your-secret-key'); // Замените на ваш настоящий секретный ключ Stripe

export default defineEventHandler(async (event) => {
  const { session } = event;

  // Проверяем, есть ли у пользователя CustomerId
  if (!session.CustomerId) throw createError({ statusCode: 401, statusMessage: 'Unauthorized' });

  const db = hubDatabase();
  const body = await readBody(event);

  const {
    methodType,
    provider,
    accountIdentifier,
    expiryDate,
    isDefault = 1
  } = body;

  if (!methodType || !provider || !accountIdentifier || !expiryDate || !isDefault) {
    throw createError({ statusCode: 400, message: 'Missing required fields: amount or source' });
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
      methodType,          // methodType
      provider,            // provider
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






  // CustomerId INTEGER NOT NULL,
  //   MethodTypeId INTEGER NOT NULL,
  //   ProviderId INTEGER,
  //   AccountIdentifier TEXT NOT NULL,
  //   ExpiryDate TEXT,
  //   IsDefault BOOLEAN NOT NULL DEFAULT 0,
    // Сохранить информацию в базе данных
    const { results } = db.prepare(`
      INSERT INTO PaymentMethods (
        CustomerId,
        MethodType,
        Provider,
        AccountIdentifier,
        ExpiryDate,
        IsDefault
      )
      VALUES (?, ?, ?, ?, ?)
    `).bind(session.CustomerId, ).run();

    const result = await stmt.bind(
      session.CustomerId,
      amount,
      currency,
      description,
      charge.id // ID транзакции Stripe
    ).run();

    return {
      charge,
      result,
    };
  } catch (error) {
    console.error(error);
    throw createError({ statusCode: 500, message: 'Payment processing error' });
  } finally {
    // db.close();
  }
});
