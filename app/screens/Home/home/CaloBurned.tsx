/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, FC, useEffect, useMemo } from "react"
import { TouchableOpacity, View, ViewStyle, TextStyle, FlatList, ScrollView } from "react-native"
import { Text, Title, Card } from "../../../components"
import { spacing } from "../../../theme"
import { useStores } from "app/models"
import { observer } from "mobx-react-lite"
import { colors } from "../../../theme/colors"
import { Meal } from "../../../models/Meal"
import { Food } from "../../../models/Food"

interface ContentProps {}

export const CaloBurned: FC<ContentProps> = observer(() => {
  const { dailyMealsModel } = useStores()
  const { combinedFoodsAndMeals } = dailyMealsModel
  const [displayFood, setDisplayFood] = useState(true)
  const [visibleItems, setVisibleItems] = useState(3)
  return (
    <View style={$wrapContent}>
      <Title leftText="Lượng calo tiêu thụ" rightText={"690kcal"} />
      {/* Header */}

      {/* List food */}
      {displayFood ? (
        <FlatList<Food>
          data={dailyMealsModel.breakfastFoods.slice(0, visibleItems)}
          nestedScrollEnabled={true}
          scrollEnabled={true}
          contentContainerStyle={$flatListContentContainer}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <ItemCard
              key={index}
              item={item}
              isSelected={true}
              onPressDetail={() => {
                console.log(dailyMealsModel.breakfastFoods.length, " Hlello")
              }}
              onPressAdd={() => {
                console.log("onPressAdd")
              }}
            />
          )}
        />
      ) : (
        <FlatList<Meal>
          data={dailyMealsModel.breakfastMeals}
          contentContainerStyle={$flatListContentContainer}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <ItemCard
              key={index}
              item={item}
              isSelected={true}
              onPressDetail={() => {
                console.log(dailyMealsModel.breakfastFoods.length, " Hlello")
              }}
              onPressAdd={() => {
                console.log("onPressAdd")
              }}
            />
          )}
        />
      )}
      {visibleItems < dailyMealsModel.breakfastFoods.length ? (
        <TouchableOpacity onPress={() => setVisibleItems(visibleItems + 4)}>
          <Text style={$loadMoreButton} preset="subheading">
            Xem thêm
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => setVisibleItems(3)}>
          <Text style={$loadMoreButton} preset="subheading">
            Ẩn bớt
          </Text>
        </TouchableOpacity>
      )}
    </View>
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
            {/* {a ? <TickSVG size={12} /> : <PlusSVG size={12} color="#191919" />} */}
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
  flexDirection: "column",
  justifyContent: "space-between",
  marginBottom: spacing.extraSmall,
  padding: spacing.medium,
  backgroundColor: "rgba(34,166,153,0.7)",
  borderRadius: 12,
  borderWidth: 1,
}

const $lineStyle: ViewStyle = {
  borderBottomWidth: 1,
  borderBottomColor: "#143d54",
  marginBottom: 40,
  marginTop: 40,
  opacity: 0.2,
}

const $flatListContentContainer: ViewStyle = {
  width: "100%",
  height: "100%",
  paddingBottom: spacing.medium,
  paddingHorizontal: spacing.medium,
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
  backgroundColor: "#EEEEEE",
  borderRadius: 40 / 2,
  opacity: 0.8,
  borderWidth: 0.5,

  shadowRadius: 290,
  shadowColor: "#0F0E0E",
  shadowOpacity: 0.2,
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
