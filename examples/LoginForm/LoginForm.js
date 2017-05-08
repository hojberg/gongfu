import React from 'react';
import { assoc } from 'ramda';
import { Effect, ModelWithEffect } from '../../build/index';

// -- MODEL

function init() {
  return { email: '', password: '' };
}

// -- UPDATE

function UpdateEmail(password) {
  return { email, tag: 'UpdateEmail' };
}

function UpdatePassword(password) {
  return { password, tag: 'UpdatePassword' };
}

function update(msg, model) {
  switch (msg.tag) {
    case "UpdateEmail":
      return {
        model: assoc('email', msg.email, model),
        effect: Effect.none()
      };

    case "UpdatePassword":
      console.log('UpdatePassword');
      return {
        model: assoc('password', msg.password, model),
        effect: Effect.none()
      };

    default:
      return { model, effect: Effect.none() };
  }
}

// -- VIEW

function LoginForm(props) {
  const { updater, onLoginPress, model } = props;

  return (
    <div>
      <input
        value={model.email}
        onChange={(ev) => updater(UpdateEmail(ev.target.value))}/>
      <input
        value={model.password}
        onChange={(ev) => updater(UpdatePassword(ev.target.value))}/>
      <a onClick={onLoginPress} >Login</a>
    </div>
  );
}

export { LoginForm, update, init };
