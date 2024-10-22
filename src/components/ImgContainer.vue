<template>
  <div class="image-container">
    <div class="image-box">
      <canvas id="image1HighFreq" alt="图片1高频"></canvas>
      <p>高频图像</p>
    </div>
    <div class="image-box">
      <canvas id="image2LowFreq" alt="图片2低频"></canvas>
      <p>低频图像</p>
    </div>
    <div class="image-box">
      <canvas id="resultCanvas" alt="结果图像"></canvas>
      <p>结果图像</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
// 不需要任何 JavaScript 逻辑
</script>

<style scoped>
.image-container {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin: 20px 0;
  flex-wrap: wrap;
}

.image-box {
  flex: 1;
  min-width: 200px;
  max-width: calc(33.33% - 20px);
  margin: 0 10px 20px;
  text-align: center;
}

canvas {
  max-width: 100%;
  height: auto !important; /* 覆盖内联样式 */
  object-fit: contain;
}

p {
  margin-top: 10px;
  font-weight: bold;
}

@media (max-width: 768px) {
  .image-box {
    max-width: calc(50% - 20px);
  }
}

@media (max-width: 480px) {
  .image-box {
    max-width: 100%;
  }
}
</style>
