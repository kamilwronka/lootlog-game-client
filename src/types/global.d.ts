import { Engine } from "./margonem/engine";

declare global {
  interface Window {
    Engine: Engine;
  }
}
