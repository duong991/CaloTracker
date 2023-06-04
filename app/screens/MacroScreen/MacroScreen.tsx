/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-color-literals */
import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { ViewStyle, View, Dimensions, TouchableOpacity } from "react-native"
import { Icon, Screen, Text } from "../../components"
import { AppStackScreenProps } from "../../navigators"
import { colors, spacing } from "../../theme"
import { useStores } from "../../models"
interface MacroScreenProps extends AppStackScreenProps<"Macro"> {}

export const MacroScreen: FC<MacroScreenProps> = observer(function MacroScreen(_props) {
  const navigation = _props.navigation

  const {
    userInfoStore: { setMacro, getUserInfoForUpdate },
  } = useStores()

  function goToTargetScreen() {
    navigation.navigate("Target")
  }

  function setMacroAndGoToNextScreen(value: number) {
    const userInfo = getUserInfoForUpdate()
    setMacro(value)
    console.log(userInfo)
    navigation.navigate("Statistical")
  }

  return (
    <Screen preset="auto" safeAreaEdges={["top", "bottom"]} contentContainerStyle={$container}>
      <View style={$wrapHeading}>
        <TouchableOpacity onPress={goToTargetScreen}>
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
        <Text preset="subheading" size="md" tx="macroScreen.title" />
      </View>

      <TouchableOpacity onPress={() => setMacroAndGoToNextScreen(1)}>
        <View style={$wrapContainer}>
          <Text
            tx="macroScreen.moderate_Carb"
            preset="subheading"
            size="lg"
            style={{ textDecorationLine: "underline" }}
          />
          <View style={$detail}>
            <Text tx="macroScreen.moderate_Carb_Detail" preset="default" size="md" />
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setMacroAndGoToNextScreen(2)}>
        <View style={$wrapContainer}>
          <Text
            tx="macroScreen.lower_Carb"
            preset="subheading"
            size="lg"
            style={{ textDecorationLine: "underline" }}
          />
          <View style={$detail}>
            <Text tx="macroScreen.lower_Carb_Detail" preset="default" size="md" />
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setMacroAndGoToNextScreen(3)}>
        <View style={$wrapContainer}>
          <Text
            tx="macroScreen.higher_Carb"
            preset="subheading"
            size="lg"
            style={{ textDecorationLine: "underline" }}
          />
          <View style={$detail}>
            <Text tx="macroScreen.higher_Carb_Detail" preset="default" size="md" />
          </View>
        </View>
      </TouchableOpacity>
    </Screen>
  )
})

const $container: ViewStyle = {
  paddingTop: spacing.tiny,
  paddingHorizontal: spacing.small,
}
const $wrapHeading: ViewStyle = {
  height: Dimensions.get("window").height * 0.08,
  flexDirection: "row",
  marginBottom: spacing.large,
  padding: spacing.small,
  backgroundColor: "#FEC23E",
  borderRadius: 8,
  alignItems: "center",
  justifyContent: "space-evenly",
}

const $wrapContainer: ViewStyle = {
  marginVertical: spacing.small,
  paddingHorizontal: spacing.extraLarge,

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

const $detail: ViewStyle = {
  marginTop: spacing.large,
  marginBottom: spacing.small,
  width: "100%",
  height: "auto",
  justifyContent: "center",
  alignItems: "center",
}
