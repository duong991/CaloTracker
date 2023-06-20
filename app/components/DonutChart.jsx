/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-unused-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from "react"
import { Easing, TextInput, Animated, View, StyleSheet } from "react-native"
import { Text } from "../components"
import { colors } from "../theme"

import Svg, { G, Circle } from "react-native-svg"
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput)

export default function Donut({
  percentage = 2000,
  radius = 40,
  strokeWidth = 10,
  duration = 200,
  color = "#8785A2",
  delay = 0,
  textColor = colors.mainText,
  max = 1800,
  reverse = false,
}) {
  const animated = React.useRef(new Animated.Value(0)).current
  const circleRef = React.useRef()
  const inputRef = React.useRef()
  const circumference = 2 * Math.PI * radius
  const halfCircle = radius + strokeWidth

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
        let maxPerc
        if (v.value > max) {
          maxPerc = 100
        } else if (v.value < 0) {
          maxPerc = 0
        } else {
          maxPerc = (100 * v.value) / max
        }

        const strokeDashoffset = circumference - (circumference * maxPerc) / 100
        if (inputRef.current) {
          inputRef.current.setNativeProps({
            text: reverse ? `${0 + Math.round(v.value)}` : `${max - Math.round(v.value)}`,
          })
        }
        if (circleRef?.current) {
          circleRef.current.setNativeProps({
            strokeDashoffset: reverse
              ? circumference - (circumference * maxPerc * 0.98) / 100
              : strokeDashoffset,
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
    <View style={{ width: radius * 2, height: radius * 2, position: "relative" }}>
      <Svg
        height={radius * 2}
        width={radius * 2}
        viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`}
      >
        <G rotation="-90" origin={`${halfCircle}, ${halfCircle}`}>
          <Circle
            ref={circleRef}
            cx="50%"
            cy="50%"
            r={radius}
            fill="transparent"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDashoffset={circumference}
            strokeDasharray={circumference}
          />
          <Circle
            cx="50%"
            cy="50%"
            r={radius}
            fill="transparent"
            stroke={color}
            strokeWidth={strokeWidth / 2}
            strokeLinejoin="round"
            strokeOpacity=".4"
          />
        </G>
      </Svg>
      <AnimatedTextInput
        ref={inputRef}
        underlineColorAndroid="transparent"
        editable={false}
        defaultValue="0"
        style={[
          StyleSheet.absoluteFillObject,
          { fontSize: radius / 2, color: textColor ?? color },
          styles.text,
        ]}
      />
      <View
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: [{ translateX: -radius / 3.2 }, { translateY: 10 }],
        }}
      >
        <Text size="xs">Cần nạp</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    fontWeight: "400",
    textAlign: "center",
    transform: [{ translateX: 0 }, { translateY: -10 }],
  },
})
