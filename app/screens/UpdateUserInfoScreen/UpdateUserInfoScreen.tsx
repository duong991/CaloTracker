/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-color-literals */
import { observer } from "mobx-react-lite"
import React, { FC, useState } from "react"
import { ViewStyle, View, Dimensions, TouchableOpacity, Alert } from "react-native"
import { Icon, Screen, Text, Button } from "../../components"
import { AppStackScreenProps } from "../../navigators"
import { colors, spacing } from "../../theme"
import { useRoute } from "@react-navigation/native"
import { PersonalInfo, ActiveLevel } from "./updateInfo"

import { useStores } from "../../models"
interface UpdateUserInfoScreenProps extends AppStackScreenProps<"UpdateUserInfo"> {}

export const UpdateUserInfoScreen: FC<UpdateUserInfoScreenProps> = observer(
  function UpdateUserInfoScreen(_props) {
    const navigation = _props.navigation
    const [minute, setMinute] = useState<number>()
    const [day, setDay] = useState<number>()
    const route = useRoute()
    const flag = route.params?.flag as boolean
    const {
      userInfoStore: {
        gender,
        height,
        weight,
        age,
        setActiveLevel,
        setGender,
        setHeight,
        setWeight,
        setAge,
        getUserInfo,
      },
      bodyIndexStore: { setBodyIndex },
    } = useStores()
    function goToWelcomeScreen() {
      flag ? navigation.pop() : navigation.navigate("Welcome")
    }
    const calculatorActiveLevelAndGoToNextScreen = () => {
      if (!minute || !day || !height || !weight || !age) {
        Alert.alert("Thông báo", "Vui lòng nhập đầy đủ thông tin")
        return
      }
      setActiveLevel(minute, day)

      if (flag) {
        const { R, target, protein, fat, carb } = getUserInfo()
        setBodyIndex(gender, height, weight, age, R, target, protein, fat, carb)
        navigation.pop()
      } else {
        navigation.navigate("Target", { flag: false })
      }
    }

    const handleDayChange = (value: number) => {
      if (value >= 0 && value <= 7) {
        setDay(value)
      } else {
        Alert.alert("Thông báo", "Nhập số ngày trong tuân từ 0 - 7")
      }
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
            <ActiveLevel minute={minute} day={day} setMinute={setMinute} setDay={handleDayChange} />
          </View>

          <PersonalInfo
            gender={gender}
            height={height}
            weight={weight}
            age={age}
            setGender={setGender}
            setHeight={setHeight}
            setWeight={setWeight}
            setAge={setAge}
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
            onPress={calculatorActiveLevelAndGoToNextScreen}
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
