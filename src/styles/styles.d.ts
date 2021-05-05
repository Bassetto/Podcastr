import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    title: string;
    colors: {
        white: string,
        grayPrimary: string,
        graySecondary: string,
        grayTertiary: string,
        grayQuaternary: string,
        grayQuinary: string,
        green: string,
        purplePrimary: string,
        purpleSecondary: string,
        purpleTertiary: string,
        purpleQuaternary: string,
        background: string,
    };
    fontSizes: {
      small: string;
      medium: string;
      large: string;
    };
  }

  export interface CustomTheme {
    title: string;
    colors: {
        white: string,
        grayPrimary: string,
        graySecondary: string,
        grayTertiary: string,
        grayQuaternary: string,
        grayQuinary: string,
        green: string,
        purplePrimary: string,
        purpleSecondary: string,
        purpleTertiary: string,
        purpleQuaternary: string,
        background: string,
    };
  }
}