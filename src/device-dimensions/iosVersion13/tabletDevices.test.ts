import tabletDevices from "./tabletDevices";

describe("tabletDevices", () => {
  test("matches snapshot", () => {
    expect(tabletDevices).toMatchSnapshot();
  });
});
