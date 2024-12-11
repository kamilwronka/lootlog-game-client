import { createContext, useContext, useEffect, useState } from "react";
import { useLocalStorage } from "react-use";

export type GlobalContextType = {
  initialized: boolean;
  timersOpen: boolean | undefined;
  setTimersOpen: (open: boolean | undefined) => void;
  selectedGuild: string | undefined;
  setSelectedGuild: (guild: string | undefined) => void;
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
  const [timersOpen, setTimersOpen] = useLocalStorage("timers", false);
  const [selectedGuild, setSelectedGuild] = useLocalStorage("guild", "");

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
    selectedGuild,
    setSelectedGuild,
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
