<template>
  <div class="card" :class="cardClass">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    cardClass: String
  }
}
</script>

<style>

</style>
