import { Keyboard, KeyboardEventName } from "react-native";
import * as deviceDimensions from "./device-dimensions/deviceDimensions";
import tabletDevices from "./device-dimensions/iosVersion12/tabletDevices";
import * as IOSKeyboardEventsImport from "./IOSKeyboardEvents";
import { createKeyboardEvent } from "./keyboard-transitions/__tests__/keyboardTransitionTestHelpers";
import * as doKeyboardTransitions from "./keyboardTransitions";

const wait = (ms = 1) => new Promise((resolve) => setTimeout(resolve, ms));

describe("#IOSKeyboardEvents", () => {
  let IOSKbEvents: IOSKeyboardEventsImport.IOSKeyboardEvents;
  let nativeKeyboardSubscription: any;
  let ownKeyboardListener: jest.Mock;

  const deviceModel = tabletDevices.find((d) => d.model === "iPad Air");

  beforeEach(() => {
    jest.resetAllMocks();

    nativeKeyboardSubscription = { remove: jest.fn() };
    ownKeyboardListener = jest.fn();

    jest.spyOn(deviceDimensions, "getDeviceModel").mockReturnValue(deviceModel);
    jest
      .spyOn(deviceDimensions, "getDeviceOrientation")
      .mockReturnValue("landscape");
    jest
      .spyOn(IOSKeyboardEventsImport, "getDevicePlatform")
      .mockReturnValue("ios");
    jest.spyOn(doKeyboardTransitions, "default");
    jest
      .spyOn(Keyboard, "addListener")
      .mockReturnValue(nativeKeyboardSubscription as any);

    IOSKbEvents = IOSKeyboardEventsImport.default({
      keyboardEventDebounceTime: 1,
    });
    IOSKbEvents.addListener("some-listener-name", ownKeyboardListener as any);
  });

  it("creates IOSKeyboardEvents", () => {
    expect(IOSKbEvents).not.toBeFalsy();
  });

  describe("get/set keyboard state", () => {
    it("starts with default CLOSED state", () => {
      expect(IOSKbEvents.getKeyboardState()).toBe("CLOSED");
    });

    it("sets keyboard state", () => {
      IOSKbEvents.setKeyboardState("SPLIT");
      expect(IOSKbEvents.getKeyboardState()).toBe("SPLIT");
    });

    it("converts input state to uppercase", () => {
      IOSKbEvents.setKeyboardState("split" as any);
      expect(IOSKbEvents.getKeyboardState()).toBe("SPLIT");
    });

    it("throws error if attempting to set invalid keyboard state", () => {
      expect(() =>
        IOSKbEvents.setKeyboardState("some-invalid-keyboard" as any),
      ).toThrowError();
    });
  });

  it("gets current device information", () => {
    expect(IOSKbEvents.getDeviceModelInformation()).toBe(deviceModel);
  });

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

  describe("on keyboard event", () => {
    const someKeyboardEvent = createKeyboardEvent("keyboardDidChangeFrame", 0);

    const emitKeyboardEvent = (evt: any) => {
      const onKeyboardEvent = (Keyboard.addListener as jest.Mock).mock
        .calls[0][1];
      onKeyboardEvent(evt);
    };

    beforeEach(() => {
      emitKeyboardEvent(someKeyboardEvent);
    });

    it("delegates to doKeyboardTransitions()", () => {
      expect(doKeyboardTransitions.default).toHaveBeenCalledWith({
        deviceModel,
        currentState: "CLOSED",
        event: someKeyboardEvent,
        deviceOrientation: "landscape",
        updateKeyboardState: expect.any(Function),
      });
    });

    it("dedupes keyboard events", () => {
      emitKeyboardEvent(someKeyboardEvent);
      expect(doKeyboardTransitions.default).toHaveBeenCalledTimes(1);
    });

    it("passes correct updateKeyboardState handler", async () => {
      const {
        updateKeyboardState,
      } = (doKeyboardTransitions.default as jest.Mock).mock.calls[0][0];
      updateKeyboardState("DOCKED");

      await wait(1);
      expect(ownKeyboardListener).toHaveBeenCalledWith("DOCKED", "CLOSED");
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
      expect(newKbEvents.getDeviceModelInformation()).toBe(mockedDeviceModel);
    });
  });
});
