import { pipe } from "ramda";
import { Msg, MsgConstructor } from "./msg";

type Sub = _Sub;

type Updater = (msg: Msg) => void;
type Setup = (onChange: Updater) => void;

function Sub(Msg?: MsgConstructor, setup?: Setup): Sub {
  return new _Sub(Msg, setup);
}

class _Sub {
  readonly setup?: Setup;
  readonly Msg?: MsgConstructor;

  static of(Msg?: MsgConstructor, setup?: Setup): Sub {
    return Sub(Msg, setup);
  }

  static none(): Sub {
    return Sub();
  }

  constructor(Msg?: MsgConstructor, setup?: Setup) {
    this.setup = setup;
    this.Msg = Msg;
  }

  run(updater: Updater) {
    if (typeof this.setup === "function" && typeof this.Msg === "function") {
      this.setup(pipe(this.Msg, updater));
    }
  }
}

namespace Sub {
  export var of = _Sub.of;
  export var none = _Sub.none;
}

export default Sub;
