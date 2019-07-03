import React from "react";
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
): React.ComponentClass<Props> {

  return class GongfuWithSubs extends React.Component<Props> {
    cleanup?: Cleanup;

    componentDidMount() {
      const sub = subscriptions(this.props.model);
      sub.run(this.props.updater, this.onCleanup.bind(this));
    }

    componentWillUnmount() {
      if (this.cleanup) {
        this.cleanup();
        delete this.cleanup;
      }
    }

    onCleanup(cleanup: Cleanup) {
      this.cleanup = cleanup;
    }

    render() {
      return React.createElement(UserComponent as any, this.props);
    }
  };
}

export default withSubscriptions;