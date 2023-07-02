/* eslint-disable react/display-name */
/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, FC } from "react"
import { TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { Text, Icon, Calender } from "../../../components"
import { spacing, colors } from "../../../theme"
import DonutChart from "../../../components/DonutChart"
import { CalenderSVG } from "../../../components/fileSVG"
import _Line from "../../../components/Line"
import { useStores } from "app/models"
import { observer } from "mobx-react-lite"

type HeaderHomeProps = {
  calorPerDay: number
  carbG: number
  fatG: number
  proteinG: number
}

export const HeaderHome: FC<HeaderHomeProps> = observer(
  ({ calorPerDay, carbG, fatG, proteinG }) => {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false)

    const toggleDatePicker = () => {
      setDatePickerVisibility(!isDatePickerVisible)
    }
    const {
      dateStore: { dateTime, setDateTime, mealFoodStoreModel, exerciseStoreModel },
    } = useStores()

    // useEffect(() => {
    //   fetchData()
    // }, [dateTime])

    const handleConfirm = (dateTime) => {
      if (dateTime > new Date()) {
        setDateTime(new Date())
        toggleDatePicker()
        return
      }
      setDateTime(dateTime)
      toggleDatePicker()
    }

    const handleCancel = () => {
      toggleDatePicker()
    }

    const handleIncrementDate = () => {
      const nextDate = dateTime.setDate(dateTime.getDate() + 1)
      setDateTime(new Date(nextDate))
    }

    const handleDecrementDate = () => {
      const prevDate = dateTime.setDate(dateTime.getDate() - 1)
      setDateTime(new Date(prevDate))
    }

    const dateString = dateTime.toLocaleString("vi-VN", { day: "numeric", month: "short" })
    const today = new Date()
    const dayOfWeek =
      dateTime.getDate() === today.getDate() &&
      dateTime.getMonth() === today.getMonth() &&
      dateTime.getFullYear() === today.getFullYear()
        ? "Hôm nay"
        : dateTime.toLocaleDateString("vi-VN", { weekday: "long" }).split(",")[0]

    return (
      <>
        {isDatePickerVisible && (
          <Calender
            isVisible={isDatePickerVisible}
            onConfirm={handleConfirm}
            onCancel={handleCancel}
          />
        )}
        <View style={$wrapHeader}>
          <View style={$header}>
            <View style={$day}>
              <Text preset="subheading" size="xl">
                {dayOfWeek}
              </Text>
            </View>
            <View style={$calender}>
              <TouchableOpacity onPress={handleDecrementDate}>
                <Icon icon="caretLeft" color={colors.mainText} size={30} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={toggleDatePicker}
                style={{ flexDirection: "row", marginHorizontal: 4 }}
              >
                <CalenderSVG size={20} />
                <Text preset="default" size="sm">
                  {dateString}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleIncrementDate}>
                <Icon icon="caretRight" color={colors.mainText} size={30} />
              </TouchableOpacity>
            </View>
          </View>
          <View
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              width: "74%",
              borderBottomWidth: 1,
              borderBottomColor: "#143d54",
              marginBottom: 10,
              marginTop: -12,
              opacity: 0.5,
            }}
          />
          <View style={$calories}>
            <View>
              <Text preset="subheading" size="md" style={$textCenter}>
                {mealFoodStoreModel.dailyMeals.totalCalories}
              </Text>
              <Text preset="default" size="xs">
                Đã nạp
              </Text>
            </View>
            <DonutChart
              radius={84}
              color="#FEC23E"
              max={calorPerDay}
              percentage={mealFoodStoreModel.dailyMeals.totalCalories}
            />
            <View>
              <Text preset="subheading" size="md" style={$textCenter}>
                {exerciseStoreModel.totalCaloriesBurn}
              </Text>
              <Text preset="default" size="xs">
                Tiêu hao
              </Text>
            </View>
          </View>
          <View style={$bmr}>
            <View style={$itemBmr}>
              <_Line max={carbG} percentage={mealFoodStoreModel.dailyMeals.totalCarbs} />
              <Text preset="default" size="xs">
                Cab
              </Text>
            </View>
            <View style={$itemBmr}>
              <_Line max={fatG} percentage={mealFoodStoreModel.dailyMeals.totalFat} />
              <Text preset="default" size="xs">
                Fat
              </Text>
            </View>
            <View style={$itemBmr}>
              <_Line max={proteinG} percentage={mealFoodStoreModel.dailyMeals.totalProtein} />
              <Text preset="default" size="xs">
                Protein
              </Text>
            </View>
          </View>
        </View>
      </>
    )
  },
)

// Header CSS
const $wrapHeader: ViewStyle = {
  flex: 1,
  flexDirection: "column",
  justifyContent: "space-between",
  marginBottom: spacing.medium,
  alignItems: "center",
  padding: spacing.large + spacing.extraSmall,
  paddingHorizontal: spacing.extraSmall,
  backgroundColor: "#FFFFFF",
  borderRadius: 28,
}
const $header: ViewStyle = {
  flex: 1,
  flexDirection: "row",
  justifyContent: "space-between",
  marginBottom: spacing.medium + spacing.extraSmall,
  alignItems: "center",
  paddingHorizontal: spacing.extraSmall,
}

const $day: ViewStyle = {
  flex: 1,
}
const $calender: ViewStyle = {
  flexDirection: "row",
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
}

const $calories: ViewStyle = {
  flex: 1,
  width: "100%",
  flexDirection: "row",
  justifyContent: "space-evenly",
  alignItems: "center",
}

const $textCenter: TextStyle = {
  textAlign: "center",
}

const $bmr: ViewStyle = {
  flexDirection: "row",
  flex: 1,
  justifyContent: "space-between",
  width: "100%",
  paddingHorizontal: spacing.large,
  marginTop: spacing.medium,
}

const $itemBmr: ViewStyle = {
  justifyContent: "space-evenly",
  alignItems: "center",
}
