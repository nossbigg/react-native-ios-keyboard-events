import { KeyboardEventName } from "react-native";
import { IDeviceModel } from "../../device-dimensions/deviceDimensions";
import tabletDevices from "../../device-dimensions/tabletDevices";
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

export const getIPadDeviceModel = (): IDeviceModel => {
  return tabletDevices.find((d) => d.model === "iPad Air") as IDeviceModel;
};
