import { createGlobalStyle } from 'styled-components';

function GlobalStyle({ showModal, setShowModal, product }) {
    return (createGlobalStyle`
    * {
      box-sizing: border-box;
      margin:0;
      padding: 0;
      font-family: 'Arial', sans-serif;
    }
  `)
}

export default GlobalStyle
