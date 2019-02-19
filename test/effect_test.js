import expect from "expect.js";
import { Effect, isEmpty } from "../dist/effect";

describe("Effect", () => {
  describe("isEmpty", () => {
    it("returns true for the empty effect", () => {
      expect(isEmpty(Effect.empty())).to.be(true);
    });
    it("returns false for standard effects", () => {
      expect(isEmpty(Effect())).to.be(false);
      expect(isEmpty(Effect(_ => {}))).to.be(false);
    });
  })
});
