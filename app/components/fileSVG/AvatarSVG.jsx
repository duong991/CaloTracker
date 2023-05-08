import React from "react"
import { Svg, Path } from "react-native-svg"
import { View } from "react-native"

const AvatarSVG = ({ size = 32 }) => {
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{ padding: 4 }}>
      <Svg width={size} height={size} viewBox="0 0 64 64">
        <Path fill="#FFC10E" d="M41 22v4c0 5-4 9-9 9s-9-4-9-9v-4c0-5 4-9 9-9s9 4 9 9z" />
        <Path
          fill="#55ACE3"
          d="M48 44c0 3.9-3.1 7-7 7H23c-3.9 0-7-3.1-7-7s3.1-7 7-7h18c3.9 0 7 3.1 7 7z"
        />
        <Path
          fill="#1A5083"
          d="M32 35c-5 0-9-4-9-9v-4c0-5 4-9 9-9s9 4 9 9v4c0 5-4 9-9 9zm0-18c-2.8 0-5 2.2-5 5v4c0 2.8 2.2 5 5 5s5-2.2 5-5v-4c0-2.8-2.2-5-5-5zm9 34H23c-3.9 0-7-3.1-7-7s3.1-7 7-7h18c3.9 0 7 3.1 7 7s-3.1 7-7 7zM23 41c-1.7 0-3 1.3-3 3s1.3 3 3 3h18c1.7 0 3-1.3 3-3s-1.3-3-3-3zM8 10c0-1.1.9-2 2-2h14V4H10c-3.3 0-6 2.7-6 6v14h4zm52 0c0-3.3-2.7-6-6-6H40v4h14c1.1 0 2 .9 2 2v14h4zM24 56H10c-1.1 0-2-.9-2-2V40H4v14c0 3.3 2.7 6 6 6h14zm36-2V40h-4v14c0 1.1-.9 2-2 2H40v4h14c3.3 0 6-2.7 6-6z"
        />
      </Svg>
    </View>
  )
}
export default AvatarSVG
