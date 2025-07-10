<script setup lang="ts">
import CardContainer from '@/components/CardContainer.vue';
import AppSpinner from '@/components/AppSpinner.vue';
import { router } from '@/routes';
import { onMounted } from 'vue';

onMounted(() => {
  // Just to test
  setTimeout(() => {
    router.push('success')
  }, 1000)
})
</script>
<template>
  <CardContainer animated>
    <AppSpinner label="Processing..."/>
  </CardContainer>
</template>
