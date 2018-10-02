import { Msg, MsgConstructor } from "./msg";

type Updater = (msg: Msg) => void;
type UpdaterCache = Map<MsgConstructor, Map<Updater, Updater>>;

// Not using WeakMap because updaters and MsgConstructors are const globals
const updaterCache: UpdaterCache = new Map();

function getUpdaterMap(msg: MsgConstructor): Map<Updater, Updater> {
  let updaterMap = updaterCache.get(msg);

  if (updaterMap == null) {
    updaterCache.set(msg, updaterMap = new Map());
  }
  return updaterMap;
}

function updaterFor(updater: Updater, Msg: MsgConstructor): Updater {
  const updaterMap = getUpdaterMap(Msg);
  let cachedUpdater = updaterMap.get(updater);

  if (cachedUpdater == null) {
    updaterMap.set(updater, cachedUpdater = (childMsg) => updater(Msg(childMsg)));
  }
  return cachedUpdater;
}

export default updaterFor;
