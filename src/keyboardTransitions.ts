import { IOSKeyboardEvent } from "./IOSKeyboardEvents";

export type KeyboardState =
  | "CLOSED"
  | "MINIMIZED"
  | "DOCKED"
  | "UNDOCKED"
  | "SPLIT";

type Actions = { [key in KeyboardState]: Function };

const closedKeyboardHandler = (
  currentState: KeyboardState,
  event: IOSKeyboardEvent
): KeyboardState => {
  if (event.eventType === "keyboardDidShow") {
    return "DOCKED";
  }
  return currentState;
};

const dockedKeyboardHandler = (
  currentState: KeyboardState,
  event: IOSKeyboardEvent
): KeyboardState => {
  if (event.eventType === "keyboardDidHide") {
    return "CLOSED";
  }
  return currentState;
};

const getNextKeyboardState = (
  currentState: KeyboardState,
  event: IOSKeyboardEvent
): KeyboardState => {
  const actions: Partial<Actions> = {
    CLOSED: closedKeyboardHandler,
    DOCKED: dockedKeyboardHandler
  };

  const action = actions[currentState];
  if (!action) {
    return currentState;
  }
  return action(currentState, event);
};

export default getNextKeyboardState;
