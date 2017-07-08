import React from "react";
import { Maybe } from "ramda-fantasy";
import { View, Text } from "react-native";
import { Effect, ModelWithEffect } from "../lib/oolong";
import { restaurantChangeEffect, Change } from "../helpers/state";
import Button from "./button";

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

interface Check {}

/*













interface Model {}

interface Check {
  id: string;
}
interface Item {}

interface AddItem {
  tag: "AddItem";
  check: Check;
  item: Item;
}
function AddItem(check: Check, item: Item): AddItem {
  return { tag: "AddItem", check: check, item: item };
}

interface NoOp {
  tag: "NoOp";
}
function NoOp(): NoOp {
  return { tag: "NoOp" };
}

type Msg = AddItem | NoOp;

function update(msg: Msg, model: Model): ModelWithEffect<Model> {
  switch (msg.tag) {
    case "AddItem":
      return {
        model: model,
        effect: restaurantChangeEffect(NoOp, {
          path: `checks.${msg.check.id}.items`,
          action: "add",
          value: msg.item
        })
      };
    case "NoOp":
    default:
      return { model, effect: Effect.empty() };
  }
}

interface CheckProps {
  model: Model;
  updater: (msg: Msg) => void;
  check: Check;
}

function Check(props: CheckProps): React.ReactElement<any> {
  const { model, updater, check } = props;
  const item = {
    name: "MY ITEM"
  };

  return (
    <View>
      <Text>Check</Text>
      <Button onPress={() => updater(AddItem(check, item))}>
        Add item to Check
      </Button>
    </View>
  );
}
*/
export { Check, update, Msg, Model };
