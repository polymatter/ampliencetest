import './App.css';
import { init } from 'dc-extensions-sdk';
import type { ContentFieldExtension } from 'dc-extensions-sdk';
import { useState, useEffect } from 'react';

type FieldModel = number;
interface Parameters {
  instance: {};
  installation: {
    configParam: string;
  }
}

async function initialize() {
  const sdk = await init<ContentFieldExtension<FieldModel, Parameters>>();
  await sdk.field.setValue(3)
  return sdk;
};


function App() {
  const [ value, setValue ] = useState(0);
  const [ sdk, setSdk ] = useState<Partial<ContentFieldExtension<FieldModel, Parameters>>>({});

  useEffect(() => {
    init<ContentFieldExtension<FieldModel, Parameters>>().then(setSdk);
  }, []);

  useEffect(() => {
    if (!sdk.field)
      return;

    sdk.field.getValue().then(setValueTo);
  }, [sdk])

  const setValueTo = (newValue: FieldModel = 3) => {
    if (!sdk.field)
      return;

    sdk.field.setValue(newValue);
    setValue(newValue);
  }

  const increment = () => {
    if (!sdk.field)
      return;
    
    setValueTo(value + 1);
  }

  const decrement = () => {
    if (!sdk.field)
      return;

    setValueTo(value - 1);
  }

  if (!sdk.field)
    return <div className="App">Loading ...</div>

  return (
    <div className="App">
      Value is ... {value}
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  );
}

export default App;
