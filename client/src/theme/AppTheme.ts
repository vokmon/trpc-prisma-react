import { palleteTheme } from './components/PalleteTheme';
import { buttonTheme } from './components/ButtonTheme';
import { toggleButtonTheme } from './components/ToggleButtonTheme';
import { experimental_extendTheme } from '@mui/material';

export const theme = experimental_extendTheme({
  colorSchemes: palleteTheme,
  components: {
    MuiButton: buttonTheme,
    MuiToggleButton: toggleButtonTheme,
  }
});
