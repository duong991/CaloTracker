/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC } from "react"
import { TextStyle, View, ViewStyle, TouchableOpacity } from "react-native"
import { Button, ListItem, Screen, Text } from "../../components"
import { DemoTabScreenProps } from "../../navigators/DemoNavigator"
import { colors, spacing } from "../../theme"
import { isRTL } from "../../i18n"
import { useStores } from "../../models"
import { cancelSyncQueueTask } from "../../utils/schedule"
export const SettingScreen: FC<DemoTabScreenProps<"Setting">> = function SettingScreen(_props) {
  const {
    authenticationStore: { logout },
    userInfoStore: { clearUserInfo },
    systemStore: { setOverLayVisible },
    dateStore,
  } = useStores()
  const { navigation } = _props
  const handleLogout = () => {
    dateStore.mealFoodStoreModel.clearMealFood()
    dateStore.mealFoodStoreModel.dailyMeals.clearDailyMeals()
    setOverLayVisible(false)
    cancelSyncQueueTask()
    clearUserInfo()
    logout()
  }

  const goToTargetScreen = () => {
    navigation.push("Target", { flag: true })
  }

  const goToMacroScreen = () => {
    navigation.push("Macro", { flag: true })
  }
  return (
    <Screen preset="scroll" safeAreaEdges={["top"]} contentContainerStyle={$container}>
      <Text style={$title} preset="heading" tx="settingScreen.title" />
      <View style={$itemsContainer}>
        <ListItem
          LeftComponent={
            <View style={$item}>
              <TouchableOpacity onPress={goToTargetScreen}>
                <Text preset="subheading">Cập nhật mục tiêu cân nặng</Text>
              </TouchableOpacity>
            </View>
          }
        />
        <ListItem
          LeftComponent={
            <View style={$item}>
              <TouchableOpacity onPress={goToMacroScreen}>
                <Text preset="subheading">Cập nhật macro dinh dưỡng</Text>
              </TouchableOpacity>
            </View>
          }
        />
        <ListItem
          LeftComponent={
            <View style={$item}>
              <Text preset="subheading">Tạo mới lịch uống nước</Text>
            </View>
          }
        />
      </View>

      <View style={$buttonContainer}>
        <Button style={$button} tx="common.logOut" onPress={handleLogout} />
      </View>
    </Screen>
  )
}

const $container: ViewStyle = {
  paddingTop: spacing.large + spacing.extraLarge,
  paddingBottom: spacing.huge,
  paddingHorizontal: spacing.large,
}

const $title: TextStyle = {
  marginBottom: spacing.huge,
}

const $item: ViewStyle = {
  marginBottom: spacing.medium,
}

const $itemsContainer: ViewStyle = {
  marginBottom: spacing.extraLarge,
}

const $button: ViewStyle = {
  marginBottom: spacing.extraSmall,
}

const $buttonContainer: ViewStyle = {
  marginBottom: spacing.medium,
}

// @demo remove-file
