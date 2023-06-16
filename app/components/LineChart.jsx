/* eslint-disable react-native/no-inline-styles */
import React, { useMemo } from "react"
import { View } from "react-native"
import { Grid, XAxis, YAxis, AreaChart } from "react-native-svg-charts"
import * as shape from "d3-shape"
import { Text, G, Line, Circle } from "react-native-svg"

const LineChartComponent = ({
  data = [70, 60.7, 82.5, 80, 70],
  labels = ["01/05", "03/05", "04/05", "05/05", "01/05"],
  color = "#ABCECF",
  dotColor = "#80A3A2",
}) => {
  const min = useMemo(() => Math.min(...data), [data])
  const reducedDates = useMemo(() => {
    const maxElements = 7
    if (labels.length > maxElements) {
      const numToRemove = labels.length - maxElements
      const gap = Math.ceil(labels.length / (labels.length - numToRemove))
      return labels.map((date, index) =>
        index === 0 || index === labels.length - 1 || index % gap === 0 ? date : "",
      )
    } else {
      return labels
    }
  }, [labels])

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
        <Circle cx={x(index)} cy={y(value)} r={3} fill={dotColor} />
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
    <View style={{ height: 240, flex: 1, marginLeft: 20, marginBottom: 20 }}>
      <View style={{ flex: 1, width: "90%", marginLeft: 30 }}>
        <AreaChart
          curve={shape.curveCardinal}
          style={{ flex: 1 }}
          data={data}
          svg={{ stroke: color, strokeWidth: 3, fill: "rgba(171, 206, 207, 0.08)" }}
          contentInset={{ top: 20, bottom: 20, left: 16, right: 16 }}
        >
          <Grid />
          <CustomLabel />
        </AreaChart>
        <XAxis
          style={{ marginHorizontal: -10, position: "relative", bottom: 0, top: 20 }}
          data={data}
          formatLabel={(value, index) => reducedDates[index]}
          contentInset={{ left: 21, right: 21 }}
          svg={{ fontSize: 10, fill: "black" }}
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
  )
}

export default React.memo(LineChartComponent)
