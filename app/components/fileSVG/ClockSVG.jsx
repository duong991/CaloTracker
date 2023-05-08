import React from "react"
import { Svg, Path } from "react-native-svg"
import { View } from "react-native"
const ClockSVG = ({ size, isPick = false }) => {
  return (
    // eslint-disable-next-line react-native/no-inline-styles, react/jsx-no-undef
    <View style={{ marginRight: 4 }}>
      <Svg width={size} height={size} viewBox="0 0 443.294 443.294">
        <Path
          fill={isPick ? "#b09645" : "#153d54"}
          d="M221.647 0C99.433 0 0 99.433 0 221.647s99.433 221.647 221.647 221.647 221.647-99.433 221.647-221.647S343.861 0 221.647 0zm0 415.588c-106.941 0-193.941-87-193.941-193.941s87-193.941 193.941-193.941 193.941 87 193.941 193.941-87 193.941-193.941 193.941z"
        />
        <Path
          fill={isPick ? "#b09645" : "#153d54"}
          d="M235.5 83.118h-27.706v144.265l87.176 87.176 19.589-19.589-79.059-79.059z"
        />
      </Svg>
    </View>
  )
}
export default ClockSVG
