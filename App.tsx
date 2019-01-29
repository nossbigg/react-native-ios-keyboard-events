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
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Text
} from "react-native";
import IOSKeyboardEvents from "./src/IOSKeyboardEvents";
import { KeyboardState } from "./src/keyboardTransitions";

interface Props {}

interface State {
  currentKeyboardState: KeyboardState;
}

export default class App extends React.Component<Props, State> {
  IOSKeyboardEventsListener = new IOSKeyboardEvents();

  constructor(props: Props) {
    super(props);
    this.state = {
      currentKeyboardState: "CLOSED"
    };
  }

  componentDidMount() {
    this.IOSKeyboardEventsListener.addListener(
      "keyboardListener",
      (previousState, currentKeyboardState) => {
        console.log("change", previousState, currentKeyboardState);
        this.setState({ currentKeyboardState });
      }
    );
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <TextInput placeholder="Type here!" style={styles.textInput} />
        <Text>Current Keyboard State: {this.state.currentKeyboardState}</Text>
      </KeyboardAvoidingView>
    );
  }

  componentWillUnmount() {
    this.IOSKeyboardEventsListener.close();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white"
  },
  textInput: {
    borderWidth: 1,
    width: "90%",
    borderRadius: 5,
    padding: 10
  }
});
