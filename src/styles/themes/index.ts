import { DefaultTheme, CustomTheme } from 'styled-components';
import dark from './dark';
import light from './light';

const defaultTheme = {
  fontSizes: {
    small: '87.5%',
    medium: '93.75%',
    large: '100%',
  },
};

function combineTheme(theme: CustomTheme): DefaultTheme {
  return { ...defaultTheme, ...theme };
}

export { combineTheme, dark, light };