import React from "react";
import { Updater, Effect, ModelWithEffect } from "../../src/index";
import SumType from "sums-up";

// -- MODEL

type Model = {
  email: string;
  password: string;
};

function init(): Model {
  return { email: "", password: "" };
}

// -- UPDATE
//
class Msg extends SumType<{
  UpdateEmail: [string];
  UpdatePassword: [string];
}> {}

const UpdateEmail = (email: string) => new Msg("UpdateEmail", email);
const UpdatePassword = (password: string) =>
  new Msg("UpdatePassword", password);

function update(msg: Msg, model: Model): ModelWithEffect<Model> {
  return msg.caseOf({
    UpdateEmail: (email) => ({
      model: { ...model, email },
      effect: Effect.empty(),
    }),
    UpdatePassword: (password) => ({
      model: { ...model, password },
      effect: Effect.empty(),
    }),
  });
}

// -- VIEW

type Props = {
  model: Model;
  updater: Updater;
  onLoginPress: () => void;
};

function LoginForm(props: Props) {
  const { updater, onLoginPress, model } = props;

  return (
    <div>
      <input
        value={model.email}
        onChange={(ev) => updater(UpdateEmail(ev.target.value))}
      />
      <input
        value={model.password}
        onChange={(ev) => updater(UpdatePassword(ev.target.value))}
      />
      <a onClick={onLoginPress}>Login</a>
    </div>
  );
}

export { LoginForm, update, init, Model, Msg };
