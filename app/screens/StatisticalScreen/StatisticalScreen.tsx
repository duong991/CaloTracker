/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-color-literals */
import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { ViewStyle, View, Dimensions, TouchableOpacity } from "react-native"
import { Icon, Screen, Text, StatisticalIndex, Button } from "../../components"
import { AppStackScreenProps } from "../../navigators"
import { colors, spacing } from "../../theme"
import DonutChart from "../../components/DonutChart"
interface StatisticalScreenProps extends AppStackScreenProps<"Statistical"> {}

export const StatisticalScreen: FC<StatisticalScreenProps> = observer(function StatisticalScreen(
  _props,
) {
  const navigation = _props.navigation

  function goToTargetScreen() {
    navigation.navigate("Target")
  }

  function goNext() {
    navigation.navigate("Demo", { screen: "DemoShowroom" })
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
        <Text preset="subheading" size="md" tx="statisticalScreen.title" />
      </View>
      <Text
        preset="subheading"
        size="md"
        tx="statisticalScreen.losing_weight_title"
        style={{ textAlign: "center" }}
      />

      <View style={$wrapContainer}>
        <View style={{ alignItems: "center" }}>
          <Text preset="subheading" size="xxl" style={{ color: "#b70000" }}>
            2165
          </Text>
          <Text preset="default" size="xs" style={{ color: "#b70000" }}>
            Kcal/ngày
          </Text>
        </View>

        <View style={{ alignItems: "center" }}>
          <DonutChart radius={84} color="#FEC23E" percentage={0} strokeWidth={6} max={2165} />
        </View>
      </View>

      <StatisticalIndex />

      <View
        style={{
          alignItems: "center",
          marginTop: spacing.large,
        }}
      >
        <Button
          text="Tiếp tục"
          preset="filled"
          onPress={goNext}
          style={{
            paddingVertical: 10,
            borderRadius: 50,
            width: "40%",
            marginBottom: 40,
            borderWidth: 1,
          }}
        />
      </View>
    </Screen>
  )
})

const $container: ViewStyle = {
  paddingTop: spacing.tiny,
  paddingHorizontal: spacing.small,
  paddingBottom: spacing.large,
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
  paddingRight: spacing.extraLarge,
}

const $wrapContainer: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  margin: spacing.small,
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
