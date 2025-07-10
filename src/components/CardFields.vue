<script setup lang="ts">
import { ref, computed } from 'vue'
import TextField from './TextField.vue'
import formatCardNumber from '@/utils/formatCardNumber'
import formatExpiry from '@/utils/formatExpiry'
import type { ComponentPublicInstance } from 'vue'

type TextFieldInstance = ComponentPublicInstance<{ focus: () => void }>

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

const isFocused = ref<boolean>(false)
const cardRef = ref<TextFieldInstance | null>(null)
const expiryRef = ref<TextFieldInstance | null>(null)
const cvcRef = ref<TextFieldInstance | null>(null)

const scopedCardNumber = computed({
  get: () => formatCardNumber(props.cardNumber),
  set: (newVal: string) => emit('update:cardNumber', formatCardNumber(newVal)),
})

const handleCardInput = (val: string) => {
  emit('update:cardNumber', formatCardNumber(val))
  if (val.replace(/\s/g, '').length >= 16) {
    expiryRef.value?.focus()
  }
}

const handleExpiryInput = (val: string) => {
  const formatted = formatExpiry(val)
  emit('update:expiry', formatted)
  if (formatted.length === 5) {
    cvcRef.value?.focus()
  }
}
</script>

<template>
  <div :class="['card-input-group', { 'is-focused': isFocused }]">
    <TextField
      ref="cardRef"
      :modelValue="scopedCardNumber"
      @update:modelValue="handleCardInput"
      @focus="isFocused = true"
      @blur="isFocused = false"
      :maxlength="22"
      label="Card number"
      no-border
    />

    <div class="card-input-row">
      <TextField
        ref="expiryRef"
        :modelValue="expiry"
        @update:modelValue="handleExpiryInput"
        @focus="isFocused = true"
        @blur="isFocused = false"
        :maxlength="5"
        label="MM / YY"
        no-border
      />
      <TextField
        ref="cvcRef"
        :modelValue="cvc"
        @update:modelValue="$emit('update:cvc', $event)"
        @focus="isFocused = true"
        @blur="isFocused = false"
        :maxlength="4"
        label="Security code"
        no-border
      />
    </div>
  </div>
</template>

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
