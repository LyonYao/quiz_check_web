import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// 获取根元素
const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('无法找到根元素 #root');
}

// 创建 React 根并渲染应用
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);