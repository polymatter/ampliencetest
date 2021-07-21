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
type FieldModel = number;
interface Parameters {
  instance: {};
  installation: {
    configParam: string;
  }
}

const sdk = async function() {
  return await init<ContentFieldExtension<FieldModel, Parameters>>()
}();

function App() {
  return (
    <div className="App">
      This is a test ... {async function() { return await (await sdk).field.getValue() }()}
    </div>
  );
}

export default App;
