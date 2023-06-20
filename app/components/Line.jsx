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
  percentage = 50,
  width = 94,
  strokeWidth = 10,
  duration = 500,
  color = "#FEC23E",
  delay = 0,
  textColor = colors.mainText,
  max = 2000,
  reverse = false,
}) {
  const animated = React.useRef(new Animated.Value(0)).current
  const lineRef = React.useRef()
  const inputRef = React.useRef()
  const circumference = width * 2

  const animation = (toValue) => {
    return Animated.timing(animated, {
      delay,
      toValue,
      duration,
      useNativeDriver: true,
      easing: Easing.out(Easing.ease),
    }).start()
  }

  React.useEffect(() => {
    animation(percentage)
    const listener = animated.addListener((value) => {
      const maxPerc = value.value > max ? 100 : (100 * value.value) / max
      const strokeDashoffset = circumference - (circumference * maxPerc) / 100

      if (inputRef.current) {
        inputRef.current.setNativeProps({
          text: `${Math.round(value.value)} / ${Math.round(max)}g`,
        })
      }
      if (lineRef?.current) {
        lineRef.current.setNativeProps({
          strokeDashoffset: reverse
            ? circumference - (circumference * maxPerc * 0.98) / 100
            : strokeDashoffset,
        })
      }
    })

    return () => {
      animated.removeListener(listener)
    }
  }, [max, percentage, circumference, delay, duration, reverse])

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
          strokeDashoffset={circumference}
          strokeDasharray={circumference}
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
          { fontSize: 16, color: textColor ?? color },
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
