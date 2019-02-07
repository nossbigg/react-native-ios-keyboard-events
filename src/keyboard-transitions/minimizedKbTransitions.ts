import { KeyboardTransitionHandlerType } from "../keyboardTransitions";

const minimizedKeyboardHandler: KeyboardTransitionHandlerType = (args) => {
  const {
    event,
    updateKeyboardState,
    setKeyboardDimensions,
    deviceOrientation,
    deviceInformation,
  } = args;
  const { split, docked } = deviceInformation.keyboardDimensions[
    deviceOrientation
  ];

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
    event.endCoordinates.height === docked
  ) {
    updateKeyboardState("UNDOCKED");
    setKeyboardDimensions(event.endCoordinates);
    return;
  }

  if (
    event.eventType === "keyboardDidChangeFrame" &&
    event.endCoordinates.height === split
  ) {
    updateKeyboardState("SPLIT");
    setKeyboardDimensions(event.endCoordinates);
    return;
  }
};

export default minimizedKeyboardHandler;
