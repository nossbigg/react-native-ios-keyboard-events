import { KeyboardTransitionHandlerType } from "../keyboardTransitions";

const undockedKeyboardHandler: KeyboardTransitionHandlerType = (args) => {
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
    event.endCoordinates.height === 313
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
    event.endCoordinates.height === 271
  ) {
    updateKeyboardState("SPLIT");
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

export default undockedKeyboardHandler;
