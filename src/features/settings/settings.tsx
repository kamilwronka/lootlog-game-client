import { DraggableWindow } from "@/components/draggable-window";
import { Button } from "@/components/ui/button";
import { useGlobalContext } from "@/contexts/global-context";
import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";

export const Settings = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const { isAuthenticated, loginWithPopup, loginWithRedirect } = useAuth0();
  const { timersOpen, setTimersOpen } = useGlobalContext();
  // const { data } = useGuilds();

  const handleLogin = () => {
    loginWithPopup();
    // loginWithRedirect();
  };

  const handleTimersToggle = () => {
    setTimersOpen(!timersOpen);
  };

  return (
    <>
      <DraggableWindow id="settings-trigger">
        <div className="ll-bg-black ll-text-white ll-flex">
          <Button onClick={() => setIsSettingsOpen(!isSettingsOpen)}>
            Lootlog
          </Button>
          <div>drag</div>
        </div>
      </DraggableWindow>
      {isSettingsOpen && (
        <DraggableWindow id="settings-window">
          <div className="ll-bg-black ll-text-white ll-w-96">
            <div>Ustawienia</div>
            <div>
              <Button onClick={handleTimersToggle}>Pokaż/ukryj timery</Button>
              {!isAuthenticated && (
                <Button onClick={handleLogin}>Zaloguj się</Button>
              )}
            </div>
          </div>
        </DraggableWindow>
      )}
    </>
  );
};
