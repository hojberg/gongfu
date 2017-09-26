import React from "react";
import { assoc } from "ramda";
import * as LoginForm from "./LoginForm";
import { Effect, updaterFor } from "../../build/index";

// -- MODEL

function init() {
  const model = {
    loginForm: LoginForm.init(),
    apiUser: null
  };

  return [model, Effect.empty()];
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
      return [model, login(model.loginForm.email, model.loginForm.password)];

    case "LoginRequestSuccess":
      return [assoc("apiUser", msg.response, model), Effect.empty()];

    case "LoginRequestFailure":
      return [model, Effect.empty()];

    case "LoginFormMsg":
      return [
        assoc(
          "loginForm",
          LoginForm.update(msg.msg, model.loginForm).model,
          model
        ),
        Effect.empty()
      ];

    default:
      return [model, Effect.empty()];
  }
}

// -- EFFECTS

function login(email, password) {
  return Effect(done => {
    setTimeout(() => {
      const msg = LoginRequestSuccess({ name: "Simon" });
      done(msg);
    }, 2000);
  });
}

// -- VIEW

function App(props) {
  const { model, updater } = props;
  const apiUser = model.apiUser ? model.apiUser.name : null;
  const loginFormUpdater = updaterFor(updater, LoginFormMsg);

  return (
    <div>
      <h1>
        {apiUser}
      </h1>
      <LoginForm.LoginForm
        updater={loginFormUpdater}
        model={model.loginForm}
        onLoginPress={() => updater(Login())}
      />
    </div>
  );
}

export { App, update, init };
