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

type AmplienceSdk = ContentFieldExtension<FieldModel, Parameters>;

function App() {
  const [value, setValue] = useState(0);
  const [sdk, setSdk] = useState<AmplienceSdk>();

  useEffect(() => {
    init<AmplienceSdk>().then(setSdk);
  }, []);

  useEffect(() => {
    if (!hasLoadedSdk(sdk))
      return;

    sdk.field.getValue().then(setValueTo);
  }, [sdk]);

  const hasLoadedSdk = (sdk: AmplienceSdk | undefined): sdk is AmplienceSdk => {
    return !!sdk;
  }

  const setValueTo = (newValue: FieldModel = 3) => {
    if (!hasLoadedSdk(sdk))
      return;

    sdk.field.setValue(newValue);
    setValue(newValue);
  }

  const increment = () => {
    setValueTo(value + 1);
  }

  const decrement = () => {
    setValueTo(value - 1);
  }

  if (!hasLoadedSdk(sdk))
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
