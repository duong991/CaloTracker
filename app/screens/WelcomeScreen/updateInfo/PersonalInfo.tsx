/* eslint-disable react-native/no-inline-styles */
import React from "react"
import { ViewStyle, View } from "react-native"
import { Text } from "../../../components"
import { spacing } from "../../../theme"
import FemaleSVG from "../../../components/fileSVG/FemaleSVG"
import MaleSVG from "../../../components/fileSVG/MaleSVG"
import { Slider } from "@miblanchard/react-native-slider"
import { customStyles4 } from "../../../utils/styles"

export default function PersonalInfo({ height, weight, old, setHeight, setWeight, setOld }) {
  return (
    <View style={$contentBodyIndex}>
      <View style={$wrapGender}>
        <View style={$wrapItemGender}>
          <MaleSVG size={32} isPicked={true} />
        </View>
        <View style={[$wrapItemGender, { opacity: 0.4 }]}>
          <FemaleSVG size={32} isPicked={false} />
        </View>
      </View>
      <PersonalInfoSlider
        title="Chiều cao"
        value={height}
        setValue={setHeight}
        maxValue={300}
        color="#A75D5D"
      />
      <PersonalInfoSlider
        title="Cân nặng"
        value={weight}
        setValue={setWeight}
        maxValue={200}
        color="#D3756B"
      />
      <PersonalInfoSlider
        title="Tuổi"
        value={old}
        setValue={setOld}
        maxValue={100}
        color="#F0997D"
      />
    </View>
  )
}

const PersonalInfoSlider = ({ title, value, setValue, maxValue, color }) => {
  return (
    <View style={$wrapHeight}>
      <View style={$headerOfHeight}>
        <Text preset="default" size="md">
          {title}
        </Text>
      </View>
      <View style={$contentOfHeight}>
        <Text
          preset="subheading"
          size="md"
          style={{ color: color, textAlign: "center", marginTop: 10, marginBottom: -5 }}
        >
          {value} {title === "Tuổi" ? "tuổi" : "cm"}
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

const $contentBodyIndex: ViewStyle = {
  flex: 1,
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: spacing.large,
  marginHorizontal: spacing.tiny,
  padding: spacing.extraLarge,
  backgroundColor: "#FFFFFF",
  borderRadius: 18,

  shadowColor: "#143d54",
  elevation: 12,
}

const $wrapGender: ViewStyle = {
  flexDirection: "row",
  width: "100%",
  justifyContent: "space-around",
  alignItems: "center",
}

const $wrapItemGender: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
  width: 75,
  height: 75,
  borderColor: "#cccccc",
  borderWidth: 2,
  borderRadius: 20,
  marginBottom: 32,
}

const $wrapHeight: ViewStyle = {
  flexDirection: "column",
  width: "100%",
  justifyContent: "center",
  alignItems: "center",
}

const $headerOfHeight: ViewStyle = {
  flexDirection: "row",
  width: "100%",
  justifyContent: "space-between",
  alignItems: "center",
}

const $contentOfHeight: ViewStyle = {
  flex: 1,
  marginLeft: 10,
  marginRight: 10,
  alignItems: "stretch",
  justifyContent: "center",
  width: "90%",
}
