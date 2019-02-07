import { KeyboardTransitionHandlerType } from "../keyboardTransitions";

const splitKeyboardHandler: KeyboardTransitionHandlerType = args => {
  const { event, updateKeyboardState, setKeyboardDimensions } = args;
  if (
    event.eventType === "keyboardDidChangeFrame" &&
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
    event.eventType === "keyboardDidShow" &&
    event.endCoordinates.height === 55
  ) {
    updateKeyboardState("MINIMIZED");
    setKeyboardDimensions(event.endCoordinates);
    return;
  }
};

export default splitKeyboardHandler;
