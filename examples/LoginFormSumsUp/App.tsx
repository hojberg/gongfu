import React from "react";
import * as LoginForm from "./LoginForm";
import { Updater, Effect, updaterFor, ModelWithEffect } from "../../src/index";
import SumType from "sums-up";

// -- MODEL

type User = {
  name: string;
};

type Model = {
  loginForm: LoginForm.Model;
  apiUser: User | null;
};

function init(): ModelWithEffect<Model> {
  const model = {
    loginForm: LoginForm.init(),
    apiUser: null,
  };

  return { model, effect: Effect.empty() };
}

// -- UPDATE

class Msg extends SumType<{
  Login: [];
  LoginRequestSuccess: [User];
  LoginRequestFailure: [Error];
  LoginFormMsg: [LoginForm.Msg];
}> {}

const Login = () => new Msg("Login");
const LoginRequestSuccess = (user: User) =>
  new Msg("LoginRequestSuccess", user);
const LoginRequestFailure = (error: Error) =>
  new Msg("LoginRequestFailure", error);
const LoginFormMsg = (msg: LoginForm.Msg) => new Msg("LoginFormMsg", msg);

function update(msg: Msg, model: Model): ModelWithEffect<Model> {
  return msg.caseOf({
    Login: () => ({
      model,
      effect: login(model.loginForm.email, model.loginForm.password),
    }),

    LoginRequestSuccess: (apiUser) => ({
      model: { ...model, apiUser },
      effect: Effect.empty(),
    }),

    LoginRequestFailure: () => ({ model, effect: Effect.empty() }),

    LoginFormMsg: (msg) => ({
      model: {
        ...model,
        loginForm: LoginForm.update(msg, model.loginForm).model,
      },
      effect: Effect.empty(),
    }),
  });
}

// -- EFFECTS

function login(_email: string, _password: string): Effect {
  return Effect((done) => {
    setTimeout(() => {
      const msg = LoginRequestSuccess({ name: "Simon" });
      done(msg);
    }, 2000);
  });
}

// -- VIEW

type Props = {
  model: Model;
  updater: Updater;
  onLoginPress: () => void;
};

function App(props: Props) {
  const { model, updater } = props;
  const welcome = model.apiUser ? `Hi ${model.apiUser.name}` : null;
  const loginFormUpdater = updaterFor(updater, LoginFormMsg);

  return (
    <div>
      <h1>{welcome}</h1>
      <LoginForm.LoginForm
        updater={loginFormUpdater}
        model={model.loginForm}
        onLoginPress={() => updater(Login())}
      />
    </div>
  );
}

export { App, update, init };
