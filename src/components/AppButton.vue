<script setup lang="ts">
withDefaults(defineProps<{
  label: string
  disabled?: boolean
}>(), {
  disabled: false
})
</script>

<template>
  <button class="app-btn" :disabled="disabled">{{ label }}</button>
</template>

<style scoped lang="scss">
.app-btn {
  background-color: var(--primary-container);
  padding: 16px;
  color: var(--on-primary);
  box-shadow: 0 0 28px var(--shadow-color);
  border: none;
  width: 100%;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: 500;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
}
</style>
