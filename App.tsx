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

export default class App extends React.Component<{}, IState> {
  public IOSKeyboardEventsListener = createIOSKeyboardEvents();

  constructor(props: {}) {
    super(props);
    this.state = {
      currentKeyboardState: "CLOSED",
    };
  }

  public render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <TextInput placeholder="Type here!" style={styles.textInput} />
        <Text>Current Keyboard State: {this.state.currentKeyboardState}</Text>
      </KeyboardAvoidingView>
    );
  }

  public componentDidMount() {
    this.IOSKeyboardEventsListener.addListener(
      "keyboardListener",
      (newKeyboardState, previousState) => {
        console.log(`state change: ${previousState} -> ${newKeyboardState}`);
        this.setState({ currentKeyboardState: newKeyboardState });
      },
    );
  }

  public componentWillUnmount() {
    this.IOSKeyboardEventsListener.close();
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
    width: "90%",
    borderRadius: 5,
    padding: 10,
  },
});
