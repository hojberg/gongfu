import React from "react";

interface Model {}

interface MsgPattern<T> {
  Foo: (x: number) => T;
  Bar: (y: string) => T;
  Baz: (z: boolean) => T;
  Beep: (a: Date, b: number, c: string) => T;
}

interface MsgMatcher<T> {
  match(p: MsgPattern<ModelWithEffect<T>>): ModelWithEffect<T>;
}

interface Foo extends MsgMatcher<Model> {}
function Foo(x: number): Foo {
  return {
    match: (p: MsgPattern<ModelWithEffect<Model>>) => p.Foo(x)
  };
}
interface Bar extends MsgMatcher<Model> {}
function Bar(x: string): Bar {
  return {
    match: (p: MsgPattern<ModelWithEffect<Model>>) => p.Bar(x)
  };
}

class Baz implements MsgMatcher<Model> {
  constructor(private z: boolean) {}

  match(p: MsgPattern<ModelWithEffect<Model>>): ModelWithEffect<Model> {
    return p.Baz(this.z);
  }
}

function msgCreator<T, A, B, C>(msgName: string) {
  return (a: A, b: B, c: C) => {
    return {
      match(p: MsgPattern<ModelWithEffect<T>>): ModelWithEffect<T> {
        return p[msgName](a, b, c);
      }
    };
  };
}

interface Beep extends MsgMatcher<Model> {
  a: Date;
}
const Beep = msgCreator<Model, number, boolean, number>("Beep");

type Msg = Foo | Bar | Baz | Beep;

function update(msg: Msg, model: Model): ModelWithEffect<Model> {
  return msg.match({
    Foo: (x: number) => ({ model, effect: Effect.empty() }),
    Bar: (y: string) => ({ model, effect: Effect.empty() }),
    Baz: (z: boolean) => ({ model, effect: Effect.empty() }),
    Beep: (a: Date, b: number, c: string) => ({ model, effect: Effect.empty() })
  });
}

export { Check, update, Msg, Model };
