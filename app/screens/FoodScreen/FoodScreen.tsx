/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { observer } from "mobx-react-lite"
import React, { FC, useState, useEffect } from "react"
import { TextStyle, View, ViewStyle, Dimensions, TouchableOpacity } from "react-native"
import { Screen, Text, TextField } from "../../components"
import { DemoTabScreenProps } from "../../navigators/DemoNavigator"
import { spacing, colors } from "../../theme"
import { BulbSVG, PlusSVG, SearchSVG } from "../../components/fileSVG"
import { AddButton } from "../../components/AddButton"
import { useStores } from "../../models"
export const FoodScreen: FC<DemoTabScreenProps<"Food">> = observer(function FoodScreen(_props) {
  const { navigation } = _props

  const [activeTab, setActiveTab] = useState(0)
  // activeTab = 0 => Thuc pham | activeTab = 1 => Mon an

  const {
    systemStore: { isOverlayVisible, setOverLayVisible },
  } = useStores()

  function goToAddMeal() {
    navigation.navigate(activeTab ? "AddMeal" : "AddFood")
  }

  const goToScreen = (screenName: "AddDailySport" | "AddFood") => {
    navigation.push(screenName)
  }

  const handlePress = (index) => {
    setActiveTab(index)
  }
  return (
    <View style={{ flex: 1 }}>
      <Screen preset="scroll" contentContainerStyle={$container} safeAreaEdges={["bottom", "top"]}>
        {/* Header */}
        <View style={$wrapHeader}>
          <Text preset="heading" size="xl" style={$textHeader}>
            Món ăn của riêng bạn
          </Text>
          <View style={$wrapInput}>
            <View style={$search}>
              <TextField
                // value={authEmail}
                // onChangeText={setAuthEmail}
                autoCapitalize="none"
                autoComplete="off"
                autoCorrect={false}
                keyboardType="default"
                placeholder="Tìm kiếm"
                // onSubmitEditing={() => authPasswordInput.current?.focus()}
              />
            </View>

            <TouchableOpacity>
              <View style={$buttonOfSearchInput}>
                <SearchSVG size={20} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={goToAddMeal}>
              <View style={$buttonOfSearchInput}>
                <PlusSVG size={20} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        {/*  ContentHeader */}
        <View style={$wrapContentHeader}>
          <View
            style={{
              flex: 1,
              borderRightWidth: 1,
              borderColor: "rgba(79, 94, 79, 0.33) ",
            }}
          >
            <TouchableOpacity
              style={[
                {
                  width: "100%",
                  height: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                },
                activeTab === 0 ? $activeTab : null,
              ]}
              onPress={() => handlePress(0)}
            >
              <Text preset="subheading" size="md" style={$textHeader}>
                Thực phẩm
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <TouchableOpacity
              style={[
                {
                  width: "100%",
                  height: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                },
                activeTab === 1 ? $activeTab : null,
              ]}
              onPress={() => handlePress(1)}
            >
              <Text preset="subheading" size="md" style={$textHeader}>
                Món ăn
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={$wrapContentContainer}>
          <View style={$tip}>
            <BulbSVG width={90} />
            <Text preset="subheading" size="md" style={$textHeader}>
              Có thể bạn chưa biết
            </Text>
          </View>
        </View>
      </Screen>
      <View
        style={
          isOverlayVisible
            ? {
                position: "absolute",
                top: 0,
                bottom: -100,
                right: 0,
                left: 0,
                zIndex: 1,
                backgroundColor: "rgba(0,0,0,0.21)",
              }
            : {}
        }
      />
      {/* Add Button */}
      <AddButton goToScreen={goToScreen} />
    </View>
  )
})

const $container: ViewStyle = {
  paddingTop: spacing.tiny,
  paddingHorizontal: spacing.tiny,
}
// Header CSS
const $wrapHeader: ViewStyle = {
  flex: 1,
  height: Dimensions.get("window").height / 5,
  flexDirection: "column",
  marginBottom: spacing.tiny,
  padding: spacing.small,
  backgroundColor: "#FEC23E",
  borderRadius: 8,
}
const $textHeader: TextStyle = {
  color: "#143d54",
  opacity: 0.8,
}

const $wrapInput: ViewStyle = {
  flex: 1,
  flexDirection: "row",
  marginTop: spacing.small + (Dimensions.get("window").height / 5) * 0.1,
}

const $search: ViewStyle = {
  flex: 1,
  marginRight: spacing.extraSmall,
}
const $buttonOfSearchInput: ViewStyle = {
  width: 52,
  height: 52,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#FFFFFF",
  borderRadius: 45,
  marginStart: spacing.extraSmall,
  borderWidth: 1,
  borderColor: colors.palette.neutral400,
}
// Content CSS
const $wrapContentHeader: ViewStyle = {
  flex: 1,
  flexDirection: "row",
  justifyContent: "space-between",
  height: Dimensions.get("window").height / 16,
  backgroundColor: "#FFFFFF",
  borderRadius: 8,
}

const $wrapContentContainer: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  height:
    Dimensions.get("window").height -
    (Dimensions.get("window").height / 5 +
      Dimensions.get("window").height / 16 +
      spacing.small * 2 +
      70),
  shadowColor: "#000000",
  shadowOffset: {
    width: 3,
    height: 3,
  },
  shadowOpacity: 0.25,
  shadowRadius: 4.59,
  elevation: 5,
  opacity: 0.7,
}

const $tip: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
  width: "85%",
  height: "80%",
  backgroundColor: "#ffffff",
  borderRadius: 8,
}

const $activeTab: ViewStyle = {
  borderBottomWidth: 2,
  borderColor: "#FEC23E",
  borderRadius: 4,
}
