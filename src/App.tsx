import './App.css';
import { init } from 'dc-extensions-sdk';
import type { ContentFieldExtension } from 'dc-extensions-sdk';
import { useState, useEffect } from 'react';

type FieldModel = string;
interface Parameters {
  instance: {};
  installation: {
    configParam: string;
  }
}

type AmplienceSdk = ContentFieldExtension<FieldModel, Parameters>;

const api = (search:string) => `https://dev.poq.io/clients/demo/search/predictive?keyword=${search}`;
const headers = {
  "Authorization": "Bearer anonymous+1fcac1b5-a3c6-4a62-80c1-62a478186863",
  "User-Agent": "com.poq.poqdemoapp-uat/20.0.1 iOS/15.0",
  "poq-app-identifier": "ca315772-4803-4b48-ae99-5683133770e6"
}

function App() {
  const [value, setValue] = useState("hello");
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

  const setValueTo = (newValue: FieldModel = "No suggestion") => {
    if (!hasLoadedSdk(sdk))
      return;

    sdk.field.setValue(newValue);
    setValue(newValue);
  }

  const fetchSuggestions = () => {
    fetch(api('dr'), { headers }).then(response => response.json()).then(console.log);
  }

  if (!hasLoadedSdk(sdk))
    return <div className="App">Loading ...</div>

  return (
    <div className="App">
      Value is ... {value}
      <input type="text" className="input" />
      <button onClick={fetchSuggestions}>+</button>
    </div>
  );
}

export default App;
