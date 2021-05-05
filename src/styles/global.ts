import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        outline: 0;
    }

    @media (max-width: 1080px) {
        html {
            font-size: ${props => props.theme.fontSizes.medium};
        }
    }

    @media (max-width: 720px) {
        html {
            font-size: ${props => props.theme.fontSizes.small};
        }
    }

    body {
        ackground: ${props => props.theme.colors.grayPrimary};
    }

    body, input, textarea, button {
        font: 500 1rem Inter, sans-serif;
        color: ${props => props.theme.colors.grayQuaternary};
    }

    h1, h2, h3, h4, h5, h6 {
        font-weight: 600;
        font-family: Lexend, sans-serif;
        color: ${props => props.theme.colors.grayQuinary};
    }

    h1 {
        font-size: 2rem;
    }

    h2 {
        font-size: 1.5rem;
    }

    button {
        cursor: pointer;
    }
`;
