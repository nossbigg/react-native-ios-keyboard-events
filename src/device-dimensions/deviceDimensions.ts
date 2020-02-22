import { Dimensions } from "react-native";
import phoneDevices from "./iosVersion12/phoneDevices";
import tabletDevices from "./iosVersion12/tabletDevices";

export interface IDeviceModel {
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

export const devices: IDeviceModel[] = [...phoneDevices, ...tabletDevices];

export const getDeviceOrientation = (): DeviceOrientation => {
  const { height, width } = Dimensions.get("window");
  return width > height ? "landscape" : "portrait";
};

export const getDeviceModel = (): IDeviceModel | undefined => {
  const { height, width } = Dimensions.get("window");
  return devices.find(
    (device) =>
      device.screenDimensions.has(width) && device.screenDimensions.has(height),
  );
};
