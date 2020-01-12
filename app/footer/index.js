import React, { Fragment } from "react";
import { StyleSheet, View, Dimensions, TouchableHighlight } from "react-native";
import { ActionTypes } from "../store/index";

const { width } = Dimensions.get("window");
import Emblem from "./emblem";
import Vault from "./vault";

const onChangeCharacter = async (dispatch, characterId) => {
  await dispatch({ type: ActionTypes.ADD_CHARACTERS_SELECTED, text: characterId });
}

const Footer = ({
  characterSelect = null,
  characters = [],
  vault = false,
  menubar = false,
  dispatch
}) => {
  return (
    <View style={[styles.container]}>
      <View
        style={[
          styles.characters,
          Object.keys(characters).length > 1 && { justifyContent: "space-between" }
        ]}
      >
        {Object.keys(characters).map((character, key) => (
          <TouchableHighlight
            key={key}
            underlayColor="#272C30"
            style={[
              characterSelect == characters[character].characterId &&
              !vault && {
                backgroundColor: "#272C30"
              }
            ]}
            onPress={e => onChangeCharacter(dispatch, characters[character].characterId)}
          >
            <Fragment>
              <Emblem character={characters[character]} />
            </Fragment>
          </TouchableHighlight>
        ))}
        <TouchableHighlight
          underlayColor="#272C30"
          style={[
            vault && {
              backgroundColor: "#272C30"
            }
          ]}
          onPress={e => onChangeCharacter(dispatch, "vault")}
        >
          <Vault />
        </TouchableHighlight>
      </View>
      <TouchableHighlight
        underlayColor="#272C30"
        style={[
          {
            width: 80,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
          },
          menubar && {
            backgroundColor: "#272C30"
          }
        ]}
        onPress={e =>
          onChangeCharacter(
            !characterSelect && !vault
              ? "vault"
              : characterSelect && !vault && menubar
                ? characterSelect
                : "menubar"
          )
        }
      >
        <Fragment>
          <View style={[styles.line]} />
          <View style={[styles.line]} />
          <View style={[styles.line]} />
        </Fragment>
      </TouchableHighlight>
    </View>
  );
};

export default Footer

const styles = StyleSheet.create({
  container: {
    elevation: 3,
    width,
    backgroundColor: "#12171c",
    height: 65,
    flexDirection: "row"
  },
  line: {
    backgroundColor: "#fff",
    width: 35,
    height: 4,
    marginVertical: 4,
    borderRadius: 3
  },
  characters: {
    flex: 1,
    width: width - 100,
    justifyContent: "space-evenly",
    flexDirection: "row"
  }
});
