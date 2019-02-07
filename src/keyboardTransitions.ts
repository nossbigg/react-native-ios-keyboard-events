import { IOSKeyboardEvent } from "./IOSKeyboardEvents";
import { ScreenRect } from "react-native";
import closedKeyboardHandler from "./keyboard-transitions/closedKeyboardTransitions";
import dockedKeyboardHandler from "./keyboard-transitions/dockedKeyboardTransitions";
import undockedKeyboardHandler from "./keyboard-transitions/undockedKeyboardTransitions";
import minimizedKeyboardHandler from "./keyboard-transitions/minimizedKeyboardTransitions";
import splitKeyboardHandler from "./keyboard-transitions/splitKeyboardTransitions";

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

interface KeyboardTransitionsArgs {
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
