import { DeviceOrientation } from "../../device-dimensions/deviceDimensions";
import { IOSKeyboardEvent } from "../../IOSKeyboardEvents";
import { IKeyboardTransitionsArgs } from "../../keyboardTransitions";
import closedKeyboardHandler from "../closedKbTransitions";
import {
  createKeyboardEvent,
  getIPadDeviceModel,
} from "./keyboardTransitionTestHelpers";

describe("#closedKbTransitions", () => {
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
      currentState: "CLOSED",
      deviceOrientation: orientation,
      deviceModel: getIPadDeviceModel(),
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
});
