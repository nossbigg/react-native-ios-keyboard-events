import { KeyboardTransitionHandlerType } from "../keyboardTransitions";

const undockedKeyboardHandler: KeyboardTransitionHandlerType = (args) => {
  const {
    event,
    updateKeyboardState,
    setKeyboardDimensions,
    deviceInformation,
    deviceOrientation,
  } = args;
  const { split, docked, minimized } = deviceInformation.keyboardDimensions[
    deviceOrientation
  ];

  if (
    event.eventType === "keyboardDidShow" &&
    event.endCoordinates.height === docked
  ) {
    updateKeyboardState("DOCKED");
    setKeyboardDimensions(event.endCoordinates);
    return;
  }

  if (
    event.eventType === "keyboardDidShow" &&
    event.endCoordinates.height === minimized
  ) {
    updateKeyboardState("MINIMIZED");
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
