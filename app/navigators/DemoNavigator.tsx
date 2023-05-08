import { BottomTabScreenProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { CompositeScreenProps } from "@react-navigation/native"
import React from "react"
import { TextStyle, ViewStyle } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
// import { translate } from "../i18n"
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DemoCommunityScreen, DemoShowroomScreen, SettingScreen } from "../screens"
// import { DemoPodcastListScreen } from "../screens/DemoPodcastListScreen"
import { colors, spacing, typography } from "../theme"
import { AppStackParamList, AppStackScreenProps } from "./AppNavigator"
import { HomeScreen } from "../screens/HomeScreen"
import { FoodScreen } from "../screens/FoodScreen"
import { PersonalScreen } from "../screens/PersonalScreen"

import FoodSVG from "../components/fileSVG/FoodSVG"
import HomeSVG from "../components/fileSVG/HomeSVG"
import PersonalSVG from "../components/fileSVG/PersonalSVG"
import SettingSVG from "../components/fileSVG/SettingSVG"

export type DemoTabParamList = {
  DemoCommunity: undefined
  DemoShowroom: { queryIndex?: string; itemIndex?: string }
  Setting: undefined
  DemoPodcastList: undefined
  Home: undefined
  Food: undefined
  Personal: undefined
}

/**
 * Helper for automatically generating navigation prop types for each route.
 *
 * More info: https://reactnavigation.org/docs/typescript/#organizing-types
 */
export type DemoTabScreenProps<T extends keyof DemoTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<DemoTabParamList, T>,
  AppStackScreenProps<keyof AppStackParamList>
>

const Tab = createBottomTabNavigator<DemoTabParamList>()

export function DemoNavigator() {
  const { bottom } = useSafeAreaInsets()

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: [$tabBar, { height: bottom + 70 }],
        tabBarActiveTintColor: colors.text,
        tabBarInactiveTintColor: colors.text,
        tabBarLabelStyle: $tabBarLabel,
        tabBarItemStyle: $tabBarItem,
      }}
    >
      {/* <Tab.Screen
        name="DemoShowroom"
        component={DemoShowroomScreen}
        options={{
          tabBarLabel: translate("demoNavigator.componentsTab"),
          tabBarIcon: ({ focused }) => (
            <Icon icon="components" color={focused && colors.tint} size={30} />
          ),
        }}
      /> */}

      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Nhật ký",
          tabBarIcon: ({ focused }) => <HomeSVG size={32} isPick={focused} />,
        }}
      />

      <Tab.Screen
        name="Food"
        component={FoodScreen}
        options={{
          // tabBarAccessibilityLabel: translate("demoNavigator.podcastListTab"),
          tabBarLabel: "Món ăn",
          tabBarIcon: ({ focused }) => <FoodSVG size={32} isPick={focused} />,
        }}
      />

      <Tab.Screen
        name="Personal"
        component={PersonalScreen}
        options={{
          // tabBarAccessibilityLabel: translate("demoNavigator.podcastListTab"),
          tabBarLabel: "Cá nhân",
          tabBarIcon: ({ focused }) => <PersonalSVG size={32} isPick={focused} />,
        }}
      />

      <Tab.Screen
        name="Setting"
        component={SettingScreen}
        options={{
          // tabBarLabel: translate("demoNavigator.debugTab"),
          tabBarLabel: "Setting",
          tabBarIcon: ({ focused }) => <SettingSVG size={32} isPick={focused} />,
        }}
      />
    </Tab.Navigator>
  )
}

const $tabBar: ViewStyle = {
  backgroundColor: colors.background,
  borderTopColor: colors.transparent,
}

const $tabBarItem: ViewStyle = {
  paddingTop: spacing.medium,
}

const $tabBarLabel: TextStyle = {
  fontSize: 12,
  fontFamily: typography.primary.medium,
  lineHeight: 16,
  flex: 1,
}

// @demo remove-file
