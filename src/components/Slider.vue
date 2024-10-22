<template>
    <div class="slider-container">
        <div v-for="slider in sliders" :key="slider.id">
            <label :for="slider.id">{{ slider.label }}: <span>{{ sliderValues[slider.id as SliderKey] }}</span></label>
            <input
                type="range"
                :id="slider.id"
                class="slider"
                :min="slider.min"
                :max="slider.max"
                :step="slider.step"
                v-model.number="sliderValues[slider.id as SliderKey]"
                @input="updateSliderValue(slider.id as SliderKey)"
            >
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue';
import { updateSliderValues } from '../hooks/useGaussianBlur';
import { ProcessImages } from '../hooks/useProcessImages';
type SliderKey = 'alphaSlider' | 'kernel1Slider' | 'kernel2Slider' | 'sigmaXSlider' | 'sigmaYSlider';

interface Slider {
    id: SliderKey;
    label: string;
    min: number;
    max: number;
    step: number;
}

const sliders: Slider[] = [
    { id: 'alphaSlider', label: 'Alpha', min: 0, max: 100, step: 1 },
    { id: 'kernel1Slider', label: 'Kernel 1 Size', min: 1, max: 100, step: 2 },
    { id: 'kernel2Slider', label: 'Kernel 2 Size', min: 1, max: 100, step: 2 },
    { id: 'sigmaXSlider', label: 'Sigma X', min: 0, max: 15, step: 0.05 },
    { id: 'sigmaYSlider', label: 'Sigma Y', min: 0, max: 15, step: 0.1 },
];

const sliderValues = ref<Record<SliderKey, number>>({
    alphaSlider: 0,
    kernel1Slider: 1,
    kernel2Slider: 1,
    sigmaXSlider: 0,
    sigmaYSlider: 0,
});

function updateSliderValue(sliderId: SliderKey) {
    updateSliderValues(
        sliderValues.value.alphaSlider,
        sliderValues.value.kernel1Slider,
        sliderValues.value.kernel2Slider,
        sliderValues.value.sigmaXSlider,
        sliderValues.value.sigmaYSlider
    );
    ProcessImages();
}

onMounted(() => {
    // 初始化滑块值
    updateSliderValue('alphaSlider');
});

watch(sliderValues, () => {
    updateSliderValue('alphaSlider');
}, { deep: true });
</script>

<style scoped>
.slider-container{
    margin-top:20px;
}

.slider{
    width:98%;
    left:1%;
    margin:10px 0
}
</style>
