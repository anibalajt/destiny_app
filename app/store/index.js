import React, { Component, createContext } from "react";
import ActionTypes from "./actionTypes.js";
import { equipment } from "../inventory/equipment"
const { Provider, Consumer } = createContext();

const reducer = async (state, action) => {
  // console.log('reducer');
  switch (action.type) {
    case ActionTypes.GET_USER:
      return { user: { name: "Andres Jarava" } };
    case ActionTypes.ADD_AUTHORIZATION:
      return { authorization: action.text };
    case ActionTypes.ADD_MEMBERSHIPS:
      return { memberships: action.text };
    case ActionTypes.ADD_BUNGIENETUSER:
      return { bungieNetUser: action.text };
    case ActionTypes.ADD_CHARACTERS:
      return { characters: action.text };
    case ActionTypes.ADD_CHARACTERS_SELECTED:
      return { character_selected: action.text };
    case ActionTypes.ADD_EQUIPMENT:
      return { character_equipment: action.text };
    case ActionTypes.DATA_ACCOUNT:
      return { data_account: action.text };
    case ActionTypes.LOGOUT:
      return {
        authorization: {},
        memberships: {},
        bungieNetUser: {}
      };
    default:
      return null;
  }
};

class ContextStore extends Component {
  state = {
    user: {},
    authorization: {},
    memberships: {},
    bungieNetUser: {},
    characters: {},
    data_account: {},
    character_equipment: {
      equipment: [],
      other_equipment: []
    },
    character_selected: null,
    dispatch: async action => {
      // console.log('dispatch', action);
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