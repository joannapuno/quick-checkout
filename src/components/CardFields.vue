<script setup lang="ts">
import { ref, computed, reactive, watchEffect } from 'vue'
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
  (e: 'valid', value: boolean): void
}>()

const isFocused = ref(false)
const cardRef = ref<TextFieldInstance | null>(null)
const expiryRef = ref<TextFieldInstance | null>(null)
const cvcRef = ref<TextFieldInstance | null>(null)

const checkValidity = reactive({
  card: false,
  expiry: false,
  cvc: false,
})

// Format card number on input
const scopedCardNumber = computed({
  get: () => formatCardNumber(props.cardNumber),
  set: (newVal: string) => emit('update:cardNumber', formatCardNumber(newVal)),
})

// Auto-focus next field on input
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

// Field blur handlers to toggle validation checks
const onBlurCard = () => {
  checkValidity.card = true
  isFocused.value = false
}
const onBlurExpiry = () => {
  checkValidity.expiry = true
  isFocused.value = false
}
const onBlurCvc = () => {
  checkValidity.cvc = true
  isFocused.value = false
}

// Validation checks
const cardNumberValid = computed(() => {
  const raw = props.cardNumber.replace(/\s/g, '')
  return raw.length === 16
})
const expiryValid = computed(() => {
  const [mm, yy] = props.expiry.split('/')
  if (!mm || !yy || mm.length !== 2 || yy.length !== 2) return false
  const month = Number(mm)
  const year = Number(yy)
  if (isNaN(month) || isNaN(year)) return false
  if (month < 1 || month > 12) return false
  const now = new Date()
  const currentYear = now.getFullYear() % 100
  const currentMonth = now.getMonth() + 1
  return year > currentYear || (year === currentYear && month >= currentMonth)
})

const cardNumberError = computed(() =>
  checkValidity.card && !cardNumberValid.value ? 'Card number not valid' : ''
)
const expiryError = computed(() =>
  checkValidity.expiry && !expiryValid.value ? 'Expiry date not valid' : ''
)
const cvcError = computed(() =>
  checkValidity.cvc && !props.cvc ? 'Security code not valid' : ''
)

const hasError = computed(() =>
  cardNumberError.value || expiryError.value || cvcError.value
)

const isValid = computed(() =>
  cardNumberValid.value && expiryValid.value && props.cvc !== ''
)

watchEffect(() => {
  emit('valid', isValid.value)
})
</script>

<template>
  <div class="form-field">
    <div :class="[
      'card-input-group',
      { 'is-focused': isFocused, 'has-error': hasError }
    ]">
      <TextField
        ref="cardRef"
        :modelValue="scopedCardNumber"
        @update:modelValue="handleCardInput"
        @focus="isFocused = true"
        @blur="onBlurCard"
        :maxlength="22"
        label="Card number"
        no-border
      />

      <div class="card-input-row">
        <TextField
          ref="expiryRef"
          :modelValue="props.expiry"
          @update:modelValue="handleExpiryInput"
          @focus="isFocused = true"
          @blur="onBlurExpiry"
          :maxlength="5"
          label="MM / YY"
          no-border
        />
        <TextField
          ref="cvcRef"
          :modelValue="props.cvc"
          @update:modelValue="$emit('update:cvc', $event)"
          @focus="isFocused = true"
          @blur="onBlurCvc"
          :maxlength="4"
          label="Security code"
          no-border
        />
      </div>
    </div>

    <div v-if="hasError" class="error-label">
      <div class="validation-msg">
        <span class="fa-solid fa-triangle-exclamation" />
        <span>Please see the following:</span>
      </div>
      <ul>
        <li v-if="cardNumberError">{{ cardNumberError }}</li>
        <li v-if="expiryError">{{ expiryError }}</li>
        <li v-if="cvcError">{{ cvcError }}</li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">
.card-input-group {
  display: flex;
  flex-direction: column;
  border: 1px solid var(--outline-low);
  border-radius: 0.5rem;
  overflow: hidden;

  &.is-focused {
    border-color: var(--accent-high);
  }

  &.has-error {
    border-color: var(--error);
  }

  .card-input-row {
    display: flex;

    .form-field {
      flex: 1;
      border-top: 1px solid var(--outline-low);

      &:first-child {
        border-right: 1px solid var(--outline-low);
      }
    }
  }
}

.error-label {
  margin-top: 0.5rem;
  font-size: 0.9rem;
  color: var(--error);

  .validation-msg {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    margin-bottom: 0.25rem;
  }

  ul {
    padding-left: 1.25rem;
    margin: 0;
    li {
      list-style: disc;
    }
  }
}
</style>
