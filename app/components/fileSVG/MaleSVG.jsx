import React from "react"
import { Svg, Path } from "react-native-svg"

const MaleSVG = ({ size = 40, isPicked = false }) => {
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <Svg width={size} height={size} viewBox="0 0  512 512">
      <Path
        fill={isPicked ? "#43BCFF" : "#769CB1"}
        d="M435.6 130.4c-1.5 1.2-2.4 1.8-3.1 2.6-32.7 32.7-65.4 65.3-98.1 98-3.5 3.5-3.5 5.7-1.1 9.9 26.3 44.7 32.8 92.5 18 141.9-17 56.8-53.9 96.5-109.6 117.3-49.8 18.7-99.2 15.3-146-9.6-48-25.5-78.5-65.8-90.6-119-10.3-45.5-3.5-88.9 20-129.2 26.7-45.8 66.6-74.4 118.2-85.4 44.6-9.4 87.2-2.3 126.7 21 5.3 3.1 8 2.6 12.2-1.6 31.4-31.8 63-63.3 94.6-94.8 1.5-1.5 2.9-3 5.1-5.4-2.6-.2-4.1-.3-5.5-.3-18.2-.1-36.5.3-54.6-.4-20.9-.8-36-17.5-35.7-38.2.3-20.4 16.8-36.9 37.2-37 22.5-.3 45-.1 67.6-.1h78.7c26.9 0 42.3 15.4 42.3 42.3v143.4c0 24.2-16.7 40.8-40.1 40.2-18-.4-34.6-15.9-35.2-33.9-.7-18.6-.3-37.2-.4-55.8-.3-1.7-.5-3.4-.6-5.9zm-257 305.4c56.5.7 103-45.1 104.1-102.4 1.1-56.4-45.5-103.7-102.8-104.3-56.7-.6-103.3 45.8-103.8 103.3-.4 56 45.8 102.6 102.5 103.4z"
      />
    </Svg>
  )
}
export default MaleSVG