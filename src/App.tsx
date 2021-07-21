import './App.css';
import { init } from 'dc-extensions-sdk';
import type { ContentFieldExtension } from 'dc-extensions-sdk';
import { useAsync } from 'react-async';

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

initialize();

function App() {
  const { data, error, isLoading } = useAsync({ promiseFn: init as any })
  const { data: value , error: errorValue, isLoading: isLoadingValue } = useAsync({ promiseFn: (data as ContentFieldExtension).field.getValue})

  if (error) 
    return <div className="App">Error {error}</div>

  if (isLoading)
    return <div className="App">Loading</div>

  if (data) {
    if (errorValue)
      return <div className="App">Error Value {errorValue}</div>

    if (isLoadingValue)
      return <div className="App">Loading Value</div>

    if (value)
      return (
        <div className="App">
          Value is ... {value}
        </div>
      );
  }

  return <div className="App">Error 2</div>
}

export default App;
