/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { observer } from "mobx-react-lite"
import React, { FC, useEffect, useState, useMemo } from "react"
import { View, TouchableOpacity, TextStyle, ViewStyle, ActivityIndicator } from "react-native"
import { Text, EmptyState, Card, ModalFoodMacro, QuantityModal } from "../../components"
import { AppStackScreenProps } from "../../navigators"
import { FixedHeader } from "../../components/FixedHeader"
import { useStores } from "../../models"
import { delay } from "../../utils/delay"
import { colors, spacing } from "../../theme"
import { PlusSVG, TickSVG } from "../../components/fileSVG"
import { useRoute } from "@react-navigation/native"
import { Meal } from "../../models/Meal"
// import { Food } from "../../models/Food"
import { DailyFood } from "app/models/DailyFoodModel"
import { debounce } from "lodash" // Sử dụng lodash để debounce\
import { dailyCaloApi } from "../../services/api"
interface AddDailyFoodScreenProps extends AppStackScreenProps<"AddDailyFood"> {}
type TScreen = "breakfast" | "lunch" | "dinner" | "snack"

export const AddDailyFoodScreen: FC<AddDailyFoodScreenProps> = observer(function AddDailyFoodScreen(
  _props,
) {
  const navigation = _props.navigation

  const route = useRoute()

  const [screen, setScreen] = useState<TScreen>()
  const [title, setTitle] = useState("")
  const { dateStore } = useStores()

  const [displayFood, setDisplayFood] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [isModalVisible, setModalVisible] = useState(false)
  const [itemSelected, setItemSelected] = useState<DailyFood | Meal>()

  const [visibleItems, setVisibleItems] = useState(20)
  const [isTabsVisible, setIsTabsVisible] = useState(false)
  const [textTabVisible, setTextTabVisible] = useState<"Xem thêm" | "Ẩn đi" | "">("")

  const [flag, setFlag] = useState(false)
  const [isQuantityModalVisible, setIsQuantityModalVisible] = useState(false)

  useEffect(() => {
    setFlag(false)
  }, [])

  useEffect(() => {
    setScreen(route.params.data as TScreen)
    switch (screen) {
      case "dinner":
        setTitle("Bữa tối")
        break
      case "lunch":
        setTitle("Bữa trưa")
        break
      case "breakfast":
        setTitle("Bữa sáng")
        break
      case "snack":
        setTitle("Bữa phụ")
        break
      default:
        break
    }
  }, [navigation, screen])

  useEffect(() => {
    ;(async function load() {
      setIsLoading(true)
      await Promise.all([
        dateStore.mealFoodStoreModel.fetchFoods(),
        dateStore.mealFoodStoreModel.fetchMeals(),
        dateStore.mealFoodStoreModel.fetchUserFoods(),
        dateStore.mealFoodStoreModel.fetchUserMeals(),
      ])

      // Thuật toán chuyển đổi mảng food và userFood thành mảng dailyFood
      dateStore.mealFoodStoreModel.convertArrFoodToDailyFood(
        dateStore.mealFoodStoreModel.foodsForList,
        dateStore.mealFoodStoreModel.userFoodsForList,
      )
      setIsLoading(false)
    })()
  }, [dateStore.mealFoodStoreModel.dailyFoods])

  async function manualRefresh() {
    setRefreshing(true)
    await Promise.all([
      dateStore.mealFoodStoreModel.fetchFoods(),
      dateStore.mealFoodStoreModel.fetchMeals(),
      delay(750),
    ])
    setRefreshing(false)
  }
  async function goBack() {
    if (flag) {
      const dataReq = dateStore.mealFoodStoreModel.dailyMeals.listFoodOrMealForUpdateDB
      const date = dateStore.getDateStore().dateTime
      date.setHours(0)
      date.setMinutes(0)
      date.setSeconds(0)
      date.setMilliseconds(0)

      const res = await dailyCaloApi.updateCaloIntake({
        date,
        foodId: dataReq.foodId,
        mealId: dataReq.mealId,
        userFoodId: dataReq.userFoodId,
        userMealId: dataReq.userMealId,
      })
      console.log("res", res)
      if (res.kind !== "ok") {
        alert("Có lỗi xảy ra")
      }
    }
    navigation.navigate("Demo")
  }

  const handleToggle = () => {
    setDisplayFood(!displayFood)
  }

  const handleOpenModal = (item: DailyFood | Meal) => {
    setItemSelected(item)
    setModalVisible(true)
  }

  const handleOpenQuantityModal = (item: DailyFood) => {
    setItemSelected(item)
    setIsQuantityModalVisible(true)
  }

  const handleCancelQuantityModal = () => {
    setIsQuantityModalVisible(false)
  }

  const handleSaveQuantityModal = (quantity: number) => {
    const idItem = +itemSelected.id.split("-")[1]
    const newItem = { id: idItem, servingSize: quantity }
    setFlag(true)
    dateStore.mealFoodStoreModel.addDailyFood(newItem, screen, itemSelected.isUserCreated)
    setIsQuantityModalVisible(false)
  }

  const handleSearch = debounce((text: string) => {
    if (text === "") {
      dateStore.mealFoodStoreModel.clearSearchFood()
    } else {
      dateStore.mealFoodStoreModel.fetchSearchFoodList(text)
    }
  }, 300)

  const handleRemoveFood = (item: DailyFood) => {
    setFlag(true)
    dateStore.mealFoodStoreModel.removeFood(item, screen)
  }

  return (
    <FixedHeader
      handleGoBack={goBack}
      title={title}
      isDisplayToggle={true}
      displayFood={displayFood}
      handleToggle={handleToggle}
      handleSearch={handleSearch}
    >
      {isModalVisible && (
        <ModalFoodMacro
          isModalVisible={isModalVisible}
          setModalVisible={setModalVisible}
          itemSelected={itemSelected}
        />
      )}
      {isQuantityModalVisible && (
        <QuantityModal
          title="Nhập số gram thực phẩm"
          isVisible={isQuantityModalVisible}
          onCancel={handleCancelQuantityModal}
          onConfirm={handleSaveQuantityModal}
        />
      )}
      {isLoading && <ActivityIndicator />}
      {displayFood ? (
        <View style={$flatListContentContainer}>
          {dateStore.mealFoodStoreModel.searchFoodList.length === 0
            ? dateStore.mealFoodStoreModel.dailyFoods
                .slice(0, visibleItems)
                .map((item, index) => (
                  <ItemCard
                    key={item.id}
                    item={item}
                    isSelected={dateStore.mealFoodStoreModel.hasFoodList(item, screen)}
                    onOpenModal={() => handleOpenModal(item)}
                    onPressToggle={(item) => handleOpenQuantityModal(item)}
                    handleRemove={() => handleRemoveFood(item)}
                  />
                ))
            : dateStore.mealFoodStoreModel.searchFoodList.map((item, index) => (
                <ItemCard
                  key={item.id}
                  item={item}
                  isSelected={dateStore.mealFoodStoreModel.hasFoodList(item, screen)}
                  onOpenModal={() => handleOpenModal(item)}
                  onPressToggle={(item) => handleOpenQuantityModal(item)}
                  handleRemove={() => dateStore.mealFoodStoreModel.removeFood(item, screen)}
                />
              ))}
        </View>
      ) : (
        <View style={$flatListContentContainer}>
          {[
            ...dateStore.mealFoodStoreModel.userMealsForList,
            ...dateStore.mealFoodStoreModel.mealsForList,
          ].map((item, index) => (
            <ItemCardMeal
              key={item.id}
              item={item}
              onOpenModal={() => handleOpenModal(item)}
              isSelected={dateStore.mealFoodStoreModel.hasMealList(item, screen)}
              onPressToggle={() => dateStore.mealFoodStoreModel.toggleMeal(item, screen)}
            />
          ))}
        </View>
      )}
    </FixedHeader>
  )
})

