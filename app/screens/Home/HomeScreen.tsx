/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC, useState, useEffect } from "react"
import { TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { ListItem, Screen, Text, Icon, Calender } from "../../components"
import { DemoTabScreenProps } from "../../navigators/DemoNavigator"
import { spacing, colors } from "../../theme"
import { isRTL } from "../../i18n"
import { Content, HeaderHome } from "./home"

const MemoizedHeader = React.memo(HeaderHome)
const MemoizedContent = React.memo(Content)

export const HomeScreen: FC<DemoTabScreenProps<"Home">> = function HomeScreen(_props) {
  return (
    <Screen preset="scroll" contentContainerStyle={$container} safeAreaEdges={["bottom", "top"]}>
      {/* Header */}
      <MemoizedHeader />
      <MemoizedContent />
    </Screen>
  )
}

const $container: ViewStyle = {
  paddingTop: spacing.small,
  paddingHorizontal: spacing.small,
}
