/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC } from "react"
import { TextStyle, View, ViewStyle, Dimensions } from "react-native"
import { Text } from "."
import { spacing, colors } from "../theme"

import { Icon } from "./Icon"
import { ClockSVG, MenuBarSVG } from "./fileSVG"

export function StatisticalIndex({
  BMI,
  water,
  weightStatus,
  height,
  weight,
  dateForUpdateWeight,
}) {
  return (
    <>
      <View style={$wrapContent}>
        <View style={$contentHeader}>
          <Text preset="subheading" size="sm">
            Chỉ số khối cơ thể (BMI)
          </Text>
          <MenuBarSVG size={30} />
        </View>

        <View style={$contentContainer}>
          <View style={$wrapItem}>
            <View>
              <Text preset="default" size="sm">
                BMI
              </Text>
              <Text preset="subheading" size="sm" style={[$labelBodyIndex, $redText]}>
                {BMI}
              </Text>
            </View>
            <View style={{ justifyContent: "flex-end" }}>
              <View
                style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}
              >
                <ClockSVG size={12} />
                <Text preset="default" size="sm">
                  {dateForUpdateWeight}
                </Text>
              </View>
              <Text preset="subheading" size="sm" style={[$labelBodyIndex, $redText]}>
                Cập nhật cân nặng
              </Text>
            </View>
          </View>
          {/* Line */}
          <View
            style={{
              width: "100%",
              height: 10,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                width: "88%",
                borderBottomWidth: 2,
                borderBottomColor: "#cccccc",
                opacity: 0.6,
              }}
            />
          </View>

          <View style={$wrapItem}>
            <View>
              <Text preset="default" size="sm">
                {height} cm
              </Text>
              <Text preset="subheading" size="sm" style={$labelBodyIndex}>
                Chiều cao
              </Text>
            </View>
            <View style={{ justifyContent: "flex-end" }}>
              <Text preset="default" size="sm">
                {weight} kg
              </Text>
              <Text preset="subheading" size="sm" style={$labelBodyIndex}>
                {weightStatus}
              </Text>
            </View>
          </View>
        </View>
        <View style={$contentHeader}>
          <Text preset="subheading" size="sm">
            Bạn nên uống bao nhiêu nước
          </Text>
          <MenuBarSVG size={30} />
        </View>

        <View style={$contentContainer}>
          <View style={$wrapItem}>
            <View>
              <Text preset="subheading" size="xl" style={$redText}>
                {water} ml
              </Text>
              <Text preset="subheading" size="xs" style={$labelBodyIndex}>
                Lượng nước bạn cần uống
              </Text>
            </View>
          </View>
          {/* Line */}
          <View
            style={{
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                width: "88%",
                borderBottomWidth: 2,
                borderBottomColor: "#cccccc",
                opacity: 0.6,
              }}
            />
          </View>

          <View style={$wrapItem}>
            <View style={{ height: "100%", justifyContent: "space-evenly" }}>
              <Text preset="subheading" size="xs" style={[$labelBodyIndex, { marginLeft: 4 }]}>
                <ClockSVG size={12} /> Lần cuối cùng 12:45
              </Text>
              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Icon icon="bell" size={20} color={colors.bellColor} />
                <Text
                  preset="subheading"
                  size="xs"
                  style={{ color: colors.bellColor, marginLeft: 4 }}
                >
                  Tắt tính năng thông bao
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </>
  )
}
const $wrapContent: ViewStyle = {
  width: "100%",
  height: Dimensions.get("window").height - 60,
  alignItems: "center",
  justifyContent: "flex-start",
}
const $contentHeader: ViewStyle = {
  flexDirection: "row",
  height: Dimensions.get("window").height / 12 > 50 ? Dimensions.get("window").height / 10 : 60,
  padding: spacing.small,
  alignItems: "center",
  width: "94%",
  justifyContent: "space-between",
}

const $contentContainer: ViewStyle = {
  minHeight: 3 * 60,
  width: "90%",
  flex: 1,
  backgroundColor: "#ffffff",
  borderRadius: 8,
  padding: spacing.small,
  paddingHorizontal: spacing.large,
  paddingTop: spacing.extraLarge,
  marginBottom: spacing.tiny,
  borderTopRightRadius: 65,
  shadowColor: "#000000",
  shadowOffset: {
    width: 3,
    height: 3,
  },
  shadowOpacity: 0.25,
  shadowRadius: 4.59,
  elevation: 5,
  opacity: 0.9,
}

const $wrapItem: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  paddingHorizontal: spacing.small,
  paddingRight: spacing.extraLarge,
  alignItems: "center",
  width: "100%",
  height: "50%",
}

const $leftItemTop: ViewStyle = {
  justifyContent: "space-between",
  height: "76%",
}
const $rightItemTop: ViewStyle = {
  alignItems: "flex-end",
}
const $redText: TextStyle = {
  color: "#FF0000",
  fontWeight: "bold",
  opacity: 0.75,
}

const $labelBodyIndex: TextStyle = {
  color: "#000",
  fontWeight: "bold",
  opacity: 0.65,
  marginTop: spacing.tiny,
}
