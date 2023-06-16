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
import { Food } from "../../models/Food"

interface AddDailyFoodScreenProps extends AppStackScreenProps<"AddDailyFood"> {}

export const AddDailyFoodScreen: FC<AddDailyFoodScreenProps> = observer(function AddDailyFoodScreen(
  _props,
) {
  const navigation = _props.navigation

  const route = useRoute()

  const [screen, setScreen] = useState<"Dinner" | "Lunch" | "Breakfast" | "Snack" | "">("")
  const [title, setTitle] = useState("")
  const { mealFoodStore, dailyMealsModel } = useStores()

  const [displayFood, setDisplayFood] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSelected, setIsSelected] = useState(false)

  const {
    breakfastFoods,
    breakfastMeals,
    lunchFoods,
    lunchMeals,
    snacksFoods,
    snacksMeals,
    dinnerFoods,
    dinnerMeals,
  } = dailyMealsModel
  const actions = useMemo(() => {
    switch (screen) {
      case "Dinner":
        return {
          addMeal: dailyMealsModel.addMealToDinner,
          removeMeal: dailyMealsModel.removeMealFromDinner,
          addFood: dailyMealsModel.addFoodToDinner,
          removeFood: dailyMealsModel.removeFoodFromDinner,
          arrSelectedFoodId: dinnerFoods.map((item) => item.id),
          arrSelectedMealId: dinnerMeals.map((item) => item.id),
        }
      case "Lunch":
        return {
          addMeal: dailyMealsModel.addMealToLunch,
          removeMeal: dailyMealsModel.removeMealFromLunch,
          addFood: dailyMealsModel.addFoodToLunch,
          removeFood: dailyMealsModel.removeFoodFromLunch,
          arrSelectedFoodId: lunchFoods.map((item) => item.id),
          arrSelectedMealId: lunchMeals.map((item) => item.id),
        }
      case "Breakfast":
        return {
          addMeal: dailyMealsModel.addMealToBreakfast,
          removeMeal: dailyMealsModel.removeMealFromBreakfast,
          addFood: dailyMealsModel.addFoodToBreakfast,
          removeFood: dailyMealsModel.removeFoodFromBreakfast,
          arrSelectedFoodId: breakfastFoods.map((item) => item.id),
          arrSelectedMealId: breakfastMeals.map((item) => item.id),
        }
      case "Snack":
        return {
          addMeal: dailyMealsModel.addMealToSnacks,
          removeMeal: dailyMealsModel.removeMealFromSnacks,
          addFood: dailyMealsModel.addFoodToSnacks,
          removeFood: dailyMealsModel.removeFoodFromSnacks,
          arrSelectedFoodId: snacksFoods.map((item) => item.id),
          arrSelectedMealId: snacksMeals.map((item) => item.id),
        }
      default:
        return {}
    }
  }, [screen, mealFoodStore])

  useEffect(() => {
    setScreen(route.params.data as string)
    switch (screen) {
      case "Dinner":
        setTitle("Bữa tối")
        break
      case "Lunch":
        setTitle("Bữa trưa")
        break
      case "Breakfast":
        setTitle("Bữa sáng")
        break
      case "Snack":
        setTitle("Bữa phụ")
        break
      default:
        break
    }
  }, [navigation, screen])

  useEffect(() => {
    ;(async function load() {
      setIsLoading(true)
      await Promise.all([mealFoodStore.fetchFoods(), mealFoodStore.fetchMeals()])
      setIsLoading(false)
    })()
  }, [mealFoodStore])

  async function manualRefresh() {
    setRefreshing(true)
    await Promise.all([mealFoodStore.fetchFoods(), mealFoodStore.fetchMeals(), delay(750)])
    setRefreshing(false)
  }

  function goBack() {
    navigation.navigate("Demo")
  }

  const handleToggle = () => {
    setDisplayFood(!displayFood)
  }
  console.log(actions.arrSelectedFoodId.includes(1))
  console.log(mealFoodStore.foodsForList.map((item) => item.id))
  return (
    <FixedHeader
      handleGoBack={goBack}
      title={title}
      isDisplayToggle={true}
      displayFood={displayFood}
      handleToggle={handleToggle}
    >
      {displayFood ? (
        <FlatList<Food>
          data={mealFoodStore.foodsForList}
          contentContainerStyle={$flatListContentContainer}
          refreshing={refreshing}
          onRefresh={manualRefresh}
          ListEmptyComponent={isLoading ? <ActivityIndicator /> : <></>}
          renderItem={({ item, index }) =>
            actions.arrSelectedFoodId?.includes(item.id) ? (
              <ItemCard
                key={index}
                item={item}
                isSelected={true}
                onPressDetail={() => actions.removeFood(item)}
                onPressAdd={() => {
                  actions.removeFood(item)
                  setIsSelected(!isSelected)
                }}
              />
            ) : (
              <ItemCard
                key={index}
                item={item}
                isSelected={false}
                onPressDetail={() => actions.removeFood(item)}
                onPressAdd={() => {
                  actions.addFood(item)
                  setIsSelected(!isSelected)
                }}
              />
            )
          }
        />
      ) : (
        <FlatList<Meal>
          data={mealFoodStore.mealsForList}
          contentContainerStyle={$flatListContentContainer}
          refreshing={refreshing}
          onRefresh={manualRefresh}
          ListEmptyComponent={isLoading ? <ActivityIndicator /> : <></>}
          renderItem={
            ({ item, index }) => <></>
            // mealFoodStore.selectedMeal.includes(item) ? (
            //   <ItemCard
            //     key={index}
            //     item={item}
            //     onPressDetail={() => mealFoodStore.removeMeal(item)}
            //     isSelected={true}
            //     onPressAdd={() => {
            //       setIsSelected(!isSelected)
            //       mealFoodStore.removeMeal(item)
            //       actions.removeMeal(item)
            //     }}
            //   />
            // ) : (
            //   <ItemCard
            //     key={index}
            //     item={item}
            //     isSelected={false}
            //     onPressDetail={() => mealFoodStore.addMeal(item)}
            //     onPressAdd={() => {
            //       setIsSelected(!isSelected)
            //       mealFoodStore.addMeal(item)
            //       actions.addMeal(item)
            //     }}
            //   />
            // )
          }
        />
      )}
    </FixedHeader>
  )
})

const ItemCard = observer(function ItemCard({
  item,
  isSelected,
  onPressDetail,
  onPressAdd,
}: {
  item: Food | Meal
  isSelected: boolean
  onPressDetail: () => void
  onPressAdd: () => void
}) {
  const [a, seta] = useState(isSelected)
  const handlePressFavorite = () => {
    onPressDetail()
  }

  const handlePressCard = () => {
    console.log("handlePressCard")
  }

  const handlePressAdd = () => {
    onPressAdd()
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
            {item.name}
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
