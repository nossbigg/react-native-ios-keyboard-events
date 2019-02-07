import { IOSKeyboardEvent } from "../../IOSKeyboardEvents";
import { IKeyboardTransitionsArgs } from "../../keyboardTransitions";
import splitKeyboardHandler from "../splitKbTransitions";
import {
  createKeyboardEvent,
  getIPadDeviceInformation,
} from "./keyboardTransitionTestHelpers";

describe("#splitKbTransitions", () => {
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
      currentState: "SPLIT",
      deviceOrientation: "landscape",
      deviceInformation: getIPadDeviceInformation(),
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
    doHandler(event as IOSKeyboardEvent);
    expect(updateKeyboardState).toHaveBeenCalledWith("UNDOCKED");
  });

  it("transits to MINIMIZED state", () => {
    const event = createKeyboardEvent("keyboardDidShow", 55);
    doHandler(event as IOSKeyboardEvent);
    expect(updateKeyboardState).toHaveBeenCalledWith("MINIMIZED");
  });
});
