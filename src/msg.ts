interface Msg {
  tag: string;
  msg?: Msg;
}

type MsgConstructor = (a?: any) => Msg;

function msgToString(msg: Msg) {
  let path = msg.tag;

  while (msg.msg) {
    path += "/" + msg.msg.tag;
    msg = msg.msg;
  }

  return path;
}

export { Msg, MsgConstructor, msgToString };
