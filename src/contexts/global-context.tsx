import { createContext, useContext, useEffect, useState } from "react";

export type GlobalContextType = {
  initialized: boolean;
};

export const GlobalContext = createContext<GlobalContextType>(
  {} as GlobalContextType
);

export const GlobalContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [initialized, setInitialized] = useState(false);

  const init = async () => {
    try {
      // @ts-ignore
      if (!window.Engine.interface.alreadyInitialised) {
        setTimeout(init, 500);
        return;
      }

      setInitialized(true);
    } catch (error) {
      console.error(error);
      setTimeout(init, 500);
    }
  };

  useEffect(() => {
    init();
  }, []);

  const value: GlobalContextType = {
    initialized,
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);

  if (!context) {
    throw new Error(
      "useGlobalContext must be used within a GlobalContextProvider"
    );
  }

  return context;
};
