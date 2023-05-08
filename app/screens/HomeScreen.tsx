/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC } from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { ListItem, Screen, Text, Icon } from "../components"
import { DemoTabScreenProps } from "../navigators/DemoNavigator"
import { spacing, colors } from "../theme"
import { isRTL } from "../i18n"
import DonutChart from "../components/DonutChart"
import GlassWater from "../components/fileSVG/GlassSVG"
import CalenderSVG from "../components/fileSVG/CalenderSVG"

import LineChartComponent from "../components/LineChart"
export const HomeScreen: FC<DemoTabScreenProps<"Home">> = function HomeScreen(_props) {
  return (
    <Screen preset="scroll" contentContainerStyle={$container} safeAreaEdges={["bottom", "top"]}>
      {/* Header */}
      <View style={$wrapHeader}>
        <View style={$header}>
          <View style={$day}>
            <Text preset="subheading" size="xl">
              Hôm nay
            </Text>
          </View>
          <View style={$calender}>
            <Icon icon="caretLeft" color={colors.mainText} size={30} />
            <CalenderSVG size={20} />
            <Text preset="default" size="md">
              5 thg 5
            </Text>
            <Icon icon="caretRight" color={colors.mainText} size={30} />
          </View>
        </View>
        {/* Line */}
        <View
          style={{
            width: "74%",
            borderBottomWidth: 2,
            borderBottomColor: "#143d54",
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
          <DonutChart radius={84} color="#FEC23E" />
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
      {/*  */}
      <View style={$wrapContent}>
        <View style={$wrapTitle}>
          <View style={$titleText}>
            <Text preset="subheading" size="sm">
              Bạn đã uống bao nhiêu nước
            </Text>
          </View>
          <View>
            <Text
              preset="subheading"
              size="sm"
              style={{
                color: "#FEC23E",
                textDecorationLine: "underline",
                textDecorationStyle: "dotted",
              }}
            >
              1000/2013ml
            </Text>
          </View>
        </View>
        <View style={$wrapContainer}>
          <GlassWater isFull={true} />
          <GlassWater isFull={true} />
          <GlassWater isFull={true} />
          <GlassWater isFull={false} />
          <GlassWater isFull={false} />
          <GlassWater isFull={false} />
          <GlassWater isFull={false} />
          <GlassWater isFull={false} />
          <GlassWater isFull={false} />
        </View>
      </View>
      <View style={$wrapContent}>
        <View style={$wrapTitle}>
          <View style={$titleText}>
            <Text preset="subheading" size="sm">
              Mục tiêu cân nặng
            </Text>
          </View>
          <View>
            <Text
              preset="subheading"
              size="sm"
              style={{
                color: "#FEC23E",
                textDecorationLine: "underline",
                textDecorationStyle: "dotted",
              }}
            >
              60kg
            </Text>
          </View>
        </View>
        <View style={$wrapChart}>
          <LineChartComponent />
        </View>
      </View>
    </Screen>
  )
}

const $container: ViewStyle = {
  paddingTop: spacing.small,
  paddingHorizontal: spacing.small,
}
// Header CSS
const $wrapHeader: ViewStyle = {
  flex: 1,
  flexDirection: "column",
  justifyContent: "space-between",
  marginBottom: spacing.medium,
  alignItems: "center",
  padding: spacing.large + spacing.extraSmall,
  paddingHorizontal: spacing.extraSmall,
  backgroundColor: "#FFFFFF",
  borderRadius: 28,
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

// Content CSS
const $wrapContent: ViewStyle = {
  flex: 1,
  flexDirection: "column",
  justifyContent: "space-between",
  marginBottom: spacing.extraSmall,
  padding: spacing.large,
  backgroundColor: "#FFFFFF",
  borderRadius: 28,
}

const $wrapTitle: ViewStyle = {
  flex: 1,
  flexDirection: "row",
  justifyContent: "space-between",
}
const $wrapContainer: ViewStyle = {
  flex: 1,
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  marginTop: 16,
  width: "100%",
}
const $wrapChart: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  marginTop: 16,
}
const $titleText: ViewStyle = {
  width: "60%",
}
