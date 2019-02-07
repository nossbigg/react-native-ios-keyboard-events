import { IOSKeyboardEvent } from "./IOSKeyboardEvents";
import { ScreenRect } from "react-native";
import closedKeyboardHandler from "./keyboard-transitions/closedKbTransitions";
import dockedKeyboardHandler from "./keyboard-transitions/dockedKbTransitions";
import undockedKeyboardHandler from "./keyboard-transitions/undockedKbTransitions";
import minimizedKeyboardHandler from "./keyboard-transitions/minimizedKbTransitions";
import splitKeyboardHandler from "./keyboard-transitions/splitKbTransitions";

export type KeyboardState =
  | "CLOSED"
  | "MINIMIZED"
  | "DOCKED"
  | "UNDOCKED"
  | "SPLIT";

type Actions = { [key in KeyboardState]: KeyboardTransitionHandlerType };

export type KeyboardTransitionHandlerType = (
  args: KeyboardTransitionsArgs
) => void;

export interface KeyboardTransitionsArgs {
  currentState: KeyboardState;
  event: IOSKeyboardEvent;
  setKeyboardDimensions(dimensions: ScreenRect | undefined): void;
  isSameKeyboardDimensions(dimensions: ScreenRect): boolean;
  updateKeyboardState(nextState: KeyboardState): void;
}

const doKeyboardTransitions = (args: KeyboardTransitionsArgs): void => {
  const actions: Actions = {
    CLOSED: closedKeyboardHandler,
    DOCKED: dockedKeyboardHandler,
    UNDOCKED: undockedKeyboardHandler,
    MINIMIZED: minimizedKeyboardHandler,
    SPLIT: splitKeyboardHandler
  };

  const action = actions[args.currentState];
  action && action(args);
};

export default doKeyboardTransitions;
