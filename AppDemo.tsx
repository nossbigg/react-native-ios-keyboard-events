/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/emin93/react-native-template-typescript
 *
 */

import React from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
} from "react-native";
import createIOSKeyboardEvents from "./src/IOSKeyboardEvents";
import { KeyboardState } from "./src/keyboardTransitions";

interface IState {
  currentKeyboardState: KeyboardState;
}

export default class AppDemo extends React.Component<{}, IState> {
  private IOSKbEvents = createIOSKeyboardEvents({
    keyboardEventDebounceTime: 50,
  });

  constructor(props: {}) {
    super(props);
    this.state = {
      currentKeyboardState: this.IOSKbEvents.getKeyboardState(),
    };
  }

  public render() {
    return (
      <KeyboardAvoidingView
        behavior="padding"
        style={styles.container}
        enabled={this.state.currentKeyboardState !== "SPLIT"}
      >
        <TextInput placeholder="Type here!" style={styles.textInput} />
        <Text style={{ fontSize: 18 }}>Current Keyboard State:</Text>
        <Text style={{ fontSize: 64 }}>{this.state.currentKeyboardState}</Text>
      </KeyboardAvoidingView>
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  textInput: {
    borderWidth: 1,
    width: "30%",
    borderRadius: 5,
    marginBottom: 10,
    padding: 10,
  },
});
