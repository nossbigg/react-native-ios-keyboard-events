import { KeyboardTransitionHandlerType } from "../keyboardTransitions";

const floatingKeyboardHandler: KeyboardTransitionHandlerType = (
  args,
  keyboardDimensions,
) => {
  const { event, updateKeyboardState, deviceOrientation } = args;
  const { docked, minimized } = keyboardDimensions[deviceOrientation];

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
    event.endCoordinates.height === 0
  ) {
    updateKeyboardState("CLOSED");
    return;
  }
};

export default floatingKeyboardHandler;
