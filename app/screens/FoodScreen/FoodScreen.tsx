/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { observer } from "mobx-react-lite"
import React, { FC, useState, useEffect } from "react"
import {
  TextStyle,
  View,
  ViewStyle,
  Dimensions,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Alert,
} from "react-native"
import { Screen, Text, TextField, Toggle, Card, Icon } from "../../components"
import { DemoTabScreenProps } from "../../navigators/DemoNavigator"
import { spacing, colors } from "../../theme"
import { BulbSVG, PlusSVG } from "../../components/fileSVG"
import { AddButton } from "../../components/AddButton"
import { useStores } from "../../models"
import { TData, TScreenName } from "../Home/HomeScreen"
import { Meal } from "../../models/Meal"
import { Food, FoodModel, FoodSnapshotIn } from "../../models/Food"
import { foodApi, mealApi } from "app/services/api"
export const FoodScreen: FC<DemoTabScreenProps<"Food">> = observer(function FoodScreen(_props) {
  const { navigation } = _props

  const [activeTab, setActiveTab] = useState(0)
  // activeTab = 0 => Thuc pham | activeTab = 1 => Mon an

  const [isLoading, setIsLoading] = useState(false)
  const [visibleItems, setVisibleItems] = useState(10)
  const [isTabsVisible, setIsTabsVisible] = useState(false)
  const [textTabVisible, setTextTabVisible] = useState<"Xem thêm" | "Ẩn đi" | "">("")
  useEffect(() => {
    setIsShowList(false)
  }, [])
  const {
    systemStore: { isOverlayVisible, setOverLayVisible, isShowList, setIsShowList },
    dateStore,
  } = useStores()

  useEffect(() => {
    ;(async function load() {
      setIsLoading(true)
      await Promise.all([
        dateStore.mealFoodStoreModel.fetchUserFoods(),
        dateStore.mealFoodStoreModel.fetchUserMeals(),
      ])
      setIsLoading(false)
    })()
  }, [dateStore.mealFoodStoreModel.userFoodsForList, dateStore.mealFoodStoreModel.userMealsForList, dateStore.mealFoodStoreModel.fetchUserFoods, dateStore.mealFoodStoreModel.fetchUserMeals])

  function goToAddMeal() {
    navigation.navigate(activeTab ? "AddMeal" : "AddFood")
  }

  function goToEditMeal(data: Food | Meal) {
    navigation.navigate(activeTab ? "EditMeal" : "EditFood", { data })
  }

  const goToScreen = (screenName: TScreenName, data: TData) => {
    navigation.navigate(screenName, { data })
  }

  const handlePress = (index) => {
    setActiveTab(index)
  }

  const handleToggle = () => {
    setIsShowList(!isShowList)
    setVisibleItems(10)
  }

  const updateDataAndTabs = () => {
    if (activeTab === 0) {
      setIsTabsVisible(dateStore.mealFoodStoreModel.foodsForList.length > 0)
      if (dateStore.mealFoodStoreModel.foodsForList.length > 10 && visibleItems === 10) {
        setTextTabVisible("Xem thêm")
      } else if (
        dateStore.mealFoodStoreModel.foodsForList.length > 10 &&
        visibleItems >= dateStore.mealFoodStoreModel.foodsForList.length
      ) {
        setTextTabVisible("Ẩn đi")
      } else {
        setTextTabVisible("")
      }
    } else {
      setIsTabsVisible(dateStore.mealFoodStoreModel.userMealsForList.length > 0)
      if (dateStore.mealFoodStoreModel.userMealsForList.length > 10 && visibleItems === 10) {
        setTextTabVisible("Xem thêm")
      } else if (
        dateStore.mealFoodStoreModel.userMealsForList.length > 10 &&
        visibleItems >= dateStore.mealFoodStoreModel.userMealsForList.length
      ) {
        setTextTabVisible("Ẩn đi")
      } else {
        setTextTabVisible("")
      }
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <Screen preset="scroll" contentContainerStyle={$container} safeAreaEdges={["bottom", "top"]}>
        {/* Header */}
        <View style={$wrapHeader}>
          <View
            style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}
          >
            <Text preset="subheading" size="xl" style={$textHeader}>
              Món ăn của riêng bạn
            </Text>
            <Toggle value={isShowList} onValueChange={handleToggle} variant="switch" />
          </View>
          <View style={$wrapInput}>
            <View style={$search}>
              <TextField
                // value={authEmail}
                // onChangeText={setAuthEmail}
                autoCapitalize="none"
                autoComplete="off"
                autoCorrect={false}
                keyboardType="default"
                placeholder="Tìm kiếm"
                // onSubmitEditing={() => authPasswordInput.current?.focus()}
              />
            </View>
            <TouchableOpacity onPress={goToAddMeal}>
              <View style={$buttonOfSearchInput}>
                <PlusSVG size={20} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        {/*  ContentHeader */}
        <View style={$wrapContentHeader}>
          <View
            style={{
              flex: 1,
              borderRightWidth: 1,
              borderColor: "rgba(79, 94, 79, 0.33) ",
            }}
          >
            <TouchableOpacity
              style={[
                {
                  width: "100%",
                  height: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                },
                activeTab === 0 ? $activeTab : null,
              ]}
              onPress={() => handlePress(0)}
            >
              <Text preset="subheading" size="md" style={$textHeader}>
                Thực phẩm
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <TouchableOpacity
              style={[
                {
                  width: "100%",
                  height: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                },
                activeTab === 1 ? $activeTab : null,
              ]}
              onPress={() => handlePress(1)}
            >
              <Text preset="subheading" size="md" style={$textHeader}>
                Món ăn
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {isShowList ? (
          <View
            style={{
              marginTop: -40,
              minHeight: 400,
            }}
          >
            {activeTab === 0 ? (
              <View style={$flatListContentContainer}>
                {dateStore.mealFoodStoreModel.userFoodsForList
                  .slice(0, visibleItems)
                  .map((item, index) => (
                    <ItemCard key={item.id} item={item} onLongPress={() => goToEditMeal(item)} />
                  ))}
                {isLoading && <ActivityIndicator />}
              </View>
            ) : (
              <View style={$flatListContentContainer}>
                {dateStore.mealFoodStoreModel.userMealsForList
                  .slice(0, visibleItems)
                  .map((item, index) => (
                    <ItemCard key={item.id} item={item} onLongPress={() => goToEditMeal(item)} />
                  ))}
                {isLoading && <ActivityIndicator />}
              </View>
            )}

            {/* Load more */}
            {isTabsVisible ? (
              <TouchableOpacity
                onPress={() => {
                  if (textTabVisible === "Xem thêm") {
                    setVisibleItems(visibleItems + 5)
                  } else {
                    setVisibleItems(3)
                  }
                }}
              >
                <Text style={$loadMoreButton} preset="subheading">
                  {textTabVisible}
                </Text>
              </TouchableOpacity>
            ) : (
              <View>
                <Text style={$loadMoreButton} preset="subheading">
                  Không có dữ liệu
                </Text>
              </View>
            )}
          </View>
        ) : (
          <View style={$wrapContentContainer}>
            <View style={$tip}>
              <BulbSVG width={90} />
              <Text preset="subheading" size="md" style={$textHeader}>
                Có thể bạn chưa biết
              </Text>
            </View>
          </View>
        )}
      </Screen>
      <View
        style={
          isOverlayVisible
            ? {
                position: "absolute",
                top: 0,
                bottom: -100,
                right: 0,
                left: 0,
                zIndex: 1,
                backgroundColor: "rgba(0,0,0,0.21)",
              }
            : {}
        }
      />
      {/* Add Button */}
      {isShowList ? <></> : <AddButton goToScreen={goToScreen} />}
    </View>
  )
})

