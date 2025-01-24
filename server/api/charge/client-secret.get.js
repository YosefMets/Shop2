export default defineEventHandler( async (event) => {

  const setupIntent = await stripe.setupIntents.create({
    payment_method_types: ['card'], // Укажите нужные типы методов оплаты
  });
  return setupIntent;
})