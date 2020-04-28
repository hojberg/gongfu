import React from "react";
import ReactDOM from "react-dom";
import { App, update, init } from "./App";
import { Program } from "../../build/src/index";

ReactDOM.render(
  <Program Component={App} update={update} init={init} />,
  document.querySelector("main")
);
