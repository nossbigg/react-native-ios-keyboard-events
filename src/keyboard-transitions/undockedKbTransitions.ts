import { KeyboardTransitionHandlerType } from "../keyboardTransitions";

const undockedKeyboardHandler: KeyboardTransitionHandlerType = (args) => {
  const { event, updateKeyboardState, deviceModel, deviceOrientation } = args;
  const { split, docked, minimized, floating } = deviceModel.keyboardDimensions[
    deviceOrientation
  ];

  if (
    event.eventType === "keyboardDidShow" &&
    event.endCoordinates.height === docked
  ) {
    updateKeyboardState("DOCKED");
    return;
  }

  if (
    event.eventType === "keyboardDidShow" &&
    event.endCoordinates.height === minimized
  ) {
    updateKeyboardState("MINIMIZED");
    return;
  }

  if (
    event.eventType === "keyboardDidChangeFrame" &&
    event.endCoordinates.height === split
  ) {
    updateKeyboardState("SPLIT");
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
    event.endCoordinates.height === 0
  ) {
    updateKeyboardState("CLOSED");
    return;
  }
};

export default undockedKeyboardHandler;
