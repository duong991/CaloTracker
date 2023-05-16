/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { observer } from "mobx-react-lite"
import React, { FC, useEffect, useMemo, useRef, useState } from "react"
import {
  TextInput,
  TextStyle,
  ViewStyle,
  Alert,
  ActivityIndicator,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native"
import { Button, Icon, Screen, Text, TextField, TextFieldAccessoryProps } from "../../components"
import { AppStackScreenProps } from "../../navigators"
import { colors, spacing } from "../../theme"
import { useHeader } from "../../utils/useHeader"
import { PlusSVG, CameraSVG } from "../../components/fileSVG"
interface AddMealScreenProps extends AppStackScreenProps<"AddMeal"> {}

export const AddMealScreen: FC<AddMealScreenProps> = observer(function AddMealScreen(_props) {
  const navigation = _props.navigation

  // go to login screen
  function goToFoodScreen() {
    navigation.navigate("Demo")
  }

  return (
    <>
      <Screen preset="auto" safeAreaEdges={["top", "bottom"]} contentContainerStyle={$container}>
        <View style={$wrapHeading}>
          <TouchableOpacity onPress={goToFoodScreen}>
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
          <View style={{ width: "100%" }}>
            <Text preset="subheading" size="md" tx="addMealScreen.title" />
          </View>
        </View>
        <Text preset="subheading" size="md" tx="addMealScreen.basicInfo" />

        <View style={$wrapContainer}>
          <View style={{ alignItems: "center", flexDirection: "row" }}>
            <View style={{ width: "44%", marginRight: spacing.small }}>
              <Text preset="subheading" size="xs">
                Tên món mới
              </Text>
            </View>
            <View style={{ width: "54%" }}>
              <TextField
                keyboardType="default"
                // value={minute}
                // onChangeText={setMinute}
                inputWrapperStyle={$wrapTextField}
                style={$textFieldStyle}
                placeholder="bắt buộc"
              />
            </View>
          </View>

          <View
            style={{ alignItems: "center", flexDirection: "row", marginTop: spacing.extraLarge }}
          >
            <View style={{ width: "44%", marginRight: spacing.small }}>
              <Text preset="subheading" size="xs">
                Hình ảnh
              </Text>
            </View>
            <View style={{ width: "54%", paddingLeft: spacing.large }}>
              <View
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 50,
                  borderWidth: 0.56,
                  borderColor: colors.mainText,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#E6FFFD",
                }}
              >
                <CameraSVG size={28} />
              </View>
            </View>
          </View>
        </View>

        <Text preset="subheading" size="md" tx="addMealScreen.ingredientMeal" />

        <View
          style={{
            alignItems: "center",
            marginTop: spacing.extraLarge,
          }}
        >
          <Button
            text="Thêm thực phẩm"
            preset="default"
            onPress={goToFoodScreen}
            style={{
              borderRadius: 4,
              minHeight: 10,
              width: "60%",
              marginBottom: 40,
              borderWidth: 1,
            }}
            LeftAccessory={() => (
              <View style={{ marginRight: spacing.small }}>
                <PlusSVG size={12} />
              </View>
            )}
          />
        </View>
      </Screen>
    </>
  )
})

const $container: ViewStyle = {
  padding: spacing.tiny,
  paddingHorizontal: spacing.medium,
}
const $wrapHeading: ViewStyle = {
  height: Dimensions.get("window").height * 0.08,
  flexDirection: "row",
  marginBottom: spacing.large,
  padding: spacing.small,
  backgroundColor: "#FEC23E",
  borderRadius: 8,
  alignItems: "center",
  justifyContent: "space-between",
}

const $wrapContainer: ViewStyle = {
  marginTop: spacing.small,
  marginBottom: spacing.large,
  paddingHorizontal: spacing.medium + spacing.tiny,

  backgroundColor: "#ffffff",
  minHeight: 120,
  borderRadius: 25,
  padding: spacing.extraLarge,
  alignItems: "center",

  shadowColor: "#143d54",
  elevation: 12,

  shadowOffset: {
    width: 3,
    height: 3,
  },
  shadowOpacity: 0.25,
  shadowRadius: 4.59,
  opacity: 0.9,
}

const $wrapTextField: ViewStyle = {
  borderWidth: 0,
  borderRadius: 0,
  backgroundColor: "#FFFFFF",
  borderBottomWidth: 2,
}

const $textFieldStyle: TextStyle = {
  flex: 1,
  color: colors.text,
  fontSize: 16,
  height: 32,
  backgroundColor: "#FFFFFF",
  // https://github.com/facebook/react-native/issues/21720#issuecomment-532642093
  paddingVertical: 0,
  paddingHorizontal: spacing.small,
  marginVertical: spacing.micro,
  marginHorizontal: spacing.micro,
}
