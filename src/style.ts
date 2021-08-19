import styled from 'styled-components';

export const AppWrap = styled.div`
    width: 25%;
    padding: 16px;
    border-radius: 8px;
    box-shadow: 0 0 4px rgb(0 0 0 / 5%);
    background: #fff;
    overflow-y: hidden;
`;

export const Title = styled.div`
    padding-bottom: 10px;
    font-weight: bold;
`;

export const Text = styled.div`
    padding-bottom: 10px;
`;

export const SearchBoxWrap = styled.div`
    padding-bottom: 10px;
`;

export const SearchBox = styled.input`
    width: calc(100% - 3.3em);
    padding: 0.5em 0.8em 0.5em 2.5em;
    border: 1px solid #ced4da;
    border-radius: 4px;
    outline: none;
    background: #fff;
    line-height: 1.5;
    color: #000;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

    -webkit-writing-mode: horizontal-tb !important;
    text-rendering: auto;
    letter-spacing: normal;
    word-spacing: normal;
    text-transform: none;
    text-indent: 0px;
    text-shadow: none;
    display: inline-block;
    text-align: start;
    appearance: auto;
    -webkit-rtl-ordering: logical;
    cursor: text;

`;

export const SearchButton = styled.button`
    width: 100%;
    padding-bottom: 10px;
    display: inline-block;
    position: relative;
    padding: 10px 32px;
    border: none;
    border-radius: 8px;
    outline: none;
    background: rgb(97,60,122);
    font: inherit;
    text-align: center;
    white-space: no-wrap;
    user-select: none;
    color: #fff;
    cursor: pointer;
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    -webkit-appearance: button;
`;

export const ListTable = styled.table`
    display: table;
    text-indent: initial;
    border-spacing: 2px;
    width: 100%;
    border: none;
    padding-bottom: 10px;
`;

export const ListTableBody = styled.tbody`
    display: table-row-group;
    vertical-align: middle;
`;

export const ListTableRow = styled.tr`
    display: table-row;
    outline: none;
    cursor: pointer;
`;

export const ListTableData = styled.td<{ selected?: boolean }>`
    border-bottom: 5px solid #efefef;
    padding: 8px 16px;
    text-align: left;
    background: ${props => props.selected ? '#efefef' : 'white'}
`;