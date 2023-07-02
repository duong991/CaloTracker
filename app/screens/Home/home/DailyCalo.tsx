/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, FC, useEffect, useMemo } from "react"
import { TouchableOpacity, View, ViewStyle, TextStyle, FlatList, Alert } from "react-native"
import { Text, Title, Card, Toggle, Icon } from "../../../components"
import { spacing } from "../../../theme"
import { useStores } from "app/models"
import { observer } from "mobx-react-lite"
import { colors } from "../../../theme/colors"
import { Meal } from "../../../models/Meal"
import { DailyFood } from "app/models/DailyFoodModel"
import { dailyCaloApi } from "app/services/api"
interface ContentProps {}

const btnSwap = [
  { id: 1, valueVi: "Bữa sáng", valueEn: "breakfast" },
  { id: 2, valueVi: "Bữa trưa", valueEn: "lunch" },
  { id: 3, valueVi: "Bữa tối", valueEn: "dinner" },
  { id: 4, valueVi: "Bữa phụ", valueEn: "snack" },
]

type TScreen = "breakfast" | "lunch" | "dinner" | "snack"

export const DailyCalo: FC<ContentProps> = observer(() => {
  const {
    dailyMealsModel,
    dateStore,
    systemStore: { isOverlayVisible },
  } = useStores()
  const [displayFood, setDisplayFood] = useState(true)
  const [data, setData] = useState({ foods: [], meals: [] })
  const [mealIsSelected, setMealIsSelected] = useState(1)
  const [totalCalo, setTotalCalo] = useState(0)
  const [title, setTitle] = useState("")
  const [visibleItems, setVisibleItems] = useState(3)
  const [isTabsVisible, setIsTabsVisible] = useState(false)
  const [textTabVisible, setTextTabVisible] = useState<"Xem thêm" | "Ẩn đi" | "">("")

  const updateDataAndTabs = (mealType) => {
    const selectedFoods = dateStore.mealFoodStoreModel.selectedFoodForList(mealType)
    const selectedMeals = dateStore.mealFoodStoreModel.selectedMealForList(mealType)
    const totalCalories =
      dateStore.mealFoodStoreModel.dailyMeals[
        `totalCaloFor${mealType.charAt(0).toUpperCase() + mealType.slice(1)}` // totalCaloForBreakfast
      ]

    setData({ foods: selectedFoods, meals: selectedMeals })
    if (displayFood) {
      setIsTabsVisible(selectedFoods.length > 0)

      if (selectedFoods.length > 3 && visibleItems === 3) {
        setTextTabVisible("Xem thêm")
      } else if (selectedFoods.length > 3 && visibleItems >= selectedFoods.length) {
        setTextTabVisible("Ẩn đi")
      } else {
        setTextTabVisible("")
      }
    } else {
      setIsTabsVisible(selectedMeals.length > 0)
      if (selectedMeals.length > 3 && visibleItems === 3) {
        setTextTabVisible("Xem thêm")
      } else if (selectedMeals.length > 3 && visibleItems >= selectedMeals.length) {
        setTextTabVisible("Ẩn đi")
      } else {
        setTextTabVisible("")
      }
    }
    setTitle(
      `${btnSwap.find((btn) => btn.valueEn === mealType).valueVi} - ${totalCalories.toFixed(
        1,
      )} kcal`,
    )
  }

  useEffect(() => {
    updateDataAndTabs(btnSwap[mealIsSelected - 1].valueEn)
    setVisibleItems(3)
  }, [isOverlayVisible])

  useEffect(() => {
    setTotalCalo(dateStore.mealFoodStoreModel.dailyMeals.totalCalories)
    updateDataAndTabs(btnSwap[mealIsSelected - 1].valueEn)
  }, [
    dailyMealsModel,
    mealIsSelected,
    displayFood,
    visibleItems,
    dateStore.mealFoodStoreModel.dailyMeals.totalCalories,
  ])

  const handleOnPressBtnSwap = (idChoose: number) => {
    setMealIsSelected(idChoose)
    setVisibleItems(3)
  }

  const handleToggle = () => {
    setDisplayFood(!displayFood)
    setVisibleItems(3)
  }

  const handleDeleteItemFood = async (item: DailyFood) => {
    if (displayFood) {
      const labelId = item.id.split("-")[0]
      const foodId = +item.id.split("-")[1]
      let type: "food" | "userFood"
      if (labelId === "SYSTEMFOOD") {
        type = "food"
      } else {
        type = "userFood"
      }
      const date = dateStore.getDateStore().dateTime
      date.setHours(0)
      date.setMinutes(0)
      date.setSeconds(0)
      date.setMilliseconds(0)
      const data = {
        id: foodId,
        date,
        type,
      }
      const res = await dailyCaloApi.delete_Item_CaloIntake(data)
      if (res.kind === "ok") {
        dateStore.mealFoodStoreModel.removeFood(
          item,
          btnSwap[mealIsSelected - 1].valueEn as TScreen,
        )
      } else {
        Alert.alert("Xóa thất bại")
      }
    }
  }

  const handleDeleteItemMeal = async (item: Meal) => {
    if (!displayFood) {
      const labelId = item.id.split("-")[0]
      const mealId = +item.id.split("-")[1]
      let type: "meal" | "userMeal"
      if (labelId === "SYSTEMMEAL") {
        type = "meal"
      } else {
        type = "userMeal"
      }
      const date = dateStore.getDateStore().dateTime
      date.setHours(0)
      date.setMinutes(0)
      date.setSeconds(0)
      date.setMilliseconds(0)
      const data = {
        id: mealId,
        date,
        type,
      }
      const res = await dailyCaloApi.delete_Item_CaloIntake(data)
      if (res.kind === "ok") {
        dateStore.mealFoodStoreModel.removeMeal(
          item,
          btnSwap[mealIsSelected - 1].valueEn as TScreen,
        )
      } else {
        Alert.alert("Xóa thất bại")
      }
    }
  }
  return (
    <View style={$wrapContent}>
      <Title leftText="Lượng calo tiêu thụ" rightText={totalCalo + " kcal"} />

      <View
        style={{
          height: 50,
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 12,
        }}
      >
        {btnSwap.map((item, index) => {
          return (
            <TouchableOpacity key={item.id} onPress={() => handleOnPressBtnSwap(item.id)}>
              <View style={mealIsSelected === item.id ? [$btnStyle, $isActived] : $btnStyle}>
                <Text size="sm" preset="subheading" style={$btnTextStyle}>
                  {item.valueVi}
                </Text>
              </View>
            </TouchableOpacity>
          )
        })}
      </View>
      {/* Header */}
      <View style={$wrapContentDailyMeal}>
        <Text size="sm" preset="subheading" style={$subTitleStyle}>
          {title}
        </Text>
        <Toggle value={displayFood} onValueChange={handleToggle} variant="switch" />
      </View>
      <View style={{ justifyContent: "center", alignItems: "center", opacity: 0.6 }}>
        <Text size="sm" preset="subheading">
          {displayFood ? "Danh sách thực phẩm" : "Danh sách món ăn"}
        </Text>
      </View>
      {/* List food */}
      {displayFood
        ? data.foods
            .slice(0, visibleItems)
            .map((item, index) => (
              <ItemCard
                key={index}
                item={item}
                handleRemoveItem={() => handleDeleteItemFood(item)}
              />
            ))
        : data.meals.slice(0, visibleItems).map((item, index) => (
            <ItemCard
              key={index}
              item={item}
              handleRemoveItem={() => {
                handleDeleteItemMeal(item)
              }}
            />
          ))}
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
  )
})

