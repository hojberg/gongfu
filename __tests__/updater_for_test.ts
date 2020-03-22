import updaterFor from "../src/updater_for";

function Message1() {
  return { tag: "Message1" };
}

function Message2() {
  return { tag: "Message2" };
}

function ParentMessage(msg) {
  return { tag: "ParentMessage", msg };
}

describe("updaterFor", () => {
  it("returns an updater that wraps child messages", () => {
    const updater = jest.fn();

    const wrappedUpdater = updaterFor(updater, ParentMessage);

    wrappedUpdater(Message1());
    expect(updater).toBeCalledWith(ParentMessage(Message1()));

    wrappedUpdater(Message2());
    expect(updater).toBeCalledWith(ParentMessage(Message2()));
  });

  it("caches the updater functions", () => {
    const updater = jest.fn();

    const updater1 = updaterFor(updater, ParentMessage);
    const updater2 = updaterFor(updater, ParentMessage);

    expect(updater2).toBe(updater1);
  });
});
