/* eslint-disable @typescript-eslint/consistent-type-definitions */
import { ColorSystemOptions, SupportedColorScheme } from '@mui/material';

export const palleteTheme: Partial<
  Record<SupportedColorScheme, ColorSystemOptions>
> = {
  light: {
    palette: {
      primary: {
        main: '#757ce8',
      },
      neutral: {
        main: '#c9f2ca',
        contrastText: '#fff',
      },
      custom: {
        main: '#002884',
        contrastText: '#000',
      },
      custom2: {
        main: '#f5a6ec',
      },
    },
  },
};

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
