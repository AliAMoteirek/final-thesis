import { colors } from '@mui/material';
import { createTheme } from '@mui/material/styles';

export const themeModes = {
  dark: 'dark',
  light: 'light',
};

const themeConfigs = {
  custom: ({ mode }) => {
    const customPalette =
      mode === themeModes.dark
        ? {
            primary: {
              // main: '#24de72ff',
              // main: '#5ac5d2ff',
              main: '#03C9D7',
              text: '#ffffff',
              contrastText: '#ffffff',
            },
            secondary: {
              main: '#7bceb9',
              contrastText: '#ffffff',
            },
            background: {
              // default: '#191d24',
              default: '#0a2029ff',
              // paper: '#404040',
              paper: '#1d333cff',
            },
          }
        : {
            primary: {
              // main: '#ff0000',
              // main: '#24de72ff',
              main: '#5ac5d2ff',
              contrastText: '#ffffff',
              // main: '#03C9D7',
            },
            secondary: {
              // main: '#f44336',
              main: '#7bceb9',
            },
            background: {
              // default: '#eceae7',
              default: colors.grey['100'],
            },
          };

    return createTheme({
      palette: {
        mode,
        ...customPalette,
      },
      components: {
        MuiButton: {
          defaultProps: { disableElevation: true },
        },
      },
    });
  },
};

export default themeConfigs;
