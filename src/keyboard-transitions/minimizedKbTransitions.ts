import { KeyboardTransitionHandlerType } from "../keyboardTransitions";

const minimizedKeyboardHandler: KeyboardTransitionHandlerType = (
  args,
  keyboardDimensions,
) => {
  const { event, updateKeyboardState, deviceOrientation } = args;
  const { split, docked, floating } = keyboardDimensions[deviceOrientation];

  if (
    event.eventType === "keyboardDidHide" &&
    event.endCoordinates.height === 0
  ) {
    updateKeyboardState("CLOSED");
    return;
  }

  if (
    event.eventType === "keyboardDidChangeFrame" &&
    event.endCoordinates.height === docked
  ) {
    updateKeyboardState("UNDOCKED");
    return;
  }

  if (
    event.eventType === "keyboardDidChangeFrame" &&
    event.endCoordinates.height === floating
  ) {
    updateKeyboardState("FLOATING");
    return;
  }

  if (
    event.eventType === "keyboardDidChangeFrame" &&
    event.endCoordinates.height === split
  ) {
    updateKeyboardState("SPLIT");
    return;
  }
};

export default minimizedKeyboardHandler;
