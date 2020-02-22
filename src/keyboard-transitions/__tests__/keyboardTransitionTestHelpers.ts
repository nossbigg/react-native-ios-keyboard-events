import { KeyboardEventName } from "react-native";
import { IDeviceModel } from "../../device-dimensions/deviceDimensions";
import phoneDevices from "../../device-dimensions/iosVersion12/phoneDevices";
import tabletDevices from "../../device-dimensions/iosVersion12/tabletDevices";
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

export const getIPadDeviceModel = (): IDeviceModel =>
  tabletDevices.find((d) => d.model === "iPad Air") as IDeviceModel;

export const getIPhoneDeviceModel = (): IDeviceModel =>
  phoneDevices.find((d) => d.model === "iPhone 8") as IDeviceModel;
