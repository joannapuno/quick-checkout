<script setup lang="ts">
import checkoutImage from '@/assets/checkout-image.jpg'
import TextField from '@/components/TextField.vue';
import CardFields from '@/components/CardFields.vue';
import AppButton from '@/components/AppButton.vue';
import { computed, ref } from 'vue';
import { router } from '@/routes';

const cardHolderName = ref('')
const cardNumber = ref('')
const expiry = ref('')
const cvc = ref('')

const cardHolderName_display = computed({
  get: () => {
    return cardHolderName.value || "Cardholder name"
  },
  set: (newVal: string) => {
    cardHolderName.value = newVal
  }
})
const cardNumber_display = computed({
  get: () => {
    return cardNumber.value || "0000 0000 0000 0000"
  },
  set: (newVal: string) => {
    cardNumber.value = newVal
  }
})
const expiry_display = computed({
  get: () => {
    return expiry.value || "MM / YY"
  },
  set: (newVal: string) => {
    expiry.value = newVal
  }
})

const handleIsProcessing = () => {
  router.push('processing')
}
</script>
<template>
  <section class="display__card slide-down">
      <div class="w-100">
        <p class="display__card-name">{{ cardHolderName_display }}</p>

        <div class="display__card-info">
          <p class="display__card-number">{{ cardNumber_display }}</p>
          <p class="display__card-exp">{{ expiry_display }}</p>
        </div>
      </div>
    </section>

    <section class="form slide-up">
      <div class="form__container card-container">
        <div class="form__header-image">
          <img :src="checkoutImage" alt="store image">
        </div>

        <div class="form__total-info">
          <p class="label-sm">You are paying</p>
          <h3 class="total">$12.32</h3>
        </div>

        <div class="form__content">
          <TextField label="Name on card" v-model="cardHolderName" />
          <CardFields
            v-model:cardNumber="cardNumber"
            v-model:expiry="expiry"
            v-model:cvc="cvc" />
        </div>
      </div>

      <AppButton label="Pay Now" @click="handleIsProcessing" />
    </section>
</template>
<style scoped lang="scss">

.display {
  &__card {
    min-height: 10rem;
    width: 31.25rem;
    max-width: 100%;
    display: flex;
    align-items: end;
    background-color: hsla(278, 98%, 56%, 43%);
    box-shadow: 0 0 80px#C56EA0;
    padding: 24px;
    border-radius: 0 0 10px 10px;
    color: #FFD8F3;
  }

  &__card-name {
    font-weight: 500;
    font-size: 1.375rem;
  }

  &__card-info {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.5rem;
  }

  &__card-exp {
    text-align: right;
  }
}
.form {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 1rem 0;

  &__content {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  &__header-image {
    height: 8rem;
    width: 8rem;
    border-radius: 50%;
    overflow: hidden;
    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }

  &__total-info {
    text-align: center;
    .total {
      font-size: 3rem;
    }
  }

}
</style>
