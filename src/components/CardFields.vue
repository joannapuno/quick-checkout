<template>
  <div :class="['card-input-group', {'is-focused': isFocused}]">
    <!-- Card number input -->
    <TextField
      :modelValue="scopedCardNumber"
      @update:modelValue="$emit('update:cardNumber', formatCardNumber($event))"
      @focus="isFocused = true"
      @blur="isFocused = false"
      label="Card number"
      no-border
    />

    <!-- Expiry + CVC -->
    <div class="card-input-row">
      <TextField
        :modelValue="expiry"
        @update:modelValue="$emit('update:expiry', $event)"
        @focus="isFocused = true"
        @blur="isFocused = false"
        label="MM / YY"
        no-border
      />
      <TextField
        :modelValue="cvc"
        @update:modelValue="$emit('update:cvc', $event)"
        @focus="isFocused = true"
        @blur="isFocused = false"
        label="Security code"
        no-border
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import TextField from './TextField.vue'
import formatCardNumber from '@/utils/formatCardNumber';

const isFocused = ref<boolean>(false)

const props = defineProps<{
  cardNumber: string
  expiry: string
  cvc: string
}>()

const emit = defineEmits<{
  (e: 'update:cardNumber', value: string): void
  (e: 'update:expiry', value: string): void
  (e: 'update:cvc', value: string): void
}>()

const scopedCardNumber = computed({
  get: () => formatCardNumber(props.cardNumber),
  set: (newValue: string) => {
    emit('update:cardNumber', formatCardNumber(newValue))
  }
})
</script>

<style scoped lang="scss">
.card-input-group {
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  overflow: hidden;

  &.is-focused {
    border-color: #5633d6;
  }

  .card-input-row {
    display: flex;

    .text-field {
      flex: 1;
      border-top: 1px solid #ccc;

      &:first-child {
        border-right: 1px solid #ccc;
      }
    }
  }
}


</style>
