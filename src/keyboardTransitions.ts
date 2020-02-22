import {
  DeviceOrientation,
  IDeviceModel,
} from "./device-dimensions/deviceDimensions";
import { IOSKeyboardEvent } from "./IOSKeyboardEvents";
import closedKeyboardHandler from "./keyboard-transitions/closedKbTransitions";
import dockedKeyboardHandler from "./keyboard-transitions/dockedKbTransitions";
import floatingKeyboardHandler from "./keyboard-transitions/floatingKbTransitions";
import minimizedKeyboardHandler from "./keyboard-transitions/minimizedKbTransitions";
import splitKeyboardHandler from "./keyboard-transitions/splitKbTransitions";
import undockedKeyboardHandler from "./keyboard-transitions/undockedKbTransitions";

export type KeyboardState =
  | "CLOSED"
  | "MINIMIZED"
  | "DOCKED"
  | "UNDOCKED"
  | "SPLIT"
  | "FLOATING";

type KeyboardActionsMapper = {
  [key in KeyboardState]: KeyboardTransitionHandlerType
};

export type KeyboardTransitionHandlerType = (
  args: IKeyboardTransitionsArgs,
) => void;

export interface IKeyboardTransitionsArgs {
  currentState: KeyboardState;
  event: IOSKeyboardEvent;
  deviceOrientation: DeviceOrientation;
  deviceModel: IDeviceModel;
  updateKeyboardState(nextState: KeyboardState): void;
}

const keyboardActionsMap: KeyboardActionsMapper = {
  CLOSED: closedKeyboardHandler,
  DOCKED: dockedKeyboardHandler,
  UNDOCKED: undockedKeyboardHandler,
  MINIMIZED: minimizedKeyboardHandler,
  SPLIT: splitKeyboardHandler,
  FLOATING: floatingKeyboardHandler,
};

const doKeyboardTransitions = (args: IKeyboardTransitionsArgs): void => {
  const action = keyboardActionsMap[args.currentState];
  if (action) {
    action(args);
  }
};

export default doKeyboardTransitions;
