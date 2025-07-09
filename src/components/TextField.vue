<template>
  <div
    class="text-field"
    :class="{
      'is-focused': isFocused,
      'has-value': modelValue,
      'no-border': noBorder
    }"
  >
    <label>{{ label }}</label>
    <input
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      @focus="handleFocus"
      @blur="handleBlur"
      :name="name"
      :autocomplete="autocomplete"
      :inputmode="inputmode"
      :type="type"
      placeholder=" "
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = withDefaults(defineProps<{
  label: string
  modelValue: string
  name?: string
  autocomplete?: string
  inputmode?: string
  type?: string
  noBorder?: boolean
}>(), {
  name: '',
  autocomplete: '',
  inputmode: '',
  type: 'text',
  noBorder: false,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'focus', value: string): void
  (e: 'blur', value: string): void
}>()

const isFocused = ref<boolean>(false)

const handleFocus = (value: string) => {
  isFocused.value = true
  emit('focus', value)
}

const handleBlur = (value: string) => {
  isFocused.value = false
  emit('blur', value)
}

</script>

<style scoped lang="scss">
.text-field {
  position: relative;

  input {
    width: 100%;
    padding: 1.5rem 1rem 0.5rem;
    font-size: 1.2rem;
    border: 1px solid #ccc;
    border-radius: 0.5rem;
    background: white;
    transition: border-color 0.2s;
    outline: none;

    &::placeholder {
      color: transparent;
    }
  }

  // Conditionally remove border if inside grouped layout
  &.no-border input {
    border: none;
    border-radius: 0;
    background: transparent;
  }

  label {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    font-size: 1.2rem;
    color: #999;
    pointer-events: none;
    transition: all 0.2s ease;
  }

  &.is-focused input {
    border-color: #5633d6;
  }

  &.is-focused label,
  &.has-value label {
    top: 0.4rem;
    transform: none;
    font-size: 0.9rem;
    color: #5633d6;
  }
}
</style>
