<script setup lang="ts">
import { router } from '@/routes';
import { onMounted } from 'vue';

onMounted(() => {
  // Just to test
  setTimeout(() => {
    router.push('success')
  }, 3000)
})
</script>
<template>
  <div class="in-progress card-container">
    <div class="spinner infinite-rotate">
      <span class="fa-solid fa-spinner"></span>
    </div>

    <p class="label-sm">Processing your payment...</p>
  </div>
</template>

<style scoped lang="scss">
  .in-progress {
    .spinner svg {
      font-size: 2rem;
      color: #d578bd;
    }
  }

</style>
