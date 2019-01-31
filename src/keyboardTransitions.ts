import { IOSKeyboardEvent, ScreenRect } from "./IOSKeyboardEvents";

export type KeyboardState =
  | "CLOSED"
  | "MINIMIZED"
  | "DOCKED"
  | "UNDOCKED"
  | "SPLIT";

type Actions = {
  [key in KeyboardState]: (args: KeyboardTransitionsArgs) => void
};

interface KeyboardTransitionsArgs {
  currentState: KeyboardState;
  event: IOSKeyboardEvent;
  setKeyboardDimensions(dimensions: ScreenRect | undefined): void;
  isSameKeyboardDimensions(dimensions: ScreenRect): boolean;
  updateKeyboardState(nextState: KeyboardState): void;
}

const closedKeyboardHandler = (args: KeyboardTransitionsArgs): void => {
  const { event, updateKeyboardState, setKeyboardDimensions } = args;
  if (event.eventType === "keyboardDidShow") {
    updateKeyboardState("DOCKED");
    setKeyboardDimensions(event.endCoordinates);
  }
};

const dockedKeyboardHandler = (args: KeyboardTransitionsArgs): void => {
  const { event, updateKeyboardState, setKeyboardDimensions } = args;
  if (event.eventType === "keyboardDidHide") {
    updateKeyboardState("CLOSED");
    setKeyboardDimensions(undefined);
  }
};

const doKeyboardTransitions = (args: KeyboardTransitionsArgs): void => {
  const actions: Partial<Actions> = {
    CLOSED: closedKeyboardHandler,
    DOCKED: dockedKeyboardHandler
  };

  const action = actions[args.currentState];
  action && action(args);
};

export default doKeyboardTransitions;
