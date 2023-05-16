/* eslint-disable react/display-name */
/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, memo } from "react"
import { TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { Text, Icon, Calender } from "../../../components"
import { spacing, colors } from "../../../theme"
import DonutChart from "../../../components/DonutChart"
import { CalenderSVG } from "../../../components/fileSVG"
import _Line from "../../../components/Line"

export const HeaderHome = () => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false)
  const [date, setDate] = useState(new Date())
  const toggleDatePicker = () => {
    setDatePickerVisibility(!isDatePickerVisible)
  }

  const handleConfirm = (date) => {
    if (date > new Date()) {
      setDate(new Date())
      toggleDatePicker()
      return
    }
    setDate(date)
    toggleDatePicker()
  }

  const handleCancel = () => {
    toggleDatePicker()
  }

  const handleIncrementDate = () => {
    const nextDate = date.setDate(date.getDate() + 1)
    setDate(new Date(nextDate))
  }

  const handleDecrementDate = () => {
    const prevDate = date.setDate(date.getDate() - 1)
    setDate(new Date(prevDate))
  }

  const dateString = date.toLocaleString("vi-VN", { day: "numeric", month: "short" })
  const today = new Date()
  const dayOfWeek =
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
      ? "Hôm nay"
      : date.toLocaleDateString("vi-VN", { weekday: "long" }).split(",")[0]

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
            borderBottomWidth: 2,
            borderBottomColor: "#143d54",
            marginBottom: 10,
            marginTop: -12,
            opacity: 0.5,
          }}
        />
        <View style={$calories}>
          <View>
            <Text preset="subheading" size="md" style={$textCenter}>
              1500
            </Text>
            <Text preset="default" size="xs">
              Đã nạp
            </Text>
          </View>
          <DonutChart radius={84} color="#FEC23E" />
          <View>
            <Text preset="subheading" size="md" style={$textCenter}>
              1500
            </Text>
            <Text preset="default" size="xs">
              Tiêu hao
            </Text>
          </View>
        </View>
        <View style={$bmr}>
          <View style={$itemBmr}>
            <_Line />
            <Text preset="default" size="xs">
              Cab
            </Text>
          </View>
          <View style={$itemBmr}>
            <_Line />
            <Text preset="default" size="xs">
              Fat
            </Text>
          </View>
          <View style={$itemBmr}>
            <_Line />
            <Text preset="default" size="xs">
              Protein
            </Text>
          </View>
        </View>
      </View>
    </>
  )
}

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
