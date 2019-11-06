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

  map<M extends Msg>(f: (msg: M) => Msg): Effect;

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

export function Sub(setup?: Setup): Sub;

export namespace Sub {
  function of(setup?: Setup): Sub;
  function none(): Sub;
}

export function updaterFor<M extends Msg>(updater: (msg: M) => void, Msg: MsgConstructor): Updater;

export interface ProgramProps {
  Component: any;
  update: (msg: Msg, model: any) => ModelWithEffect<any>;
  init: () => ModelWithEffect<any>;
  subscriptions?: (model: any) => Sub;
  debugEnabled?: boolean;
}

export interface ProgramState {
  model: any;
}

export class Program extends Component<ProgramProps, ProgramState> {}

/**
 * Returns an effect which sends a message for the next frame.
 * "Next frame" means a 16ms delay, assuming 60fps for rendering.
 * @param msg The message to send
 */
export function sendMessage(msg: Msg): Effect;

/**
 * * Returns an effect which sends a message after a delay.
 * @param msg The message to send
 * @param delay The time in milliseconds before the message is sent
 */
export function sendMessageDelayed(msg: Msg, delay: number): Effect;
