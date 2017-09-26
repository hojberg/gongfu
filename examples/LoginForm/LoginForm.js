import React from "react";
import { assoc } from "ramda";
import { Effect } from "../../build/index";

// -- MODEL

function init() {
  return { email: "", password: "" };
}

// -- UPDATE

function UpdateEmail(email) {
  return { email, tag: "UpdateEmail" };
}

function UpdatePassword(password) {
  return { password, tag: "UpdatePassword" };
}

function update(msg, model) {
  switch (msg.tag) {
    case "UpdateEmail":
      return [assoc("email", msg.email, model), Effect.empty()];

    case "UpdatePassword":
      console.log("UpdatePassword");
      return [assoc("password", msg.password, model), Effect.empty()];

    default:
      return [model, Effect.empty()];
  }
}

// -- VIEW

function LoginForm(props) {
  const { updater, onLoginPress, model } = props;

  return (
    <div>
      <input
        value={model.email}
        onChange={ev => updater(UpdateEmail(ev.target.value))}
      />
      <input
        value={model.password}
        onChange={ev => updater(UpdatePassword(ev.target.value))}
      />
      <a onClick={onLoginPress}>Login</a>
    </div>
  );
}

export { LoginForm, update, init };
