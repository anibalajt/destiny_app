import React, { Component, createContext } from "react";
import ActionTypes from "./actionTypes.js";
const { Provider, Consumer } = createContext();

const reducer = async (state, action) => {
  console.log('reducer');
  switch (action.type) {
    case ActionTypes.GET_USER:
      return { user: { name: "Andres Jarava" } };
    case ActionTypes.ADD_AUTHORIZATION:
      return { authorization: action.text };
    case ActionTypes.ADD_MEMBERSHIPS:
      return { destinyMemberships: action.text };
    case ActionTypes.ADD_BUNGIENETUSER:
      return { bungieNetUser: action.text };
    default:
      return null;
  }
};

class ContextStore extends Component {
  state = {
    user: {},
    authorization: {},
    destinyMemberships: [],
    bungieNetUser: {},
    dispatch: async action => {
      console.log('dispatch', action);
      const response = await reducer(this.state, action);

      return this.setState(response, () => true);
    }
  };
  render() {
    const { store } = this.props;
    const { dispatch } = this.state;

    return (
      <Provider
        value={store ? { [store]: this.state[store], dispatch } : this.state}
      >
        {this.props.component}
      </Provider>
    );
  }
}
const WrapperConsumer = Component => {
  return props => {
    return (
      <Consumer>
        {context => <Component {...props} context={context} />}
      </Consumer>
    );
  };
};
export default WrapperConsumer;
export { ActionTypes };
export { ContextStore };