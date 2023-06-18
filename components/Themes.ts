import { Theme, DefaultTheme } from "@react-navigation/native"


export const LightTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'blue',
    background: 'white',
    text: 'white',
  },
};
