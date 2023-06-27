/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { TextStyle, View, ViewStyle, useWindowDimensions, Dimensions } from "react-native"
import { ListItem, Screen, Text, TextField, StatisticalIndex } from "../../components"
import { DemoTabScreenProps } from "../../navigators/DemoNavigator"
import { spacing, colors } from "../../theme"

import { AvatarSVG, MenuBarSVG, ClockSVG } from "../../components/fileSVG"
import { useStores } from "app/models"

export const PersonalScreen: FC<DemoTabScreenProps<"Personal">> = observer(function PersonalScreen(
  _props,
) {
  const {
    userInfoStore: { getUserInfo, getUserInfoForUpdate },
    bodyIndexStore: { getBodyIndex, setCalorPerDay },
    authenticationStore: { authEmail, allInfo },
  } = useStores()

  const userInfo = getUserInfo()
  const userInfoForUpdate = getUserInfoForUpdate()
  const bodyIndex = getBodyIndex()
  return (
    <Screen preset="scroll" contentContainerStyle={$container} safeAreaEdges={["bottom", "top"]}>
      {/* Header */}
      <View style={$wrapHeader}>
        <View style={$avatar}>
          <AvatarSVG />
        </View>
        <Text preset="subheading" size="sm">
          {authEmail}
        </Text>
      </View>
      {/* Content */}
      <StatisticalIndex
        BMI={bodyIndex.BMI}
        water={bodyIndex.water}
        weightStatus={bodyIndex.weightStatus}
        height={userInfo.height}
        weight={userInfo.weight}
        dateForUpdateWeight={userInfo.dateForUpdateWeight}
      />
    </Screen>
  )
})

const $container: ViewStyle = {
  paddingTop: spacing.tiny,
  paddingHorizontal: spacing.tiny,
}
// Header CSS
const $wrapHeader: ViewStyle = {
  flex: 1,
  height: Dimensions.get("window").height / 12 > 50 ? Dimensions.get("window").height / 10 : 60,
  flexDirection: "row",
  marginBottom: spacing.tiny,
  padding: spacing.small,
  backgroundColor: "#FEC23E",
  borderRadius: 8,
  alignItems: "center",
  justifyContent: "flex-start",
}

const $avatar: ViewStyle = {
  width: 50,
  height: 50,
  backgroundColor: "#ffffff",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: 50,
  marginRight: spacing.large,
}
