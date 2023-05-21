// This is the entry point if you run `yarn expo:start`
// If you run `yarn ios` or `yarn android`, it'll use ./index.js instead.
import App from "./app/app.tsx"
import React from "react"
import { registerRootComponent } from "expo"
import * as SplashScreen from "expo-splash-screen"
import { GestureHandlerRootView } from "react-native-gesture-handler"
SplashScreen.preventAutoHideAsync()

function IgniteApp() {
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <GestureHandlerRootView style={{ flex: 1 }}>
      <App hideSplashScreen={SplashScreen.hideAsync} />
    </GestureHandlerRootView>
  )
}

registerRootComponent(IgniteApp)
export default IgniteApp
