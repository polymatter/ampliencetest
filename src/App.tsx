import './App.css';
import { init } from 'dc-extensions-sdk';
import type { ContentFieldExtension } from 'dc-extensions-sdk';

// interface FieldModel {
//   title: string;
//   type: string;
//   control: string;
//   format: string;
//   minLength: number;
//   maxLength: number;
// }
interface FieldModel {
  description: string;
  maximum: number;
  minimum: number;
  title: string;
  type: string;
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
  await sdk.field.setValue(3 as unknown as FieldModel)
  console.log(await sdk.field.getValue());
  
  console.log(`schema: `);
  console.log(sdk.field.schema);

}

initialize();

function App() {
  return (
    <div className="App">
      This is a test ... 
    </div>
  );
}

export default App;
