import { KeyboardTransitionHandlerType } from "../keyboardTransitions";

const splitKeyboardHandler: KeyboardTransitionHandlerType = (
  args,
  keyboardDimensions,
) => {
  const { event, updateKeyboardState, deviceOrientation } = args;
  const { docked, minimized, floating } = keyboardDimensions[deviceOrientation];

  if (
    event.eventType === "keyboardDidChangeFrame" &&
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
    event.endCoordinates.height === floating
  ) {
    updateKeyboardState("FLOATING");
    return;
  }

  if (
    event.eventType === "keyboardDidShow" &&
    event.endCoordinates.height === minimized
  ) {
    updateKeyboardState("MINIMIZED");
    return;
  }
};

export default splitKeyboardHandler;
