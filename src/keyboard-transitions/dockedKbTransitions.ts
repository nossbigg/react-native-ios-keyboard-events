import { KeyboardTransitionHandlerType } from "../keyboardTransitions";

const dockedKeyboardHandler: KeyboardTransitionHandlerType = (args) => {
  const {
    event,
    updateKeyboardState,
    setKeyboardDimensions,
    deviceInformation,
    deviceOrientation,
  } = args;

  if (event.eventType === "keyboardDidHide") {
    updateKeyboardState("CLOSED");
    setKeyboardDimensions(undefined);
    return;
  }

  if (
    event.eventType === "keyboardDidShow" &&
    event.endCoordinates.height ===
      deviceInformation.keyboardDimensions[deviceOrientation].minimized
  ) {
    updateKeyboardState("MINIMIZED");
    setKeyboardDimensions(event.endCoordinates);
    return;
  }
};

export default dockedKeyboardHandler;
