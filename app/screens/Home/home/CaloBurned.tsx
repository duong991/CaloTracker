/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, FC, useEffect } from "react"
import { TouchableOpacity, View, ViewStyle, TextStyle, Alert } from "react-native"
import { Text, Title, Card, Icon } from "../../../components"
import { spacing } from "../../../theme"
import { useStores } from "app/models"
import { observer } from "mobx-react-lite"
import { colors } from "../../../theme/colors"
import { Exercise } from "../../../models/Exercise"
import { dailyCaloApi } from "app/services/api"
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

  const handleDeleteItem = async (item: Exercise) => {
    const date = dateStore.getDateStore().dateTime
    date.setHours(0)
    date.setMinutes(0)
    date.setSeconds(0)
    date.setMilliseconds(0)
    const data = {
      id: item.id,
      date,
    }
    const res = await dailyCaloApi.delete_Item_CaloConsumed(data)

    if (res.kind === "ok") {
      dateStore.exerciseStoreModel.removeExercise(item)
    } else {
      Alert.alert("Thông báo", "Có lỗi xảy ra, vui lòng thử lại sau")
    }
  }
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
            handleRemoveItem={() => {
              handleDeleteItem(item)
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
  item: Exercise
  handleRemoveItem: () => void
}) {
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
            {item.nameEx}
          </Text>
        </View>
      }
      content={`${item.caloriesBurned.toFixed(0)} kcal - ${item.duration} phút`}
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

const $loadMoreButton: TextStyle = {
  textAlign: "center",
  paddingVertical: 10,
  fontSize: 16,
  fontWeight: "bold",
  textDecorationLine: "underline",
  textDecorationStyle: "dotted",
  color: "#FEC23E",
}
