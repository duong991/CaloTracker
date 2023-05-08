import React from "react"
import { Svg, Path } from "react-native-svg"

const PlusSVG = ({ size, isPick = false }) => {
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <Svg width={size} height={size} viewBox="0 0 512 512">
      <Path
        fill={isPick ? "#b09645" : "#153d54"}
        d="M467 211H301V45c0-24.853-20.147-45-45-45s-45 20.147-45 45v166H45c-24.853 0-45 20.147-45 45s20.147 45 45 45h166v166c0 24.853 20.147 45 45 45s45-20.147 45-45V301h166c24.853 0 45-20.147 45-45s-20.147-45-45-45z"
      />
    </Svg>
  )
}
export default PlusSVG
