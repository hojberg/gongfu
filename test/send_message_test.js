import expect from "expect.js";
import { sendMessage, sendMessageDelayed } from "../dist/send_message";

function Message1() {
  return { tag: "Message1" };
}

function Message2() {
  return { tag: "Message2" };
}

describe("sendMessage", () => {
  it("returns an effect which calls the updater with the message", done => {
    const effect = sendMessage(Message1());
    effect.run(msg => {
      expect(msg.tag).to.be("Message1");
      done();
    })
  });

  it("returns an effect which calls the updater after a delay", done => {
    const sentAt = Date.now();
    const effect = sendMessageDelayed(Message2(), 300);
    effect.run(msg => {
      expect(msg.tag).to.be("Message2");
      expect(Date.now() >= sentAt + 300).to.be(true);
      done();
    })
  });
});
