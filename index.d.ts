// Type definitions for gongfu
// Project: https://github.com/hojberg/gongfu
// Definitions by: Andrew Goodale <https://github.com/newyankeecodeshop>
// TypeScript Version: 2.3

import { Component } from "react";

export interface Msg {
  tag: string;
}

export type MsgConstructor = (...args: any[]) => Msg;
export type Updater = (msg: Msg) => void;
export type Runner = (updater: Updater) => void;
export type Setup = (onChange: Updater) => void;

export interface Effect {
  concat(that: Effect): Effect;

  map(f: (a: Msg) => Msg): Effect;

  run(updater: Updater): void;
}

export function Effect(runner?: Runner): Effect;

export namespace Effect {
  function of(runner?: Runner): Effect;
  function empty(): Effect;
}

export interface ModelWithEffect<M> {
  model: M;
  effect: Effect;
}

export interface Sub {
  run(updater: Updater): void;
}

export function Sub(Msg?: MsgConstructor, setup?: Setup): Sub;

export namespace Sub {
  function of(Msg?: MsgConstructor, setup?: Setup): Sub;
  function none(): Sub;
}

export function updaterFor(updater: Updater, Msg: MsgConstructor): Updater;

export interface ProgramProps {
  Component: any;
  update: (msg: Msg, model: any) => ModelWithEffect<any>;
  init: () => ModelWithEffect<any>;
  subscriptions?: (model: any) => Sub;
  debugEnabled?: boolean;
  deepEqualEnabled?: boolean;
}

export interface ProgramState {
  model: any;
}

export class Program extends Component<ProgramProps, ProgramState> {}
