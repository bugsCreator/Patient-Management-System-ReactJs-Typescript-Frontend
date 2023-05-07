import React from 'react';
import './App.css';
import ReactRouter from './Router';
import { ConfigProvider } from 'antd';

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: "'Source Sans Pro', sans-serif",
        },
      }}
    >
      <div className="App">
        <ReactRouter />
      </div>
    </ConfigProvider>

  );
}

export default App;
