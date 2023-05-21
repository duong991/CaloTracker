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
import { insertData } from "../database/insetTable"

const welcomeLogo = require("../../assets/images/logo-2.png")

interface WelcomeScreenProps extends AppStackScreenProps<"Welcome"> {}

export const WelcomeScreen: FC<WelcomeScreenProps> = observer(function WelcomeScreen(_props) {
  // @demo remove-block-start
  const { navigation } = _props
  const {
    authenticationStore: { logout, isFirstTime, setFirstTime },
    userInfoStore: { setUserInfo, clearUserInfo },
  } = useStores()

  const handleLogout = () => {
    clearUserInfo()
    logout()
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.fetchData()
      console.log("res", response)
      // Xử lý dữ liệu sau khi fetch
      if (response.kind === "ok") {
        const data = response.data
        if (data.userInfo) {
          setFirstTime(false)
          setUserInfo(data.userInfo)
        }
        await insertData(data)
      } else {
        console.log("Lỗi khi lấy dữ liệu từ API")
      }
    }
    fetchData()
  }, [])

  function goNext() {
    navigation.navigate(isFirstTime ? "UpdateUserInfo" : "Demo")
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
        {/* @demo remove-block-start */}
        <Button
          testID="next-screen-button"
          preset="reversed"
          tx="welcomeScreen.letsGo"
          onPress={goNext}
        />
        {/* @demo remove-block-end */}
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

// const $welcomeFace: ImageStyle = {
//   height: 169,
//   width: 269,
//   position: "absolute",
//   bottom: -47,
//   right: -80,
//   transform: [{ scaleX: isRTL ? -1 : 1 }],
// }

const $welcomeHeading: TextStyle = {
  marginBottom: spacing.medium,
}
