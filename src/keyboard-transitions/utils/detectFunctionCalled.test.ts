import { detectFunctionCalled } from "./detectFunctionCalled";

describe("detectFunctionCalled", () => {
  test("passes arguments transparently", () => {
    const stubFunction = jest.fn();
    const [wrappedFunction] = detectFunctionCalled(stubFunction);

    wrappedFunction(1, 2);
    expect(stubFunction).toHaveBeenCalledWith(1, 2);
  });

  test("sets isCalled=false when wrapped function has not been called", () => {
    const stubFunction = jest.fn();
    const [, getIsCalled] = detectFunctionCalled(stubFunction);

    expect(getIsCalled()).toBe(false);
  });

  test("sets isCalled when wrapped function is called", () => {
    const stubFunction = jest.fn();
    const [wrappedFunction, getIsCalled] = detectFunctionCalled(stubFunction);

    wrappedFunction(1, 2);
    expect(getIsCalled()).toBe(true);
  });
});
