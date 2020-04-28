// Deprecated format. Use FSA msg or SumTypes
type ClassicMsg = {
  tag: string;
  msg?: ClassicMsg;
};

type FSAMsg = {
  type: string;
  payload?: unknown;
  error?: unknown;
  meta?: unknown;
};

type Msg = ClassicMsg | FSAMsg;

type MsgConstructor = (a?: any) => Msg;

function isClassicMsg(msg: Msg): msg is ClassicMsg {
  return "tag" in msg;
}

// TODO: Add better support for FSAMsg
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
