import { useEffect, useRef, useState } from "react";
import {
  GlobalContextProvider,
  useGlobalContext,
} from "./contexts/global-context";
import { useGameEventsParser } from "./hooks/use-game-events-parser";
import { isMob } from "./helpers/is-mob";
import { useAuthToken } from "./hooks/auth/use-auth-token";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@/components/ui/button";
import { DraggableWindow } from "@/components/draggable-window";
import { Timers } from "@/features/timers/timers";
import { Settings } from "@/features/settings/settings";

let npcs = {};

function App() {
  const { initialized } = useGlobalContext();
  const [dupa, setDupa] = useState({});
  const [npcsInitialized, setNpcsInitialized] = useState(false);
  // const [npcs, setNpcs] = useState({});
  const token = useAuthToken();
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

  console.log("initialized", initialized);

  // const onChatMessage = (e: unknown) => () => {
  //   console.log("chat message", e);
  //   console.log(dupa);
  // };

  // const onSomething = (e: unknown) => () => {
  //   console.log(dupa);
  // }

  // useEffect(() => {
  //   if (!isAuthenticated && !isLoading) {
  //     loginWithRedirect();
  //   }
  // }, [isAuthenticated, isLoading]);

  // const onNpcDelete = (event: any) => {
  //   console.log("npc delete", event);
  //   console.log(dupa);
  //   Object.keys(event).forEach((key: any) => {
  //     // @ts-ignore
  //     const npcData = npcs[key];

  //     if (!npcData) return;
  //     if (npcData && npcData.wt < 10) return;

  //     console.log(
  //       "sending request to the backend",
  //       npcData,
  //       event[key].respBaseSeconds
  //     );

  //     // await fetch("http://localhost:3000/npc", {

  //     // @ts-ignore
  //     delete npcs[key];
  //   });

  //   console.log("npcs", npcs);
  // };

  // const onNpcCreate = (e: any) => {
  //   console.log("npc create", e);
  //   Object.entries(e).forEach(([key, value]) => {
  //     // @ts-ignore
  //     if (value.wt < 10) return;

  //     // @ts-ignore
  //     npcs[key] = value;
  //   });

  //   console.log("npcs", npcs);
  // };

  // useEffect(() => {
  //   let mobs: any = {};
  //   // @ts-ignore
  //   const data = window.Engine.npcs.getDrawableList();

  //   data
  //     .filter((npc: any) => isMob(npc))
  //     .forEach((npc: any) => {
  //       mobs[npc.d.id] = npc.d;
  //     });

  //   setDupa(mobs);
  //   npcs = mobs;
  //   setNpcsInitialized(true);
  // }, [initialized]);

  // useGameEventsParser(initialized && npcsInitialized, {
  //   onChatMessage,
  //   onNpcCreate,
  //   onNpcDelete,
  // });

  return (
    <>
      <Timers />
      <Settings />
    </>
  );
}

export default App;
