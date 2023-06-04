/* eslint-disable react-native/no-inline-styles */
import React from "react"
import { View } from "react-native"
import { LineChart, Grid, XAxis, YAxis } from "react-native-svg-charts"
import { Text, G, Line, Circle } from "react-native-svg"

export const LineChartComponent = ({ data, labels, color = "#ABCECF", dotColor = "#80A3A2" }) => {
  data = [70, 60.7, 82.5, 80, 70] // Dữ liệu cân nặng
  labels = ["01/05", "03/05", "04/05", "05/05", "01/05"] // Các ngày cập nhật
  const min = Math.min(...data)

  const CustomLabel = ({ x, y, data }) =>
    data.map((value, index) => (
      <G key={index}>
        <Line
          x1={x(index)}
          y1={y(value)}
          x2={x(index)}
          y2={y(min)}
          stroke={color}
          strokeWidth={2}
          strokeDasharray={[4, 4]}
        />
        <Circle cx={x(index)} cy={y(value)} r={5} fill={dotColor} />
        <Text
          key={index}
          x={x(index)}
          y={y(value) - 8}
          fontSize={10}
          fontWeight={"bold"}
          fill="grey"
          textAnchor="middle"
        >
          {value}
        </Text>
      </G>
    ))

  return (
    <>
      <View style={{ height: 240, flex: 1, marginLeft: 20 }}>
        <View style={{ flex: 1, width: "90%", marginLeft: 30 }}>
          <LineChart
            style={{ flex: 1 }}
            data={data}
            svg={{ stroke: color, strokeWidth: 3 }}
            contentInset={{ top: 20, bottom: 20, left: 16, right: 16 }}
          >
            <Grid />
            <CustomLabel />
          </LineChart>
          <XAxis
            style={{ marginHorizontal: -10 }}
            data={data}
            formatLabel={(value, index) => labels[index]}
            contentInset={{ left: 21, right: 21 }}
            svg={{ fontSize: 9, fill: "black" }}
          />
        </View>

        <YAxis
          style={{ position: "absolute", top: 0, bottom: 10, left: -20 }}
          data={data}
          contentInset={{ top: 20, bottom: 20 }}
          svg={{ fontSize: 10, fill: "grey", fontWeight: "bold" }}
          numberOfTicks={6}
        />
      </View>
    </>
  )
}
