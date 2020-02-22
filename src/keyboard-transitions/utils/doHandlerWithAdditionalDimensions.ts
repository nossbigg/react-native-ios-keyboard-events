import { KeyboardDimensions } from "../../device-dimensions/deviceDimensions";
import {
  IKeyboardTransitionsArgs,
  KeyboardTransitionHandlerType,
} from "../../keyboardTransitions";
import { detectFunctionCalled } from "./detectFunctionCalled";

export const doHandlerWithAdditionalDimensions = (
  keyboardTransitionHandler: KeyboardTransitionHandlerType,
  args: IKeyboardTransitionsArgs,
): void => {
  const { keyboardDimensions, additionalKeyboardDimensions } = args.deviceModel;
  const [
    wrappedUpdateKeyboardStateFunction,
    getIsCalled,
  ] = detectFunctionCalled(args.updateKeyboardState);

  const argsWithWrappedUpdate: IKeyboardTransitionsArgs = {
    ...args,
    updateKeyboardState: wrappedUpdateKeyboardStateFunction,
  };
  keyboardTransitionHandler(argsWithWrappedUpdate, keyboardDimensions);

  if (!getIsCalled()) {
    keyboardTransitionHandler(
      args,
      additionalKeyboardDimensions as KeyboardDimensions,
    );
  }
};

export const hasAdditionalKeyboardDimensions = (
  args: IKeyboardTransitionsArgs,
) => {
  return !!args.deviceModel.additionalKeyboardDimensions;
};
