<script setup>
const { stripe, isLoading } = useClientStripe();
const paymentEl = ref(null);

let elements;
let paymentElements;

watch( stripe, () => {
  console.log('watch')
  elements = stripe.value?.elements( { clientSecret: 'seti_1QlyrvHyfA30IheYgIAFglto_secret_RfJUk7BPhoUDvUyFmNeiQVLXQoHvo29', appearance: {} } );
  // paymentElements = elements?.create('payment', {
  //   mode: 'setup',
  //   currency: 'usd',
  //   appearance: {/*...*/},
  // });
}, { immediate: true })

onMounted( () => {
  console.log('onmounted', elements, paymentElements)
  paymentElements.mount('#qwe')
});

</script>


<template>
  <h1>Nuxt Stripe instance</h1>
  <div>
    {{ stripe ? stripe.elements : "Loading..." }}
  </div>
    <div ref="paymentEl" id="qwe" />
</template>

<!--<script setup lang="ts">-->
<!--const paymentEl = ref(null)-->
<!--const { onLoaded } = useScriptStripe()-->


<!--onMounted(() => {-->
<!--  onLoaded( ({ Stripe }) => {-->
<!--    const stripe = Stripe('pk_test_KtACC4y5SrJGDg1LFEValel5007WutSE2Z')-->

<!--    const elements = stripe.elements()-->
<!--    const paymentElement = elements.create('payment')-->
<!--    console.log(paymentElement, 1)-->
<!--//     paymentElement.mount(paymentEl.value)-->
<!--  })-->
<!--})-->
<!--</script>-->

<!--<template>-->
<!--  <div ref="paymentEl" />-->
<!--</template>-->
