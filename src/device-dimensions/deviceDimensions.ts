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
  // For iPad Air, iPad Air 2, iPad (5th generation), iPad (6th generation), and iPad Pro (9.7-inch)
  {
    model: "iPad Air",
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
  {
    model: "iPad Pro (10.5-inch)",
    isTablet: true,
    screenDimensions: new Set([1112, 834]),
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
  {
    model: "iPad Pro (11-inch)",
    isTablet: true,
    screenDimensions: new Set([1194, 834]),
    keyboardDimensions: {
      landscape: {
        docked: 418,
        minimized: 69,
      },
      portrait: {
        docked: 333,
        minimized: 69,
      },
    },
  },
  // For iPad Pro (12.9-inch), iPad Pro (12.9-inch) (2nd generation), and iPad Pro (12.9-inch) (3rd generation)
  {
    model: "iPad Pro (12.9-inch)",
    isTablet: true,
    screenDimensions: new Set([1366, 1024]),
    keyboardDimensions: {
      landscape: {
        docked: 471,
        minimized: 55,
      },
      portrait: {
        docked: 378,
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
