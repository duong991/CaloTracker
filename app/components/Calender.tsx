import React from "react"
import { View } from "react-native"
import DateTimePickerModal from "react-native-modal-datetime-picker"

export const Calender = ({ isVisible, onConfirm, onCancel }) => {
  const hideDatePicker = () => {
    onCancel()
  }

  const handleConfirm = (date) => {
    onConfirm(date)
  }

  return (
    <View>
      <DateTimePickerModal
        isVisible={isVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  )
}
