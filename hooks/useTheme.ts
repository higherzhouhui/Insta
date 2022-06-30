export const useThemeManager = (): [boolean, () => void] => {
  const isDark = true;
  const toggleThemeHandle = () => {};
  return [isDark, toggleThemeHandle];
};
