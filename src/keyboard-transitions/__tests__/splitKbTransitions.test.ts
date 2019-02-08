import { DeviceOrientation } from "../../device-dimensions/deviceDimensions";
import { IOSKeyboardEvent } from "../../IOSKeyboardEvents";
import { IKeyboardTransitionsArgs } from "../../keyboardTransitions";
import splitKeyboardHandler from "../splitKbTransitions";
import {
  createKeyboardEvent,
  getIPadDeviceModel,
} from "./keyboardTransitionTestHelpers";

describe("#splitKbTransitions", () => {
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
      currentState: "SPLIT",
      deviceOrientation: orientation,
      deviceModel: getIPadDeviceModel(),
    };
    splitKeyboardHandler(args);
  };

  it("transits to CLOSED state", () => {
    const event = createKeyboardEvent("keyboardDidChangeFrame", 0);
    doHandler(event as IOSKeyboardEvent);
    expect(updateKeyboardState).toHaveBeenCalledWith("CLOSED");
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
    const event = createKeyboardEvent("keyboardDidShow", 55);
    doHandler(event as IOSKeyboardEvent);
    expect(updateKeyboardState).toHaveBeenCalledWith("MINIMIZED");
  });
});
