import expect from "expect.js";
import React from "react";
import TestRenderer from "react-test-renderer";
import Sub from "../dist/sub";
import withSubscriptions from "../dist/with_subs";

function MyComponent(props) {
  return React.createElement("span", {}, "Hello World");
}

describe("withSubscriptions", () => {
  let subscriptionsCalled = false;
  let stopSubscriptionsCalled = false;
  const model = {};

  function subscriptions(m) {
    return Sub(_ => {
      subscriptionsCalled = m === model;
      return function stop() {
        stopSubscriptionsCalled = true;
      }
    })
  }

  beforeEach(() => {
    subscriptionsCalled = false;
    stopSubscriptionsCalled = false;
  })

  it("calls subscriptions function in componentDidMount", () => {
    const Component = withSubscriptions(MyComponent, subscriptions);
    TestRenderer.create(React.createElement(Component, { model }));

    expect(subscriptionsCalled).to.be(true);
    expect(stopSubscriptionsCalled).to.be(false);
  });

  it("calls the function returned in componentWillUnmount", () => {
    const Component = withSubscriptions(MyComponent, subscriptions);
    const testRenderer = TestRenderer.create(React.createElement(Component, { model }));

    expect(subscriptionsCalled).to.be(true);

    testRenderer.unmount();
    expect(stopSubscriptionsCalled).to.be(true);
  })
});