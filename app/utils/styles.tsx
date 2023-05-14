import { StyleSheet } from "react-native"
const COLORS = {
  BLACK: "black",
}

export const customStyles4 = StyleSheet.create({
  track: {
    borderRadius: 4,
    height: 5,
    shadowColor: COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 1,
  },
})
