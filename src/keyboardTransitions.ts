import {
  DeviceOrientation,
  IDeviceModel,
  KeyboardDimensions,
} from "./device-dimensions/deviceDimensions";
import { IOSKeyboardEvent } from "./IOSKeyboardEvents";
import closedKeyboardHandler from "./keyboard-transitions/closedKbTransitions";
import dockedKeyboardHandler from "./keyboard-transitions/dockedKbTransitions";
import floatingKeyboardHandler from "./keyboard-transitions/floatingKbTransitions";
import minimizedKeyboardHandler from "./keyboard-transitions/minimizedKbTransitions";
import splitKeyboardHandler from "./keyboard-transitions/splitKbTransitions";
import undockedKeyboardHandler from "./keyboard-transitions/undockedKbTransitions";
import {
  doHandlerWithAdditionalDimensions,
  hasAdditionalKeyboardDimensions,
} from "./keyboard-transitions/utils/doHandlerWithAdditionalDimensions";

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
  keyboardDimensions: KeyboardDimensions,
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
  const actionHandler = keyboardActionsMap[args.currentState];
  if (!actionHandler) {
    return;
  }

  // For iPad Pro (12.9-inch) (3rd generation) iOS v13 special case
  const shouldWrapFunction = hasAdditionalKeyboardDimensions(args);
  if (shouldWrapFunction) {
    doHandlerWithAdditionalDimensions(actionHandler, args);
    return;
  }

  actionHandler(args, args.deviceModel.keyboardDimensions);
};

export default doKeyboardTransitions;
