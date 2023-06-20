/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { observer } from "mobx-react-lite"
import React, { FC, useEffect } from "react"
import { ViewStyle, View } from "react-native"
import { Screen } from "../../components"
import { DemoTabScreenProps } from "../../navigators/DemoNavigator"
import { spacing } from "../../theme"
import { Content, HeaderHome, DailyCalo, CaloBurned } from "./home"
import { useStores } from "../../models"
import { AddButton } from "../../components/AddButton"
// import { displaySyncQueueData } from "../../database/processSyncQueue"
// import printTableData from "../../database/printTable"
// import findAllInfoFromTable from "../../database/findAllInfoFromTable"
const MemoizedContent = React.memo(Content)
const MemoizedDailyCalo = React.memo(DailyCalo)
const MemoizedCaloBurned = React.memo(CaloBurned)
export type TScreenName = "AddDailySport" | "AddDailyFood"
export type TData = "sport" | "snack" | "breakfast" | "lunch" | "dinner"

export const HomeScreen: FC<DemoTabScreenProps<"Home">> = observer(function HomeScreen(_props) {
  const {
    userInfoStore: { getUserInfo },
    bodyIndexStore: { getBodyIndex, setBodyIndex },
    systemStore: { isOverlayVisible },
    dateStore: { setDateTime },
  } = useStores()
  const { navigation } = _props

  const handleCalculateBodyIndex = () => {
    const { weight, R, age, gender, height, protein, carb, fat, target } = getUserInfo()
    setBodyIndex(gender, height, weight, age, R, target, protein, fat, carb)
  }

  useEffect(() => {
    setDateTime(new Date())
    handleCalculateBodyIndex()
  }, [])

  const goToScreen = (screenName: TScreenName, data: TData) => {
    navigation.navigate(screenName, { data })
  }

  const bodyIndx = getBodyIndex()
  console.log(new Date())
  return (
    <View style={{ flex: 1 }}>
      <Screen preset="scroll" contentContainerStyle={$container} safeAreaEdges={["bottom", "top"]}>
        {/* Header */}
        <HeaderHome
          calorPerDay={bodyIndx.calorPerDay}
          carbG={bodyIndx.gramOfCarb}
          fatG={bodyIndx.gramOfFat}
          proteinG={bodyIndx.gramOfProtein}
        />
        <MemoizedContent waterPerDay={bodyIndx.water} />
        <MemoizedDailyCalo />
        <MemoizedCaloBurned />
      </Screen>
      <View
        style={
          isOverlayVisible
            ? {
                position: "absolute",
                top: 0,
                bottom: -100,
                right: 0,
                left: 0,
                zIndex: 1,
                backgroundColor: "rgba(0,0,0,0.21)",
              }
            : {}
        }
      />

      {/* Add Button */}
      <AddButton goToScreen={goToScreen} />
    </View>
  )
})

const $container: ViewStyle = {
  paddingTop: spacing.small,
  paddingHorizontal: spacing.small,
}
