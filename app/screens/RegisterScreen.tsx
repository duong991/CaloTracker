import { observer } from "mobx-react-lite"
import React, { FC, useEffect, useMemo, useRef, useState } from "react"
import { TextInput, TextStyle, ViewStyle, Alert, ActivityIndicator, View } from "react-native"
import { Button, Icon, Screen, Text, TextField, TextFieldAccessoryProps } from "../components"
import { useStores } from "../models"
import { AppStackScreenProps } from "../navigators"
import { colors, spacing } from "../theme"
import { useHeader } from "../utils/useHeader"
import { api } from "app/services/api"
import { showErrorMessage } from "../utils/errorMessage"

interface RegisterScreenProps extends AppStackScreenProps<"Register"> {}

export const RegisterScreen: FC<RegisterScreenProps> = observer(function registerScreen(_props) {
  const navigation = _props.navigation

  const authPasswordInput = useRef<TextInput>()
  const authPasswordConfirmInput = useRef<TextInput>()

  const [authPassword, setAuthPassword] = useState("")
  const [authPasswordConfirm, setAuthPasswordConfirm] = useState("")
  const [isAuthPasswordHidden, setIsAuthPasswordHidden] = useState(true)
  const [isAuthPasswordConfirmHidden, setIsAuthPasswordConfirmHidden] = useState(true)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [validationErrorPassword, setValidationErrorPassword] = useState("")

  const {
    authenticationStore: { authEmail, setAuthEmail, validationError },
  } = useStores()

  useEffect(() => {
    setAuthEmail("")
    setAuthPassword("")
    setAuthPasswordConfirm("")
  }, [])

  const error = isSubmitted ? validationError : ""
  const errorPass = isSubmitted ? validationErrorPassword : ""

  async function register() {
    setIsSubmitted(true)
    setIsLoading(true)
    if (validationError || !authEmail || !authPassword || !authPasswordConfirm)
      return setIsLoading(false)

    if (authPassword !== authPasswordConfirm) {
      console.log("test", authPassword, authPasswordConfirm)
      setAuthPassword("")
      setAuthPasswordConfirm("")
      setValidationErrorPassword("Password and Confirm Password must be the same")
      return setIsLoading(false)
    }
    try {
      const result = await api.register(authEmail, authPassword)
      setIsLoading(false)
      if (result.kind === "ok") {
        Alert.alert("Success", "Account created successfully! ")
      } else if (result.kind === "bad-data") {
        Alert.alert("Error", "Account already exists! ")
      } else if (typeof result === "object" && result.kind !== undefined) {
        Alert.alert("Error", showErrorMessage(result))
      }
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }

    setIsSubmitted(false)
    setAuthEmail("")
    setAuthPassword("")
    setAuthPasswordConfirm("")
    setValidationErrorPassword("")
  }

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

  const ConfirmPasswordRightAccessory = useMemo(
    () =>
      function ConfirmPasswordRightAccessory(props: TextFieldAccessoryProps) {
        return (
          <Icon
            icon={isAuthPasswordConfirmHidden ? "view" : "hidden"}
            color={colors.palette.neutral800}
            containerStyle={props.style}
            size={20}
            onPress={() => setIsAuthPasswordConfirmHidden(!isAuthPasswordConfirmHidden)}
          />
        )
      },
    [isAuthPasswordConfirmHidden],
  )

  // go to login screen
  function goLogin() {
    navigation.navigate("Login")
  }

  useHeader({
    rightTx: "common.signIn",
    onRightPress: goLogin,
  })

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
        <Text testID="login-heading" tx="registerScreen.signUp" preset="heading" style={$signIn} />

        <TextField
          value={authEmail}
          onChangeText={setAuthEmail}
          containerStyle={$textField}
          autoCapitalize="none"
          autoComplete="email"
          autoCorrect={false}
          keyboardType="email-address"
          labelTx="registerScreen.emailFieldLabel"
          placeholderTx="registerScreen.emailFieldPlaceholder"
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
          labelTx="registerScreen.passwordFieldLabel"
          placeholderTx="registerScreen.passwordFieldPlaceholder"
          helper={errorPass}
          status={errorPass ? "error" : undefined}
          onSubmitEditing={() => authPasswordConfirmInput.current?.focus()}
          RightAccessory={PasswordRightAccessory}
        />
        <TextField
          ref={authPasswordConfirmInput}
          value={authPasswordConfirm}
          onChangeText={setAuthPasswordConfirm}
          containerStyle={$textField}
          autoCapitalize="none"
          autoComplete="password"
          autoCorrect={false}
          secureTextEntry={isAuthPasswordConfirmHidden}
          labelTx="registerScreen.passwordConfirmFieldLabel"
          placeholderTx="registerScreen.passwordConfirmFieldPlaceholder"
          onSubmitEditing={register}
          RightAccessory={ConfirmPasswordRightAccessory}
        />
        <Button
          testID="login-button"
          tx="registerScreen.tapToSignUp"
          style={$tapButton}
          preset="filled"
          onPress={register}
        />
      </Screen>
    </>
  )
})

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

const $textField: ViewStyle = {
  marginBottom: spacing.large,
}

const $tapButton: ViewStyle = {
  marginTop: spacing.extraSmall,
}

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
