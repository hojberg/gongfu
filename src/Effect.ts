interface ModelWithEffect<M> {
  model: M,
  effect: Effect
}

class Effect {
  runner: (updater: (any) => void) => void

  static of(runner) {
    return new Effect(runner);
  }

  static none() {
    return new Effect();
  }

  constructor(runner?) {
    this.runner = runner;
  }

  run(updater: (any) => void) {
    if (this.runner) {
      this.runner(updater);
    }
  }
}

export { Effect, ModelWithEffect };
