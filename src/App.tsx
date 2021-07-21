import React from 'react';
import logo from './logo.svg';
import './App.css';
import { init } from 'dc-extensions-sdk';

async function initialize() {
  console.log('ping2');
  const sdk:any = await init();
  console.log('ping3');
  const contentItem = await sdk.contentItem.getCurrent();
  console.log(`contentItem ${contentItem}`);
}

console.log('ping1');
initialize();

function App() {
  return (
    <div className="App">
      This is a test ... 
    </div>
  );
}

export default App;
