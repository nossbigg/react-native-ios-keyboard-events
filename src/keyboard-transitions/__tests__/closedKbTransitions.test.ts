import { DeviceOrientation } from "../../device-dimensions/deviceDimensions";
import { IOSKeyboardEvent } from "../../IOSKeyboardEvents";
import { IKeyboardTransitionsArgs } from "../../keyboardTransitions";
import closedKeyboardHandler from "../closedKbTransitions";
import {
  createKeyboardEvent,
  getIPadDeviceModel,
  getIPhoneDeviceModel,
} from "./keyboardTransitionTestHelpers";

describe("#closedKbTransitions", () => {
  let updateKeyboardState: jest.Mock;

  beforeEach(() => {
    updateKeyboardState = jest.fn();
  });

  const doHandler = (
    event: IOSKeyboardEvent,
    orientation: DeviceOrientation = "landscape",
    deviceModel = getIPadDeviceModel(),
  ) => {
    const args: IKeyboardTransitionsArgs = {
      updateKeyboardState,
      event,
      deviceModel,
      currentState: "CLOSED",
      deviceOrientation: orientation,
    };
    closedKeyboardHandler(args);
  };

  it("transits to SPLIT state", () => {
    const event = createKeyboardEvent("keyboardDidChangeFrame", 271);
    doHandler(event as IOSKeyboardEvent);
    expect(updateKeyboardState).toHaveBeenCalledWith("SPLIT");
  });

  it("transits to UNDOCKED state", () => {
    const event = createKeyboardEvent("keyboardDidChangeFrame", 398);
    doHandler(event as IOSKeyboardEvent);
    expect(updateKeyboardState).toHaveBeenCalledWith("UNDOCKED");
  });

  it("transits to UNDOCKED state (vertical)", () => {
    const event = createKeyboardEvent("keyboardDidChangeFrame", 313);
    doHandler(event as IOSKeyboardEvent, "portrait");
    expect(updateKeyboardState).toHaveBeenCalledWith("UNDOCKED");
  });

  it("transits to MINIMIZED state", () => {
    const event = createKeyboardEvent("keyboardDidChangeFrame", 55);
    doHandler(event as IOSKeyboardEvent);
    expect(updateKeyboardState).toHaveBeenCalledWith("MINIMIZED");
  });

  describe("mobile app", () => {
    it("transits to DOCKED state", () => {
      const event = createKeyboardEvent("keyboardDidShow", 271);
      doHandler(event as IOSKeyboardEvent, "portrait", getIPhoneDeviceModel());
      expect(updateKeyboardState).toHaveBeenCalledWith("DOCKED");
    });
  });
});
