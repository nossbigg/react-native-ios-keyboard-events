import { Keyboard, KeyboardEventName } from "react-native";
import * as deviceDimensions from "../device-dimensions/deviceDimensions";
import tabletDevices from "../device-dimensions/tabletDevices";
import * as IOSKeyboardEventsImport from "../IOSKeyboardEvents";

describe("#IOSKeyboardEvents", () => {
  let IOSKbEvents: IOSKeyboardEventsImport.IOSKeyboardEvents;
  let nativeKeyboardSubscription: any;

  const deviceModel = tabletDevices.find((d) => d.model === "iPad Air");

  beforeEach(() => {
    jest.resetAllMocks();

    nativeKeyboardSubscription = { remove: jest.fn() };

    jest
      .spyOn(Keyboard, "addListener")
      .mockReturnValue(nativeKeyboardSubscription as any);
    jest
      .spyOn(IOSKeyboardEventsImport, "getDevicePlatform")
      .mockReturnValue("ios");
    jest.spyOn(deviceDimensions, "getDeviceModel").mockReturnValue(deviceModel);

    IOSKbEvents = IOSKeyboardEventsImport.default();
  });

  it("creates IOSKeyboardEvents", () => {
    expect(IOSKbEvents).not.toBeFalsy();
  });

  it("starts with default CLOSED state", () => {
    expect(IOSKbEvents.getKeyboardState()).toBe("CLOSED");
  });

  // it("gets current device informaiton", () => {});

  it("subscribes to keyboard events", () => {
    const expectedSubscribedEvents: KeyboardEventName[] = [
      "keyboardDidChangeFrame",
      "keyboardDidHide",
      "keyboardDidShow",
    ];

    expectedSubscribedEvents.forEach((eventName) => {
      expect(Keyboard.addListener).toHaveBeenCalledWith(
        eventName,
        expect.any(Function),
      );
    });
  });

  it("tears down correctly on close()", () => {
    IOSKbEvents.close();
    expect(nativeKeyboardSubscription.remove).toHaveBeenCalledTimes(3);
  });

  describe("IOSKeyboardEvents creation scenarios", () => {
    it("throws error if platform is not IOS", () => {
      jest
        .spyOn(IOSKeyboardEventsImport, "getDevicePlatform")
        .mockReturnValue("android");
      expect(() => IOSKeyboardEventsImport.default()).toThrowError();
    });

    it("throws error if unable to ascertain device model", () => {
      jest.spyOn(deviceDimensions, "getDeviceModel").mockReturnValue(undefined);
      expect(() => IOSKeyboardEventsImport.default()).toThrowError();
    });

    it("allows creation if device model is manually provided", () => {
      jest.clearAllMocks();
      const mockedDeviceModel = jest.fn();

      jest
        .spyOn(IOSKeyboardEventsImport, "getDevicePlatform")
        .mockReturnValue("android");
      const opts = { deviceModel: mockedDeviceModel as any };

      const newKbEvents = IOSKeyboardEventsImport.default(opts);
      expect(deviceDimensions.getDeviceModel).not.toHaveBeenCalled();
      expect(newKbEvents.getDeviceInformation()).toBe(mockedDeviceModel);
    });
  });
});
