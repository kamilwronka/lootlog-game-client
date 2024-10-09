import { DraggableWindow } from "@/components/draggable-window";
import { Button } from "@/components/ui/button";
import { useGuilds } from "@/hooks/api/useGuilds";
import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";

export const Settings = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const { isAuthenticated, loginWithPopup, loginWithRedirect } = useAuth0();
  const { data } = useGuilds();

  console.log(data);

  const handleLogin = () => {
    // loginWithPopup();
    loginWithRedirect();
  };

  return (
    <>
      <DraggableWindow id="settings-trigger">
        <div className="ll-bg-slate-900 ll-text-white ll-flex">
          <Button onClick={() => setIsSettingsOpen(!isSettingsOpen)}>
            Ustawienia lootloga
          </Button>
          <div>drag</div>
        </div>
      </DraggableWindow>
      {isSettingsOpen && (
        <DraggableWindow id="settings-window">
          <div className="ll-bg-slate-900 ll-text-white ll-w-96">
            <div>Ustawienia</div>
            <div>
              <div>Ustawienia 1</div>
              <div>Ustawienia 2</div>
              <div>Ustawienia 3</div>
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
