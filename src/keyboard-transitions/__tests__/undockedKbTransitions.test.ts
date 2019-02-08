import { DeviceOrientation } from "../../device-dimensions/deviceDimensions";
import { IOSKeyboardEvent } from "../../IOSKeyboardEvents";
import { IKeyboardTransitionsArgs } from "../../keyboardTransitions";
import undockedKeyboardHandler from "../undockedKbTransitions";
import {
  createKeyboardEvent,
  getIPadDeviceModel,
} from "./keyboardTransitionTestHelpers";

describe("#undockedKbTransitions", () => {
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
      currentState: "UNDOCKED",
      deviceOrientation: orientation,
      deviceModel: getIPadDeviceModel(),
    };
    undockedKeyboardHandler(args);
  };

  it("transits to DOCKED state", () => {
    const event = createKeyboardEvent("keyboardDidShow", 398);
    doHandler(event as IOSKeyboardEvent);
    expect(updateKeyboardState).toHaveBeenCalledWith("DOCKED");
  });

  it("transits to DOCKED state (vertical)", () => {
    const event = createKeyboardEvent("keyboardDidShow", 313);
    doHandler(event as IOSKeyboardEvent, "portrait");
    expect(updateKeyboardState).toHaveBeenCalledWith("DOCKED");
  });

  it("transits to MINIMIZED state", () => {
    const event = createKeyboardEvent("keyboardDidShow", 55);
    doHandler(event as IOSKeyboardEvent);
    expect(updateKeyboardState).toHaveBeenCalledWith("MINIMIZED");
  });

  it("transits to SPLIT state", () => {
    const event = createKeyboardEvent("keyboardDidChangeFrame", 271);
    doHandler(event as IOSKeyboardEvent);
    expect(updateKeyboardState).toHaveBeenCalledWith("SPLIT");
  });

  it("transits to CLOSED state", () => {
    const event = createKeyboardEvent("keyboardDidChangeFrame", 0);
    doHandler(event as IOSKeyboardEvent);
    expect(updateKeyboardState).toHaveBeenCalledWith("CLOSED");
  });
});
