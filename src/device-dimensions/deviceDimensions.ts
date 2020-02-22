import { Dimensions } from "react-native";
import iosVersion12Devices from "./iosVersion12";
import iosVersion13Devices from "./iosVersion13";

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
    floating?: number;
  }
};

export const getDeviceModel = (
  iosVersion: string,
): IDeviceModel | undefined => {
  const iosMajorVersion = getIosMajorVersionNumber(iosVersion);
  const matchedDeviceMapping = iosVersionDeviceMapping[iosMajorVersion];
  const availableDevices = getAllDeviceModels(matchedDeviceMapping);

  const { height, width } = Dimensions.get("window");
  return availableDevices.find(
    (device) =>
      device.screenDimensions.has(width) && device.screenDimensions.has(height),
  );
};

export const getDeviceOrientation = (): DeviceOrientation => {
  const { height, width } = Dimensions.get("window");
  return width > height ? "landscape" : "portrait";
};

const getIosMajorVersionNumber = (iosVersion: string): string => {
  const [majorVersionNumber] = iosVersion.trim().split(".");
  return majorVersionNumber;
};

interface IosVersionDeviceMappingEntry {
  phoneDevices: IDeviceModel[];
  tabletDevices: IDeviceModel[];
}

const iosVersionDeviceMapping: Record<string, IosVersionDeviceMappingEntry> = {
  12: { ...iosVersion12Devices },
  13: { ...iosVersion13Devices },
};

const getAllDeviceModels = (mappingEntry: IosVersionDeviceMappingEntry) => {
  const { phoneDevices, tabletDevices } = mappingEntry;
  return [...phoneDevices, ...tabletDevices];
};
