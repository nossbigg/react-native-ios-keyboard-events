import { KeyboardTransitionHandlerType } from "../keyboardTransitions";

const minimizedKeyboardHandler: KeyboardTransitionHandlerType = args => {
  const { event, updateKeyboardState, setKeyboardDimensions } = args;
  if (
    event.eventType === "keyboardDidHide" &&
    event.endCoordinates.height === 0
  ) {
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

  if (
    event.eventType === "keyboardDidChangeFrame" &&
    event.endCoordinates.height === 271
  ) {
    updateKeyboardState("SPLIT");
    setKeyboardDimensions(event.endCoordinates);
    return;
  }
};

export default minimizedKeyboardHandler;
