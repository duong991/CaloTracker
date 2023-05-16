/* eslint-disable react-native/no-inline-styles */
import React from "react"
import { ViewStyle, View, TouchableOpacity } from "react-native"
import { Text } from "../../../components"
import { spacing } from "../../../theme"
import { FemaleSVG, MaleSVG } from "../../../components/fileSVG"
import { Slider } from "@miblanchard/react-native-slider"
import { customStyles4 } from "../../../utils/styles"

export function PersonalInfo({
  gender,
  height,
  weight,
  old,
  setGender,
  setHeight,
  setWeight,
  setOld,
}) {
  return (
    <View style={$container}>
      <View style={$wrapGender}>
        <TouchableOpacity onPress={() => setGender(true)}>
          <View
            style={
              gender
                ? [$wrapItemGender, { backgroundColor: "#d9f1ff" }]
                : [$wrapItemGender, { opacity: 0.3, backgroundColor: "#d9f1ff" }]
            }
          >
            <MaleSVG size={44} isPicked={gender} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setGender(false)}>
          <View
            style={
              gender
                ? [$wrapItemGender, { opacity: 0.4, backgroundColor: "#f8dae0" }]
                : [$wrapItemGender, { backgroundColor: "#f8dae0" }]
            }
          >
            <FemaleSVG size={44} isPicked={!gender} />
          </View>
        </TouchableOpacity>
      </View>
      <PersonalInfoSlider
        title="Chiều cao"
        value={height}
        setValue={setHeight}
        maxValue={300}
        color={gender ? "#146C94" : "#E06469"}
      />
      <PersonalInfoSlider
        title="Cân nặng"
        value={weight}
        setValue={setWeight}
        maxValue={150}
        color={gender ? "#19A7CE" : "#FF6D60"}
      />
      <PersonalInfoSlider
        title="Tuổi"
        value={old}
        setValue={setOld}
        maxValue={100}
        color={gender ? "#088395" : "#F99B7D"}
      />
    </View>
  )
}

const PersonalInfoSlider = ({ title, value, setValue, maxValue, color }) => {
  return (
    <View style={$childContent}>
      <View style={$headerOfChildContent}>
        <Text preset="default" size="md">
          {title}
        </Text>
      </View>
      <View style={$SliderOfChildContent}>
        <Text
          preset="subheading"
          size="md"
          style={{ color: color, textAlign: "center", marginTop: 10, marginBottom: -5 }}
        >
          {value} {title === "Tuổi" ? "tuổi" : title === "Chiều cao" ? "cm" : "kg"}
        </Text>
        <Slider
          value={value}
          onValueChange={(value) => setValue(+value)}
          maximumValue={maxValue}
          step={1}
          animateTransitions
          minimumTrackTintColor={color}
          thumbTintColor={color}
          trackStyle={customStyles4.track}
        />
      </View>
    </View>
  )
}

const $container: ViewStyle = {
  flex: 1,
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: spacing.large,
  marginHorizontal: spacing.tiny,
  padding: spacing.extraLarge,
  backgroundColor: "#FFFFFF",
  borderRadius: 12,

  shadowColor: "#143d54",
  elevation: 12,

  shadowOffset: {
    width: 3,
    height: 3,
  },
  shadowOpacity: 0.25,
  shadowRadius: 4.59,
  opacity: 0.9,
}

const $wrapGender: ViewStyle = {
  flexDirection: "row",
  width: "90%",
  justifyContent: "space-between",
  alignItems: "center",
}

const $wrapItemGender: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
  width: 100,
  height: 100,
  borderColor: "#212A3E",
  borderWidth: 2,
  borderRadius: 12,
  marginBottom: 12,
}

const $childContent: ViewStyle = {
  flexDirection: "column",
  width: "100%",
  justifyContent: "center",
  alignItems: "center",
}

const $headerOfChildContent: ViewStyle = {
  flexDirection: "row",
  width: "100%",
  justifyContent: "space-between",
  alignItems: "center",
}

const $SliderOfChildContent: ViewStyle = {
  flex: 1,
  marginLeft: 10,
  marginRight: 10,
  alignItems: "stretch",
  justifyContent: "center",
  width: "90%",
}
