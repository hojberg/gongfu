import * as React from "react";
import { Msg } from "./msg";
import Sub from "./sub";

type Cleanup = () => void;

interface IHaveModel {
  model: {};
  updater: (m: Msg) => void;
}

function withSubscriptions<Props extends IHaveModel>(
  UserComponent: React.ComponentType<Props>,
  subscriptions: (model: {}) => Sub
): React.ComponentType<Props> {
  return class WithSubscriptions extends React.Component<Props> {
    cleanup?: Cleanup;

    componentDidMount() {
      const sub = subscriptions(this.props.model);
      this.cleanup = sub.run(this.props.updater);
    }

    componentWillUnmount() {
      if (this.cleanup) {
        this.cleanup();
        delete this.cleanup;
      }
    }

    render() {
      return React.createElement(UserComponent, this.props);
    }
  };
}

export default withSubscriptions;