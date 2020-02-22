import { IKeyboardTransitionsArgs } from "../../keyboardTransitions";
import { doHandlerWithAdditionalDimensions } from "./doHandlerWithAdditionalDimensions";

describe("doHandlerWithAdditionalDimensions", () => {
  test("does retry when initial action does not update keyboard state", () => {
    const stubHandler = jest.fn();
    const mockArgs = makeMockArgs(true);
    doHandlerWithAdditionalDimensions(stubHandler, mockArgs);

    expect(stubHandler).toHaveBeenCalledWith(
      mockArgsMatcher(mockArgs),
      mockArgs.deviceModel.keyboardDimensions,
    );
    expect(stubHandler).toHaveBeenCalledWith(
      mockArgsMatcher(mockArgs),
      mockArgs.deviceModel.additionalKeyboardDimensions,
    );
    expect(stubHandler).toHaveBeenCalledTimes(2);
  });

  test("does not do retry when initial action updates keyboard state", () => {
    const stubHandler = jest.fn();
    stubHandler.mockImplementation((args: IKeyboardTransitionsArgs) => {
      args.updateKeyboardState("DOCKED");
    });
    const mockArgs = makeMockArgs(true);
    doHandlerWithAdditionalDimensions(stubHandler, mockArgs);

    expect(stubHandler).toHaveBeenCalledWith(
      mockArgsMatcher(mockArgs),
      mockArgs.deviceModel.keyboardDimensions,
    );
    expect(stubHandler).toHaveBeenCalledTimes(1);
  });
});

const makeMockArgs = (
  withAdditionalKeyboardDimensions = false,
): IKeyboardTransitionsArgs => {
  return {
    deviceModel: {
      keyboardDimensions: { a: 1 },
      ...(withAdditionalKeyboardDimensions && {
        additionalKeyboardDimensions: { b: 2 },
      }),
    },
    updateKeyboardState: jest.fn(),
  } as any;
};

const mockArgsMatcher = (mockArgs: IKeyboardTransitionsArgs) => {
  return expect.objectContaining({
    ...mockArgs,
    updateKeyboardState: expect.any(Function),
  });
};
