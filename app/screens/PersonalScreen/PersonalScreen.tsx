/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC } from "react"
import { TextStyle, View, ViewStyle, useWindowDimensions, Dimensions } from "react-native"
import { ListItem, Screen, Text, TextField } from "../../components"
import { DemoTabScreenProps } from "../../navigators/DemoNavigator"
import { spacing, colors } from "../../theme"
import { isRTL } from "../../i18n"

import { Icon } from "../../components/Icon"
import { AvatarSVG, MenuBarSVG, ClockSVG } from "../../components/fileSVG"

export const PersonalScreen: FC<DemoTabScreenProps<"Personal">> = function PersonalScreen(_props) {
  return (
    <Screen preset="scroll" contentContainerStyle={$container} safeAreaEdges={["bottom", "top"]}>
      {/* Header */}
      <View style={$wrapHeader}>
        <View style={$avatar}>
          <AvatarSVG />
        </View>
        <Text preset="subheading" size="sm">
          4321vzd@gmail.com
        </Text>
      </View>
      <View style={$wrapContent}>
        <View style={$contentHeader}>
          <Text preset="subheading" size="sm">
            Chỉ số khối cơ thể (BMI)
          </Text>
          <MenuBarSVG size={30} />
        </View>

        <View style={$contentContainer}>
          <View style={$wrapItem}>
            <View style={$rightItemTop}>
              <Text preset="subheading" size="xl">
                BMI
              </Text>
              <Text preset="subheading" size="md" style={$redText}>
                20.4
              </Text>
            </View>
            <View style={$leftItemTop}>
              <Text preset="default" size="sm">
                <ClockSVG size={12} /> 6 tháng 5 - 17:56
              </Text>
              <Text preset="default" size="xxs" style={$redText}>
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
                160 cm
              </Text>
              <Text preset="subheading" size="sm" style={$labelBodyIndex}>
                Chiều cao
              </Text>
            </View>
            <View style={{ justifyContent: "flex-end" }}>
              <Text preset="default" size="sm">
                51 kg
              </Text>
              <Text preset="subheading" size="sm" style={$labelBodyIndex}>
                Thiếu cân
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
                2207ml
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
    </Screen>
  )
}

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

const $rightItemTop: ViewStyle = {
  justifyContent: "space-between",
  height: "76%",
}
const $leftItemTop: ViewStyle = {
  alignItems: "flex-end",
  justifyContent: "flex-end",
  height: "76%",
  opacity: 0.85,
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
