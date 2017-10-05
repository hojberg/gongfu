import { pipe } from "ramda";
import { Msg } from "./msg";

type Sub = _Sub;

type Updater = (msg: Msg) => void;
type Setup = (onChange: Updater) => void;

function Sub(setup?: Setup): Sub {
  return new _Sub(setup);
}

class _Sub {
  readonly setup?: Setup;

  static of(setup?: Setup): Sub {
    return Sub(setup);
  }

  static none(): Sub {
    return Sub();
  }

  constructor(setup?: Setup) {
    this.setup = setup;
  }

  run(updater: Updater) {
    if (typeof this.setup === "function") {
      this.setup(updater);
    }
  }
}

namespace Sub {
  export var of = _Sub.of;
  export var none = _Sub.none;
}

export default Sub;