const ItemCard = observer(function ItemCard({
  item,
  onLongPress,
}: {
  item: Food | Meal
  onLongPress: (item: Food | Meal) => void
}) {
  const { dateStore } = useStores()

  const handleEdit = (item: Food | Meal) => {
    const id = item.id.substr(item.id.indexOf("-") + 1)
    const label: "USERFOOD" | "USERMEAL" = item.id.substr(0, item.id.indexOf("-")) as any
    onLongPress(item)
  }

  const handleDelete = async (item: Food | Meal) => {
    const id = item.id.substr(item.id.indexOf("-") + 1)
    const label: "USERFOOD" | "USERMEAL" = item.id.substr(0, item.id.indexOf("-")) as any
    if (label === "USERFOOD") {
      Alert.alert("Xóa thực phẩm", "Bạn có chắc chắn muốn xóa thực phẩm này?", [
        {
          text: "Hủy",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Xóa",
          onPress: async () => {
            const result = await foodApi.deleteFood(+id)
            if (result.kind === "ok") {
              dateStore.mealFoodStoreModel.fetchUserFoods()
            } else {
              Alert.alert("Xóa thất bại", "Có lỗi xảy ra, vui lòng thử lại sau")
            }
          },
        },
      ])
    } else if (label === "USERMEAL") {
      Alert.alert("Xóa bữa ăn", "Bạn có chắc chắn muốn xóa bữa ăn này?", [
        {
          text: "Hủy",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Xóa",
          onPress: async () => {
            const result = await mealApi.deleteMeal(+id)
            if (result.kind === "ok") {
              dateStore.mealFoodStoreModel.fetchUserMeals()
            } else {
              Alert.alert("Xóa thất bại", "Có lỗi xảy ra, vui lòng thử lại sau")
            }
          },
        },
      ])
    }
  }

  return (
    <Card
      style={$item}
      onPress={() => console.log("hello")}
      onLongPress={() => handleEdit(item)}
      HeadingComponent={
        <View style={$metadata}>
          <Text style={$metadataText} size="xs">
            {item.name}
          </Text>
        </View>
      }
      content={`${item.calories} kcal`}
      RightComponent={
        <TouchableOpacity onPress={() => handleDelete(item)}>
          <View style={{ width: 50, height: 50, justifyContent: "center", alignItems: "center" }}>
            <Icon icon="x" color={colors.mainText} size={20} />
          </View>
        </TouchableOpacity>
      }
    />
  )
})

