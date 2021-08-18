import './App.css';
import { useState } from 'react';
import { AppWrap, SearchBox, Title, Text, SearchButton, SearchBoxWrap, ListTable, ListTableBody, ListTableRow, ListTableData } from './style';

import type { AmplienceSdk } from './App';

type SearchResult = Record<string, string>

export const ProductPicker = ({sdk}: { sdk : AmplienceSdk }) => {
    const [searchWord, setSearchWord] = useState("") ;
    const [results, setResults] = useState([] as SearchResult[]);
  
    const searchWordChangeHandler = (event : React.ChangeEvent<HTMLInputElement>) => {
      const searchWord = event.target.value;
      setSearchWord(searchWord);
    }
  
    const fetchSuggestions = () => {
      const headers = sdk.params.instance.headers;
  
      const url = sdk.params.instance.endpoint.searchUrl?.replace('${search}', searchWord);
      if (!url) {
        console.error("No searchUrl specified")
        return;
      }
  
      fetch(url, { method: 'GET', headers })
        .then(response => response.json())
        .then(data => {
          const listProperty = sdk.params.instance.endpoint.listProperty;
      
          setResults(listProperty ? data[listProperty] : data);
        });
    }
  
    const displayLabelProperty = sdk.params.instance.endpoint.displayLabelProperty;
  
    return (
      <AppWrap  className="App">
        <Title>Product</Title>
        <Text>Enter a product name below, then click Search to find the right product</Text>
        <SearchBoxWrap>
          <SearchBox placeholder="Product name eg. Dress" type="text" className="input" onChange={searchWordChangeHandler} value={searchWord} />
        </SearchBoxWrap>
        <SearchButton onClick={fetchSuggestions} >Search</SearchButton>
        {
          results.length > 0 &&
          <ListTable>
            <ListTableBody>
              {
                results.map(result => {
                  return <ListTableRow>
                    <ListTableData>{result[displayLabelProperty]}</ListTableData>
                  </ListTableRow>
                })
              }
            </ListTableBody>
          </ListTable>
        }
      </AppWrap>
    );
  }