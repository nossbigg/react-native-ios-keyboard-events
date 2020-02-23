/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/emin93/react-native-template-typescript
 *
 */

import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import createIOSKeyboardEvents from "./src/IOSKeyboardEvents";
import { KeyboardState } from "./src/keyboardTransitions";

interface IState {
  currentKeyboardState: KeyboardState;
}

export default class AppDemo extends React.Component<{}, IState> {
  private IOSKbEvents = createIOSKeyboardEvents({
    keyboardEventDebounceTime: 100,
  });

  constructor(props: {}) {
    super(props);
    this.state = {
      currentKeyboardState: this.IOSKbEvents.getKeyboardState(),
    };
  }

  public render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>
            <Text>Current State: </Text>
            <Text style={{ fontWeight: "bold" }}>
              {this.state.currentKeyboardState}
            </Text>
          </Text>
        </View>
        <View>
          <TextInput
            placeholder="Type here!"
            style={styles.textInput}
            autoFocus
          />
        </View>
      </View>
    );
  }

  public componentDidMount() {
    this.IOSKbEvents.addListener(
      "keyboardListener",
      (newKeyboardState, previousState) => {
        console.log(`state change: ${previousState} -> ${newKeyboardState}`);
        this.setState({
          currentKeyboardState: newKeyboardState,
        });
      },
    );
  }

  public componentWillUnmount() {
    this.IOSKbEvents.close();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "white",
    paddingTop: 50,
  },
  title: {
    fontSize: 20,
  },
  textInput: {
    borderWidth: 1,
    width: 200,
    borderRadius: 5,
    marginRight: 5,
    padding: 10,
  },
});
