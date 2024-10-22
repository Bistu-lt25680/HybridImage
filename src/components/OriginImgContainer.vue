<template>
  <div class="image-container">
    <div class="image-box">
      <img id="image1" alt="原始图片1">
    </div>
    <div class="image-box">
      <img id="image2" alt="原始图片2">
    </div>
  </div>
</template>

<script lang="ts" setup>

</script>

<style scoped>
.image-container{
    display:flex;
    justify-content:space-around;
    flex-grow:1;
    padding:20px
}

.image-box{
    border:2px solid #ddd;
    padding:10px;
    text-align:center
}

</style>
