import React from "react";
import Sub from "./sub";
import { Msg } from "./msg";
import { Effect, ModelWithEffect } from "./effect";

interface ProgramProps {
  Component: any;
  update: (msg: Msg, model: any) => ModelWithEffect<any>;
  init: () => ModelWithEffect<any>;
  subscriptions?: (model: any) => Sub;
}

interface ProgramState {
  model: any;
}

class Program extends React.Component<ProgramProps, ProgramState> {
  readonly _subscriptions?: Sub;
  private _isMounted: Boolean;

  constructor(props: ProgramProps) {
    super(props);
    const { init, subscriptions } = props;
    const { model, effect } = init();
    this.state = { model };
    this._updater = this._updater.bind(this);
    this._isMounted = false;

    if (typeof subscriptions === "function") {
      this._subscriptions = subscriptions(model);
    }

    this._runEffect(effect);
  }

  componentDidMount(): void {
    this._isMounted = true;

    if (this._subscriptions) {
      this._subscriptions.run(this._updater);
    }
  }

  componentWillUnmount(): void {
    this._isMounted = false;
  }

  _updater(msg: Msg): void {
    console.log(`[Gongfu] Running Update for ${msg.tag}`);

    const { update } = this.props;
    const { model, effect } = update(msg, this.state.model);

    if (this._isMounted) {
      console.log("[Gongfu] Setting state");
      this.setState({ model }, () => {
        this._runEffect(effect);
      });
    } else {
      this._runEffect(effect);
    }
  }

  _runEffect(effect: Effect): void {
    if (!effect.isEmpty()) {
      console.log("[Gongfu] Running Effect");
      effect.run(this._updater);
    }
  }

  render(): React.ReactElement<any> {
    const { Component } = this.props;
    return <Component updater={this._updater} model={this.state.model} />;
  }
}

export default Program;
