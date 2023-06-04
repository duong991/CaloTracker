import React from "react"
import { TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"

import { Text } from "./Text"

interface ITitleProps {
  leftText?: string
  rightText?: string
}

/**
 * Header that appears on many screens. Will hold navigation buttons and screen title.
 * The Header is meant to be used with the `screenOptions.header` option on navigators, routes, or screen components via `navigation.setOptions({ header })`.
 *
 * - [Documentation and Examples](https://github.com/infinitered/ignite/blob/master/docs/Components-Header.md)
 */
export function Title(props: ITitleProps) {
  const { leftText, rightText } = props

  return (
    <View style={$wrapTitle}>
      <View style={$titleText}>
        <Text preset="subheading" size="sm">
          {leftText}
        </Text>
      </View>
      <View>
        <TouchableOpacity>
          <Text preset="subheading" size="sm" style={$titleTextStyle}>
            {rightText}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
const $wrapTitle: ViewStyle = {
  flex: 1,
  flexDirection: "row",
  justifyContent: "space-between",
}

const $titleText: ViewStyle = {
  width: "60%",
}

const $titleTextStyle: TextStyle = {
  color: "#FEC23E",
  textDecorationLine: "underline",
  textDecorationStyle: "dotted",
}
