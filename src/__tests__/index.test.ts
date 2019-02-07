import index from "../index";
import IOSKeyboardEvents from "../IOSKeyboardEvents";

describe("#index", () => {
  it("exports IOSKeyboardEvents", () => {
    expect(index).toBe(IOSKeyboardEvents);
  });
});
