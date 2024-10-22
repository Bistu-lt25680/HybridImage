import { type App } from "vue";

// 声明全局 cv 对象
declare global {
  interface Window {
    cv: any;
  }
}

let cv: any = undefined;

export default {
  install: async (app: App) => {
    const loadOpenCV = new Promise<void>((resolve) => {
      const script = document.createElement("script");
      script.async = true;
      script.src = "/opencv.js"; // 使用绝对路径
      script.onload = () => {
        cv = window.cv;
        resolve();
      };
      document.head.appendChild(script);
    });

    await loadOpenCV;
    app.provide("cv", cv);
  },
};

export { cv };
