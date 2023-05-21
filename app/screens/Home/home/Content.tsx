/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, FC, useEffect } from "react"
import { TouchableOpacity, View, ViewStyle } from "react-native"
import { Text } from "../../../components"
import { spacing } from "../../../theme"
import { GlassWater } from "../../../components/fileSVG"
import LineChartComponent from "../../../components/LineChart"
import { DatabaseConnection } from "../../../database/database-connection"
import { useStores } from "app/models"
import { observer } from "mobx-react-lite"
import { stringToDate, dateToString } from "../../../utils/convertDate"
interface ContentProps {
  waterPerDay: number
}

const db = DatabaseConnection.getConnection()

export const Content: FC<ContentProps> = observer(({ waterPerDay = 0 }) => {
  const {
    dateStore: { dateTime },
  } = useStores()
  const [amount, setAmount] = useState(0)
  const [glassWaterList, setGlassWaterList] = useState([
    { isFull: true, index: 0 },
    { isFull: true, index: 1 },
    { isFull: false, index: 2 },
    { isFull: false, index: 3 },
    { isFull: false, index: 4 },
    { isFull: false, index: 5 },
    { isFull: false, index: 6 },
    { isFull: false, index: 7 },
    { isFull: false, index: 8 },
  ])
  useEffect(() => {
    db.transaction(function (tx) {
      tx.executeSql("Select * from WaterLog ", [], (tx, results) => {
        console.log("Results1", results.rows)
      })
    })
  }, [])

  const numberGlassWater = Math.round(waterPerDay / 250)
  console.log(numberGlassWater)

  const handlePressGlassWater = (index: number) => {
    if (!glassWaterList[index].isFull) {
      const indexGlassWaterFirstIsNotFull = glassWaterList.findIndex(
        (item) => item.isFull === false,
      )
      const newList = glassWaterList.map((item, i) => {
        if (i === indexGlassWaterFirstIsNotFull) {
          return {
            isFull: true,
            index: indexGlassWaterFirstIsNotFull,
          }
        }
        return item
      })
      setGlassWaterList(newList)
    } else {
      const lastFullWaterIndex = glassWaterList.reduce((lastIndex, currentWater, currentIndex) => {
        if (currentWater.isFull === true) {
          return currentIndex
        } else {
          return lastIndex
        }
      }, -1)
      const newList = glassWaterList.map((item, i) => {
        if (i === lastFullWaterIndex) {
          return {
            isFull: false,
            index: lastFullWaterIndex,
          }
        }
        return item
      })
      setGlassWaterList(newList)
    }
  }
  return (
    <>
      <View style={$wrapContent}>
        <View style={$wrapTitle}>
          <View style={$titleText}>
            <Text preset="subheading" size="sm">
              Bạn đã uống bao nhiêu nước
            </Text>
          </View>
          <View>
            <Text
              preset="subheading"
              size="sm"
              style={{
                color: "#FEC23E",
                textDecorationLine: "underline",
                textDecorationStyle: "dotted",
              }}
            >
              1000/{waterPerDay}ml
            </Text>
          </View>
        </View>
        <View style={$wrapContainer}>
          {glassWaterList.map((item) => (
            <TouchableOpacity key={item.index} onPress={() => handlePressGlassWater(item.index)}>
              <GlassWater isFull={item.isFull} />
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View style={$wrapContent}>
        <View style={$wrapTitle}>
          <View style={$titleText}>
            <Text preset="subheading" size="sm">
              Mục tiêu cân nặng
            </Text>
          </View>
          <View>
            <Text
              preset="subheading"
              size="sm"
              style={{
                color: "#FEC23E",
                textDecorationLine: "underline",
                textDecorationStyle: "dotted",
              }}
            >
              60kg
            </Text>
          </View>
        </View>
        <View style={$wrapChart}>
          <LineChartComponent />
        </View>
      </View>
    </>
  )
})
// Content CSS
const $wrapContent: ViewStyle = {
  flex: 1,
  flexDirection: "column",
  justifyContent: "space-between",
  marginBottom: spacing.extraSmall,
  padding: spacing.large,
  backgroundColor: "#FFFFFF",
  borderRadius: 28,
}

const $wrapTitle: ViewStyle = {
  flex: 1,
  flexDirection: "row",
  justifyContent: "space-between",
}
const $wrapContainer: ViewStyle = {
  flex: 1,
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  marginTop: 16,
  width: "100%",
}
const $wrapChart: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  marginTop: 16,
}
const $titleText: ViewStyle = {
  width: "60%",
}
