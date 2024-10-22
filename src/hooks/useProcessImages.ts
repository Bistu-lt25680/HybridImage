import { useIsBlur } from './useIsBlur';
import { ProcessImagesByGaussianBlur } from './useGaussianBlur';
import { ProcessImagesByGaussianPyramid } from './useGaussianPyramid';

export function ProcessImages() {
  const { isGaussianBlur } = useIsBlur();
  console.log(isGaussianBlur.value)
  if (isGaussianBlur.value) {
    ProcessImagesByGaussianBlur();
  } else {
    ProcessImagesByGaussianPyramid();
  }
}
