import { KeyboardTransitionHandlerType } from "../keyboardTransitions";

const splitKeyboardHandler: KeyboardTransitionHandlerType = (args) => {
  const {
    event,
    updateKeyboardState,
    setKeyboardDimensions,
    deviceInformation,
    deviceOrientation,
  } = args;
  const { docked, minimized } = deviceInformation.keyboardDimensions[
    deviceOrientation
  ];

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
    event.endCoordinates.height === docked
  ) {
    updateKeyboardState("UNDOCKED");
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
};

export default splitKeyboardHandler;
