import { useStoreState } from '../store/store';
import { darkTheme, lightTheme } from '../themes';

export const useTheme = () => {
  const theme = useStoreState((state) => state.theme.themeId);
  switch (theme) {
    case 'light':
      return lightTheme;
    case 'dark':
      return darkTheme;
    default:
      return lightTheme;
  }
};
