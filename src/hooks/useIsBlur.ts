import { ProcessImagesByGaussianBlur } from './useGaussianBlur';
import { ProcessImagesByGaussianPyramid } from './useGaussianPyramid';
import { ref } from 'vue';

const isGaussianBlur = ref(true);
export function useIsBlur() {

  function toggleBlur(blur: boolean) {
    isGaussianBlur.value = blur;
    if (blur) {
      ProcessImagesByGaussianBlur();
    } else {
      ProcessImagesByGaussianPyramid();
    }
  }

  return {
    isGaussianBlur,
    toggleBlur
  };
}