import { IDeviceInformation } from "./deviceDimensions";

const phoneDevices: IDeviceInformation[] = [
  // For iPhone 5s, and iPhone SE
  {
    model: "iPhone 5s",
    isTablet: false,
    screenDimensions: new Set([320, 568]),
    keyboardDimensions: {
      landscape: {
        docked: 199,
      },
      portrait: {
        docked: 253,
      },
    },
  },
  // For iPhone 6/7/8
  {
    model: "iPhone 8",
    isTablet: false,
    screenDimensions: new Set([375, 667]),
    keyboardDimensions: {
      landscape: {
        docked: 200,
      },
      portrait: {
        docked: 260,
      },
    },
  },
  // For iPhone 6/7/8 Plus
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
  // For iPhone X/XS
  {
    model: "iPhone X",
    isTablet: false,
    screenDimensions: new Set([375, 812]),
    keyboardDimensions: {
      landscape: {
        docked: 209,
      },
      portrait: {
        docked: 335,
      },
    },
  },
  // For iPhone XS Max, and iPhone XR
  {
    model: "iPhone XS Max",
    isTablet: false,
    screenDimensions: new Set([414, 896]),
    keyboardDimensions: {
      landscape: {
        docked: 209,
      },
      portrait: {
        docked: 346,
      },
    },
  },
];

export default phoneDevices;
