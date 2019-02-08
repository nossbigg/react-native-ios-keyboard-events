import { KeyboardTransitionHandlerType } from "../keyboardTransitions";

const dockedKeyboardHandler: KeyboardTransitionHandlerType = (args) => {
  const {
    event,
    updateKeyboardState,
    deviceInformation,
    deviceOrientation,
  } = args;

  if (event.eventType === "keyboardDidHide") {
    updateKeyboardState("CLOSED");
    return;
  }

  if (
    event.eventType === "keyboardDidShow" &&
    event.endCoordinates.height ===
      deviceInformation.keyboardDimensions[deviceOrientation].minimized
  ) {
    updateKeyboardState("MINIMIZED");
    return;
  }
};

export default dockedKeyboardHandler;
