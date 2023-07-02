/* eslint-disable react-native/sort-styles */
/* eslint-disable react-native/no-unused-styles */
/* eslint-disable react-native/no-color-literals */
/* eslint-disable no-undef */
import React, { useState, useEffect, useRef } from "react"
import SelectDropdown from "react-native-select-dropdown"

import { View, Dimensions, StyleSheet } from "react-native"
import { Icon } from "./Icon"
const { width } = Dimensions.get("window")

// eslint-disable-next-line react/display-name
export const DropDown = () => {
  const [countries, setCountries] = useState([])
  const [cities, setCities] = useState([])

  const citiesDropdownRef = useRef()

  useEffect(() => {
    setTimeout(() => {
      setCountries([{ title: "Egypt", cities: [{ title: "Cairo" }, { title: "Alex" }] }])
    }, 1000)
  }, [])

  return (
    <>
      <SelectDropdown
        data={countries}
        onSelect={(selectedItem, index) => {
          console.log(selectedItem, index)
          citiesDropdownRef?.current.reset()
          setCities([])
          setCities(selectedItem.cities)
        }}
        defaultButtonText={"Select country"}
        buttonTextAfterSelection={(selectedItem, index) => {
          return selectedItem.title
        }}
        rowTextForSelection={(item, index) => {
          return item.title
        }}
        buttonStyle={styles.dropdown1BtnStyle}
        buttonTextStyle={styles.dropdown1BtnTxtStyle}
        renderDropdownIcon={(isOpened) => {
          return <Icon icon="more" size={30} />
        }}
        dropdownIconPosition={"right"}
        dropdownStyle={styles.dropdown1DropdownStyle}
        rowStyle={styles.dropdown1RowStyle}
        rowTextStyle={styles.dropdown1RowTxtStyle}
      />
      <View style={styles.divider} />
    </>
  )
}

const styles = StyleSheet.create({
  headerTitle: { color: "#000", fontWeight: "bold", fontSize: 16 },
  saveAreaViewContainer: { flex: 1, backgroundColor: "#FFF" },
  viewContainer: { flex: 1, width, backgroundColor: "#FFF" },
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: "10%",
  },
  dropdownsRow: { flexDirection: "row", width: "100%", paddingHorizontal: "5%" },

  dropdown1BtnStyle: {
    flex: 1,
    height: 50,
    backgroundColor: "#FFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#444",
  },
  dropdown1BtnTxtStyle: { color: "#444", textAlign: "left" },
  dropdown1DropdownStyle: { backgroundColor: "#EFEFEF" },
  dropdown1RowStyle: { backgroundColor: "#EFEFEF", borderBottomColor: "#C5C5C5" },
  dropdown1RowTxtStyle: { color: "#444", textAlign: "left" },
  divider: { width: 12 },
  dropdown2BtnStyle: {
    flex: 1,
    height: 50,
    backgroundColor: "#FFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#444",
  },
  dropdown2BtnTxtStyle: { color: "#444", textAlign: "left" },
  dropdown2DropdownStyle: { backgroundColor: "#EFEFEF" },
  dropdown2RowStyle: { backgroundColor: "#EFEFEF", borderBottomColor: "#C5C5C5" },
  dropdown2RowTxtStyle: { color: "#444", textAlign: "left" },
})
