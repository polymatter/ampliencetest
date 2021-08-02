import styled from 'styled-components';

export const Title = styled.div`
    padding-bottom: 10px;
    font-weight: bold;
`;

export const Text = styled.div`
    padding-bottom: 10px;
`;

export const SearchBox = styled.input`
    width: 100%;
    padding: 0.5em 0.8em 0.5em 2.5em;
    border: 1px solid #ced4da;
    border-radius: 4px;
    outline: none;
    background: #fff
    line-height: 1.5;
    color: #000
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
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