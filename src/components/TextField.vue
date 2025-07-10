<template>
  <div
    class="text-field"
    :class="{
      'is-focused': isFocused,
      'has-value': modelValue,
      'no-border': noBorder,
    }"
  >
    <label>{{ label }}</label>
    <input
      ref="inputRef"
      :value="modelValue"
      v-bind="$attrs"
      @input="onInput"
      @focus="onFocus"
      @blur="onBlur"
      :name="name"
      :type="type"
      :maxlength="maxlength"
      :minlength="minlength"
      placeholder=" "
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

withDefaults(defineProps<{
  label: string
  modelValue: string
  name?: string
  type?: HTMLInputElement['type']
  noBorder?: boolean
  maxlength?: number
  minlength?: number
}>(), {
  name: '',
  autocomplete: '',
  inputmode: undefined,
  type: 'text',
  noBorder: false,
  maxlength: 100,
  minlength: 1
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'focus', value: string): void
  (e: 'blur', value: string): void
}>()

const inputRef = ref<HTMLInputElement | null>(null)
const isFocused = ref(false)
defineExpose({
  focus: () => inputRef.value?.focus(),
})

const onInput = (e: Event) => {
  emit('update:modelValue', (e.target as HTMLInputElement).value)
}
const onFocus = (e: FocusEvent) => {
  isFocused.value = true
  emit('focus', (e.target as HTMLInputElement).value)
}
const onBlur = (e: FocusEvent) => {
  isFocused.value = false
  emit('blur', (e.target as HTMLInputElement).value)
}
</script>

<style scoped lang="scss">
.text-field {
  position: relative;

  input {
    width: 100%;
    padding: 1.8rem 1rem 0.5rem;
    font-size: 1.2rem;
    border: 1px solid #ccc;
    border-radius: 0.5rem;
    background: white;
    transition: border-color 0.2s;
    outline: none;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    &::placeholder {
      color: transparent;
    }
  }

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
