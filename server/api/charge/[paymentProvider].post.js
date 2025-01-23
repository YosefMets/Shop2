import Stripe from 'stripe';

const stripeCharge = async ({
                              amount,
                              currency,
                              token: source,
                              orderId: receipt_number
  }) => {

  return process.env.STRIPE_SECRET_KEY

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


  const charge = await stripe.charges.create({
    amount,
    currency,
    source,
    receipt_number
  });

  return charge
}

export default defineEventHandler( async (event) => {

  const { paymentProvider } = getRouterParams( event );
  const body = await readBody( event );

  // return { paymentProvider, body }

  let res;

  switch ( paymentProvider ) {
    case 'stripe':
      res = await stripeCharge( body );
      break;
    default:
      break;
  }

  return res;

});