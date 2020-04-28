import Program from "./program";
import { Effect, ModelWithEffect } from "./effect";
import updaterFor from "./updater_for";
import Sub from "./sub";
import { Msg, MsgConstructor } from "./msg";
import withSubscriptions from "./with_subs";

export type Updater = (msg: Msg) => void;

export {
  Msg,
  MsgConstructor,
  Program,
  Effect,
  ModelWithEffect,
  updaterFor,
  Sub,
  withSubscriptions,
};
