<script setup lang="ts">
import AppButton from '@/components/AppButton.vue';
import AnimatedCheckmark from '@/components/AnimatedCheckmark.vue';
import { router } from '@/routes';
</script>
<template>
  <section class="in-progress">
    <div class="card-container">
      <AnimatedCheckmark />
      <p class="label-sm">Success!</p>
    </div>

    <AppButton label="Make a new Payment" @click="router.push('/')" />
  </section>
</template>

<style scoped lang="scss">
.in-progress {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
</style>
