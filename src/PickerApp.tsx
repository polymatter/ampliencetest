import './App.css';
import { init } from 'dc-extensions-sdk';
import type { ContentFieldExtension } from 'dc-extensions-sdk';
import { useState, useEffect } from 'react';
import { ProductPicker } from './ProductPicker';
import {CategoryPicker} from './CategoryPicker';

export type FieldModel = string;
export interface Parameters {
  instance: {
    headers: {
      "poq-app-identifier": string,
      "poq-currency-identifier": string,
    }
    endpoint: {
      searchUrl: string,
      listProperty: string,
      imageProperty: string,
      displayLabelProperty: string,
    }
    pickerType: "product" | "category"
  };
  installation: {
    configParam: string;
  }
}

export type AmplienceSdk = ContentFieldExtension<FieldModel, Parameters>;

function App() {
  const [sdk, setSdk] = useState<AmplienceSdk>();

  useEffect(() => {
    init<AmplienceSdk>().then(setSdk);
  }, []);

  if (!sdk) {
    return <div className="App">Loading ...</div>
  }

  const pickerType = sdk.params.instance.pickerType;
  if (pickerType.toLowerCase() == "category") {
    return <CategoryPicker sdk={sdk} />
  }

  return <ProductPicker sdk={sdk} />
}

export default App;