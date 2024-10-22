import { ref, onUnmounted } from 'vue';

export const alphaValue = ref(0);
export const kernel1Value = ref(1);
export const kernel2Value = ref(1);
export const sigmaXValue = ref(0);
export const sigmaYValue = ref(0);

let img1: any = null;
let img2: any = null;
let imgCatGaus: any = null;
let imgDogGaus: any = null;
let highFreq: any = null;
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

export function ProcessImagesByGaussianBlur() {
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

    // 步骤 2: 高斯模糊（获取低频）
    imgCatGaus = recreateMat(imgCatGaus);
    imgDogGaus = recreateMat(imgDogGaus);
    cv.GaussianBlur(img1, imgCatGaus, new cv.Size(kernel1, kernel1), sigmaX, sigmaY);
    cv.GaussianBlur(img2, imgDogGaus, new cv.Size(kernel2, kernel2), sigmaX, sigmaY);

    // 步骤 3: 获取高频
    highFreq = recreateMat(highFreq);
    cv.subtract(img1, imgCatGaus, highFreq);

    // 步骤 4: 归一化高频
    let normalizedHigh = new cv.Mat();
    cv.normalize(highFreq, normalizedHigh, 0, 255, cv.NORM_MINMAX, cv.CV_8U);

    // 步骤 5: 增强高频对比度
    let highFreqEnhanced = new cv.Mat();
    cv.convertScaleAbs(normalizedHigh, highFreqEnhanced, 2, 128);

    // 步骤 6: 混合
    result = recreateMat(result);
    cv.addWeighted(highFreqEnhanced, alpha, imgDogGaus, 1.0 - alpha, 0.0, result);

    // 显示结果
    cv.imshow('image1HighFreq', highFreqEnhanced);
    cv.imshow('image2LowFreq', imgDogGaus);
    cv.imshow('resultCanvas', result);

    // 释放临时内存
    deleteMat(img1);
    deleteMat(img2);
    deleteMat(imgCatGaus);
    deleteMat(imgDogGaus);
    deleteMat(highFreq);
    deleteMat(normalizedHigh);
    deleteMat(highFreqEnhanced);
    deleteMat(result);
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

