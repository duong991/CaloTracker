/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-color-literals */
import { observer } from "mobx-react-lite"
import React, { FC, useState } from "react"
import { ViewStyle, View, Dimensions, TouchableOpacity } from "react-native"
import { Icon, Screen, Text, Button } from "../../components"
import { AppStackScreenProps } from "../../navigators"
import { colors, spacing } from "../../theme"

import { PersonalInfo, ActiveLevel } from "./updateInfo"
interface UpdateUserInfoScreenProps extends AppStackScreenProps<"UpdateUserInfo"> {}

export const UpdateUserInfoScreen: FC<UpdateUserInfoScreenProps> = observer(
  function UpdateUserInfoScreen(_props) {
    const navigation = _props.navigation
    const [minute, setMinute] = useState("")
    const [day, setDay] = useState("")
    const [height, setHeight] = useState<number>(0)
    const [weight, setWeight] = useState<number>(0)
    const [old, setOld] = useState<number>(0)

    const [gender, setGender] = useState<boolean>(true)

    function goToWelcomeScreen() {
      navigation.navigate("Welcome")
    }
    function goToTargetScreen() {
      navigation.navigate("Target")
    }

    return (
      <Screen preset="auto" safeAreaEdges={["top", "bottom"]} contentContainerStyle={$container}>
        <View style={$wrapHeading}>
          <TouchableOpacity onPress={goToWelcomeScreen}>
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
          <Text preset="subheading" size="md" tx="updateInfoUserScreen.title" />
        </View>
        <View style={$wrapContainer}>
          <View style={$contentActiveLevel}>
            <ActiveLevel minute={minute} day={day} setMinute={setMinute} setDay={setDay} />
          </View>

          <PersonalInfo
            gender={gender}
            height={height}
            weight={weight}
            old={old}
            setGender={setGender}
            setHeight={setHeight}
            setWeight={setWeight}
            setOld={setOld}
          />
        </View>
        <View
          style={{
            alignItems: "center",
          }}
        >
          <Button
            text="Tiếp tục"
            preset="filled"
            onPress={goToTargetScreen}
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
  },
)

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

const $contentActiveLevel: ViewStyle = {
  height: Dimensions.get("window").height * 0.32,
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: spacing.large,
  marginHorizontal: spacing.extraSmall,
  padding: spacing.extraLarge,
  backgroundColor: "#FFFFFF",
  borderRadius: 28,

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

const $wrapContainer: ViewStyle = {
  flex: 10,
}
