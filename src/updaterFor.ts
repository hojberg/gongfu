import { curry } from 'ramda';

const updaterFor = curry((updater, Msg, msg) => {
  updater(Msg(msg));
});

export default updaterFor;
