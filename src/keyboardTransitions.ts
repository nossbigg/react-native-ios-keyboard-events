import { ScreenRect } from "react-native";
import {
  DeviceOrientation,
  IDeviceInformation,
} from "./device-dimensions/deviceDimensions";
import { IOSKeyboardEvent } from "./IOSKeyboardEvents";
import closedKeyboardHandler from "./keyboard-transitions/closedKbTransitions";
import dockedKeyboardHandler from "./keyboard-transitions/dockedKbTransitions";
import minimizedKeyboardHandler from "./keyboard-transitions/minimizedKbTransitions";
import splitKeyboardHandler from "./keyboard-transitions/splitKbTransitions";
import undockedKeyboardHandler from "./keyboard-transitions/undockedKbTransitions";

export type KeyboardState =
  | "CLOSED"
  | "MINIMIZED"
  | "DOCKED"
  | "UNDOCKED"
  | "SPLIT";

type Actions = { [key in KeyboardState]: KeyboardTransitionHandlerType };

export type KeyboardTransitionHandlerType = (
  args: IKeyboardTransitionsArgs,
) => void;

export interface IKeyboardTransitionsArgs {
  currentState: KeyboardState;
  event: IOSKeyboardEvent;
  deviceOrientation: DeviceOrientation;
  deviceInformation: IDeviceInformation;
  setKeyboardDimensions(dimensions: ScreenRect | undefined): void;
  isSameKeyboardDimensions(dimensions: ScreenRect): boolean;
  updateKeyboardState(nextState: KeyboardState): void;
}

const doKeyboardTransitions = (args: IKeyboardTransitionsArgs): void => {
  const actions: Actions = {
    CLOSED: closedKeyboardHandler,
    DOCKED: dockedKeyboardHandler,
    UNDOCKED: undockedKeyboardHandler,
    MINIMIZED: minimizedKeyboardHandler,
    SPLIT: splitKeyboardHandler,
  };

  const action = actions[args.currentState];
  if (action) {
    action(args);
  }
};

export default doKeyboardTransitions;
