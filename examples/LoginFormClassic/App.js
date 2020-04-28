import React from "react";
import { assoc } from "ramda";
import * as LoginForm from "./LoginForm";
import { Effect, updaterFor } from "../../build/src/index";

// -- MODEL

function init() {
  const model = {
    loginForm: LoginForm.init(),
    apiUser: null,
  };

  return { model, effect: Effect.empty() };
}

// -- UPDATE

function Login() {
  return { tag: "Login" };
}

function LoginRequestSuccess(response) {
  return { response, tag: "LoginRequestSuccess" };
}

function LoginRequestFailure(error) {
  return { error, tag: "LoginRequestFailure" };
}

function LoginFormMsg(msg) {
  return { msg, tag: "LoginFormMsg" };
}

function update(msg, model) {
  switch (msg.tag) {
    case "Login":
      return {
        model,
        effect: login(model.loginForm.email, model.loginForm.password),
      };

    case "LoginRequestSuccess":
      return {
        model: assoc("apiUser", msg.response, model),
        effect: Effect.empty(),
      };

    case "LoginRequestFailure":
      return { model, effect: Effect.empty() };

    case "LoginFormMsg":
      return {
        model: assoc(
          "loginForm",
          LoginForm.update(msg.msg, model.loginForm).model,
          model
        ),
        effect: Effect.empty(),
      };

    default:
      return { model, effect: Effect.empty() };
  }
}

// -- EFFECTS

function login(email, password) {
  return Effect((done) => {
    setTimeout(() => {
      const msg = LoginRequestSuccess({ name: "Simon" });
      done(msg);
    }, 2000);
  });
}

// -- VIEW

function App(props) {
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
