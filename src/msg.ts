interface Msg {
  tag: string;
}

type MsgConstructor = (a?: any) => Msg;

export { Msg, MsgConstructor };
