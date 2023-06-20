/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, { useRef, useState, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { Animated, View, TouchableWithoutFeedback, TouchableOpacity } from "react-native"
import { PlusSVG } from "./fileSVG"
import { useStores } from "../models"
import { Breakfast } from "./fileSVG/Breakfast"
import { Lunch } from "./fileSVG/Lunch"
import { Dinner } from "./fileSVG/Dinner"
import { Snack } from "./fileSVG/Snack"
import { Sport } from "./fileSVG/Sport"
export const AddButton = observer(function AddButton({ goToScreen }) {
  const {
    systemStore: { toggleIsOverlayVisible, isOverlayVisible },
  } = useStores()

  const animation = useRef(new Animated.Value(0)).current

  // const toValue = isOverlayVisible ? 0 : 1
  const [toValue, setToValue] = React.useState(0)
  useEffect(() => {
    setToValue(isOverlayVisible ? 0 : 1)
    if (!isOverlayVisible) {
      closeMenu()
    }
  }, [isOverlayVisible])
  const toggleMenu = () => {
    toggleIsOverlayVisible()
    Animated.spring(animation, {
      toValue,
      friction: 5,
      useNativeDriver: false,
    }).start()
  }

  const closeMenu = () => {
    Animated.spring(animation, {
      toValue: 0,
      friction: 5,
      useNativeDriver: false,
    }).start()
  }

  const btn5Style = {
    transform: [
      { scale: animation },
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -360],
        }),
      },
    ],
  }

  const btn4Style = {
    transform: [
      { scale: animation },
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -290],
        }),
      },
    ],
  }

  const btn3Style = {
    transform: [
      { scale: animation },
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -220],
        }),
      },
    ],
  }
  const btn2Style = {
    transform: [
      { scale: animation },
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -150],
        }),
      },
    ],
  }
  const btn1Style = {
    transform: [
      { scale: animation },
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -80],
        }),
      },
    ],
  }
  const rotation = {
    transform: [
      {
        rotate: animation.interpolate({
          inputRange: [0, 1],
          outputRange: ["0deg", "45deg"],
        }),
      },
    ],
  }

  const handleGoTo = (screen, data) => {
    goToScreen(screen, data)
  }

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => handleGoTo("AddDailySport", "sport")}>
        <Animated.View style={[styles.wrapIcon, styles.secondary, btn5Style]}>
          <Sport size={34} />
        </Animated.View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => handleGoTo("AddDailyFood", "snack")}>
        <Animated.View style={[styles.wrapIcon, styles.secondary, btn4Style]}>
          <Snack size={34} />
        </Animated.View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => handleGoTo("AddDailyFood", "dinner")}>
        <Animated.View style={[styles.wrapIcon, styles.secondary, btn3Style]}>
          <Dinner size={34} />
        </Animated.View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => handleGoTo("AddDailyFood", "lunch")}>
        <Animated.View style={[styles.wrapIcon, styles.secondary, btn2Style]}>
          <Lunch size={34} />
        </Animated.View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => handleGoTo("AddDailyFood", "breakfast")}>
        <Animated.View style={[styles.wrapIcon, styles.secondary, btn1Style]}>
          <Breakfast size={34} />
        </Animated.View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={toggleMenu}>
        <Animated.View style={[styles.wrapIcon, styles.menu, rotation]}>
          <PlusSVG size={18} color="#ffff" />
        </Animated.View>
      </TouchableWithoutFeedback>
    </View>
  )
})

const styles = {
  container: {
    alignItems: "center",
    position: "absolute",
    bottom: 76,
    right: 60,
    zIndex: 2,
  },
  wrapIcon: {
    position: "absolute",

    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 48 / 2,

    shadowRadius: 10,
    shadowColor: "#f02A4B",
    shadowOpacity: 0.3,
    shadowOffset: { height: 10 },
  },
  menu: {
    backgroundColor: "#f02A4B",
  },
  secondary: {
    width: 58,
    height: 58,
    borderRadius: 58 / 2,
    backgroundColor: "#fff",
  },
}
