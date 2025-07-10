<script setup lang="ts">
import AppButton from '@/components/AppButton.vue';
import AnimatedCheckmark from '@/components/AnimatedCheckmark.vue';
import CardContainer from '@/components/CardContainer.vue';
import { router } from '@/routes';
</script>

<template>
  <CardContainer animated>
    <AnimatedCheckmark />
    <p class="label-sm">Success!</p>

    <template #cta>
      <AppButton label="New Payment" @click="router.push('/')" />
    </template>
  </CardContainer>
</template>
