import { IDeviceInformation } from "./deviceDimensions";

const phoneDevices: IDeviceInformation[] = [
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

export default phoneDevices;
