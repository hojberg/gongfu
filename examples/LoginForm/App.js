import React from 'react';
import { assoc } from 'ramda';
import * as LoginForm from './LoginForm';
import { Effect, ModelWithEffect, updaterFor } from '../../build/index';

// -- MODEL

function init() {
  return {
    loginForm: LoginForm.init(),
    apiUser: null
  }
}

// -- UPDATE

function Login() {
  return { tag: 'Login' };
}

function LoginRequestSuccess(response) {
  return { response, tag: 'LoginRequestSuccess' };
}

function LoginRequestFailure(error) {
  return { error, tag: 'LoginRequestFailure' };
}

function LoginFormMsg(msg) {
  return { msg, tag: 'LoginFormMsg' };
}

function update(msg, model) {
  switch (msg.tag) {
    case "Login":
      return {
        model,
        effect: login(model.loginForm.email, model.loginForm.password)
      }

    case "LoginRequestSuccess":
      return {
        model: assoc('apiUser', msg.response, model),
        effect: Effect.none()
      }

    case "LoginRequestFailure":
      return { model, effect: Effect.none() };

    case "LoginFormMsg":
      return {
        model: assoc('loginForm', LoginForm.update(msg.msg, model.loginForm).model, model),
        effect: Effect.none()
      }

    default:
      return { model, effect: Effect.none() };
  }
}

// -- EFFECTS

function login(email, password) {
  return Effect.of(
    (done) => {
      setTimeout(() => {
        const msg = LoginRequestSuccess({name: 'Simon'});
        done(msg);
      }, 2000)
    }
  );
}


// -- VIEW

function App(props) {
  const { model, updater } = props
  const apiUser = model.apiUser ? model.apiUser.name : null;
  const loginFormUpdater = updaterFor(updater, LoginFormMsg);

  return (
    <div>
      <h1>{apiUser}</h1>
      <LoginForm.LoginForm
        updater={loginFormUpdater}
        model={model.loginForm}
        onLoginPress={() => updater(Login())} />
    </div>
  );
}

export { App, update, init };
