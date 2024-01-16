import { useState, createContext, useContext, ReactNode } from "react";

const ThemeContext = createContext<{ darkTheme: any; toggleTheme: () => void }>(
  { darkTheme: true, toggleTheme: () => {} }
);

export function useThemeContext() {
  return useContext(ThemeContext);
}

type Props = {
  children: ReactNode;
};

function ThemeProvider({ children }: Props) {
  const [darkTheme, setDarkTheme] = useState(true);
  function toggleTheme() {
    setDarkTheme((prevDarkTheme) => !prevDarkTheme);
  }
  return (
    <>
      <ThemeContext.Provider value={{ darkTheme, toggleTheme }}>
        {children}
      </ThemeContext.Provider>
    </>
  );
}

export default ThemeProvider;
