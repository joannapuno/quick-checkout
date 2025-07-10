<template>
  <section class="card-container">
    <div class="card-container__content">
      <slot name="default"></slot>
    </div>

    <slot name="cta"></slot>
  </section>
</template>

<style scoped lang="scss">
.card-container {
  transition: 0.2s ease;
  margin: auto 0;
  
  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    width: 100%;
    background-color: #fff;
    border-radius: 10px;
    padding: 3rem 2rem;
    margin-bottom: 1rem;
    box-shadow: 0 0 80px #c56ea0;

    @media screen and (min-width: 445px){
      width: 25.75rem;
    }
  }
}
</style>