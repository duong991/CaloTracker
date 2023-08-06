/* eslint-disable react/jsx-no-undef */
/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { observer } from "mobx-react-lite"
import React, { FC, useEffect, useMemo, useRef, useState } from "react"
import {
  TextInput,
  TextStyle,
  ViewStyle,
  Alert,
  ActivityIndicator,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native"
import { Button, Icon, Screen, Text, TextField, TextFieldAccessoryProps } from "../../components"
import { AppStackScreenProps } from "../../navigators"
import { colors, spacing } from "../../theme"
import { useHeader } from "../../utils/useHeader"
import { PlusSVG, CameraSVG } from "../../components/fileSVG"
import { FoodTable } from "./FoodTable"
// import { Camera, CameraType, FlashMode } from "expo-camera"
// import * as MediaLibrary from "expo-media-library"
import { useStores } from "../../models/helpers/useStores"
import { mealApi } from "../../services/api"
import { launchCameraAsync, useCameraPermissions, PermissionStatus } from "expo-image-picker"

interface AddMealScreenProps extends AppStackScreenProps<"AddMeal"> {}

type TArrayFood = {
  id: string
  name: string
  calories: number
  fat: number
  carbohydrates: number
  protein: number
  sizeServing: number
}

export const AddMealScreen: FC<AddMealScreenProps> = observer(function AddMealScreen(_props) {
  const navigation = _props.navigation
  const selectOptions = [
    { title: "Breakfast", value: "breakfast" },
    { title: "Meal", value: "meal" },
    { title: "Lunch", value: "lunch" },
  ]

  const { mealDetailStore, dateStore } = useStores()
  const {
    systemFood,
    userFood,
    getDetailFoodList,
    clearAllData,
    getTotalCalories,
    getTotalCarbohydrates,
    getTotalFat,
    getTotalProtein,
  } = mealDetailStore
  const arrFoodList = getDetailFoodList
  const calories = getTotalCalories.toFixed(0) + ""
  const fat = getTotalFat.toFixed(0) + ""
  const carbohydrates = getTotalCarbohydrates.toFixed(0) + ""
  const protein = getTotalProtein.toFixed(0) + ""

  const [name, setName] = React.useState("")
  const [description, setDescription] = React.useState("")
  const [flag, setFlag] = React.useState(false)

  // xử lý camera
  const [picture, setPicture] = useState(null)
  const [base64, setBase64] = useState(null)
  const [cameraPermissionInfomation, requestCameraPermission] = useCameraPermissions()
  async function verifyPermissions() {
    if (cameraPermissionInfomation.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestCameraPermission()

      return permissionResponse.granted
    }
    if (cameraPermissionInfomation.status === PermissionStatus.DENIED) {
      alert("You need to grant camera permissions to use this app")
      return false
    }
    return true
  }

  const takeImageHandler = async () => {
    const hasPermission = await verifyPermissions()

    if (!hasPermission) {
      return
    }

    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    })
    if (image?.assets[0]?.uri) {
      setPicture(image.assets[0].uri)
      setBase64(image.assets[0].base64)
    }
  }
  //= ===================================================================================

  function goToFoodScreen() {
    console.log("flag", flag)
    if (flag) {
      dateStore.mealFoodStoreModel.fetchUserMeals()
    }
    navigation.navigate("Demo")
  }

  function goToAddFoodForScreen() {
    navigation.navigate("AddFoodForMeal")
  }

  useEffect(() => {
    async function fetchData() {
      if (dateStore.mealFoodStoreModel.foodsForList.length === 0) {
        Promise.all([
          dateStore.mealFoodStoreModel.fetchFoods(),
          dateStore.mealFoodStoreModel.fetchUserFoods(),
        ])
      }
    }
    fetchData()
  }, [])

  const handleCreateNewMeal = async () => {
    if (name === "" || description === "") {
      Alert.alert("Vui lòng nhập đầy đủ thông tin")
    } else {
      const res = await mealApi.createMeal({
        name,
        description,
        calories: +calories,
        fat: +fat,
        image: base64,
        carbohydrates: +carbohydrates,
        protein: +protein,
        userFood,
        mealType: "breakfast",
        systemFood,
      })

      if (res.kind === "ok") {
        setFlag(true)
        clearAllData()
        setName("")
        setDescription("")
        setPicture(null)
        alert("Thêm món thành công")
      } else {
        alert("Thêm món thất bại")
      }
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
          <View style={{ width: "50%" }}>
            <Text preset="subheading" size="md" tx="addMealScreen.title" />
          </View>
          <View
            style={{
              width: "35%",
              justifyContent: "flex-end",
              alignItems: "flex-end",
            }}
          >
            <TouchableOpacity onPress={handleCreateNewMeal}>
              <Icon icon="check" color={colors.mainText} size={30} />
            </TouchableOpacity>
          </View>
        </View>
        <Text preset="subheading" size="md" tx="addMealScreen.basicInfo" />

        <View style={$wrapContainer}>
          <View style={{ alignItems: "center", flexDirection: "row" }}>
            <View style={{ width: "44%", marginRight: spacing.small }}>
              <Text preset="subheading" size="xs">
                Tên món mới
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
                Mô tả
              </Text>
            </View>
            <View style={{ width: "54%" }}>
              <TextField
                keyboardType="default"
                value={description}
                onChangeText={setDescription}
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
                Kcal
              </Text>
            </View>
            <View style={{ width: "54%" }}>
              <TextField
                status="disabled"
                value={calories}
                inputWrapperStyle={[$wrapTextField, $textFieldDisabledStyle]}
                style={$textFieldStyle}
                placeholder="0"
              />
            </View>
          </View>

          <View
            style={{ alignItems: "center", flexDirection: "row", marginTop: spacing.extraLarge }}
          >
            <View style={{ width: "44%", marginRight: spacing.small }}>
              <Text preset="subheading" size="xs">
                Protein
              </Text>
            </View>
            <View style={{ width: "54%" }}>
              <TextField
                status="disabled"
                value={protein}
                inputWrapperStyle={[$wrapTextField, $textFieldDisabledStyle]}
                style={$textFieldStyle}
                placeholder="0"
              />
            </View>
          </View>

          <View
            style={{ alignItems: "center", flexDirection: "row", marginTop: spacing.extraLarge }}
          >
            <View style={{ width: "44%", marginRight: spacing.small }}>
              <Text preset="subheading" size="xs">
                Carbohydrates
              </Text>
            </View>
            <View style={{ width: "54%" }}>
              <TextField
                status="disabled"
                value={carbohydrates}
                inputWrapperStyle={[$wrapTextField, $textFieldDisabledStyle]}
                style={$textFieldStyle}
                placeholder="0"
              />
            </View>
          </View>

          <View
            style={{ alignItems: "center", flexDirection: "row", marginTop: spacing.extraLarge }}
          >
            <View style={{ width: "44%", marginRight: spacing.small }}>
              <Text preset="subheading" size="xs">
                Fat
              </Text>
            </View>
            <View style={{ width: "54%" }}>
              <TextField
                status="disabled"
                value={fat}
                inputWrapperStyle={[$wrapTextField, $textFieldDisabledStyle]}
                style={$textFieldStyle}
                placeholder="0"
              />
            </View>
          </View>

          <View
            style={{ alignItems: "center", flexDirection: "row", marginTop: spacing.extraLarge }}
          >
            <View style={{ width: "44%", marginRight: spacing.small }}>
              <Text preset="subheading" size="xs">
                Hình ảnh
              </Text>
            </View>

            <View style={{ width: "54%", paddingLeft: spacing.large }}>
              <TouchableOpacity onPress={takeImageHandler}>
                <View
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 50,
                    borderWidth: 0.56,
                    borderColor: colors.mainText,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#E6FFFD",
                  }}
                >
                  <CameraSVG size={28} />
                </View>
              </TouchableOpacity>
            </View>
          </View>
          {picture && (
            <View
              style={{
                alignItems: "center",
                flexDirection: "row",
                marginTop: spacing.medium,
              }}
            >
              <View
                style={{
                  borderWidth: 1,
                  borderRadius: 21,
                  width: 202,
                  height: 202,
                  borderColor: colors.border,
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 2,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                }}
              >
                <Image
                  source={{ uri: picture }}
                  style={{ width: 200, height: 200, borderRadius: 20 }}
                />
              </View>
            </View>
          )}
        </View>

        <Text preset="subheading" size="md" tx="addMealScreen.ingredientMeal" />

        <View style={arrFoodList.length < 0 ? $wrapContentArrFood : $wrapContentNotHasFood}>
          <Button
            text="Thêm thực phẩm"
            preset="default"
            onPress={goToAddFoodForScreen}
            style={{
              borderRadius: 4,
              minHeight: 10,
              width: "60%",
              borderWidth: 1,
            }}
            LeftAccessory={() => (
              <View style={{ marginRight: spacing.small }}>
                <PlusSVG size={12} />
              </View>
            )}
          />
        </View>
        {arrFoodList.length > 0 && (
          <View>
            <FoodTable />
          </View>
        )}
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

const $textFieldDisabledStyle: ViewStyle = {
  flex: 1,
  opacity: 0.5,
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

const $wrapContentArrFood: ViewStyle = {
  alignItems: "center",
  marginTop: spacing.extraLarge,
  backgroundColor: "#ffffff",
  padding: spacing.medium,
  borderRadius: 25,
  marginBottom: spacing.large,
}

const $wrapContentNotHasFood: ViewStyle = {
  alignItems: "center",
  marginTop: spacing.extraLarge,
}
