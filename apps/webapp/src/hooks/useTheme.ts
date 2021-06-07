import { Theme } from '@material-ui/core';
import { useStoreState } from '../store/store';
import { darkTheme, lightTheme } from '../themes';

export const useTheme = (): [Theme, 'light' | 'dark'] => {
  const theme = useStoreState((state) => state.theme.themeId);
  switch (theme) {
    case 'light':
      return [lightTheme, theme];
    case 'dark':
      return [darkTheme, theme];
    default:
      return [lightTheme, theme];
  }
};
