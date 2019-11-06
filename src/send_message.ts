import { Effect } from "./effect";
import { Msg } from "./msg";

function sendMessage(msg: Msg): Effect {
  return Effect(updater => setTimeout(updater, 16, msg));
}

function sendMessageDelayed(msg: Msg, delay: number): Effect {
  return Effect(updater => setTimeout(updater, delay, msg));
}

export { sendMessage, sendMessageDelayed };