const ItemCard = observer(function ItemCard({
  item,
  handleRemoveItem,
}: {
  item: DailyFood | Meal
  handleRemoveItem?: () => void
}) {
  const [title, setTitle] = useState("")
  useEffect(() => {
    if ("servingSize" in item && item.servingSize !== null && item.servingSize > 0) {
      setTitle(item.name + " - " + item.servingSize + " rg")
    } else {
      setTitle(item.name)
    }
  }, [item])

  const handleRemove = () => {
    Alert.alert("Xóa khỏi danh sách", "Bạn có chắc chắn muốn xóa?", [
      {
        text: "Không",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "Có", onPress: () => handleRemoveItem() },
    ])
  }

  return (
    <Card
      style={$item}
      HeadingComponent={
        <View style={$metadata}>
          <Text style={$metadataText} size="xs">
            {title}
          </Text>
        </View>
      }
      content={`${item.calories} kcal`}
      RightComponent={
        <TouchableOpacity onPress={handleRemove}>
          <View style={$buttonOfSearchInput}>
            <Icon icon="x" color={colors.mainText} size={20} />
          </View>
        </TouchableOpacity>
      }
    />
  )
})
// Content CSS
const $wrapContent: ViewStyle = {
  flex: 1,
  flexDirection: "column",
  justifyContent: "space-between",
  marginBottom: spacing.extraSmall,
  padding: spacing.large,
  backgroundColor: "#FFFFFF",
  borderRadius: 28,
}

const $wrapContentDailyMeal: ViewStyle = {
  flex: 1,
  flexDirection: "row",
  justifyContent: "space-between",
  marginBottom: spacing.extraSmall,
  padding: spacing.medium,
  backgroundColor: "rgba(34,166,153,0.7)",
  borderRadius: 12,
  borderWidth: 1,
}

const $btnStyle: ViewStyle = {
  height: 48,
  alignItems: "center",
  justifyContent: "center",
  width: 80,
  borderWidth: 1,
  marginBottom: spacing.small,
  borderRadius: 18,
  opacity: 0.2,
}

const $btnTextStyle: TextStyle = {
  textDecorationLine: "underline",
  textDecorationStyle: "dotted",
  fontSize: 14,
}

const $subTitleStyle: TextStyle = {
  textDecorationLine: "underline",
  textDecorationStyle: "dotted",
}

const $item: ViewStyle = {
  paddingHorizontal: spacing.medium + spacing.tiny,
  marginTop: spacing.medium,
  minHeight: 30,
  borderRadius: 40 / 2,
}

const $metadata: TextStyle = {
  color: colors.textDim,
  flexDirection: "row",
}

const $metadataText: TextStyle = {
  color: colors.textDim,
  marginBottom: spacing.tiny,
}
const $buttonOfSearchInput: ViewStyle = {
  width: 40,
  height: 40,
  justifyContent: "center",
  alignItems: "center",
  opacity: 0.8,

  shadowRadius: 290,
  shadowColor: "#0F0E0E",
  shadowOpacity: 0.2,
}

const $isActived: ViewStyle = {
  opacity: 1,
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
