import { KeyboardEventName } from "react-native";
import { IOSKeyboardEvent } from "../../IOSKeyboardEvents";

export const createKeyboardEvent = (
  eventType: KeyboardEventName,
  endCoordinatesHeight = 0,
): Partial<IOSKeyboardEvent> => ({
  eventType,
  endCoordinates: {
    height: endCoordinatesHeight,
  } as any,
});
