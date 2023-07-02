/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { observer } from "mobx-react-lite"
import React, { FC, useState } from "react"
import { TextStyle, View, ViewStyle, Alert, Dimensions } from "react-native"
import {
  ListItem,
  Screen,
  Text,
  TextField,
  StatisticalIndex,
  QuantityModal,
} from "../../components"
import { DemoTabScreenProps } from "../../navigators/DemoNavigator"
import { spacing, colors } from "../../theme"

import { AvatarSVG, MenuBarSVG, ClockSVG } from "../../components/fileSVG"
import { useStores } from "app/models"
import { formatDateToString } from "../../utils/formatDateToString"
import { api } from "../../services/api"
export const PersonalScreen: FC<DemoTabScreenProps<"Personal">> = observer(function PersonalScreen(
  _props,
) {
  const {
    userInfoStore: { getUserInfo, getUserInfoForUpdate, setUserInfo },
    bodyIndexStore: { getBodyIndex, setBodyIndex },
    authenticationStore: { authEmail },
    weightLogStore,
  } = useStores()
  const { navigation } = _props
  const { fetchWeightLogs } = weightLogStore

  const userInfo = getUserInfo()
  const userInfoForUpdate = getUserInfoForUpdate()
  const bodyIndex = getBodyIndex()

  const [isModalVisible, setIsModalVisible] = useState(false)

  const handleConfirm = async (weight: number) => {
    const lastTimeToUpdate = formatDateToString(new Date())
    const data = {
      weight,
      date: lastTimeToUpdate,
    }
    const res = await api.updateWeight(data)
    if (res.kind === "ok") {
      Alert.alert("Cập nhật cân nặng thành công")
      const response = await api.getUserInfo()
      if (response.kind === "ok") {
        const data = response.data
        if (data) {
          setUserInfo(data.userInfo)
          const { weight, R, age, gender, height, protein, carb, fat, target } = getUserInfo()
          setBodyIndex(gender, height, weight, age, R, target, protein, fat, carb)
        }
      }
      fetchWeightLogs()
      setIsModalVisible(false)
    } else {
      Alert.alert("Cập nhật cân nặng thất bại")
    }
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const handlePressWeight = () => {
    setIsModalVisible(true)
  }

  const goToUpdateProfile = () => {
    navigation.push("UpdateUserInfo", { flag: true })
  }

  return (
    <Screen preset="scroll" contentContainerStyle={$container} safeAreaEdges={["bottom", "top"]}>
      {/* Header */}
      {isModalVisible && (
        <QuantityModal
          isVisible={isModalVisible}
          title="Cập nhật cân nặng"
          onCancel={handleCancel}
          onConfirm={handleConfirm}
        />
      )}
      <View style={$wrapHeader}>
        <View style={$avatar}>
          <AvatarSVG />
        </View>
        <Text preset="subheading" size="sm">
          {authEmail}
        </Text>
      </View>
      {/* Content */}
      <StatisticalIndex
        BMI={bodyIndex.BMI}
        water={bodyIndex.water}
        weightStatus={bodyIndex.weightStatus}
        height={userInfo.height}
        weight={userInfo.weight}
        dateForUpdateWeight={userInfo.dateForUpdateWeight}
        isDisplay={true}
        handleOpenModal={handlePressWeight}
        goToScreen={goToUpdateProfile}
      />
    </Screen>
  )
})

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
