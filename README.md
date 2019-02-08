# react-native-ios-keyboard-events

**A library to detect an iOS device's keyboard state.**

Especially useful if you need to detect a split keyboard on an iPad (so that you can make UI adjustments to accomodate it)

![GIF Demo of library](demo/library-demo.gif)

## Usage (tldr)

1. Install the library

```bash
npm install react-native-ios-keyboard-events
```

2. Create an `IOSKeyboardEvents` instance

```javascript
const IOSKbEvents = createIOSKeyboardEvents();
```

3. Listen to keyboard state changes 😀

```javascript
IOSKbEvents.addListener(
  "some-listener-name",
  (newKeyboardState, previousState) =>
    console.log(`transition: ${previousState} -> ${newKeyboardState}`),
);
```

4. Close it when you're done

```javascript
IOSKbEvents.close();
```

## API

### Constructor

#### `createIOSKeyboardEvents(options)`

Creates an `IOSKeyboardEvents` instance.

This method will attempt to detect the device model type by checking the device's window resolution (via `Dimensions.get`). It will error out if it is unable to find a matching device or if the library is run in a non-iOS device.

`options`:

- `keyboardEventDebounceTime`: (default: 100) Defines the time (in ms) to debounce sending updates to registered listeners. Increase to smoothen out keyboard state changes.

(Note: keyboard state changes may flicker on certain transitions eg. `CLOSED` -> `DOCKED`, due to the nature in which Apple sends out keyboard notifications and this library, in turn, interpreting the events)

- `deviceModel`: Passes in a manually-defined `IDeviceModel` object. Useful when using custom keyboards. (note: if supplied, platform check will be ignored)

### Instance Methods

#### `.addListener(listenerName: string, callback: (newKeyboardState, previousState) => void)`

Adds a listener to the `IOSKeyboardEvents` instance. Calls the callback on any keyboard state change.

Note: Adding a new listener will override any existing listeners with the same `listenerName`.

#### `.removeListener(listenerName: string)`

Removes the listener with the corresponding `listenerName`.

#### `.close()`

Gracefully closes the `IOSKeyboardEvents` instance by unsubscribing from keyboard events, listeners, and timers.

#### `.getKeyboardState()`

Returns the present keyboard state.

Possible states:

- `CLOSED`
- `MINIMIZED`
- `DOCKED`
- `UNDOCKED`
- `SPLIT`

#### `.getDeviceModelInformation()`

Returns the matched detected device. (or manually-defined `IDeviceModel` object)

## Compatibility

### Platform

- `iOS` only
- `React Native` >= 0.58.1

### Supported Devices

#### Phones

- iPhone 5s/SE
- iPhone 6/7/8
- iPhone 6/7/8 Plus
- iPhone X
- iPhone XS/XS Max
- iPhone XR

#### Tablets

- iPad (5th/6th generation)
- iPad Air/Air 2
- iPad Pro (9.7-inch)
- iPad Pro (10.5-inch)
- iPad Pro (11-inch)
- iPad Pro (12.9-inch) (1st/2nd/3rd generation)

## Contributing

Bugs? Feature requests? Clarifications? Raise an issue/PR :)
