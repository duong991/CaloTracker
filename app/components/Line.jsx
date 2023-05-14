/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-unused-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from "react"
import { Easing, TextInput, Animated, View, StyleSheet } from "react-native"
import { Text } from "../components"
import { colors } from "../theme"

import Svg, { G, Circle, Line } from "react-native-svg"
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput)

export default function _Line({
  percentage = 800,
  width = 70,
  strokeWidth = 10,
  duration = 500,
  color = "#FEC23E",
  delay = 0,
  textColor = colors.mainText,
  max = 2000,
}) {
  const animated = React.useRef(new Animated.Value(0)).current
  const lineRef = React.useRef()
  const inputRef = React.useRef()
  const circumference = width * 2

  const animation = (toValue) => {
    // Hàm animation để thực hiện animation
    return Animated.timing(animated, {
      delay: 1000, // Thời gian delay trước khi bắt đầu animation
      toValue, // Giá trị kết thúc của animation
      duration, // Thời gian thực hiện animation
      useNativeDriver: true, // Sử dụng native driver để tăng hiệu suất
      easing: Easing.out(Easing.ease), // Cách thức thực hiện animation
    }).start()
  }

  React.useEffect(() => {
    animation(percentage)
    animated.addListener(
      (v) => {
        const maxPerc = v.value > max ? max : (max - v.value) / max
        const strokeDashoffset = maxPerc * circumference
        if (inputRef.current) {
          inputRef.current.setNativeProps({
            text: `${Math.round(v.value)}`,
          })
        }
        if (lineRef?.current) {
          lineRef.current.setNativeProps({
            strokeDashoffset,
          })
        }
      },
      [max, percentage],
    )

    return () => {
      animated.removeAllListeners()
    }
  })

  return (
    <View style={{ width, height: width / 1.4, position: "relative" }}>
      <Svg height={width} width={width} viewBox={`0 0 ${width * 2} ${width}`}>
        <Line
          ref={lineRef}
          x1={0}
          y1={(width / 2) * 1.2}
          x2={width * 2}
          y2={(width / 2) * 1.2}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDashoffset={circumference} // thêm thuộc tính strokeDashoffset
          strokeDasharray={circumference} // thêm thuộc tính strokeDasharray
        />

        <Line
          x1={0}
          y1={(width / 2) * 1.2}
          x2={width * 2}
          y2={(width / 2) * 1.2}
          stroke={color}
          fill="transparent"
          strokeWidth={strokeWidth / 2}
          strokeLinecap="round"
          strokeOpacity=".4"
        />
      </Svg>
      <AnimatedTextInput
        ref={inputRef}
        underlineColorAndroid="transparent"
        editable={false}
        defaultValue="0"
        style={[
          StyleSheet.absoluteFillObject,
          { fontSize: width / 3.5, color: textColor ?? color },
          styles.text,
        ]}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    fontWeight: "400",
    textAlign: "center",
    transform: [{ translateX: 0 }, { translateY: -5 }],
  },
})
