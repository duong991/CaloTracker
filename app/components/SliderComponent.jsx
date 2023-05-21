// /* eslint-disable react-native/no-inline-styles */
// /* eslint-disable react-native/no-color-literals */
// /* eslint-disable @typescript-eslint/no-unused-vars */
// import React from "react"
// import { ViewStyle, View } from "react-native"
// import { Text } from "./index"

// import { Slider } from "@miblanchard/react-native-slider"
// import { customStyles4 } from "../utils/styles"

// export const SliderComponent = ({
//   headerTitle,
//   contentColor,
//   contentTitle,
//   value,
//   handleValueChange,
// }) => {
//   return (
//     <View style={$container}>
//       <View style={$header}>
//         <Text preset="default" size="md">
//           {headerTitle}
//         </Text>
//       </View>
//       <View style={$content}>
//         <Text
//           preset="subheading"
//           size="md"
//           style={{ color: contentColor, textAlign: "center", marginTop: 10, marginBottom: -5 }}
//         >
//           {contentTitle} {value}
//         </Text>
//         <Slider
//           value={value}
//           onValueChange={handleValueChange}
//           maximumValue={300}
//           step={1}
//           animateTransitions
//           minimumTrackTintColor={contentColor}
//           thumbTintColor={contentColor}
//           trackStyle={customStyles4.track}
//         />
//       </View>
//     </View>
//   )
// }

// const $container = {
//   flexDirection: "column",
//   width: "100%",
//   justifyContent: "center",
//   alignItems: "center",
// }

// const $header = {
//   flexDirection: "row",
//   width: "100%",
//   justifyContent: "space-between",
//   alignItems: "center",
// }

// const $content = {
//   flex: 1,
//   marginLeft: 10,
//   marginRight: 10,
//   alignItems: "stretch",
//   justifyContent: "center",
//   width: "90%",
// }
