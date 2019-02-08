import { KeyboardTransitionHandlerType } from "../keyboardTransitions";

const minimizedKeyboardHandler: KeyboardTransitionHandlerType = (args) => {
  const { event, updateKeyboardState, deviceOrientation, deviceModel } = args;
  const { split, docked } = deviceModel.keyboardDimensions[deviceOrientation];

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
    event.endCoordinates.height === split
  ) {
    updateKeyboardState("SPLIT");
    return;
  }
};

export default minimizedKeyboardHandler;
