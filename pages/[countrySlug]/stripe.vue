<script setup lang="ts">
const paymentEl = ref(null)
const { onLoaded } = useScriptStripe();

const stripe = ref(null);
const card = ref(null);
// const clientSecret = 'seti_1QmKprHyfA30IheYFA8hzLp1_secret_RfgCS358o0HWL6SrdByZCBcSqcPCdbq';

const clientSecret = await $fetch('/api/payments/client-secret');

console.log( 'clientSecret', clientSecret );

onMounted(() => {
  onLoaded( ({ Stripe }) => {
    stripe.value = Stripe('pk_test_KtACC4y5SrJGDg1LFEValel5007WutSE2Z');

    const appearance = { /* appearance */ };
    const options = { layout: 'accordion', /* options */ };
    const elements = stripe.value.elements({ clientSecret, appearance });
    card.value = elements.create('card')
    console.log(card.value, 1)
    card.value.mount(paymentEl.value)
  })
})

const test = async () => {
  const { setupIntent, error } = await stripe.value.confirmCardSetup( clientSecret, {
    payment_method: {
      card: card.value,
      billing_details: {
        name: 'Customer Name',
      },
    },
  });
  if ( error ) {
    // TODO надо выводить сообщение об ошибке
  }
  const { payment_method } = setupIntent;

  const puttingPaymentMethod = await $fetch('/api/payments',  {
    method: 'put',
    body: {
      IdMethodByProvider: payment_method,
      methodTypeName: "Credit Card",
      providerName: "Visa",
      accountIdentifier: "0004",
      expiryDate: [11,2030],
      isDefault: 1
    }
  });
  console.log( puttingPaymentMethod );
}
</script>

<template>

  <div ref="paymentEl" />

  <button @click="test">Stripe</button>
</template>
