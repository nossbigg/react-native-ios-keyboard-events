import { KeyboardTransitionHandlerType } from "../keyboardTransitions";

const dockedKeyboardHandler: KeyboardTransitionHandlerType = (args) => {
  const { event, updateKeyboardState, deviceModel, deviceOrientation } = args;

  if (event.eventType === "keyboardDidHide") {
    updateKeyboardState("CLOSED");
    return;
  }

  if (
    event.eventType === "keyboardDidShow" &&
    event.endCoordinates.height ===
      deviceModel.keyboardDimensions[deviceOrientation].minimized
  ) {
    updateKeyboardState("MINIMIZED");
    return;
  }
};

export default dockedKeyboardHandler;
