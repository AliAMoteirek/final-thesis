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
              main: '#24de72ff',
              contrastText: '#ffffff',
            },
            secondary: {
              main: '#7bceb9',
              contrastText: '#ffffff',
            },
            background: {
              default: '#191d24',
              paper: '#404040',
            },
          }
        : {
            primary: {
              main: '#24de72ff',
            },
            secondary: {
              main: '#7bceb9',
            },
            background: {
              default: '#eceae7',
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
