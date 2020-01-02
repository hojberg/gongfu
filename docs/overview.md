# Gongfu Overview

How changes are propagated:

```
                      ╭──────────────┆────╮
                      │              ┆    │
                      ▼              ┆    │
        ╔═════════════════════════╗  ┆    │
        ║ Restaurant              ║  ┆    │
  MODEL ║ ┌─────────────────────┐ ║  ┆    │
        ║ │ Checks              │ ║  ┆    │
        ║ │ ┌─────────────────┐ │ ║  ┆    │
        ║ │ │ Amount          │ │ ║  ┆    │
        ║ │ └─────────────────┘ │ ║  ┆    │
        ║ └─────────────────────┘ ║  ┆    │
        ╚═════════════●═══════════╝  ┆    │
                      │              ┆    │
        ╔═════════════▼═══════════╗  ┆    │
   VIEW ║ <App />                 ║  ┆    │
        ║ ┌─────────────────────┐ ║  ┆    │
        ║ │ <Checks />          │ ║  ┆    │
        ║ │ ┌─────────────────┐ │ ║  ┆    │
        ║ │ │ <CheckRow />    │ │ ║  ┆    │
        ║ │ └─────────────────┘ │ ║  ┆    │
        ║ └─────────────────────┘ ║  ┆    │
        ╚═════════════●═══════════╝  ┆    ╰──────────╮
                      │              ┆  ╔════════════●═╗
                     MSG◀────────────┆──║─────╮      │ ║ Gongfu
                      │              ┆  ║ ┌───●────┐ │ ║
        ╔═════════════▼═══════════╗  ┆  ║ │ Effect │ │ ║
 UPDATE ║ App.update              ║  ┆  ║ │ Runner │ │ ║
        ║ ┌─────────────────────┐ ║  ┆  ║ └───▲────┘ │ ║
        ║ │ Checks.update       │ ║  ┆  ╚═════│══════│═╝
        ║ │ ┌─────────────────┐ │ ║  ┆        ├──────╯
        ║ │ │ CheckRow.update │ │ ║  ┆        │
        ║ │ └─────────────────┘ │ ║  ┆        │
        ║ └─────────────────────┘ ║  ┆        │
        ╚═════════════●═══════════╝  ┆        │
                      ╰──────────────┆────────╯
```

## Subscriptions

Subscriptions allow a component to propagate external events as updates. In React terms, subscriptions are typically active
while the component is mounted. However it is possible to have subscriptions survive the component's lifetime.

This example shows how to implement the `subscriptions` function and bind it to the (View) component.
```

function subscriptions(model) {
      // This is called with the component's model state when it is being mounted
      return Sub((updater) => {
            const listener = SomeModule.addEventListener("locationChange", loc => updater(LocationChanged(loc)));
            // Return a function to invoke when the component is unmounted so we can cleanup the listener
            return function cleanup() {
                  SomeModule.removeEventListener("locationChange", listener);
            });
            // If you do not need to cleanup subscriptions, then a return value can be omitted.
      });
}

function MyComponent(props) {
      return <View>...</View>;
}

const Component = withSubscriptions(MyComponent, subscriptions);

export { Component, Model, init, update };

```