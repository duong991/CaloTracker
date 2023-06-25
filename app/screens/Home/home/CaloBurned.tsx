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
import { Exercise } from "../../../models/Exercise"

interface ContentProps {}

export const CaloBurned: FC<ContentProps> = observer(() => {
  const {
    dateStore,
    systemStore: { isOverlayVisible },
  } = useStores()
  const [visibleItems, setVisibleItems] = useState(3)
  const [isTabsVisible, setIsTabsVisible] = useState(false)
  const [textTabVisible, setTextTabVisible] = useState<"Xem thêm" | "Ẩn đi" | "">("")

  useEffect(() => {
    const selectedExercises = dateStore.exerciseStoreModel.exercisesSelectedForList
    setIsTabsVisible(selectedExercises.length > 0)
    if (selectedExercises.length > 3 && visibleItems === 3) {
      setTextTabVisible("Xem thêm")
    } else if (selectedExercises.length > 3 && visibleItems >= selectedExercises.length) {
      setTextTabVisible("Ẩn đi")
    } else {
      setTextTabVisible("")
    }
  }, [isOverlayVisible, dateStore.exerciseStoreModel.exercisesSelectedForList.length, visibleItems])
  return (
    <View style={$wrapContent}>
      <Title
        leftText="Bài tập trong ngày"
        rightText={`${dateStore.exerciseStoreModel.totalCaloriesBurn} kcal`}
      />
      {/* Header */}
      {dateStore.exerciseStoreModel.exercisesSelectedForList
        .slice(0, visibleItems)
        .map((item, index) => (
          <ItemCard
            key={index}
            item={item}
            isSelected={true}
            onPressDetail={() => {
              console.log("onPressDetail")
            }}
            onPressAdd={() => {
              console.log("onPressAdd")
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
  isSelected,
  onPressDetail,
  onPressAdd,
}: {
  item: Exercise
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
            {item.nameEx}
          </Text>
        </View>
      }
      content={`${item.caloriesBurned} kcal - ${item.duration} phút`}
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
