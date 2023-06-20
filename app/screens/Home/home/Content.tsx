/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, FC, useEffect, useMemo } from "react"
import { TouchableOpacity, View, ViewStyle } from "react-native"
import { Text, Title } from "../../../components"
import { spacing } from "../../../theme"
import { GlassWater } from "../../../components/fileSVG"
import { useStores } from "app/models"
import { observer } from "mobx-react-lite"
import { waterLogApi } from "app/services/api"
import LineChartComponent from "../../../components/LineChart"
import { colors } from "../../../theme/colors"
interface ContentProps {
  waterPerDay: number
}

const _Line = () => <View style={$lineStyle} />

const GlassWaterList = ({ glassWaterList, handlePressGlassWater }) => {
  return (
    <View style={$wrapContainer}>
      {glassWaterList.map((item) => (
        <TouchableOpacity key={item.index} onPress={() => handlePressGlassWater(item.index)}>
          <GlassWater isFull={item.isFull} />
        </TouchableOpacity>
      ))}
    </View>
  )
}

export const Content: FC<ContentProps> = observer(({ waterPerDay = 0 }) => {
  const {
    dateStore: { amount, setAmount, fetchData, dateTime },
    dailyMealsModel,
    weightLogStore,
  } = useStores()
  // let timeoutId: NodeJS.Timeout | null = null
  // STATE lưu trữ danh sách các ly nước
  const [glassWaterList, setGlassWaterList] = useState<{ isFull: boolean; index: number }[]>([])
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null)

  const { combinedFoodsAndMeals } = dailyMealsModel
  const { fetchWeightLogs, weightLogDates, weightLogWeights, weightLogCount } = weightLogStore

  useEffect(() => {
    console.log("hello")
    fetchData()
    fetchWeightLogs()
  }, [])
  const scheduleApiCall = (amountUpdate: number) => {
    // Xóa lịch hẹn cũ nếu tồn tại
    if (timeoutId) {
      clearTimeout(timeoutId)
      setTimeoutId(null)
    }
    // Tạo lịch hẹn mới sau 30 giây
    const scheduleId = setTimeout(async () => {
      // Code gọi API cập nhật amount
      const response = await waterLogApi.updateWaterLog({ amount: amountUpdate, date: dateTime })
      if (response.kind === "ok") {
        // Gán timeoutId = null khi gọi API thành công
        clearTimeout(timeoutId)
        setTimeoutId(null)
      } else {
        setTimeout(() => {
          scheduleApiCall(amountUpdate)
        }, 500000) // 500000 milliseconds tương đương 5 phút
      }
    }, 1000) // 30000 milliseconds tương đương 30 giây

    setTimeoutId(scheduleId)
  }

  // Hàm xử lý tính toán giá trị cho danh sách các ly nước
  const calculateGlassWaterValues = () => {
    // Tính toán số lượng ly nước cần hiển thị
    const numberGlassWater = Math.round(waterPerDay / 250) // 250ml = 1 ly nước, waterPerDay = số ml nước cần uống trong ngày
    // Tính toán số lượng ly nước đã uống
    const numberGlassWaterFill = Math.round(amount / 250) // 250ml = 1 ly nước, amount = số ml nước đã uống trong ngày

    // Tạo danh sách các ly nước , mỗi ly nước có 2 thuộc tính: isFull và index, măc định isFull = false và index = index của ly nước
    const newGlassWaterList = Array(numberGlassWater)
      .fill({ isFull: false })
      .map((item, index) => {
        return { ...item, index }
      })

    // Đánh dấu các ly nước đã uống (isFull = true)
    for (let i = 0; i < numberGlassWaterFill; i++) {
      newGlassWaterList[i].isFull = true
    }

    // Cập nhật lại danh sách các ly nước
    setGlassWaterList(newGlassWaterList)
  }

  // Tính toán giá trị cho danh sách các ly nước khi waterPerDay hoặc amount thay đổi
  useEffect(() => {
    calculateGlassWaterValues()
  }, [waterPerDay, amount])

  // Hàm xử lý khi người dùng bấm vào 1 ly nước
  const handlePressGlassWater = (index: number) => {
    // Tạo 1 bản sao của danh sách các ly nước
    const updatedGlassWaterList = [...glassWaterList]
    // Nếu ly nước đang được chọn chưa được đánh dấu là đã uống (isFull = false) thì đánh dấu nó là đã uống (isFull = true)
    if (!updatedGlassWaterList[index].isFull) {
      // Tìm index của ly nước đầu tiên chưa được đánh dấu là đã uống (isFull = false)
      const indexGlassWaterFirstIsNotFull = updatedGlassWaterList.findIndex((item) => !item.isFull)
      // Đánh dấu ly nước đầu tiên chưa được đánh dấu là đã uống (isFull = false) thành đã uống (isFull = true)
      updatedGlassWaterList[indexGlassWaterFirstIsNotFull] = {
        isFull: true,
        index: indexGlassWaterFirstIsNotFull,
      }
    }
    // Nếu ly nước đang được chọn đã được đánh dấu là đã uống (isFull = true) thì đánh dấu nó là chưa uống (isFull = false)
    else {
      // Tìm index của ly nước cuối cùng đã được đánh dấu là đã uống (isFull = true)
      const lastFullWaterIndex = updatedGlassWaterList.reduce(
        (lastIndex, currentWater, currentIndex) => {
          if (currentWater.isFull) {
            return currentIndex
          } else {
            return lastIndex
          }
        },
        -1,
      )
      // Đánh dấu ly nước cuối cùng đã được đánh dấu là đã uống (isFull = true) thành chưa uống (isFull = false)
      updatedGlassWaterList[lastFullWaterIndex] = {
        isFull: false,
        index: lastFullWaterIndex,
      }
    }
    // Cập nhật lại danh sách các ly nước
    setGlassWaterList(updatedGlassWaterList)
    // Cập nhật lại số ml nước đã uống
    const amountUpdate = updatedGlassWaterList.filter((item) => item.isFull === true).length * 250
    setAmount(amountUpdate)
    // Xóa lịch hẹn cũ
    if (timeoutId) {
      clearTimeout(timeoutId)
      setTimeoutId(null)
    }
    // Tạo lịch hẹn mới
    scheduleApiCall(amountUpdate)
  }

  const memoizedWeightChart = useMemo(
    () => <LineChartComponent data={weightLogWeights} labels={weightLogDates} />,
    [weightLogWeights, weightLogDates],
  )

  return (
    <>
      <View style={$wrapContent}>
        <Title leftText="Bạn đã uống bao nhiêu nước" rightText={`${amount}/${waterPerDay}ml`} />
        <GlassWaterList
          glassWaterList={glassWaterList}
          handlePressGlassWater={handlePressGlassWater}
        />
        <_Line />
        <Title leftText="Mục tiêu cân nặng" rightText={"69kg"} />
        {memoizedWeightChart}
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

const $wrapContainer: ViewStyle = {
  flex: 1,
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  marginTop: 16,
  width: "100%",
  minHeight: 60,
}

const $wrapContentDailyMeal: ViewStyle = {
  flex: 1,
  flexDirection: "column",
  justifyContent: "space-between",
  marginBottom: spacing.extraSmall,
  padding: spacing.medium,
  backgroundColor: "rgba(34,166,153,0.7)",
  borderRadius: 12,
  borderWidth: 1,
}

const $lineStyle: ViewStyle = {
  borderBottomWidth: 1,
  borderBottomColor: "#143d54",
  marginBottom: 40,
  marginTop: 40,
  opacity: 0.2,
}
