import React from "react"
import { Svg, Path } from "react-native-svg"

export const MenuBarSVG = ({ size, isPick = false }) => {
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <Svg width={size} height={size} viewBox="0 0 64 64">
      <Path
        fill={isPick ? "#b09645" : "#153d54"}
        d="M32 39c-3.859 0-7-3.14-7-7s3.141-7 7-7 7 3.14 7 7-3.141 7-7 7zm0-10c-1.626 0-3 1.374-3 3s1.374 3 3 3 3-1.374 3-3-1.374-3-3-3zM49 39c-3.859 0-7-3.14-7-7s3.141-7 7-7 7 3.14 7 7-3.141 7-7 7zm0-10c-1.626 0-3 1.374-3 3s1.374 3 3 3 3-1.374 3-3-1.374-3-3-3zM15 39c-3.859 0-7-3.14-7-7s3.141-7 7-7 7 3.14 7 7-3.141 7-7 7zm0-10c-1.626 0-3 1.374-3 3s1.374 3 3 3 3-1.374 3-3-1.374-3-3-3z"
      />
    </Svg>
  )
}
