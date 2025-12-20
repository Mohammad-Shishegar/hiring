import React, { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext<any>("");

interface ThemeProviderProps {
  children: React.ReactNode;
}

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<string>("red-theme");

  useEffect(() => {
    // Change class of HTML tag(<HTML />), to apply desired theme to whole of the project
    document.documentElement.className = theme;
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => {
  const theme = createContext(ThemeContext);
  if (theme === undefined) throw Error("useContext inside provider");
  return theme;
};

export { ThemeProvider, useTheme };
