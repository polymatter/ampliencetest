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
    init<ContentFieldExtension<FieldModel, Parameters>>().then(sdk => {
      setSdk(sdk);
    });
  }, []);

  useEffect(() => {
    setValueTo(3);
  }, [sdk])

  const setValueTo = (newValue: FieldModel) => {
    if (!sdk.field)
      return;

    sdk.field.setValue(newValue);
    setValue(newValue);
  }

  if (!sdk.field)
    return <div className="App">Loading ...</div>

  return (
    <div className="App">
      Value is ... {value}
    </div>
  );
}

export default App;
