<script setup lang="ts">
withDefaults(defineProps<{
  label?: string
}>(), {
  label: ''
})
</script>

<template>
  <div class="spinner infinite-rotate">
    <span class="fa-solid fa-spinner"></span>
  </div>
  <p v-if="label" class="label-sm">{{ label }}</p>
</template>

<style scoped lang="scss">
.spinner {
  svg {
    font-size: 2rem;
    color: #d578bd;
  }

  &.infinite-rotate {
    animation: infinite-rotate 1.5s ease-in-out infinite both;
  }
}

@keyframes infinite-rotate {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
