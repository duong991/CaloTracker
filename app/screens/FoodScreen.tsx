/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC } from "react"
import { TextStyle, View, ViewStyle, useWindowDimensions, Dimensions } from "react-native"
import { ListItem, Screen, Text, TextField } from "../components"
import { DemoTabScreenProps } from "../navigators/DemoNavigator"
import { spacing, colors } from "../theme"
import { isRTL } from "../i18n"
import BulbSVG from "../components/fileSVG/BulbSVG"
import PlusSVG from "../components/fileSVG/PlusSVG"
import SearchSVG from "../components/fileSVG/SearchSVG"
import { Icon } from "../components/Icon"

export const FoodScreen: FC<DemoTabScreenProps<"Food">> = function FoodScreen(_props) {
  return (
    <Screen preset="scroll" contentContainerStyle={$container} safeAreaEdges={["bottom", "top"]}>
      {/* Header */}
      <View style={$wrapHeader}>
        <Text preset="heading" size="xl" style={$textHeader}>
          Món ăn của riêng bạn
        </Text>
        <View style={$wrapInput}>
          <View style={$search}>
            <TextField
              // value={authEmail}
              // onChangeText={setAuthEmail}
              autoCapitalize="none"
              autoComplete="off"
              autoCorrect={false}
              keyboardType="default"
              placeholder="Tìm kiếm"
              // onSubmitEditing={() => authPasswordInput.current?.focus()}
            />
          </View>

          <View style={$buttonOfSearchInput}>
            <SearchSVG size={20} />
          </View>
          <View style={$buttonOfSearchInput}>
            <PlusSVG size={20} />
          </View>
        </View>
      </View>
      {/*  ContentHeader */}
      <View style={$wrapContentHeader}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            borderRightWidth: 1,
            borderColor: "rgba(79, 94, 79, 0.33) ",
          }}
        >
          <Text preset="subheading" size="md" style={$textHeader}>
            Thực phẩm
          </Text>
        </View>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text preset="subheading" size="md" style={$textHeader}>
            Món ăn
          </Text>
        </View>
      </View>

      <View style={$wrapContentContainer}>
        <View style={$tip}>
          <BulbSVG width={90} />
          <Text preset="subheading" size="md" style={$textHeader}>
            Có thể bạn chưa biết
          </Text>
        </View>
        <View style={$add}>
          <View style={$wrapIcon}>
            <PlusSVG size={20} />
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
  height: Dimensions.get("window").height / 5,
  flexDirection: "column",
  marginBottom: spacing.tiny,
  padding: spacing.small,
  backgroundColor: "#FEC23E",
  borderRadius: 8,
}
const $textHeader: TextStyle = {
  color: "#143d54",
  opacity: 0.8,
}

const $wrapInput: ViewStyle = {
  flex: 1,
  flexDirection: "row",
  marginTop: spacing.small + (Dimensions.get("window").height / 5) * 0.1,
}

const $search: ViewStyle = {
  flex: 1,
  marginRight: spacing.extraSmall,
}
const $buttonOfSearchInput: ViewStyle = {
  width: 52,
  height: 52,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#FFFFFF",
  borderRadius: 45,
  marginStart: spacing.extraSmall,
  borderWidth: 1,
  borderColor: colors.palette.neutral400,
}
// Content CSS
const $wrapContentHeader: ViewStyle = {
  flex: 1,
  flexDirection: "row",
  justifyContent: "space-between",
  height: Dimensions.get("window").height / 16,
  backgroundColor: "#FFFFFF",
  borderRadius: 8,
}

const $wrapContentContainer: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  height:
    Dimensions.get("window").height -
    (Dimensions.get("window").height / 5 +
      Dimensions.get("window").height / 16 +
      spacing.small * 2 +
      70),
  shadowColor: "#000000",
  shadowOffset: {
    width: 3,
    height: 3,
  },
  shadowOpacity: 0.25,
  shadowRadius: 4.59,
  elevation: 5,
  opacity: 0.7,
}

const $tip: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
  width: "85%",
  height: "80%",
  backgroundColor: "#ffffff",
  borderRadius: 8,
}

const $add: ViewStyle = {
  marginTop: spacing.tiny,
  flexDirection: "row",
  width: "85%",
  height: 52,
  justifyContent: "flex-end",
  alignItems: "center",
}

const $wrapIcon: ViewStyle = {
  width: 52,
  height: 52,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#FFFFFF",
  borderRadius: 45,
  marginStart: spacing.extraSmall,
  borderWidth: 1,
  borderColor: colors.palette.neutral400,
}
