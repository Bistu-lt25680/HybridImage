import { ref, onUnmounted } from 'vue';

export const alphaValue = ref(0);
export const kernel1Value = ref(1);
export const kernel2Value = ref(1);
export const sigmaXValue = ref(0);
export const sigmaYValue = ref(0);

let img1: any = null;
let img2: any = null;
let img1Original: any = null;
let img2Original: any = null;
let result: any = null;

declare const cv: any;

function createMat() {
  return new cv.Mat();
}

function deleteMat(mat: any) {
  if (mat && !mat.isDeleted()) {
    mat.delete();
  }
}

function recreateMat(mat: any) {
  deleteMat(mat);
  return createMat();
}

export function ProcessImagesByGaussianPyramid() {
  const alphaSliderMax = 100;

  let alpha = Number(alphaValue.value) / alphaSliderMax;
  let kernel1 = Number(kernel1Value.value);
  let kernel2 = Number(kernel2Value.value);
  let sigmaX = Number(sigmaXValue.value);
  let sigmaY = Number(sigmaYValue.value);

  kernel1 = kernel1 % 2 === 0 ? kernel1 + 1 : kernel1;
  kernel2 = kernel2 % 2 === 0 ? kernel2 + 1 : kernel2;

  try {
    // 步骤 1: 读取图像
    if (!img1 || img1.isDeleted()) img1 = cv.imread('image1');
    if (!img2 || img2.isDeleted()) img2 = cv.imread('image2');

    if (img1.empty() || img2.empty()) {
      console.error('图像读取失败');
      return;
    }

    // 调整图片尺寸
    cv.resize(img2, img2, new cv.Size(img1.cols, img1.rows));

    let img1Original = img1.clone();
    let img2Original = img2.clone();

    let temp1 = new cv.Mat();
    let temp2 = new cv.Mat();

    // 三次高斯模糊和缩小操作
    for (let i = 0; i < 3; i++) {
      cv.GaussianBlur(img1, img1, new cv.Size(kernel1, kernel1), sigmaX, sigmaY);
      cv.GaussianBlur(img2, img2, new cv.Size(kernel2, kernel2), sigmaX, sigmaY);

      // 缩小图像，保持宽高比
      let newSize1 = new cv.Size(Math.max(1, Math.floor(img1.cols / 2)), Math.max(1, Math.floor(img1.rows / 2)));
      let newSize2 = new cv.Size(Math.max(1, Math.floor(img2.cols / 2)), Math.max(1, Math.floor(img2.rows / 2)));
      cv.resize(img1, temp1, newSize1, 0, 0, cv.INTER_AREA);
      cv.resize(img2, temp2, newSize2, 0, 0, cv.INTER_AREA);

      // 将缩小后的图像赋值回原变量
      temp1.copyTo(img1);
      temp2.copyTo(img2);
    }

    // 放大三次
    for (let i = 0; i < 3; i++) {
      let newSize1 = new cv.Size(img1.cols * 2, img1.rows * 2);
      let newSize2 = new cv.Size(img2.cols * 2, img2.rows * 2);
      cv.resize(img1, img1, newSize1, 0, 0, cv.INTER_LINEAR);
      cv.resize(img2, img2, newSize2, 0, 0, cv.INTER_LINEAR);
    }

    // 确保所有图像尺寸相同
    cv.resize(img1, img1, new cv.Size(img1Original.cols, img1Original.rows));
    cv.resize(img2, img2, new cv.Size(img1Original.cols, img1Original.rows));

    // 计算高频部分
    let imgHighFreq = new cv.Mat();
    cv.subtract(img1Original, img1, imgHighFreq);

    // 归一化
    let normalized = new cv.Mat();
    cv.normalize(imgHighFreq, normalized, 0, 255, cv.NORM_MINMAX, cv.CV_8U);
    
    // 增强对比度
    let highFreqEnhanced = new cv.Mat();
    cv.convertScaleAbs(normalized, highFreqEnhanced, 1, 128);

    // 混合
    result = recreateMat(result);
    cv.addWeighted(highFreqEnhanced, alpha, img2, 1.0 - alpha, 0.0, result);

    // 显示结果
    cv.imshow('image1HighFreq', highFreqEnhanced);
    cv.imshow('image2LowFreq', img2);
    cv.imshow('resultCanvas', result);

    // 释放临时内存
    deleteMat(img1);
    deleteMat(img2);
    deleteMat(img1Original);
    deleteMat(img2Original);
    deleteMat(temp1);
    deleteMat(temp2);
    deleteMat(imgHighFreq);
    deleteMat(normalized);
    deleteMat(highFreqEnhanced);
  } catch (error) {
    console.error('处理图像时出错:', error);
  }
  
}

export function updateSliderValues(alpha: number, kernel1: number, kernel2: number, sigmaX: number, sigmaY: number) {
  alphaValue.value = alpha;
  kernel1Value.value = kernel1;
  kernel2Value.value = kernel2;
  sigmaXValue.value = sigmaX;
  sigmaYValue.value = sigmaY;
}
