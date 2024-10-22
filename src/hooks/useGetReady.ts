export function GetReady(){
  const sliders=['alphaSlider','kernel1Slider','kernel2Slider','sigmaXSlider','sigmaYSlider'];
    sliders.forEach(sliderId=>{
        const slider=document.getElementById(sliderId);
        if(slider){
            slider.addEventListener('input',UpdateSliderValue);
        }else{
            console.error(`滑动条${sliderId}未找到`);
        }
    });
}

import { ProcessImages } from './useProcessImages';

function UpdateSliderValue(e:any){
  // 获取滑动条的值
  const valueElement=document.getElementById(`${e.target.id}Value`);
  if(valueElement){
      // 更新滑动条的值
      valueElement.textContent=e.target.value;
      // console.log(e.target.value);
  }else{
      console.error(`未找到与滑动条 ${e.target.id} 对应的值显示元素，但继续处理图像`);
  }
  ProcessImages();
}