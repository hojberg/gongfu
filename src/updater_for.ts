import { Msg, MsgConstructor } from "./msg";

type Updater = (msg: Msg) => void;

function updaterFor(updater: Updater, Msg: MsgConstructor): Updater {
  return (msgData: any) => updater(Msg(msgData));
}

export default updaterFor;
