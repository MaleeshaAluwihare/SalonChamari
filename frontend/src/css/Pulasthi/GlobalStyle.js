import {createGlobalStyle} from 'styled-components'


// css in here affect to the whole app
export const GlobalStyle = createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        list-style: none;
    }

    :root{
        --primary-color: #222260;
        --primary-color2: 'color: rgba(34, 34, 96, .6)';
        --primary-color3: 'color: rgba(34, 34, 96, .4)';
        --color-green: #42AD00;
        --color-grey: #aaa;
        --color-accent: #F56692;
        --color-delete: #FF0000;
        --color-lightYellow: #e5de00;
        --color-DarkYellow: #e6b400;
        --color-lightRed: #EE4B2B;
        --color-darkRed: #D22B2B;
    }

    body{
        font-family: "Nunito", sans-serif;
        font-size: clamp(1rem, 1.5vw, 1.2rem);
        overflow: hidden;
        color: rgba(34, 34, 96, .6);
    }

`;