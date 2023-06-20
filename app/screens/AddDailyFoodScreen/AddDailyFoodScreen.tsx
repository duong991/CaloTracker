/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { observer } from "mobx-react-lite"
import React, { FC, useEffect, useState, useMemo } from "react"
import {
  View,
  TouchableOpacity,
  FlatList,
  TextStyle,
  ViewStyle,
  ActivityIndicator,
} from "react-native"
import { Text, ListItem, EmptyState, Card, Toggle } from "../../components"
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
  const { mealFoodStoreModel } = dateStore

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
      await Promise.all([mealFoodStoreModel.fetchFoods(), mealFoodStoreModel.fetchMeals()])

      mealFoodStoreModel.convertArrFoodToDailyFood(mealFoodStoreModel.foodsForList)
      setIsLoading(false)
    })()
  }, [mealFoodStoreModel])

  async function manualRefresh() {
    setRefreshing(true)
    await Promise.all([
      mealFoodStoreModel.fetchFoods(),
      mealFoodStoreModel.fetchMeals(),
      delay(750),
    ])
    setRefreshing(false)
  }

  function goBack() {
    navigation.navigate("Demo")
  }

  const handleToggle = () => {
    setDisplayFood(!displayFood)
  }

  return (
    <FixedHeader
      handleGoBack={goBack}
      title={title}
      isDisplayToggle={true}
      displayFood={displayFood}
      handleToggle={handleToggle}
    >
      {displayFood ? (
        <FlatList<DailyFood>
          data={dateStore.mealFoodStoreModel.dailyFoods}
          contentContainerStyle={$flatListContentContainer}
          refreshing={refreshing}
          onRefresh={manualRefresh}
          ListEmptyComponent={isLoading ? <ActivityIndicator /> : <></>}
          renderItem={({ item, index }) => (
            <ItemCard
              key={item.id}
              item={item}
              isSelected={mealFoodStoreModel.hasFoodList(item, screen)}
              onPressDetail={() => console.log("Food")}
              onPressToggle={() => mealFoodStoreModel.toggleFood(item, screen)}
            />
          )}
        />
      ) : (
        <FlatList<Meal>
          data={mealFoodStoreModel.mealsForList}
          contentContainerStyle={$flatListContentContainer}
          refreshing={refreshing}
          onRefresh={manualRefresh}
          ListEmptyComponent={isLoading ? <ActivityIndicator /> : <></>}
          renderItem={({ item, index }) => (
            <ItemCard
              key={item.id}
              item={item}
              onPressDetail={() => console.log("Meal")}
              isSelected={mealFoodStoreModel.hasMealList(item, screen)}
              onPressToggle={() => mealFoodStoreModel.toggleMeal(item, screen)}
            />
          )}
        />
      )}
    </FixedHeader>
  )
})

const ItemCard = observer(function ItemCard({
  item,
  isSelected,
  onPressDetail,
  onPressToggle,
}: {
  item: DailyFood | Meal
  isSelected: boolean
  onPressDetail: () => void
  onPressToggle: () => void
}) {
  const [a, seta] = useState(isSelected)
  const handlePressFavorite = () => {
    onPressDetail()
  }
  useEffect(() => {
    seta(isSelected)
  }, [isSelected])

  const handlePressCard = () => {
    onPressDetail()
    console.log("handlePressCard")
  }

  const handlePressAdd = () => {
    onPressToggle()
    seta(!a)
  }

  return (
    <Card
      style={$item}
      onPress={handlePressCard}
      onLongPress={handlePressFavorite}
      HeadingComponent={
        <View style={$metadata}>
          <Text style={$metadataText} size="xs">
            {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
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
  )
})

const $flatListContentContainer: ViewStyle = {
  paddingHorizontal: spacing.large,
  paddingTop: spacing.large + spacing.extraLarge,
  backgroundColor: colors.background,
  height: "100%",
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
