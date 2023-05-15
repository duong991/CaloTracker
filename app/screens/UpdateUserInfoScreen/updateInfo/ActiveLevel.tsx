/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-color-literals */
import React from "react"
import { TextStyle, ViewStyle, View } from "react-native"

import { Text, TextField } from "../../../components"
import { colors, spacing } from "../../../theme"
export const ActiveLevel = ({ minute, day, setMinute, setDay }) => {
  return (
    <>
      <Text preset="default" size="md">
        Bạn vận động như thế nào?
      </Text>
      <View style={$wrapItemOfContentActiveLevel}>
        <TextField
          keyboardType="numeric"
          value={minute}
          onChangeText={setMinute}
          inputWrapperStyle={$wrapTextField}
          style={$textFieldStyle}
          placeholder="Số phút/ngày"
        />
        <View
          style={{
            flex: 1,
            height: "60%",
            justifyContent: "flex-end",
            alignItems: "flex-end",
          }}
        >
          <Text preset="default" size="md">
            phút
          </Text>
        </View>
      </View>
      <View style={$wrapItemOfContentActiveLevel}>
        <TextField
          keyboardType="numeric"
          value={day}
          onChangeText={setDay}
          inputWrapperStyle={$wrapTextField}
          style={$textFieldStyle}
          placeholder="Số ngày/tuần"
        />

        <View
          style={{
            flex: 1,
            height: "60%",
            justifyContent: "flex-end",
            alignItems: "flex-end",
          }}
        >
          <Text preset="default" size="md">
            ngày
          </Text>
        </View>
      </View>
    </>
  )
}

const $wrapItemOfContentActiveLevel: ViewStyle = {
  flexDirection: "row",
  flex: 1,
  width: "88%",
  justifyContent: "space-between",
  alignItems: "center",
}

const $wrapTextField: ViewStyle = {
  width: 120,
  borderWidth: 0,
  borderRadius: 0,
  backgroundColor: "#FFFFFF",
  borderBottomWidth: 1,
}

const $textFieldStyle: TextStyle = {
  flex: 1,
  alignSelf: "stretch",
  color: colors.text,
  fontSize: 16,
  height: 32,
  backgroundColor: "#FFFFFF",
  textAlign: "center",
  textAlignVertical: "center",
  // https://github.com/facebook/react-native/issues/21720#issuecomment-532642093
  paddingVertical: 0,
  paddingHorizontal: 0,
  marginVertical: spacing.micro,
  marginHorizontal: spacing.micro,
}
