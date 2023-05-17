import React, { useContext, useState } from "react";

type ColorModeContextType = {
  test: String | null;
  setTest: (value: string) => void;
};

type ColorModeContextProviderPropTypes = {
  children: React.ReactNode;
};

const ColorModeContext = React.createContext<ColorModeContextType>(
  {} as ColorModeContextType
);

const ColorModeContextProvider = ({
  children,
}: ColorModeContextProviderPropTypes) => {
  const [test, setTest] = useState<String>("Test Text Text");
  return (
    <ColorModeContext.Provider value={{ test, setTest }}>
      {children}
    </ColorModeContext.Provider>
  );
};
const useColorModeContext = () => {
  return useContext(ColorModeContext);
};
export { useColorModeContext, ColorModeContextProvider };
