import { createKeyboardEvent } from "./keyboardTransitionTestHelpers";
import { IOSKeyboardEvent } from "../../IOSKeyboardEvents";
import closedKeyboardHandler from "../closedKbTransitions";
import { KeyboardTransitionsArgs } from "../../keyboardTransitions";

describe("#closedKbTransitions", () => {
  let setKeyboardDimensions: jest.Mock;
  let isSameKeyboardDimensions: jest.Mock;
  let updateKeyboardState: jest.Mock;

  beforeEach(() => {
    setKeyboardDimensions = jest.fn();
    isSameKeyboardDimensions = jest.fn();
    updateKeyboardState = jest.fn();
  });

  const doHandler = (event: IOSKeyboardEvent) => {
    const args: KeyboardTransitionsArgs = {
      updateKeyboardState,
      event,
      setKeyboardDimensions,
      isSameKeyboardDimensions,
      currentState: "CLOSED"
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

  it("transits to MINIMIZED state", () => {
    const event = createKeyboardEvent("keyboardDidChangeFrame", 55);
    doHandler(event as IOSKeyboardEvent);
    expect(updateKeyboardState).toHaveBeenCalledWith("MINIMIZED");
  });
});
