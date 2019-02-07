import { IOSKeyboardEvent } from "../../IOSKeyboardEvents";
import { KeyboardEventName } from "react-native";

export const createKeyboardEvent = (
  eventType: KeyboardEventName,
  endCoordinatesHeight = 0,
): Partial<IOSKeyboardEvent> => ({
  eventType,
  endCoordinates: {
    height: endCoordinatesHeight
  } as any
});
