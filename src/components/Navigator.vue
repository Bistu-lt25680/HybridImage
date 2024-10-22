<template>
  <div class="navigate">
    <button @click="LoadImage('image1')">加载图片1</button>
    <button @click="LoadImage('image2')">加载图片2</button>
    <button @click="ProcessImages">处理图像</button>
    <button @click="SaveResult">保存结果</button>
    <button @click="toggleBlur(true)" :class="{active:isGaussianBlur}">高斯滤波</button>
    <button @click="toggleBlur(false)" :class="{active:!isGaussianBlur}">高斯金字塔</button>
  </div>
</template>

<script lang="ts" setup>
  import { LoadImage } from '../hooks/useLoadImage';
  import { ProcessImages } from '../hooks/useProcessImages';
  import { SaveResult } from '../hooks/useSaveResult';
  import { useIsBlur } from '../hooks/useIsBlur';
  const {isGaussianBlur,toggleBlur}=useIsBlur();

  
</script>

<style scoped>
.navigate{
    background-color:#4CAF50;
    padding:10px;
    display:flex;
    justify-content:space-around
}

button{
    padding:10px 20px;
    font-size:16px;
    cursor:pointer;
    background-color:#45a049;
    color:white;
    border:none;
    border-radius:5px
}

.active{
    background-color: #f70a0a;
}
</style>