const ItemCard = observer(function ItemCard({
  item,
  isSelected,
  onOpenModal,
  onPressToggle,
  handleRemove,
}: {
  item: DailyFood | Meal
  isSelected: boolean
  onOpenModal: (item) => void
  onPressToggle: (item: any) => void
  handleRemove?: () => void
}) {
  const [isClicked, setIsClicked] = useState(false)

  useEffect(() => {
    setIsClicked(isSelected)
  }, [isSelected])

  const handleIsClicked = () => {
    if (isClicked) {
      setIsClicked(false)
      handleRemove && handleRemove()
    } else {
      onPressToggle(item)
    }
  }

  const handleLongPressCard = (item) => {
    onOpenModal(item)
  }

  return (
    <TouchableOpacity onLongPress={() => handleLongPressCard(item)}>
      <Card
        style={$item}
        HeadingComponent={
          <View style={$metadata}>
            <Text style={$metadataText} size="xs">
              {item.name.charAt(0).toUpperCase() + item.name.slice(1)} -{" "}
              {item.isUserCreated ? "Tự tạo" : "Mặc định"}
            </Text>
          </View>
        }
        content={`${item.calories} kcal`}
        RightComponent={
          <TouchableOpacity onPress={handleIsClicked}>
            <View style={$buttonOfSearchInput}>
              {isClicked ? <TickSVG size={12} /> : <PlusSVG size={12} color="#191919" />}
            </View>
          </TouchableOpacity>
        }
      />
    </TouchableOpacity>
  )
})

