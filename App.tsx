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
  enabledAvoidingView: boolean;
}

export default class App extends React.Component<{}, IState> {
  public IOSKeyboardEventsListener = createIOSKeyboardEvents({
    keyboardEventDebounceTime: 50,
  });

  constructor(props: {}) {
    super(props);
    this.state = {
      currentKeyboardState: "CLOSED",
      enabledAvoidingView: true,
    };
  }

  public render() {
    return (
      <KeyboardAvoidingView
        behavior="padding"
        style={styles.container}
        enabled={this.state.enabledAvoidingView}
      >
        <TextInput placeholder="Type here!" style={styles.textInput} />
        <Text>Current Keyboard State:</Text>
        <Text style={{ fontSize: 24 }}>{this.state.currentKeyboardState}</Text>
      </KeyboardAvoidingView>
    );
  }

  public componentDidMount() {
    this.IOSKeyboardEventsListener.addListener(
      "keyboardListener",
      (newKeyboardState, previousState) => {
        console.log(`state change: ${previousState} -> ${newKeyboardState}`);
        const enabledAvoidingView = newKeyboardState !== "SPLIT";
        this.setState({
          currentKeyboardState: newKeyboardState,
          enabledAvoidingView,
        });
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
    width: "30%",
    borderRadius: 5,
    marginBottom: 10,
    padding: 10,
  },
});
