import { Dimensions, ScaledSize } from "react-native";
import {
  getDeviceModel,
  getDeviceOrientation,
  IDeviceModel,
} from "./deviceDimensions";

describe("#deviceDimensions", () => {
  const mockDimensionsGet = (height: number, width: number) => {
    jest
      .spyOn(Dimensions, "get")
      .mockReturnValue({ height, width } as ScaledSize);
  };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("returns device orientation as landscape", () => {
    mockDimensionsGet(768, 1024);

    expect(getDeviceOrientation()).toBe("landscape");
    expect(Dimensions.get).toHaveBeenCalledWith("window");
  });

  it("returns device orientation as portrait", () => {
    mockDimensionsGet(1024, 768);
    expect(getDeviceOrientation()).toBe("portrait");
  });

  it("gets device model", () => {
    mockDimensionsGet(1024, 768);

    const deviceModel = getDeviceModel() as IDeviceModel;
    expect(deviceModel.model).toEqual("iPad Air");
    expect(Dimensions.get).toHaveBeenCalledWith("window");
  });

  it("does not get device model", () => {
    mockDimensionsGet(1, 1);
    expect(getDeviceModel()).toBe(undefined);
  });
});
