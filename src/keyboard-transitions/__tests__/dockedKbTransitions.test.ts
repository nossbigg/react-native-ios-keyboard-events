import { IOSKeyboardEvent } from "../../IOSKeyboardEvents";
import { IKeyboardTransitionsArgs } from "../../keyboardTransitions";
import dockedKeyboardHandler from "../dockedKbTransitions";
import {
  createKeyboardEvent,
  getIPadDeviceModel,
} from "./keyboardTransitionTestHelpers";

describe("#dockedKbTransitions", () => {
  let updateKeyboardState: jest.Mock;

  beforeEach(() => {
    updateKeyboardState = jest.fn();
  });

  const doHandler = (event: IOSKeyboardEvent) => {
    const deviceModel = getIPadDeviceModel();
    const args: IKeyboardTransitionsArgs = {
      updateKeyboardState,
      event,
      currentState: "DOCKED",
      deviceOrientation: "landscape",
      deviceModel,
    };
    dockedKeyboardHandler(args, deviceModel.keyboardDimensions);
  };

  it("transits to CLOSED state", () => {
    const event = createKeyboardEvent("keyboardDidHide");
    doHandler(event as IOSKeyboardEvent);
    expect(updateKeyboardState).toHaveBeenCalledWith("CLOSED");
  });

  it("transits to MINIMIZED state", () => {
    const event = createKeyboardEvent("keyboardDidShow", 55);
    doHandler(event as IOSKeyboardEvent);
    expect(updateKeyboardState).toHaveBeenCalledWith("MINIMIZED");
  });
});
