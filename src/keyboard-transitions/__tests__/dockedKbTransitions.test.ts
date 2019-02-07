import { IOSKeyboardEvent } from "../../IOSKeyboardEvents";
import { IKeyboardTransitionsArgs } from "../../keyboardTransitions";
import dockedKeyboardHandler from "../dockedKbTransitions";
import {
  createKeyboardEvent,
  getIPadDeviceInformation,
} from "./keyboardTransitionTestHelpers";

describe("#dockedKbTransitions", () => {
  let setKeyboardDimensions: jest.Mock;
  let isSameKeyboardDimensions: jest.Mock;
  let updateKeyboardState: jest.Mock;

  beforeEach(() => {
    setKeyboardDimensions = jest.fn();
    isSameKeyboardDimensions = jest.fn();
    updateKeyboardState = jest.fn();
  });

  const doHandler = (event: IOSKeyboardEvent) => {
    const args: IKeyboardTransitionsArgs = {
      updateKeyboardState,
      event,
      setKeyboardDimensions,
      isSameKeyboardDimensions,
      currentState: "DOCKED",
      deviceOrientation: "landscape",
      deviceInformation: getIPadDeviceInformation(),
    };
    dockedKeyboardHandler(args);
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