const ItemCardMeal = observer(function ItemCard({
  item,
  isSelected,
  onOpenModal,
  onPressToggle,
}: {
  item: DailyFood | Meal
  isSelected: boolean
  onOpenModal: (item) => void
  onPressToggle: () => void
}) {
  const [a, seta] = useState(isSelected)

  useEffect(() => {
    seta(isSelected)
  }, [isSelected])

  const handlePressAdd = () => {
    onPressToggle()
    seta(!a)
  }

  const handleLongPressCard = (item) => {
    onOpenModal(item)
  }

  return (
    <TouchableOpacity onLongPress={() => handleLongPressCard(item)}>
      <Card
        style={$item}
        // onPress={handlePressCard}
        // onPress={() => handleLongPressCard(item)}
        HeadingComponent={
          <View style={$metadata}>
            <Text style={$metadataText} size="xs">
              {item.name.charAt(0).toUpperCase() + item.name.slice(1)} -{" "}
              {item.isUserCreated ? "Tự tạo" : "Mặc định"}
            </Text>
          </View>
        }
        content={`${item.calories} kcal`}
        RightComponent={
          <TouchableOpacity onPress={handlePressAdd}>
            <View style={$buttonOfSearchInput}>
              {a ? <TickSVG size={12} /> : <PlusSVG size={12} color="#191919" />}
            </View>
          </TouchableOpacity>
        }
      />
    </TouchableOpacity>
  )
})

const $flatListContentContainer: ViewStyle = {
  paddingHorizontal: spacing.large,
  paddingTop: (spacing.extraLarge * 3) / 2,
  backgroundColor: colors.background,
  minHeight: "100%",
  paddingBottom: spacing.extraLarge * 5,
}

const $item: ViewStyle = {
  padding: spacing.tiny + spacing.tiny,
  paddingHorizontal: spacing.medium + spacing.tiny,
  marginTop: spacing.medium / 2,
  marginBottom: spacing.medium / 2,
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
const $buttonOfSearchInput: ViewStyle = {
  width: 40,
  height: 40,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#EEEEEE",
  borderRadius: 40 / 2,
  opacity: 0.8,
  borderWidth: 0.5,

  shadowRadius: 290,
  shadowColor: "#0F0E0E",
  shadowOpacity: 0.2,
}
