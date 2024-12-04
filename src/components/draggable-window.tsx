import { useDrag } from "@/hooks/ui/useDrag";
import { FC, useRef } from "react";
import { useLocalStorage } from "react-use";

export type DraggableWindowProps = {
  children: React.ReactNode;
  id: string;
};

export const DraggableWindow: FC<DraggableWindowProps> = ({ children, id }) => {
  const [localStoragePosition, setLocalStoragePosition] = useLocalStorage(
    `draggable-window-${id}`,
    {
      x: 0,
      y: 0,
    }
  );
  const draggableRef = useRef(null);
  const { position, handleMouseDown } = useDrag({
    ref: draggableRef,
    defaultState: localStoragePosition,
    onDragStop: (position) => {
      setLocalStoragePosition(position);
    },
  });

  return (
    <div
      className="ll-pointer-events-auto ll-absolute ll-bg-current"
      ref={draggableRef}
      style={{
        top: position.y,
        left: position.x,
      }}
      onMouseDown={handleMouseDown}
    >
      {children}
    </div>
  );
};