const $container: ViewStyle = {
  paddingTop: spacing.tiny,
  paddingHorizontal: spacing.tiny,
}
// Header CSS
const $wrapHeader: ViewStyle = {
  flex: 1,
  height: Dimensions.get("window").height / 5,
  flexDirection: "column",
  marginBottom: spacing.tiny,
  padding: spacing.small,
  backgroundColor: "#FEC23E",
  borderRadius: 8,
  zIndex: 100,
}
const $textHeader: TextStyle = {
  color: "#143d54",
  opacity: 0.8,
}

const $wrapInput: ViewStyle = {
  flex: 1,
  flexDirection: "row",
  marginTop: spacing.small + (Dimensions.get("window").height / 5) * 0.1,
}

const $search: ViewStyle = {
  flex: 1,
  marginRight: spacing.extraSmall,
}
const $buttonOfSearchInput: ViewStyle = {
  width: 52,
  height: 52,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#FFFFFF",
  borderRadius: 45,
  marginStart: spacing.extraSmall,
  borderWidth: 1,
  borderColor: colors.palette.neutral400,
}
// Content CSS
const $wrapContentHeader: ViewStyle = {
  flex: 1,
  flexDirection: "row",
  justifyContent: "space-between",
  height: Dimensions.get("window").height / 16,
  backgroundColor: "#FFFFFF",
  borderRadius: 8,
  zIndex: 100,
}

const $flatListContentContainer: ViewStyle = {
  paddingHorizontal: spacing.large,
  paddingTop: spacing.large + spacing.extraLarge,
  backgroundColor: colors.background,
  height: "100%",
}

const $wrapContentContainer: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  height:
    Dimensions.get("window").height -
    (Dimensions.get("window").height / 5 +
      Dimensions.get("window").height / 16 +
      spacing.small * 2 +
      70),
  shadowColor: "#000000",
  shadowOffset: {
    width: 3,
    height: 3,
  },
  shadowOpacity: 0.25,
  shadowRadius: 4.59,
  elevation: 5,
  opacity: 0.7,
}

const $tip: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
  width: "85%",
  height: "80%",
  backgroundColor: "#ffffff",
  borderRadius: 8,
}

const $activeTab: ViewStyle = {
  borderBottomWidth: 2,
  borderColor: "#FEC23E",
  borderRadius: 4,
}

const $item: ViewStyle = {
  padding: spacing.tiny + spacing.tiny,
  paddingHorizontal: spacing.medium + spacing.tiny,
  marginTop: spacing.medium,
  minHeight: 40,
  borderRadius: 40 / 2,
}

const $metadata: TextStyle = {
  color: colors.textDim,
  flexDirection: "row",
}

const $metadataText: TextStyle = {
  color: colors.textDim,
  marginEnd: spacing.tiny,
  marginBottom: spacing.tiny,
}

const $loadMoreButton: TextStyle = {
  textAlign: "center",
  paddingVertical: 10,
  fontSize: 16,
  fontWeight: "bold",
  textDecorationLine: "underline",
  textDecorationStyle: "dotted",
  color: "#FEC23E",
}
