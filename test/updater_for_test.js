import expect from "expect.js";
import updaterFor from "../dist/updater_for";

function Message1() {
  return { tag: "Message1" };
}

function Message2() {
  return { tag: "Message2" };
}

function ParentMessage(msg) {
  return { tag: "ParentMessage", msg };
}

function update(msg, model) {
  return { update: msg };
}

describe("updaterFor", () => {
  it("returns an updater that wraps child messages", () => {
    const updater = updaterFor(update, ParentMessage);

    expect(typeof updater).to.be("function");

    let result = updater(Message1());
    expect(result).to.eql({ update: { tag: "ParentMessage", msg: { tag: "Message1" } } });

    result = updater(Message2());
    expect(result).to.eql({ update: { tag: "ParentMessage", msg: { tag: "Message2" } } });
  });

  it("caches the updater functions", () => {
    const updater1 = updaterFor(update, ParentMessage);
    const updater2 = updaterFor(update, ParentMessage);

    expect(updater2).to.be(updater1);
  });
});
