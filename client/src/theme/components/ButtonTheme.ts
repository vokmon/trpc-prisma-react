/* eslint-disable @typescript-eslint/consistent-type-definitions */
import { darken, experimental_extendTheme as extendTheme } from '@mui/material';

const theme = extendTheme({
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: 'custom' },
          style: {
            // textTransform: 'none',
            // border: '2px dashed #757ce8',
            // borderRadius: '10px',
            // '&:hover': {
            //   backgroundColor: '#757ce8',
            // },
          },
        },
      ],
      styleOverrides: {
        root: ({ theme, ownerState }) => {
          if (ownerState.variant === 'custom') {
            return {
              // this is the same as writing:
              // backgroundColor: 'var(--mui-palette-background-paper)',
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              backgroundColor: theme.vars.palette[ownerState.color].main,
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              color: theme.palette[ownerState.color].contrastText,
              '&:hover': {
                backgroundColor: `${darken(
                  // get the actual color #000000
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  theme.palette[ownerState.color].main,
                  0.2
                )}`,
              },
              '&.Mui-disabled': {
                backgroundColor: theme.palette.action.disabledBackground,
                boxShadow: 'none',
              },
              borderRadius: '50px',
              fontSize: '0.8em',
              textTransform: 'none',
              fontWeight: 'bold',
              boxShadow: theme.vars.shadows[2],
              border: 0,
            };
          }
        },
      },
    },
  },
});

export const buttonTheme = theme.components?.MuiButton;

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
