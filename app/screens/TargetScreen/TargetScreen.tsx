/* eslint-disable react-native/no-inline-styles */
import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { ViewStyle, View, Dimensions, TouchableOpacity } from "react-native"
import { Icon, Screen, Text } from "../../components"
import { AppStackScreenProps } from "../../navigators"
import { colors, spacing } from "../../theme"
import { useStores } from "../../models"
import { useRoute } from "@react-navigation/native"

interface TargetScreenProps extends AppStackScreenProps<"Target"> {}

export const TargetScreen: FC<TargetScreenProps> = observer(function TargetScreen(_props) {
  const navigation = _props.navigation
  const route = useRoute()
  const flag = route.params?.flag as boolean

  const {
    userInfoStore: { setTarget, getUserInfo },
    bodyIndexStore: { setBodyIndex },
  } = useStores()

  function goToUpdateUserInfoScreen() {
    flag ? navigation.pop() : navigation.navigate("UpdateUserInfo")
  }
  const userInfo = getUserInfo()

  function setTargetAndGoToNextScreen(value: number) {
    if (value === 1) {
      setTarget("Giảm cân")
    } else if (value === 2) {
      setTarget("Tăng cân")
    } else {
      setTarget("Giữ nguyên cân nặng")
    }

    const newInfo = getUserInfo()
    setBodyIndex(
      newInfo.gender,
      newInfo.height,
      newInfo.weight,
      newInfo.age,
      newInfo.R,
      newInfo.target,
      newInfo.protein,
      newInfo.fat,
      newInfo.carb,
    )
    console.log("flag", userInfo)
    flag ? navigation.pop() : navigation.navigate("Macro")
  }

  return (
    <Screen preset="auto" safeAreaEdges={["top", "bottom"]} contentContainerStyle={$container}>
      <View style={$wrapHeading}>
        <TouchableOpacity onPress={goToUpdateUserInfoScreen}>
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
        <Text preset="subheading" size="md" tx="targetScreen.title" />
      </View>

      <TouchableOpacity onPress={() => setTargetAndGoToNextScreen(1)}>
        <View style={$wrapContainer}>
          <Text
            tx="targetScreen.losing_weight_title"
            preset="subheading"
            size="lg"
            style={{ textDecorationLine: "underline" }}
          />
          <View style={$detail}>
            <Text tx="targetScreen.losing_weight_detail" preset="default" size="md" />
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setTargetAndGoToNextScreen(2)}>
        <View style={$wrapContainer}>
          <Text
            tx="targetScreen.weight_gain_title"
            preset="subheading"
            size="lg"
            style={{ textDecorationLine: "underline" }}
          />
          <View style={$detail}>
            <Text tx="targetScreen.weight_gain_detail" preset="default" size="md" />
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setTargetAndGoToNextScreen(3)}>
        <View style={$wrapContainer}>
          <Text
            tx="targetScreen.keep_stableg_weight_title"
            preset="subheading"
            size="lg"
            style={{ textDecorationLine: "underline" }}
          />
          <View style={$detail}>
            <Text tx="targetScreen.keep_stableg_weight_detail" preset="default" size="md" />
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
