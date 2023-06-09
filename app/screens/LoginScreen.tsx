/* eslint-disable @typescript-eslint/no-unused-vars */
import { observer } from "mobx-react-lite"
import React, { FC, useEffect, useMemo, useRef, useState } from "react"
import {
  Image,
  ImageStyle,
  TextInput,
  TextStyle,
  ViewStyle,
  Alert,
  View,
  ActivityIndicator,
} from "react-native"
import { Button, Icon, Screen, Text, TextField, TextFieldAccessoryProps } from "../components"
import { useStores } from "../models"
import { AppStackScreenProps } from "../navigators"
import { colors, spacing } from "../theme"
import { useHeader } from "../utils/useHeader" // @demo remove-current-line
import { api } from "../services/api/api"
import { showErrorMessage } from "../utils/errorMessage"
// import createTables from "../../app/database/createTables"
interface LoginScreenProps extends AppStackScreenProps<"Login"> {}

export const LoginScreen: FC<LoginScreenProps> = observer(function LoginScreen(_props) {
  const { navigation } = _props
  const loginLogo = require("../../assets/images/logo-2.png")

  const authPasswordInput = useRef<TextInput>()

  const [isLoading, setIsLoading] = useState(false)
  const [authPassword, setAuthPassword] = useState("")
  const [isAuthPasswordHidden, setIsAuthPasswordHidden] = useState(true)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [attemptsCount, setAttemptsCount] = useState(0)
  const {
    authenticationStore: {
      authEmail,
      setAuthEmail,
      setAuthToken,
      setRefreshToken,
      validationError,
    },
  } = useStores()

  useEffect(() => {
    // createTables()
    setAuthEmail("")
    setAuthPassword("")
  }, [])

  const error = isSubmitted ? validationError : ""

  async function login() {
    setIsSubmitted(true)
    setIsLoading(true)
    setAttemptsCount(attemptsCount + 1)

    if (validationError) return
    if (!authEmail || !authPassword) {
      Alert.alert("Error", "Please enter email and password")
      return setIsLoading(false)
    }

    try {
      const result = await api.login(authEmail, authPassword)

      setIsLoading(false)
      if (result.kind === "ok") {
        setAuthToken(result.data.accessToken)
        setRefreshToken(result.data.refreshToken)
        setIsSubmitted(false)
        setAuthPassword("")
        // setAuthEmail("")
      } else if (result.kind === "bad-data") {
        Alert.alert("Error", "Tên người dùng hoặc mật khẩu không hợp lệ!")
      } else if (typeof result === "object" && result.kind !== undefined) {
        Alert.alert("Error", showErrorMessage(result))
      }
    } catch (error) {
      setIsLoading(false)
      console.log(error)
    }
  }

  function goRegister() {
    navigation.navigate("Register")
  }

  useHeader({
    rightTx: "common.signUp",
    onRightPress: goRegister,
  })

  const PasswordRightAccessory = useMemo(
    () =>
      function PasswordRightAccessory(props: TextFieldAccessoryProps) {
        return (
          <Icon
            icon={isAuthPasswordHidden ? "view" : "hidden"}
            color={colors.palette.neutral800}
            containerStyle={props.style}
            size={20}
            onPress={() => setIsAuthPasswordHidden(!isAuthPasswordHidden)}
          />
        )
      },
    [isAuthPasswordHidden],
  )

  // useEffect(() => {
  //   return () => {
  //     setAuthPassword("")
  //     setAuthEmail("")
  //   }
  // }, [])

  return (
    <>
      {isLoading && (
        <View style={$loadingContainer}>
          <ActivityIndicator size="large" color={colors.palette.primary600} />
        </View>
      )}
      <Screen
        preset="auto"
        contentContainerStyle={
          isLoading ? [$screenContentContainer, $disableView] : $screenContentContainer
        }
        safeAreaEdges={["top", "bottom"]}
      >
        <Image style={$loginLogo} source={loginLogo} resizeMode="contain" />
        <Text testID="login-heading" tx="loginScreen.signIn" preset="heading" style={$signIn} />
        {attemptsCount > 2 && <Text tx="loginScreen.hint" size="sm" weight="light" style={$hint} />}

        <TextField
          value={authEmail}
          onChangeText={setAuthEmail}
          containerStyle={$textField}
          autoCapitalize="none"
          autoComplete="email"
          autoCorrect={false}
          keyboardType="email-address"
          labelTx="loginScreen.emailFieldLabel"
          placeholderTx="loginScreen.emailFieldPlaceholder"
          helper={error}
          status={error ? "error" : undefined}
          onSubmitEditing={() => authPasswordInput.current?.focus()}
        />

        <TextField
          ref={authPasswordInput}
          value={authPassword}
          onChangeText={setAuthPassword}
          containerStyle={$textField}
          autoCapitalize="none"
          autoComplete="password"
          autoCorrect={false}
          secureTextEntry={isAuthPasswordHidden}
          labelTx="loginScreen.passwordFieldLabel"
          placeholderTx="loginScreen.passwordFieldPlaceholder"
          onSubmitEditing={login}
          RightAccessory={PasswordRightAccessory}
        />

        <Button
          testID="login-button"
          tx="loginScreen.tapToSignIn"
          style={$tapButton}
          preset="reversed"
          onPress={login}
        />
      </Screen>
    </>
  )
})

const $loadingContainer: ViewStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 160,
  alignItems: "center",
  justifyContent: "center",
  zIndex: 100,
  opacity: 1,
}

const $screenContentContainer: ViewStyle = {
  paddingVertical: spacing.huge,
  paddingHorizontal: spacing.large,
}

const $disableView: ViewStyle = {
  opacity: 0.3,
}

const $signIn: TextStyle = {
  marginBottom: spacing.small,
}

const $hint: TextStyle = {
  color: colors.tint,
  marginBottom: spacing.medium,
}

const $textField: ViewStyle = {
  marginBottom: spacing.large,
}

const $tapButton: ViewStyle = {
  marginTop: spacing.extraSmall,
}

const $loginLogo: ImageStyle = {
  height: 150,
  width: "100%",
  marginBottom: spacing.large,
  marginTop: -spacing.extraLarge - 20,
}
// @demo remove-file
