import { createApp } from 'vue'
import App from './App.vue'
import cv from './utils/opencv-utils'

const app = createApp(App);

cv.install(app).then(() => {
  app.mount('#app');
  console.log('OpenCV.js is loaded successfully');
}).catch((error) => {
  console.error('Failed to load OpenCV.js', error);
});
