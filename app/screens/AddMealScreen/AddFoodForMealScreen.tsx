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
import {
  Text,
  ListItem,
  EmptyState,
  Card,
  Toggle,
  ModalFoodMacro,
  QuantityModal,
} from "../../components"
import { AppStackScreenProps } from "../../navigators"
import { FixedHeader } from "../../components/FixedHeader"
import { useStores } from "../../models"
import { delay } from "../../utils/delay"
import { colors, spacing } from "../../theme"
import { PlusSVG, TickSVG } from "../../components/fileSVG"
import { useRoute } from "@react-navigation/native"
import { Food } from "../../models/Food"
import { DailyFood } from "app/models/DailyFoodModel"

interface AddFoodForMealScreenProps extends AppStackScreenProps<"AddFoodForMeal"> {}

export const AddFoodForMealScreen: FC<AddFoodForMealScreenProps> = observer(
  function AddFoodForMealScreen(_props) {
    const navigation = _props.navigation

    const { dateStore, mealDetailStore } = useStores()

    // true: food, false: userFood
    const [typeOfFood, setTypeOfFood] = useState(true)

    const [refreshing, setRefreshing] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [itemSelected, setItemSelected] = useState<Food>()
    const [isModalVisible, setModalVisible] = useState(false)
    const [isQuantityModalVisible, setIsQuantityModalVisible] = useState(false)
    const handleOpenQuantityModal = (item: Food) => {
      setItemSelected(item)
      setIsQuantityModalVisible(true)
    }

    const handleCancelQuantityModal = () => {
      setIsQuantityModalVisible(false)
    }

    const handleOpenModal = (item: Food) => {
      setItemSelected(item)
      setModalVisible(true)
    }
    const handleSaveQuantityModal = (quantity: number) => {
      const idItem = +itemSelected.id.split("-")[1]
      const newItem = { id: idItem, servingSize: quantity }
      const newRecord = {
        id: idItem,
        servingSize: quantity,
        name: itemSelected.name,
        calories: (itemSelected.calories * quantity) / 100,
        protein: (itemSelected.protein * quantity) / 100,
        fat: (itemSelected.fat * quantity) / 100,
        carbohydrates: (itemSelected.carbohydrates * quantity) / 100,
      }
      if (typeOfFood) {
        mealDetailStore.addSystemFood(newItem.id, newItem.servingSize)
        mealDetailStore.addNewRecordToDetailFoodList(
          newRecord.id,
          newRecord.servingSize,
          newRecord.name,
          newRecord.calories,
          newRecord.protein,
          newRecord.fat,
          newRecord.carbohydrates,
        )
      } else {
        mealDetailStore.addUserFood(newItem.id, newItem.servingSize)
        mealDetailStore.addNewRecordToDetailFoodList(
          newRecord.id,
          newRecord.servingSize,
          newRecord.name,
          newRecord.calories,
          newRecord.protein,
          newRecord.fat,
          newRecord.carbohydrates,
        )
      }

      setIsQuantityModalVisible(false)
    }

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

    const handleRemove = (item: Food) => {
      const newId = +item.id.split("-")[1]
      if (typeOfFood) {
        mealDetailStore.removeSystemFood(newId)
        mealDetailStore.removeRecordFromDetailFoodList(newId)
      } else {
        mealDetailStore.removeUserFood(newId)
        mealDetailStore.removeRecordFromDetailFoodList(newId)
      }
    }
    return (
      <FixedHeader
        handleGoBack={goBack}
        title={"Chọn thực phẩm cho món ăn"}
        isAddFoodForMeal={true}
        handleToggle={handleToggle}
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
        <View style={$flatListContentContainer}>
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            (typeOfFood
              ? dateStore.mealFoodStoreModel.foods
              : dateStore.mealFoodStoreModel.userFoods
            ).map((item, index) => (
              <ItemCard
                key={item.id}
                item={item}
                isSelected={
                  typeOfFood
                    ? mealDetailStore.isSystemFoodHaveId(item.id)
                    : mealDetailStore.isUserFoodHaveId(item.id)
                }
                onOpenModal={() => handleOpenModal(item)}
                onPressToggle={(item) => handleOpenQuantityModal(item)}
                handleRemove={(item) => handleRemove(item)}
              />
            ))
          )}
        </View>
      </FixedHeader>
    )
  },
)

const ItemCard = observer(function ItemCard({
  item,
  isSelected,
  onOpenModal,
  onPressToggle,
  handleRemove,
}: //   onPressToggle,
{
  item: Food
  isSelected: boolean
  onOpenModal: (item: Food) => void
  onPressToggle: (item: any) => void
  handleRemove?: (item: Food) => void
}) {
  const [isClicked, setIsClicked] = useState(false)
  useEffect(() => {
    setIsClicked(isSelected)
  }, [isSelected])

  const handleIsClicked = () => {
    if (isClicked) {
      setIsClicked(false)
      handleRemove && handleRemove(item)
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
              {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
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
