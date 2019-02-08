import { Dimensions, ScaledSize } from "react-native";
import {
  getDeviceModel,
  getDeviceOrientation,
  IDeviceModel,
} from "../deviceDimensions";
import phoneDevices from "../phoneDevices";
import tabletDevices from "../tabletDevices";

describe("#deviceDimensions", () => {
  const mockDimensionsGet = (height: number, width: number) => {
    jest
      .spyOn(Dimensions, "get")
      .mockReturnValue({ height, width } as ScaledSize);
  };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("contains device information of phone devices", () => {
    expect(phoneDevices).toMatchSnapshot();
  });

  it("contains device information of tablet devices", () => {
    expect(tabletDevices).toMatchSnapshot();
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
