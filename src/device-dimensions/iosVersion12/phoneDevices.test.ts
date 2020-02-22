import phoneDevices from "./phoneDevices";

describe("phoneDevices", () => {
  test("matches snapshot", () => {
    expect(phoneDevices).toMatchSnapshot();
  });
});
