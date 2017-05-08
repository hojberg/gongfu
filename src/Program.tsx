import React from 'react';
import { ModelWithEffect } from './Effect';

interface ProgramProps {
  Component: any
  update: (msg: any, model: any) => ModelWithEffect<any>
  init: () => any
}

interface ProgramState {
  model: any
}

class Program extends React.Component<ProgramProps, ProgramState> {
  constructor(props: ProgramProps) {
    super(props);
    const { init } = props;
    this.state = { model: init() };
    this._updater = this._updater.bind(this);
  }

  _updater(msg: any): void {
    const { update } = this.props;
    const { model, effect } = update(msg, this.state.model);

    if (effect && effect.run) {
      effect.run(this._updater);
    }

    this.setState({ model });
  }

  render(): React.ReactElement<any> {
    const { Component } = this.props;
    return <Component updater={this._updater} model={this.state.model} />;
  }
}

export default Program;
