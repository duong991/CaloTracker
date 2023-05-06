/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC } from "react"
import { Image, ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { ListItem, Screen, Text } from "../components"
import { DemoTabScreenProps } from "../navigators/DemoNavigator"
import { spacing } from "../theme"
import { isRTL } from "../i18n"
import DonutChart from "../components/DonutChart"
import { colors } from "../theme/colors"
export const HomeScreen: FC<DemoTabScreenProps<"Home">> = function HomeScreen(_props) {
  return (
    <Screen preset="scroll" contentContainerStyle={$container} safeAreaEdges={["bottom"]}>
      {/* Header */}
      <View style={$wrapHeader}>
        <View style={$header}>
          <View style={$day}>
            <Text preset="subheading" size="xxl">
              Hôm nay
            </Text>
          </View>
          <View style={$calender}>
            <Text preset="default" size="md">
              5 thg 5
            </Text>
          </View>
        </View>
        {/* Line */}
        <View
          style={{
            width: "80%",
            borderBottomWidth: 2,
            borderBottomColor: "#020203",
            marginBottom: 10,
            marginTop: -12,
            opacity: 0.5,
          }}
        />
        {/* Calories */}
        <View style={$calories}>
          <View>
            <Text preset="subheading" size="md" style={$textCenter}>
              1500
            </Text>
            <Text preset="default" size="xs">
              Đã nạp
            </Text>
          </View>
          <DonutChart radius={84} color="#FEC23E" textColor="#020203" />
          <View>
            <Text preset="subheading" size="md" style={$textCenter}>
              1500
            </Text>
            <Text preset="default" size="xs">
              Tiêu hao
            </Text>
          </View>
        </View>
      </View>
      {/* Content */}
      <View style={$wrapContent}>
        <View style={$waterLogContainer}>
          <View style={$waterLogTitle}>
            <View style={$wlTitleText}>
              <Text preset="subheading" size="sm">
                Bạn đã uống bao nhiêu nước
              </Text>
            </View>
            <View>
              <Text preset="default" size="sm" style={{ color: "#FEC23E" }}>
                1000/2013ml
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Screen>
  )
}

const $container: ViewStyle = {
  paddingTop: spacing.large,
  paddingHorizontal: spacing.extraSmall,
}
const $wrapHeader: ViewStyle = {
  flex: 1,
  flexDirection: "column",
  justifyContent: "space-between",
  marginBottom: spacing.medium,
  alignItems: "center",
  padding: spacing.large + spacing.extraSmall,
  paddingHorizontal: spacing.extraSmall,
  backgroundColor: "#FFFFFF",
  borderRadius: 40,
}
const $header: ViewStyle = {
  flex: 1,
  flexDirection: "row",
  justifyContent: "space-between",
  marginBottom: spacing.medium + spacing.extraSmall,
  alignItems: "center",
  paddingHorizontal: spacing.extraSmall,
}

const $day: ViewStyle = {
  flex: 1,
}

const $calender: ViewStyle = {
  flexDirection: "row",
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
}

const $calories: ViewStyle = {
  flex: 1,
  width: "100%",
  flexDirection: "row",
  justifyContent: "space-evenly",
  alignItems: "center",
}

const $textCenter: TextStyle = {
  textAlign: "center",
}

const $wrapContent: ViewStyle = {
  flex: 1,
  flexDirection: "column",
  justifyContent: "space-between",
  marginBottom: spacing.medium,
  padding: spacing.large + spacing.extraSmall,

  backgroundColor: "#FFFFFF",
  borderRadius: 40,
}

const $waterLogContainer: ViewStyle = {
  flex: 1,
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
}

const $waterLogTitle: ViewStyle = {
  flex: 1,
  flexDirection: "row",
  justifyContent: "space-evenly",
}

const $wlTitleText: ViewStyle = {
  flex: 1,
}
