import { Dimensions } from "react-native";
import phoneDevices from "./phoneDevices";
import tabletDevices from "./tabletDevices";

export interface IDeviceInformation {
  model: string;
  isTablet: boolean;
  screenDimensions: Set<number>;
  keyboardDimensions: KeyboardDimensions;
}

export type DeviceOrientation = "landscape" | "portrait";

export type KeyboardDimensions = {
  [o in DeviceOrientation]: {
    docked: number;
    split?: number;
    minimized?: number;
  }
};

export const devices: IDeviceInformation[] = [
  ...phoneDevices,
  ...tabletDevices,
];

export const getDeviceOrientation = (): DeviceOrientation => {
  const { height, width } = Dimensions.get("window");
  return width > height ? "landscape" : "portrait";
};

export const getDeviceModel = (): IDeviceInformation | undefined => {
  const { height, width } = Dimensions.get("window");
  return devices.find(
    (device) =>
      device.screenDimensions.has(width) && device.screenDimensions.has(height),
  );
};
