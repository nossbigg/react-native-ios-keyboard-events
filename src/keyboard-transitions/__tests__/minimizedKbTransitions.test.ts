import { DeviceOrientation } from "../../device-dimensions/deviceDimensions";
import { IOSKeyboardEvent } from "../../IOSKeyboardEvents";
import { IKeyboardTransitionsArgs } from "../../keyboardTransitions";
import minimizedKeyboardHandler from "../minimizedKbTransitions";
import {
  createKeyboardEvent,
  getIPadDeviceModel,
} from "./keyboardTransitionTestHelpers";

describe("#minimizedKbTransitions", () => {
  let updateKeyboardState: jest.Mock;

  beforeEach(() => {
    updateKeyboardState = jest.fn();
  });

  const doHandler = (
    event: IOSKeyboardEvent,
    orientation: DeviceOrientation = "landscape",
  ) => {
    const args: IKeyboardTransitionsArgs = {
      updateKeyboardState,
      event,
      currentState: "MINIMIZED",
      deviceOrientation: orientation,
      deviceModel: getIPadDeviceModel(),
    };
    minimizedKeyboardHandler(args);
  };

  it("transits to CLOSED state", () => {
    const event = createKeyboardEvent("keyboardDidHide");
    doHandler(event as IOSKeyboardEvent);
    expect(updateKeyboardState).toHaveBeenCalledWith("CLOSED");
  });

  it("transits to UNDOCKED state", () => {
    const event = createKeyboardEvent("keyboardDidChangeFrame", 408);
    doHandler(event as IOSKeyboardEvent);
    expect(updateKeyboardState).toHaveBeenCalledWith("UNDOCKED");
  });

  it("transits to UNDOCKED state (vertical)", () => {
    const event = createKeyboardEvent("keyboardDidChangeFrame", 320);
    doHandler(event as IOSKeyboardEvent, "portrait");
    expect(updateKeyboardState).toHaveBeenCalledWith("UNDOCKED");
  });

  it("transits to SPLIT state", () => {
    const event = createKeyboardEvent("keyboardDidChangeFrame", 271);
    doHandler(event as IOSKeyboardEvent);
    expect(updateKeyboardState).toHaveBeenCalledWith("SPLIT");
  });
});
