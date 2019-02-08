import { IDeviceInformation } from "./deviceDimensions";

const tabletDevices: IDeviceInformation[] = [
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

export default tabletDevices;
