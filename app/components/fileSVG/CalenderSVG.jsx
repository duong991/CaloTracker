import React from "react"
import { Svg, Path } from "react-native-svg"
import { View } from "react-native"

export const CalenderSVG = ({ size, isPick = false }) => {
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{ padding: 4 }}>
      <Svg width={size} height={size} viewBox="0 0 24 24">
        <Path
          fill={isPick ? "#b09645" : "#153d54"}
          d="M14.172 22.75H4A2.753 2.753 0 0 1 1.25 20V5A2.753 2.753 0 0 1 4 2.25h16A2.753 2.753 0 0 1 22.75 5v9.171a2.732 2.732 0 0 1-.806 1.945l-5.828 5.828a2.732 2.732 0 0 1-1.944.806ZM4 3.75A1.251 1.251 0 0 0 2.75 5v15A1.251 1.251 0 0 0 4 21.25h10.172a1.257 1.257 0 0 0 .884-.366l5.828-5.828a1.242 1.242 0 0 0 .366-.885V5A1.251 1.251 0 0 0 20 3.75Z"
        />
        <Path
          fill={isPick ? "#b09645" : "#153d54"}
          d="M7 5.75A.75.75 0 0 1 6.25 5V2a.75.75 0 0 1 1.5 0v3a.75.75 0 0 1-.75.75ZM12 5.75a.75.75 0 0 1-.75-.75V2a.75.75 0 0 1 1.5 0v3a.75.75 0 0 1-.75.75ZM17 5.75a.75.75 0 0 1-.75-.75V2a.75.75 0 0 1 1.5 0v3a.75.75 0 0 1-.75.75ZM22 8.75H2a.75.75 0 0 1 0-1.5h20a.75.75 0 0 1 0 1.5ZM15 22.57a.75.75 0 0 1-.75-.75V16A1.752 1.752 0 0 1 16 14.25h5.82a.75.75 0 0 1 0 1.5H16a.253.253 0 0 0-.25.25v5.82a.75.75 0 0 1-.75.75Z"
        />
      </Svg>
    </View>
  )
}
