import { Effect, isEmpty } from "../src/effect";

describe("Effect", () => {
  describe("isEmpty", () => {
    it("returns true for the empty effect", () => {
      expect(isEmpty(Effect.empty())).toBe(true);
    });
    it("returns false for standard effects", () => {
      expect(isEmpty(Effect())).toBe(false);
      expect(isEmpty(Effect(_ => {}))).toBe(false);
    });
  });
});
