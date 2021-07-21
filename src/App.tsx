import React from 'react';
import logo from './logo.svg';
import './App.css';
import { init } from 'dc-extensions-sdk';
import type { ContentFieldExtension } from 'dc-extensions-sdk';

interface FieldModel {
  title: string;
  type: string;
  control: string;
  format: string;
  minLength: number;
  maxLength: number;
}

interface Parameters {
  instance: {};
  installation: {
    configParam: string;
  }
}

async function initialize() {
  const sdk = await init<ContentFieldExtension<FieldModel, Parameters>>();
  console.log('connected...');
  console.log(`value: ${sdk.field.getValue()}`);
  console.log(`schema: ${sdk.field.schema}`);
  console.log(`contentItem: ${sdk.contentItem.getCurrent()}`);
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
