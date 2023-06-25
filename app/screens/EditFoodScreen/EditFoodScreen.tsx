/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { observer } from "mobx-react-lite"
import React, { FC, useEffect } from "react"
import { TextStyle, ViewStyle, View, TouchableOpacity, Dimensions, Alert } from "react-native"
import { Button, Icon, Screen, Text, TextField, TextFieldAccessoryProps } from "../../components"
import { AppStackScreenProps } from "../../navigators"
import { colors, spacing } from "../../theme"
import { foodApi } from "app/services/api"
import { useStores } from "../../models"
import { useRoute } from "@react-navigation/native"

interface EditFoodScreenProps extends AppStackScreenProps<"EditFood"> {}

export const EditFoodScreen: FC<EditFoodScreenProps> = observer(function EditFoodScreen(_props) {
  const navigation = _props.navigation
  const { dateStore } = useStores()
  const route = useRoute()
  const data = route.params.data as any

  const [id, setId] = React.useState("")
  const [name, setName] = React.useState("")
  const [kcal, setKcal] = React.useState("")
  const [fat, setFat] = React.useState("")
  const [carbs, setCarbs] = React.useState("")
  const [protein, setProtein] = React.useState("")

  useEffect(() => {
    const id = data.id.substr(data.id.indexOf("-") + 1)
    setId(id)
    setName(data.name)
    setKcal(data.calories + "")
    setFat(data.fat + "")
    setCarbs(data.carbohydrates + "")
    setProtein(data.protein + "")
  }, [data])
  // go to login screen
  async function goToFoodScreen() {
    await dateStore.mealFoodStoreModel.fetchUserFoods()
    navigation.navigate("Demo")
  }

  function checkChange() {
    if (
      name !== data.name ||
      kcal !== data.calories + "" ||
      fat !== data.fat + "" ||
      carbs !== data.carbohydrates + "" ||
      protein !== data.protein + ""
    ) {
      return true
    }
    return false
  }

  async function handleUpdateFood() {
    if (!name || !kcal || !fat || !carbs || !protein) {
      Alert.alert("Vui lòng nhập đầy đủ thông tin")
      return
    }
    if (!checkChange()) {
      Alert.alert("Không có gì thay đổi")
      await goToFoodScreen()
      return
    }
    const res = await foodApi.updateFood({
      id: +id,
      name,
      calories: +kcal,
      fat: +fat,
      carbohydrates: +carbs,
      protein: +protein,
    })

    if (res && res.kind === "ok") {
      Alert.alert("Cập nhật thực phẩm thành công")
      await goToFoodScreen()
    } else {
      Alert.alert("Đã có lỗi xảy ra")
    }
  }

  return (
    <>
      <Screen preset="auto" safeAreaEdges={["top", "bottom"]} contentContainerStyle={$container}>
        <View style={$wrapHeading}>
          <TouchableOpacity onPress={goToFoodScreen}>
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
          <View style={{ width: "100%" }}>
            <Text preset="subheading" size="md">
              Cập nhât thực phẩm
            </Text>
          </View>
        </View>
        <Text preset="subheading" size="md" tx="addFoodScreen.basicInfo" />

        <View style={$wrapContainer}>
          <View style={{ alignItems: "center", flexDirection: "row" }}>
            <View style={{ width: "44%", marginRight: spacing.small }}>
              <Text preset="subheading" size="xs">
                Tên của thực phẩm
              </Text>
            </View>
            <View style={{ width: "54%" }}>
              <TextField
                keyboardType="default"
                value={name}
                onChangeText={setName}
                inputWrapperStyle={$wrapTextField}
                style={$textFieldStyle}
                placeholder="bắt buộc"
              />
            </View>
          </View>

          <View
            style={{ alignItems: "center", flexDirection: "row", marginTop: spacing.extraLarge }}
          >
            <View style={{ width: "44%", marginRight: spacing.small }}>
              <Text preset="subheading" size="xs">
                Khẩu phần ăn
              </Text>
            </View>
            <View style={{ width: "54%" }}>
              <TextField
                value={"100 grams(g)"}
                status="disabled"
                inputWrapperStyle={[$wrapTextField, { opacity: 0.3 }]}
                style={$textFieldStyle}
                placeholder="bắt buộc"
              />
            </View>
          </View>
        </View>

        <Text preset="subheading" size="md" tx="addFoodScreen.nutritionalInfo" />

        <View style={$wrapContainer}>
          <View style={{ alignItems: "center", flexDirection: "row" }}>
            <View style={{ width: "44%", marginRight: spacing.small }}>
              <Text preset="subheading" size="xs">
                Kcal
              </Text>
            </View>
            <View style={{ width: "54%" }}>
              <TextField
                keyboardType="numeric"
                value={kcal}
                onChangeText={setKcal}
                inputWrapperStyle={$wrapTextField}
                style={$textFieldStyle}
                placeholder="bắt buộc"
              />
            </View>
          </View>

          <View
            style={{ alignItems: "center", flexDirection: "row", marginTop: spacing.extraLarge }}
          >
            <View style={{ width: "44%", marginRight: spacing.small }}>
              <Text preset="subheading" size="xs">
                Chất béo (g)
              </Text>
            </View>
            <View style={{ width: "54%" }}>
              <TextField
                keyboardType="numeric"
                value={fat}
                onChangeText={setFat}
                inputWrapperStyle={$wrapTextField}
                style={$textFieldStyle}
                placeholder="bắt buộc"
              />
            </View>
          </View>

          <View
            style={{ alignItems: "center", flexDirection: "row", marginTop: spacing.extraLarge }}
          >
            <View style={{ width: "44%", marginRight: spacing.small }}>
              <Text preset="subheading" size="xs">
                Carbs (g)
              </Text>
            </View>
            <View style={{ width: "54%" }}>
              <TextField
                keyboardType="numeric"
                value={carbs}
                onChangeText={setCarbs}
                inputWrapperStyle={$wrapTextField}
                style={$textFieldStyle}
                placeholder="bắt buộc"
              />
            </View>
          </View>

          <View
            style={{ alignItems: "center", flexDirection: "row", marginTop: spacing.extraLarge }}
          >
            <View style={{ width: "44%", marginRight: spacing.small }}>
              <Text preset="subheading" size="xs">
                Chất đạm (g)
              </Text>
            </View>
            <View style={{ width: "54%" }}>
              <TextField
                keyboardType="numeric"
                value={protein}
                onChangeText={setProtein}
                inputWrapperStyle={$wrapTextField}
                style={$textFieldStyle}
                placeholder="bắt buộc"
              />
            </View>
          </View>
        </View>
        <View
          style={{
            alignItems: "center",
          }}
        >
          <Button
            text="Xác nhận"
            preset="filled"
            onPress={handleUpdateFood}
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
    </>
  )
})

const $container: ViewStyle = {
  padding: spacing.tiny,
  paddingHorizontal: spacing.medium,
}
const $wrapHeading: ViewStyle = {
  height: Dimensions.get("window").height * 0.08,
  flexDirection: "row",
  marginBottom: spacing.large,
  padding: spacing.small,
  backgroundColor: "#FEC23E",
  borderRadius: 8,
  alignItems: "center",
  justifyContent: "space-between",
}

const $wrapContainer: ViewStyle = {
  marginTop: spacing.small,
  marginBottom: spacing.large,
  paddingHorizontal: spacing.medium + spacing.tiny,

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

const $wrapTextField: ViewStyle = {
  borderWidth: 0,
  borderRadius: 0,
  backgroundColor: "#FFFFFF",
  borderBottomWidth: 2,
}

const $textFieldStyle: TextStyle = {
  flex: 1,
  color: colors.text,
  fontSize: 16,
  height: 32,
  backgroundColor: "#FFFFFF",
  // https://github.com/facebook/react-native/issues/21720#issuecomment-532642093
  paddingVertical: 0,
  paddingHorizontal: spacing.small,
  marginVertical: spacing.micro,
  marginHorizontal: spacing.micro,
}
