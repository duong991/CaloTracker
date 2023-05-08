/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from "react"
import { View, useWindowDimensions } from "react-native"

import { LineChart } from "react-native-chart-kit"

const LineChartComponent = () => {
  const { height, width } = useWindowDimensions()
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{ flex: 1 }}>
      <LineChart
        data={{
          labels: ["Jan", "Feb", "March", "Apr", "May"],
          datasets: [
            {
              data: [
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
              ],
            },
          ],
        }}
        width={width * 0.8} // from react-native
        height={width * 0.5}
        // yAxisLabel="$"
        // yAxisSuffix="k"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "#fb8c00",
          backgroundGradientTo: "#ffa726",
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726",
          },
        }}
        bezier
        // eslint-disable-next-line react-native/no-inline-styles, react-native/no-color-literals
        style={{
          marginVertical: 8,
          borderRadius: 16,
          shadowColor: "#000000",
          shadowOffset: {
            width: 3,
            height: 3,
          },
          shadowOpacity: 0.25,
          shadowRadius: 4.59,
          elevation: 5,
          opacity: 0.9,
        }}
      />
    </View>
  )
}

export default LineChartComponent
