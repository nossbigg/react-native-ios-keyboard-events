import { IDeviceModel } from "../deviceDimensions";

const tabletDevices: IDeviceModel[] = [
  // For iPad Air, iPad Air 2, iPad (5th generation), iPad (6th generation), and iPad Pro (9.7-inch)
  {
    model: "iPad Air",
    isTablet: true,
    screenDimensions: new Set([1024, 768]),
    keyboardDimensions: {
      landscape: {
        docked: 408,
        split: 271,
        minimized: 55,
      },
      portrait: {
        docked: 320,
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
        docked: 408,
        split: 271,
        minimized: 55,
      },
      portrait: {
        docked: 320,
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
        docked: 428,
        minimized: 69,
      },
      portrait: {
        docked: 340,
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
        docked: 478,
        minimized: 55,
      },
      portrait: {
        docked: 383,
        minimized: 55,
      },
    },
  },
];

export default tabletDevices;
