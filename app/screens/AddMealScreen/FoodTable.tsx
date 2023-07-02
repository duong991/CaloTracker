/* eslint-disable react-native/no-unused-styles */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-color-literals */
import { StatusBar } from "expo-status-bar"
import React, { useState } from "react"
import { StyleSheet, Text, View, TouchableOpacity } from "react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import _ from "lodash"
import { Icon } from "app/components"
import { useStores } from "app/models"
import { observer } from "mobx-react-lite"

export const FoodTable = observer(() => {
  const { mealDetailStore } = useStores()
  const { getDetailFoodList, removeRecordFromDetailFoodList } = mealDetailStore
  const data = getDetailFoodList
  const [columns, setColumns] = useState(["Name", "Gram", "Calories", "Action"])
  const [direction, setDirection] = useState(null)
  const [selectedColumn, setSelectedColumn] = useState(null)

  // const sortTable = (column) => {
  //   const newDirection = direction === "desc" ? "asc" : "desc"
  //   let sortLabel = "name"
  //   switch (column) {
  //     case "Name":
  //       sortLabel = "name"
  //       break
  //     case "Gram":
  //       sortLabel = "sizeServing"
  //       break
  //     case "Calories":
  //       sortLabel = "calories"
  //       break
  //   }
  //   const sortedData = _.orderBy(dataInTable, [sortLabel], [newDirection])
  //   setSelectedColumn(column)
  //   setDirection(newDirection)
  //   setDataInTable(sortedData)
  // }

  const handleDeleteFoodItem = (item) => {
    removeRecordFromDetailFoodList(item.id)
  }
  const TableHeader = () => (
    <View style={styles.tableHeader}>
      {columns.map((column, index) => {
        // eslint-disable-next-line no-lone-blocks
        {
          return (
            <TouchableOpacity
              key={index}
              style={styles.columnHeader}
              // onPress={() => sortTable(column)}
            >
              <Text style={styles.columnHeaderTxt}>
                {column + " "}
                {selectedColumn === column && (
                  <MaterialCommunityIcons
                    name={direction === "desc" ? "arrow-down-drop-circle" : "arrow-up-drop-circle"}
                  />
                )}
              </Text>
            </TouchableOpacity>
          )
        }
      })}
    </View>
  )

  return (
    <View style={styles.container}>
      <TableHeader />
      {data.map((item, index) => (
        <View
          key={index}
          style={{ ...styles.tableRow, backgroundColor: index % 2 === 1 ? "#F4E0D9" : "white" }}
        >
          <Text style={{ ...styles.columnRowTxt, fontWeight: "bold" }}>{item.name}</Text>
          <Text style={styles.columnRowTxt}>{item.servingSize}</Text>
          <Text style={styles.columnRowTxt}>{item.calories}</Text>
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <TouchableOpacity onPress={() => handleDeleteFoodItem(item)}>
              <Icon icon="x" size={30} color="#A54F31" />
            </TouchableOpacity>
          </View>
        </View>
      ))}

      <StatusBar style="auto" />
    </View>
  )
})

const styles = StyleSheet.create({
  columnHeader: {
    alignItems: "center",
    justifyContent: "center",
    width: "25%",
  },
  columnHeaderTxt: {
    color: "white",
    fontWeight: "bold",
  },
  columnRowTxt: {
    textAlign: "center",
    width: "25%",
  },
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    marginBottom: 32,
    paddingTop: 20,
  },
  tableHeader: {
    alignItems: "center",
    backgroundColor: "#A54F31",
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    flexDirection: "row",
    height: 50,
    justifyContent: "space-evenly",
  },
  tableRow: {
    alignItems: "center",
    flexDirection: "row",
    height: 40,
  },
})
