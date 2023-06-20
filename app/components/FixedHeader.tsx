/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { observer } from "mobx-react-lite"
import React from "react"
import {
  TextStyle,
  ViewStyle,
  Alert,
  ActivityIndicator,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native"
import { Icon, Screen, Text, TextField } from "./index"
import { colors, spacing } from "../theme"
import { useStores } from "../models"
import { Toggle } from "../components"

type fixedHeaderProps = {
  children?: React.ReactNode
  handleGoBack?: () => void
  title?: string
  isDisplayToggle?: boolean
  displayFood?: boolean
  handleToggle?: () => void
}

export const FixedHeader = ({
  children,
  handleGoBack,
  title,
  isDisplayToggle = false,
  displayFood = false,
  handleToggle,
}: fixedHeaderProps) => {
  const { systemStore } = useStores()

  const [textSearch, setTextSearch] = React.useState("")

  const handleTurnOffAddButton = () => {
    systemStore.setOverLayVisible(false)
  }
  let titleString: string
  if (displayFood) {
    titleString = `${title} (Thực phẩm)`
  } else {
    titleString = `${title} (Món ăn)`
  }
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View style={$headerCss}>
        <View style={$wrapHeader}>
          <View style={$wrapHeading}>
            <TouchableOpacity
              onPress={() => {
                handleTurnOffAddButton()
                handleGoBack()
              }}
            >
              <View
                style={{
                  width: 50,
                  height: 50,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Icon icon="back" color={colors.mainText} size={30} />
              </View>
            </TouchableOpacity>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
                paddingRight: 28,
              }}
            >
              <Text preset="subheading" size="md" style={$textHeader}>
                {title ? titleString : "Tập luyện ngày hôm nay của bạn"}
              </Text>
              {isDisplayToggle ? (
                <Toggle value={displayFood} onValueChange={handleToggle} variant="switch" />
              ) : (
                <></>
              )}
            </View>
          </View>
          <View style={$wrapInput}>
            <View style={$search}>
              <TextField
                value={textSearch}
                onChangeText={setTextSearch}
                autoCapitalize="none"
                autoComplete="off"
                autoCorrect={false}
                keyboardType="default"
                placeholder="Tìm kiếm"
                // onSubmitEditing={() => authPasswordInput.current?.focus()}
              />
            </View>
          </View>
        </View>
      </View>

      <Screen preset="scroll" backgroundColor={colors.background} style={$screen}>
        {children}
      </Screen>
    </View>
  )
}

const $headerCss: ViewStyle = {
  flex: 1,
  zIndex: 2,
  backgroundColor: colors.background,
  borderRadius: 8,
  position: "absolute",
  top: 0,
  right: 0,
  left: 0,
  height: 150,

  shadowColor: "rbga(0,0,0,0.1)",
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.1,
}
const $wrapHeader: ViewStyle = {
  flex: 1,
  flexDirection: "column",
  marginBottom: spacing.tiny,
  backgroundColor: "#FEC23E",
  borderRadius: 8,
  position: "absolute",
  top: 24,
  right: 5,
  left: 5,
  zIndex: 2,
}

const $wrapHeading: ViewStyle = {
  height: Dimensions.get("window").height * 0.08,
  flexDirection: "row",
  borderRadius: 8,
  alignItems: "center",
  justifyContent: "space-between",
}
const $textHeader: TextStyle = {
  color: "#143d54",
  opacity: 0.8,
}

const $wrapInput: ViewStyle = {
  flex: 1,
  flexDirection: "row",
  paddingBottom: spacing.small,
  paddingHorizontal: spacing.small + spacing.tiny,
}

const $search: ViewStyle = {
  flex: 1,
  marginRight: spacing.extraSmall,
}

const $screen: ViewStyle = {
  flex: 1,
  backgroundColor: colors.background,
  position: "absolute",
  top: 80,
  bottom: 0,
  left: 0,
  right: 0,
}
