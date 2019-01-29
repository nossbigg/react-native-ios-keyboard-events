import { IOSKeyboardEvent } from "./IOSKeyboardEvents";

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
  onKeyboardStateChange(nextState: KeyboardState): void;
}

const closedKeyboardHandler = (args: KeyboardTransitionsArgs): void => {
  const { event, onKeyboardStateChange } = args;
  if (event.eventType === "keyboardDidShow") {
    onKeyboardStateChange("DOCKED");
  }
};

const dockedKeyboardHandler = (args: KeyboardTransitionsArgs): void => {
  const { event, onKeyboardStateChange } = args;
  if (event.eventType === "keyboardDidHide") {
    onKeyboardStateChange("CLOSED");
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
