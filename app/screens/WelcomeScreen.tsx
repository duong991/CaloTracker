/* eslint-disable @typescript-eslint/no-unused-vars */
import { observer } from "mobx-react-lite"
import React, { FC, useEffect } from "react"
import { Image, ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { Button, Text } from "../components"
import { useStores } from "../models"
import { AppStackScreenProps } from "../navigators"
import { colors, spacing } from "../theme"
import { useHeader } from "../utils/useHeader"
import { useSafeAreaInsetsStyle } from "../utils/useSafeAreaInsetsStyle"
import { api } from "../services/api/api"
// import { insertData } from "../database/insertTable"
// import findAllInfoFromTable from "../database/findAllInfoFromTable"
// import { checkNetworkAndSchedule } from "../utils/schedule"
const welcomeLogo = require("../../assets/images/logo-2.png")

interface WelcomeScreenProps extends AppStackScreenProps<"Welcome"> {}

export const WelcomeScreen: FC<WelcomeScreenProps> = observer(function WelcomeScreen(_props) {
  const { navigation } = _props
  const {
    authenticationStore: { logout, isFirstTime, setFirstTime, authToken },
    userInfoStore: { setUserInfo, clearUserInfo },
    systemStore: { setOverLayVisible },
    dateStore,
  } = useStores()

  const handleLogout = () => {
    clearUserInfo()
    logout()
  }

  // Lấy dữ liệu từ server
  useEffect(() => {
    const fetchData = async () => {
      if (authToken) {
        await api.setAuthToken(authToken)
      }
      const response = await api.getUserInfo()
      if (response.kind === "not-found") {
        setFirstTime(true)
      } else if (response.kind === "ok") {
        const data = response.data
        if (data) {
          setFirstTime(false)
          setUserInfo(data.userInfo)
        }
        console.info("welcomeScreen: ", "Call API successfully")
      } else {
        console.error("welcomeScreen: ", response.kind)
        handleLogout()
      }
    }
    fetchData()
  }, [])

  async function goNext() {
    // checkNetworkAndSchedule()
    setOverLayVisible(false)
    // thực hiện call api lấy dữ liệu userFood và userMeal
    if (!isFirstTime) {
      await dateStore.mealFoodStoreModel.fetchUserFoods()
      await dateStore.mealFoodStoreModel.fetchUserMeals()
    }

    navigation.navigate(isFirstTime ? "UpdateUserInfo" : "Demo", { flag: false })
  }
  useHeader({
    rightTx: "common.logOut",
    onRightPress: handleLogout,
  })

  const $bottomContainerInsets = useSafeAreaInsetsStyle(["bottom"])

  return (
    <View style={$container}>
      <View style={$topContainer}>
        <Image style={$welcomeLogo} source={welcomeLogo} resizeMode="contain" />
        <Text
          testID="welcome-heading"
          style={$welcomeHeading}
          tx="welcomeScreen.readyForLaunch"
          preset="heading"
        />
        <Text tx="welcomeScreen.exciting" preset="subheading" />
      </View>

      <View style={[$bottomContainer, $bottomContainerInsets]}>
        <Text tx="welcomeScreen.postscript" size="md" />
        <Button
          testID="next-screen-button"
          preset="reversed"
          tx="welcomeScreen.letsGo"
          onPress={goNext}
        />
      </View>
    </View>
  )
})

const $container: ViewStyle = {
  flex: 1,
  backgroundColor: colors.background,
}

const $topContainer: ViewStyle = {
  flexShrink: 1,
  flexGrow: 1,
  flexBasis: "57%",
  justifyContent: "center",
  paddingHorizontal: spacing.large,
}

const $bottomContainer: ViewStyle = {
  flexShrink: 1,
  flexGrow: 0,
  flexBasis: "43%",
  backgroundColor: colors.palette.neutral100,
  borderTopLeftRadius: 16,
  borderTopRightRadius: 16,
  paddingHorizontal: spacing.large,
  justifyContent: "space-around",
}
const $welcomeLogo: ImageStyle = {
  height: 150,
  width: "100%",
  marginBottom: spacing.huge,
}

const $welcomeHeading: TextStyle = {
  marginBottom: spacing.medium,
}
