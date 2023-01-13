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
              main: 'linear-gradient(to right, rgba(90,196,165,1), rgba(68,153,243,0))',
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
              main: 'linear-gradient(to right, rgba(90,196,165,1), rgba(68,153,243,0))',
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
