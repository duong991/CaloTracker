import React from "react"
import { View, Text, StyleSheet } from "react-native"
import { PieChart } from "react-native-svg-charts"
interface PieChartComponentProps {
  itemSelected: {
    calories: number
    fat: number
    protein: number
    carbohydrates: number
  }
}

const PieChartComponent = ({ itemSelected }: PieChartComponentProps) => {
  const convertToKcal = (value: number) => (value * 4).toFixed(1)
  const convertFatToKcal = (value: number) => (value * 9).toFixed(1)
  const data = [
    { label: "Fat", value: (+convertFatToKcal(itemSelected.fat) / itemSelected.calories) * 100 },
    {
      label: "Protein",
      value: (+convertToKcal(itemSelected.protein) / itemSelected.calories) * 100,
    },
    {
      label: "Carb",
      value: (+convertToKcal(itemSelected.carbohydrates) / itemSelected.calories) * 100,
    },
  ]

  const colors = ["#FFBE86", "#7F85FF", "#FF7F7F"] // Các màu sắc phù hợp

  const pieData = data
    .filter((item) => item.value > 0)
    .map((item, index) => ({
      value: item.value,
      svg: { fill: colors[index] },
      key: `pie-${index}`,
    }))

  const calculatePercentage = (value) =>
    ((value / pieData.reduce((sum, item) => sum + item.value, 0)) * 100).toFixed(1)

  return (
    <View style={styles.container}>
      <PieChart style={styles.chart} data={pieData} />
      <View style={styles.legendContainer}>
        {data.map((item, index) => (
          <View key={`legend-${index}`} style={styles.legendItem}>
            <View style={[styles.square, { backgroundColor: colors[index] }]} />
            <Text style={styles.legendText}>{item.label}</Text>
            <Text style={styles.percentageText}>{calculatePercentage(item.value)}%</Text>
          </View>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  chart: {
    flex: 1,
    height: 200,
  },
  container: {
    alignItems: "center",
    flexDirection: "row",
    marginLeft: 20,
    marginTop: 20,
  },
  legendContainer: {
    justifyContent: "center",
    marginLeft: 20,
  },
  legendItem: {
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 10,
  },
  legendText: {
    marginRight: 5,
  },
  percentageText: {
    fontWeight: "bold",
  },
  square: {
    height: 10,
    marginRight: 5,
    width: 10,
  },
})

export default PieChartComponent
