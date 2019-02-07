import { IKeyboardTransitionsArgs } from "../keyboardTransitions";

export type KeyboardTransitionHelperType = (
  args: IKeyboardTransitionsArgs,
) => boolean;

export const didKeyboardUndock: KeyboardTransitionHelperType = (args) => {
  const { event, deviceOrientation, deviceInformation } = args;
  if (event.eventType !== "keyboardDidChangeFrame") {
    return false;
  }

  return (
    deviceInformation.keyboardDimensions[deviceOrientation].docked ===
    event.endCoordinates.height
  );
};

export const didKeyboardDock: KeyboardTransitionHelperType = (args) => {
  const { event, deviceOrientation, deviceInformation } = args;
  if (event.eventType !== "keyboardDidShow") {
    return false;
  }

  return (
    deviceInformation.keyboardDimensions[deviceOrientation].docked ===
    event.endCoordinates.height
  );
};

export const didKeyboardSplit: KeyboardTransitionHelperType = (args) => {
  const { event, deviceOrientation, deviceInformation } = args;
  if (!deviceInformation.isTablet) {
    return false;
  }

  if (event.eventType !== "keyboardDidChangeFrame") {
    return false;
  }

  return (
    deviceInformation.keyboardDimensions[deviceOrientation].split ===
    event.endCoordinates.height
  );
};

export const didKeyboardMinimize: KeyboardTransitionHelperType = (args) => {
  const { event, deviceOrientation, deviceInformation } = args;
  if (!deviceInformation.isTablet) {
    return false;
  }

  if (event.eventType === "keyboardDidChangeFrame") {
    return (
      deviceInformation.keyboardDimensions[deviceOrientation].minimized ===
      event.endCoordinates.height
    );
  }

  if (event.eventType === "keyboardDidShow") {
    return (
      deviceInformation.keyboardDimensions[deviceOrientation].minimized ===
      event.endCoordinates.height
    );
  }

  return false;
};

export const didKeyboardClose: KeyboardTransitionHelperType = (args) => {
  const { event } = args;
  if (event.eventType === "keyboardDidChangeFrame") {
    return event.endCoordinates.height === 0;
  }

  if (event.eventType === "keyboardWillHide") {
    return event.endCoordinates.height === 0;
  }

  return false;
};
