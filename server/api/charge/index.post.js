import Stripe from "stripe";

export default defineEventHandler( async (event) => {
  // const { session } = event;
  // if ( !session.CustomerId ) throw createError({ statusCode: 401, statusMessage: 'Unauthorized' });

  const db = hubDatabase();
  const body = await readBody(event);
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
  const {email, payment_method} = body


  const customer = await stripe.customers.create({
    email
  });

  console.log(customer);

  // Привязываем PaymentMethod к клиенту
  const r = await stripe.paymentMethods.attach(payment_method, {
    customer: customer.id,
  });

  console.log(r);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: 4900, // Сумма в центах
    currency: 'usd',
    customer: customer.id, // ID клиента
    payment_method, // ID сохранённого метода
    off_session: true,
    confirm: true,
  });

  return paymentIntent;

  // const {
  //   addressLine1,
  //   addressLine2 = null,
  //   zip,
  //   state = null,
  //   city,
  //   country,
  //   isDefault = 1
  // } = body;
  //
  // if ( !addressLine1 || !zip || !city || !country ) {
  //   throw createError({ statusCode: 400, message: 'Missing required fields' });
  // }
  //
  // try {
  //   const stmt = db.prepare(`
  //     INSERT INTO Shippings (
  //       CustomerId,
  //       AddressLine1,
  //       AddressLine2,
  //       Zip,
  //       State,
  //       City,
  //       Country,
  //       IsDefault
  //     )
  //     VALUES (
  //       ?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8
  //     )
  //   `);
  //
  //   const result = await stmt.bind(
  //     session.CustomerId,
  //     addressLine1,
  //     addressLine2,
  //     zip,
  //     state,
  //     city,
  //     country,
  //     isDefault
  //   ).run();
  //
  //   return result;
  // } catch (error) {
  //   console.error(error);
  //   throw createError({ statusCode: 500, message: 'Database error' });
  // } finally {
  //   // db.close();
  // }
})