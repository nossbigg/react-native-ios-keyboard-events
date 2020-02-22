import { KeyboardTransitionHandlerType } from "../keyboardTransitions";

const dockedKeyboardHandler: KeyboardTransitionHandlerType = (
  args,
  keyboardDimensions,
) => {
  const { event, updateKeyboardState, deviceOrientation } = args;

  if (event.eventType === "keyboardDidHide") {
    updateKeyboardState("CLOSED");
    return;
  }

  if (
    event.eventType === "keyboardDidShow" &&
    event.endCoordinates.height ===
      keyboardDimensions[deviceOrientation].minimized
  ) {
    updateKeyboardState("MINIMIZED");
    return;
  }
};

export default dockedKeyboardHandler;
