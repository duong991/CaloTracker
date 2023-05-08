/* eslint-disable @typescript-eslint/no-unused-vars */
import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { Image, ImageStyle, ViewStyle, Dimensions, View } from "react-native"
import { Button, Icon, Screen } from "../components"
import { AppStackScreenProps } from "../navigators"
import { spacing } from "../theme"
import { useHeader } from "../utils/useHeader" // @demo remove-current-line

interface StartScreenProps extends AppStackScreenProps<"Start"> {}

export const StartScreen: FC<StartScreenProps> = observer(function StartScreen(_props) {
  const { navigation } = _props
  const loginLogo = require("../../assets/images/logo-2.png")
  const backgroundImage = require("../../assets/images/Background_2.jpg")
  function goRegister() {
    navigation.navigate("Register")
  }
  function goToLogin() {
    navigation.navigate("Register")
  }
  useHeader({
    rightTx: "common.signIn",
    leftIcon: "back",
    onLeftPress: goToLogin,
    onRightPress: goRegister,
  })
  return (
    <Screen
      preset="auto"
      contentContainerStyle={$screenContentContainer}
      safeAreaEdges={["top", "bottom"]}
    >
      <Image style={$loginLogo} source={loginLogo} resizeMode="contain" />
      <View></View>
      {/* <Image style={$backgroundImage} source={backgroundImage} resizeMode="stretch" /> */}
    </Screen>
  )
})

const $screenContentContainer: ViewStyle = {
  paddingVertical: spacing.huge,
}

const $loginLogo: ImageStyle = {
  height: 150,
  width: "100%",
  marginBottom: spacing.large,
}
const $backgroundImage: ImageStyle = {
  height: 250,
  width: Dimensions.get("window").width,
  marginBottom: spacing.large,
}
// @demo remove-file
