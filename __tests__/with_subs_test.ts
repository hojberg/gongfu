import * as React from "react";
import * as TestRenderer from "react-test-renderer";
import Sub from "../src/sub";
import withSubscriptions from "../src/with_subs";

function MyComponent(_props) {
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
      };
    });
  }

  beforeEach(() => {
    subscriptionsCalled = false;
    stopSubscriptionsCalled = false;
  });

  it("calls subscriptions function in componentDidMount", () => {
    const Component = withSubscriptions(MyComponent, subscriptions);
    TestRenderer.create(React.createElement(Component, { model }));

    expect(subscriptionsCalled).toBe(true);
    expect(stopSubscriptionsCalled).toBe(false);
  });

  it("calls the function returned in componentWillUnmount", () => {
    const Component = withSubscriptions(MyComponent, subscriptions);
    const testRenderer = TestRenderer.create(
      React.createElement(Component, { model })
    );

    expect(subscriptionsCalled).toBe(true);

    testRenderer.unmount();
    expect(stopSubscriptionsCalled).toBe(true);
  });
});

