import IOSKeyboardEvents from "../IOSKeyboardEvents";
import index from "../index";

describe("#index", () => {
  it("exports IOSKeyboardEvents", () => {
    expect(index).toBe(IOSKeyboardEvents);
  });
});
