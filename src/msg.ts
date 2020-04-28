import SumType from "sums-up";

type ClassicMsg = {
  tag: string;
  msg?: ClassicMsg;
};

type Msg = ClassicMsg | SumType<Record<string, Array<unknown>>>;

type MsgConstructor = (a?: any) => Msg;

function isClassicMsg(msg: Msg): msg is ClassicMsg {
  return "tag" in msg;
}

function msgToString(msg: Msg) {
  if (isClassicMsg(msg)) {
    let path = msg.tag;

    while (msg.msg) {
      path += "/" + msg.msg.tag;
      msg = msg.msg;
    }

    return path;
  } else {
    return msg.toString();
  }
}

export { Msg, MsgConstructor, msgToString };
