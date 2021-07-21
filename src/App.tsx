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
  console.log(`value: `);
  console.log(await sdk.field.getValue());
  console.log(`schema: `);
  console.log(sdk.field.schema);
  console.log(`contentItem: `);
  console.log(await sdk.contentItem.getCurrent());
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
