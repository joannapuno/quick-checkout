<script setup lang="ts">
import { computed, ref } from 'vue'

const props = withDefaults(defineProps<{
  label: string
  modelValue: string
  name?: string
  type?: HTMLInputElement['type']
  noBorder?: boolean
  maxlength?: number
  minlength?: number
  invalidMessage?: string
}>(), {
  name: '',
  type: 'text',
  noBorder: false,
  maxlength: 100,
  minlength: 1,
  invalidMessage: ''
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'focus', value: string): void
  (e: 'blur', value: string): void
}>()

const inputRef = ref<HTMLInputElement | null>(null)
const isFocused = ref<boolean>(false)

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

<template>
  <div class="form-field">
    <div
      class="text-field"
      :class="{
        'is-focused': isFocused,
        'has-error': invalidMessage !== '',
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
    <div v-if="invalidMessage" class="validation-msg error-label">
      <span class="fa-solid fa-triangle-exclamation" />
      <span>{{ invalidMessage }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.text-field {
  position: relative;

  &.is-focused input {
    border-color: var(--accent-high);
  }
  &.has-error input {
    border-color: var(--error);
  }

  input {
    width: 100%;
    padding: 1.8rem 1rem 0.5rem;
    font-size: 1.2rem;
    border: 1px solid var(--outline-low);
    border-radius: 0.5rem;
    background: var(--on-primary);
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
    color: var(--label-low);
    pointer-events: none;
    transition: all 0.2s ease;
  }

  &.is-focused label,
  &.has-value label {
    top: 0.4rem;
    transform: none;
    font-size: 0.9rem;
    color: var(--accent-high);
  }
}
</style>
