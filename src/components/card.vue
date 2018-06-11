<template>
  <div class="card">
    <slot></slot>
  </div>
</template>

<script>
export default {
}
</script>

<style>
.card {
  width: 100%;
  display: flex;
  padding: 20px;
  margin: 10px 20px;
  background-color: #fff;
  border-radius: 5px;
  box-sizing: border-box;
  align-items: center;
  justify-content: space-between;
  color: #666;
  font-size: 20px;
  box-shadow: 0 0 6px 0 rgba(0,0,0,.1);
}
</style>
