import React from "react"
import { Svg, Path } from "react-native-svg"
import { View } from "react-native"

const PersonalSVG = ({ size, isPick = false }) => {
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{ padding: 4 }}>
      <Svg width={size} height={size} viewBox="0 0 32 32">
        <Path
          fill={isPick ? "#b09645" : "#153d54"}
          d="M16 15a7 7 0 1 0-7-7 7.008 7.008 0 0 0 7 7zm0-12a5 5 0 1 1-5 5 5.006 5.006 0 0 1 5-5zM20.97 17h-9.94A8.04 8.04 0 0 0 3 25.03V30a1 1 0 0 0 1 1h24a1 1 0 0 0 1-1v-4.97A8.04 8.04 0 0 0 20.97 17zM27 29H5v-3.97A6.037 6.037 0 0 1 11.03 19h9.94A6.037 6.037 0 0 1 27 25.03z"
        />
      </Svg>
    </View>
  )
}
export default PersonalSVG
