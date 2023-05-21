/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC } from "react"
import { ViewStyle } from "react-native"
import { Screen } from "../../components"
import { DemoTabScreenProps } from "../../navigators/DemoNavigator"
import { spacing } from "../../theme"
import { Content, HeaderHome } from "./home"
import { useStores } from "../../models"

const MemoizedContent = React.memo(Content)

export const HomeScreen: FC<DemoTabScreenProps<"Home">> = function HomeScreen(_props) {
  const {
    bodyIndexStore: { getBodyIndex },
  } = useStores()
  const bodyIndx = getBodyIndex()
  return (
    <Screen preset="scroll" contentContainerStyle={$container} safeAreaEdges={["bottom", "top"]}>
      {/* Header */}
      <HeaderHome calorPerDay={bodyIndx.calorPerDay} />
      <MemoizedContent waterPerDay={bodyIndx.water} />
    </Screen>
  )
}

const $container: ViewStyle = {
  paddingTop: spacing.small,
  paddingHorizontal: spacing.small,
}
