import { Msg } from "./msg";
import { Maybe, Just } from "./maybe";

interface ModelWithEffect<M> {
  model: M;
  effect: Effect;
}

type Effect = _Effect;

type Updater = (msg: Msg) => void;
type Runner = (updater: Updater) => void;

function Effect(runner?: Runner): Effect {
  return new _Effect(runner);
}

class _Effect {
  readonly runner: Maybe<Runner>;

  static of(runner?: Runner): Effect {
    return Effect(runner);
  }

  static empty(): Effect {
    return Effect();
  }

  constructor(runner?: Runner) {
    this.runner = Maybe(runner);
  }

  concat(that: Effect): Effect {
    return Effect(done => {
      this.runner.ap(Just(done));
      that.runner.ap(Just(done));
    });
  }

  run(updater: Updater) {
    this.runner.ap(Just(updater));
  }
}

namespace Effect {
  export var of = _Effect.of;
  export var empty = _Effect.empty;
}

export { ModelWithEffect, Effect };
