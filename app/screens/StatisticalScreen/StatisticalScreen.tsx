/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-color-literals */
import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { ViewStyle, View, Dimensions, TouchableOpacity } from "react-native"
import { Icon, Screen, Text, StatisticalIndex, Button } from "../../components"
import { AppStackScreenProps } from "../../navigators"
import { colors, spacing } from "../../theme"
import DonutChart from "../../components/DonutChart"
import { useStores } from "app/models"
import { DatabaseConnection } from "../../database/database-connection"
import { dateToString } from "../../utils/convertDate"
interface StatisticalScreenProps extends AppStackScreenProps<"Statistical"> {}

export const StatisticalScreen: FC<StatisticalScreenProps> = observer(function StatisticalScreen(
  _props,
) {
  const navigation = _props.navigation
  const db = DatabaseConnection.getConnection()
  const {
    userInfoStore: { getUserInfo },
    bodyIndexStore: { getBodyIndex, setCalorPerDay },
  } = useStores()

  const userInfo = getUserInfo()
  const bodyIndx = getBodyIndex()
  const caloNeedPerDay =
    userInfo.target === "Giảm cân"
      ? bodyIndx.TDEE - 500
      : userInfo.target === "Tăng cân"
      ? bodyIndx.TDEE + 500
      : bodyIndx.TDEE

  setCalorPerDay(caloNeedPerDay)
  function goToTargetScreen() {
    navigation.navigate("Target")
  }

  function goNext() {
    navigation.navigate("Demo", { screen: "DemoShowroom" })
    insertToTableWaterLog()
  }

  const insertToTableWaterLog = () => {
    const date = new Date()
    const chuoiNgayThang = dateToString(date)

    const amount = 0

    db.transaction(function (tx) {
      tx.executeSql(
        "Insert into WaterLog(date, amount) VALUES (?,?)",
        [chuoiNgayThang, amount],
        (tx, results) => {
          console.log("Results", results.rowsAffected)
        },
      )
    })
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
        tx={
          userInfo.target === "Giảm cân"
            ? "statisticalScreen.losing_weight_title"
            : userInfo.target === "Tăng cân"
            ? "statisticalScreen.gaining_weight_title"
            : "statisticalScreen.maintain_weight_title"
        }
        style={{ textAlign: "center" }}
      />

      <View style={$wrapContainer}>
        <View style={{ height: "65%", marginRight: spacing.large }}>
          <View style={{ width: "100%" }}>
            <Text preset="subheading" size="md">
              TDEE của bạn
            </Text>
          </View>

          <Text preset="subheading" size="xxl" style={{ color: "#b70000" }}>
            {bodyIndx.TDEE}
          </Text>
          <Text preset="subheading" size="xs" style={{ color: "#b70000" }}>
            Kcal/ngày
          </Text>
        </View>

        <View style={{ alignItems: "center" }}>
          <DonutChart
            radius={84}
            color="#FEC23E"
            percentage={caloNeedPerDay}
            strokeWidth={8}
            max={caloNeedPerDay}
            reverse={true}
          />
        </View>
      </View>

      <StatisticalIndex
        BMI={bodyIndx.BMI}
        water={bodyIndx.water}
        weightStatus={bodyIndx.weightStatus}
        height={userInfo.height}
        weight={userInfo.weight}
        dateForUpdateWeight={userInfo.dateForUpdateWeight}
      />

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
