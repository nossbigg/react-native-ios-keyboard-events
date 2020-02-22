export function detectFunctionCalled<TFunctionType extends GenericFunctionType>(
  functionToWrap: TFunctionType,
): [TFunctionType, () => boolean] {
  let isCalled = false;
  const getIsCalled = () => isCalled;
  const wrappedFunction: any = (...args: any[]) => {
    isCalled = true;
    functionToWrap(...args);
  };

  return [wrappedFunction, getIsCalled];
}

type GenericFunctionType = (...args: any[]) => void;
