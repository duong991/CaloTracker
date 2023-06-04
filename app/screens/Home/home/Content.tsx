/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, FC, useEffect } from "react"
import { TouchableOpacity, View, ViewStyle } from "react-native"
import { Text, Title } from "../../../components"
import { spacing } from "../../../theme"
import { GlassWater } from "../../../components/fileSVG"
import { useStores } from "app/models"
import { observer } from "mobx-react-lite"
import { waterLogApi } from "app/services/api"
import { LineChartComponent } from "../../../components/LineChart"
interface ContentProps {
  waterPerDay: number
}

export const Content: FC<ContentProps> = observer(({ waterPerDay = 0 }) => {
  const {
    dateStore: { amount, setAmount, fetchData },
  } = useStores()
  // let timeoutId: NodeJS.Timeout | null = null

  // STATE lưu trữ danh sách các ly nước
  const [glassWaterList, setGlassWaterList] = useState<Array<{ isFull: boolean; index: number }>>(
    [],
  )
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null)

  useEffect(() => {
    console.log("HomeScreen_content: ", "Thực hiện fetchData()")
    fetchData()
  }, [])

  const scheduleApiCall = () => {
    // Xóa lịch hẹn cũ nếu tồn tại
    if (timeoutId) {
      console.log("clr timeout: ", timeoutId)
      clearTimeout(timeoutId)
      setTimeoutId(null)
    }
    // Tạo lịch hẹn mới sau 30 giây
    const scheduleId = setTimeout(async () => {
      console.log("HomeScreen_content: ", "Gọi API cập nhật amount", new Date())
      const dateConvert = new Date().toISOString().slice(0, 10)
      console.log(amount, dateConvert)
      // Code gọi API cập nhật amount
      const response = await waterLogApi.updateWaterLog({ amount, date: dateConvert })
      if (response.kind === "ok") {
        console.log("HomeScreen_content: ", "Gọi API cập nhật amount thành công")
        console.log("status: ", response.status)
        // Gán timeoutId = null khi gọi API thành công
        clearTimeout(timeoutId)
        setTimeoutId(null)
      } else {
        console.log("HomeScreen_content: ", "Gọi API cập nhật amount thất bại")
        setTimeout(() => {
          scheduleApiCall()
        }, 500000) // 500000 milliseconds tương đương 5 phút
      }
    }, 10000) // 30000 milliseconds tương đương 30 giây

    setTimeoutId(scheduleId)
    console.log("id lịch hẹn được khởi tạo: ", timeoutId)
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

    setAmount(updatedGlassWaterList.filter((item) => item.isFull === true).length * 250)
    console.log("aftersetAmount: ", amount)
    // Xóa lịch hẹn cũ
    if (timeoutId) {
      console.log("Thực hiện xóa lịch hẹn cũ: ", timeoutId)
      clearTimeout(timeoutId)
      setTimeoutId(null)
    }
    // Tạo lịch hẹn mới
    scheduleApiCall()
  }

  return (
    <>
      <View style={$wrapContent}>
        <Title leftText="Bạn đã uống bao nhiêu nước" rightText={`${amount}/${waterPerDay}ml`} />
        <View style={$wrapContainer}>
          {glassWaterList.map((item) => (
            <TouchableOpacity key={item.index} onPress={() => handlePressGlassWater(item.index)}>
              <GlassWater isFull={item.isFull} />
            </TouchableOpacity>
          ))}
        </View>

        <View
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            borderBottomWidth: 1,
            borderBottomColor: "#143d54",
            marginBottom: 40,
            marginTop: 40,
            opacity: 0.2,
          }}
        />

        <Title leftText="Mục tiêu cân nặng" rightText={"69kg"} />
        <LineChartComponent />
      </View>
      <View style={$wrapContent}>
        <Title leftText="Lượng calo trong ngày" rightText={"690kcal"} />
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
}
