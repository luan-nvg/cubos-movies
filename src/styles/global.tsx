import { createGlobalStyle } from "styled-components"

export const GlobalStyle = createGlobalStyle`
    :root {
        // COLORS
        --black: black;
        --secondary-text: #54565c;
        --white: #fff;
        --disabled: #535664;

        --primary: #8e4ec6;          /* Roxo principal */
        --light-primary: #b88ae3;    /* Roxo mais claro */
        --primary-hover: #6c39a3;    /* Roxo mais escuro para hover */

        --error: #DC2626;
        --success: #16A34A;

        --bg-default: #EFF0F8;
        --bg-light: #F7F8F9;
        --bg-container: #E2E8F0;
        --bg-disabled: #E4E6EF;

        --light-gray: #627189;

        // SIZES 
        --sm: 1.2rem;
        --md: 1.6rem;
        --lg: 2.4rem;
        --xl: 3.2rem;
        --2xl: 6.4rem;

        // WEIGHTS
        --regular: 400;
        --semibold: 600;
        --bold: 700;
    }

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }


    #root{
        display: flex;
    }   

    html {
        font-size: 62.5%;
    }

    @font-face {
        font-family: "Poppins";
        src: url("https://fonts.googleapis.com/css2?family=Poppins:400;0,400;1,500;1&display=swap");
    }
`
