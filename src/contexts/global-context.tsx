import { createContext, useContext, useEffect, useState } from "react";

export type GlobalContextType = {
  initialized: boolean;
  timersOpen: boolean;
  setTimersOpen: (open: boolean) => void;
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
  const [timersOpen, setTimersOpen] = useState(false);

  const init = async () => {
    const initialized =
      window.Engine?.interface?.alreadyInitialised ||
      window.Engine?.interface?.getAlreadyInitialised?.();

    if (!initialized) {
      setTimeout(init, 500);
      return;
    }

    setInitialized(true);
  };

  useEffect(() => {
    init();
  }, []);

  const value: GlobalContextType = {
    initialized,
    timersOpen,
    setTimersOpen,
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
