import { KeyboardTransitionHandlerType } from "../keyboardTransitions";

const closedKeyboardHandler: KeyboardTransitionHandlerType = (args) => {
  const { event, updateKeyboardState, deviceOrientation, deviceModel } = args;
  const { split, docked, minimized, floating } = deviceModel.keyboardDimensions[
    deviceOrientation
  ];

  if (!deviceModel.isTablet) {
    if (event.eventType === "keyboardDidShow") {
      updateKeyboardState("DOCKED");
    }
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
    event.endCoordinates.height === minimized
  ) {
    updateKeyboardState("MINIMIZED");
    return;
  }
};

export default closedKeyboardHandler;
