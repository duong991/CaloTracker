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
import { Food } from "../../models/Food"
// import { DailyFood } from "app/models/DailyFoodModel"

interface AddFoodForMealScreenProps extends AppStackScreenProps<"AddFoodForMeal"> {}

export const AddFoodForMealScreen: FC<AddFoodForMealScreenProps> = observer(
  function AddFoodForMealScreen(_props) {
    const navigation = _props.navigation

    const route = useRoute()

    const { dateStore } = useStores()

    const [typeOfFood, setTypeOfFood] = useState(true)
    const [refreshing, setRefreshing] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const [foodSelected, setFoodSelected] = useState<Food[]>([])

    useEffect(() => {
      ;(async function load() {
        setIsLoading(true)
        await Promise.all([
          dateStore.mealFoodStoreModel.fetchFoods(),
          dateStore.mealFoodStoreModel.fetchUserFoods(),
          delay(200),
        ])
        setIsLoading(false)
      })()
    }, [dateStore.mealFoodStoreModel])

    function goBack() {
      navigation.navigate("AddMeal")
    }

    const handleToggle = () => {
      setTypeOfFood(!typeOfFood)
    }
    return (
      <FixedHeader
        handleGoBack={goBack}
        title={"Chọn thực phẩm cho món ăn"}
        isAddFoodForMeal={true}
        handleToggle={handleToggle}
      >
        <FlatList<Food>
          data={
            typeOfFood ? dateStore.mealFoodStoreModel.foods : dateStore.mealFoodStoreModel.userFoods
          }
          contentContainerStyle={$flatListContentContainer}
          refreshing={refreshing}
          ListEmptyComponent={isLoading ? <ActivityIndicator /> : <></>}
          renderItem={({ item, index }) => (
            <ItemCard
              key={item.id}
              item={item}
              // isSelected={dateStore.mealFoodStoreModel.hasFoodList(item, screen)}
              onPressDetail={() => console.log("Food")}
              // onPressToggle={() => dateStore.mealFoodStoreModel.toggleFood(item, screen)}
            />
          )}
        />
      </FixedHeader>
    )
  },
)

const ItemCard = observer(function ItemCard({
  item,
  //   isSelected,
  onPressDetail,
}: //   onPressToggle,
{
  item: Food
  //   isSelected: boolean
  onPressDetail: () => void
  //   onPressToggle: () => void
}) {
  const [a, seta] = useState()
  const handlePressFavorite = () => {
    onPressDetail()
  }
  //   useEffect(() => {
  //     seta(isSelected)
  //   }, [isSelected])

  const handlePressCard = () => {
    onPressDetail()
    console.log("handlePressCard")
  }

  const handlePressAdd = () => {
    // onPressToggle()
    // seta(!a)
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
