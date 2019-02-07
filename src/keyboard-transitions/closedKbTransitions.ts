import { KeyboardTransitionHandlerType } from "../keyboardTransitions";

const closedKeyboardHandler: KeyboardTransitionHandlerType = (args) => {
  const {
    event,
    updateKeyboardState,
    setKeyboardDimensions,
    deviceOrientation,
    deviceInformation,
  } = args;
  const { split, docked, minimized } = deviceInformation.keyboardDimensions[
    deviceOrientation
  ];

  if (
    event.eventType === "keyboardDidChangeFrame" &&
    event.endCoordinates.height === split
  ) {
    updateKeyboardState("SPLIT");
    setKeyboardDimensions(event.endCoordinates);
    return;
  }

  if (
    event.eventType === "keyboardDidChangeFrame" &&
    event.endCoordinates.height === docked
  ) {
    updateKeyboardState("UNDOCKED");
    setKeyboardDimensions(event.endCoordinates);
    return;
  }

  if (
    event.eventType === "keyboardDidChangeFrame" &&
    event.endCoordinates.height === minimized
  ) {
    updateKeyboardState("MINIMIZED");
    setKeyboardDimensions(event.endCoordinates);
    return;
  }
};

export default closedKeyboardHandler;
