import { Dimensions } from "react-native";

export interface IDeviceInformation {
  model: string;
  isTablet: boolean;
  screenDimensions: Set<number>;
  keyboardDimensions: keyboardDimensions;
}

export type DeviceOrientation = "landscape" | "portrait";

type keyboardDimensions = {
  [o in DeviceOrientation]: {
    docked: number;
    split?: number;
    minimized?: number;
  }
};

export const phoneDevices: IDeviceInformation[] = [
  {
    model: "iPhone 8 Plus",
    isTablet: false,
    screenDimensions: new Set([414, 736]),
    keyboardDimensions: {
      landscape: {
        docked: 200,
      },
      portrait: {
        docked: 271,
      },
    },
  },
];

export const tabletDevices: IDeviceInformation[] = [
  {
    model: "iPad Air 2",
    isTablet: true,
    screenDimensions: new Set([1024, 768]),
    keyboardDimensions: {
      landscape: {
        docked: 398,
        split: 271,
        minimized: 55,
      },
      portrait: {
        docked: 313,
        split: 271,
        minimized: 55,
      },
    },
  },
];

export const devices: IDeviceInformation[] = [
  ...phoneDevices,
  ...tabletDevices,
];

export const getDeviceOrientation = (): DeviceOrientation => {
  const { height, width } = Dimensions.get("window");
  return width > height ? "landscape" : "portrait";
};

export const getDeviceModel = () => {
  const { height, width } = Dimensions.get("window");

  return devices.find(
    (device) =>
      device.screenDimensions.has(width) && device.screenDimensions.has(height),
  );
};
