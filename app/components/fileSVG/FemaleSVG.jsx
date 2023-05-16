import React from "react"
import { Svg, Path } from "react-native-svg"

export const FemaleSVG = ({ size = 400, isPicked = false }) => {
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <Svg width={size} height={size} viewBox="0 0  64 64">
      <Path
        fill={isPicked ? "#DF4666" : "#CAACB2"}
        d="M41.77 44.43h-5.49V36.5c8.14-1.94 14.22-9.26 14.22-17.99C50.51 8.3 42.2 0 32 0S13.49 8.3 13.49 18.51c0 8.73 6.08 16.05 14.22 17.99v7.93h-5.49c-2.36 0-4.28 1.92-4.28 4.28s1.92 4.28 4.28 4.28h5.49v6.72c0 2.36 1.92 4.28 4.28 4.28s4.28-1.92 4.28-4.28v-6.72h5.49c2.36 0 4.28-1.92 4.28-4.28a4.27 4.27 0 0 0-4.27-4.28zM22.06 18.51c0-5.48 4.46-9.94 9.94-9.94s9.94 4.46 9.94 9.94-4.46 9.94-9.94 9.94-9.94-4.46-9.94-9.94z"
      />
    </Svg>
  )
}
