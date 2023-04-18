/* eslint-disable @typescript-eslint/consistent-type-definitions */
import { alpha, experimental_extendTheme as extendTheme } from '@mui/material';

const theme = extendTheme({
  components: {
    MuiToggleButton: {
      styleOverrides: {
        root: ({ theme, ownerState }) => {
          if (ownerState.role === 'custom') {
            return {
              borderRadius: 30,
              fontSize: '0.8em',
              textTransform: 'none',
              paddingLeft: 20,
              paddingRight: 20,
              cursor: 'pointer',
              marginRight: 20,
              // borderLeftColor: 'unset',
              '&.MuiToggleButtonGroup-grouped:not(:last-of-type)': {
                borderTopLeftRadius: 30,
                borderBottomLeftRadius: 30,
                borderTopRightRadius: 30,
                borderBottomRightRadius: 30,
                marginLeft: 0,
              },
              '&.MuiToggleButtonGroup-grouped:not(:first-of-type)': {
                borderTopLeftRadius: 30,
                borderBottomLeftRadius: 30,
                borderTopRightRadius: 30,
                borderBottomRightRadius: 30,
                marginLeft: 0,
                borderLeftColor: theme.palette.divider,
              },
              '&.MuiToggleButton-root': {
                color: '#000',
              },
              '&.Mui-selected': {
                backgroundColor: '#002884',
                color: '#fff',
                '&:hover': {
                  backgroundColor: alpha('#002884', 0.8),
                },
              },
            };
          }
        },
      },
    },
  },
});

export const toggleButtonTheme = theme.components?.MuiToggleButton;

declare module '@mui/material/styles' {
  interface PaletteOptions {
    custom: { main: string; contrastText: string };
    neutral: { main: string; contrastText: string };
    custom2: { main: string };
  }
  interface Palette {
    custom: { main: string; contrastText: string };
    neutral: { main: string; contrastText: string };
    custom2: { custom2: string };
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    neutral: true;
    custom: true;
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    custom: true;
  }
}
