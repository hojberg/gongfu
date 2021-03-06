import * as React from "react";
import Sub from "./sub";
import { Msg, msgToString } from "./msg";
import { Effect, ModelWithEffect, isEmpty } from "./effect";

interface ProgramProps {
  Component: any;
  update: (msg: Msg, model: any) => ModelWithEffect<any>;
  init: () => ModelWithEffect<any>;
  subscriptions?: (model: any) => Sub;
  debugEnabled?: boolean;
}

interface ProgramState {
  model: any;
}

class Program extends React.Component<ProgramProps, ProgramState> {
  readonly _subscriptions?: Sub;
  private _isMounted: Boolean;

  public static defaultProps = {
    debugEnabled: true
  };

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
    const { debugEnabled, update } = this.props;

    debugEnabled && console.group(`[Gongfu] Running Update for ${msgToString(msg)}`);

    const { model, effect } = update(msg, this.state.model);

    if (this._isMounted && model !== this.state.model) {
      this.setState({ model }, () => {
        this._runEffect(effect);
      });
    } else {
      this._runEffect(effect);
    }

    debugEnabled && console.groupEnd();
  }

  _runEffect(effect: Effect): void {
    if (isEmpty(effect)) return;
    if (this.props.debugEnabled) console.log("[Gongfu] Running Effect");

    // Effects need to be run synchronously so they have access to the updated model
    effect.run(this._updater);
  }

  render(): React.ReactElement<any> {
    const { Component } = this.props;
    return <Component updater={this._updater} model={this.state.model} />;
  }
}

export default Program;
