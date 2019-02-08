import phoneDevices from "../phoneDevices";
import tabletDevices from "../tabletDevices";

describe("#deviceDimensions", () => {
  it("contains device information of phone devices", () => {
    expect(phoneDevices).toMatchSnapshot();
  });

  it("contains device information of tablet devices", () => {
    expect(tabletDevices).toMatchSnapshot();
  });
});
