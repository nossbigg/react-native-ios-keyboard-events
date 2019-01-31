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
  if (
    event.eventType === "keyboardDidChangeFrame" &&
    event.endCoordinates.height === 271
  ) {
    updateKeyboardState("SPLIT");
    setKeyboardDimensions(event.endCoordinates);
    return;
  }

  if (
    event.eventType === "keyboardDidChangeFrame" &&
    event.endCoordinates.height === 398
  ) {
    updateKeyboardState("UNDOCKED");
    setKeyboardDimensions(event.endCoordinates);
    return;
  }

  if (
    event.eventType === "keyboardDidChangeFrame" &&
    event.endCoordinates.height === 55
  ) {
    updateKeyboardState("MINIMIZED");
    setKeyboardDimensions(event.endCoordinates);
    return;
  }
};

const dockedKeyboardHandler = (args: KeyboardTransitionsArgs): void => {
  const { event, updateKeyboardState, setKeyboardDimensions } = args;
  if (event.eventType === "keyboardDidHide") {
    updateKeyboardState("CLOSED");
    setKeyboardDimensions(undefined);
    return;
  }
};

const undockedKeyboardHandler = (args: KeyboardTransitionsArgs): void => {
  const { event, updateKeyboardState, setKeyboardDimensions } = args;
  if (
    event.eventType === "keyboardDidShow" &&
    event.endCoordinates.height === 398
  ) {
    updateKeyboardState("DOCKED");
    setKeyboardDimensions(event.endCoordinates);
    return;
  }

  if (
    event.eventType === "keyboardDidShow" &&
    event.endCoordinates.height === 55
  ) {
    updateKeyboardState("MINIMIZED");
    setKeyboardDimensions(event.endCoordinates);
    return;
  }

  if (
    event.eventType === "keyboardDidChangeFrame" &&
    event.endCoordinates.height === 0
  ) {
    updateKeyboardState("CLOSED");
    setKeyboardDimensions(undefined);
    return;
  }
};

const minimizedKeyboardHandler = (args: KeyboardTransitionsArgs): void => {
  const { event, updateKeyboardState, setKeyboardDimensions } = args;
  if (event.eventType === "keyboardDidHide") {
    updateKeyboardState("CLOSED");
    setKeyboardDimensions(undefined);
    return;
  }

  if (
    event.eventType === "keyboardDidChangeFrame" &&
    event.endCoordinates.height === 398
  ) {
    updateKeyboardState("UNDOCKED");
    setKeyboardDimensions(event.endCoordinates);
    return;
  }
};

const doKeyboardTransitions = (args: KeyboardTransitionsArgs): void => {
  const actions: Partial<Actions> = {
    CLOSED: closedKeyboardHandler,
    DOCKED: dockedKeyboardHandler,
    UNDOCKED: undockedKeyboardHandler,
    MINIMIZED: minimizedKeyboardHandler
  };

  const action = actions[args.currentState];
  action && action(args);
};

export default doKeyboardTransitions;
