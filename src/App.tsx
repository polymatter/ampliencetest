import './App.css';
import { init } from 'dc-extensions-sdk';
import type { ContentFieldExtension } from 'dc-extensions-sdk';
import { useState, useEffect } from 'react';
import { AppWrap, SearchBox, Title, Text, SearchButton, SearchBoxWrap } from './style';

type FieldModel = string;
interface Parameters {
  instance: {};
  installation: {
    configParam: string;
  }
}

type AmplienceSdk = ContentFieldExtension<FieldModel, Parameters>;

const api = (search: string) => `https://dev.poq.io/clients/demo/search/predictive?keyword=${search}`;
// const api = (search: string) => `https://dev.poq.io/clients/demo/search`; //bala said to use this one.

// Note for CORS the response needs a "Access-Control-Allow-Origin" set,
const headers = {
  "Authorization": "Bearer anonymous+1fcac1b5-a3c6-4a62-80c1-62a478186863",
  "Content-Type": "application/json",
  "poq-app-identifier": "ca315772-4803-4b48-ae99-5683133770e6",
  "Poq-Currency-Identifier": "GBP",
  "User-Agent": "com.poq.poqdemoapp-uat/20.0.1 iOS/15.0",
}

function App() {
  const [sdk, setSdk] = useState<AmplienceSdk>();
  const [searchWord, setSearchWord] = useState("") 

  useEffect(() => {
    init<AmplienceSdk>().then(setSdk);
  }, []);

  useEffect(() => {
    if (!hasLoadedSdk(sdk))
      return;

    sdk.field.getValue();
  }, [sdk]);

  const hasLoadedSdk = (sdk: AmplienceSdk | undefined): sdk is AmplienceSdk => {
    return !!sdk;
  }

  const searchWordChange = (event : React.ChangeEvent<HTMLInputElement>) => {
    const searchWord = event.target.value;
    setSearchWord(searchWord);
  }

  const fetchSuggestions = () => {
    fetch(api('dr'), { method: 'GET', headers })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      });
  }

  if (!hasLoadedSdk(sdk))
    return <div className="App">Loading ...</div>

  return (
    <AppWrap  className="App">
      <Title>Product</Title>
      <Text>Enter a product name below, then click Search to find the right product {searchWord}</Text>
      <SearchBoxWrap>
        <SearchBox placeholder="Product name eg. Dress" type="text" className="input" onChange={searchWordChange} value={searchWord} />
      </SearchBoxWrap>
      <SearchButton onClick={fetchSuggestions}>Search</SearchButton>
    </AppWrap>
  );
}

export default App;
