import phoneDevicesExport from "./device-dimensions/iosVersion12/phoneDevices";
import tabletDevicesExport from "./device-dimensions/iosVersion12/tabletDevices";
import { createIOSKeyboardEvents, phoneDevices, tabletDevices } from "./index";
import IOSKeyboardEvents from "./IOSKeyboardEvents";

describe("#index", () => {
  it("exports IOSKeyboardEvents", () => {
    expect(createIOSKeyboardEvents).toBe(IOSKeyboardEvents);
  });

  it("exports tablet devices", () => {
    expect(tabletDevices).toBe(tabletDevicesExport);
  });

  it("exports phone devices", () => {
    expect(phoneDevices).toBe(phoneDevicesExport);
  });
});
