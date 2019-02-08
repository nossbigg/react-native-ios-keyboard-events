import { KeyboardEventName } from "react-native";
import {
  IDeviceInformation,
  tabletDevices,
} from "../../device-dimensions/deviceDimensions";
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

export const getIPadDeviceInformation = (): IDeviceInformation => {
  return tabletDevices.find(
    (d) => d.model === "iPad Air",
  ) as IDeviceInformation;
};
