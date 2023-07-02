/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-color-literals */
import React from "react"
import { Text, View, StyleSheet } from "react-native"
import Modal from "react-native-modal"
import PieChartComponent from "./PieChart"
import { DailyFood } from "../models/DailyFoodModel"
import { Meal } from "../models/Meal"
import { Food } from "../models/Food"
interface ModalFoodMacroProps {
  isModalVisible: boolean
  setModalVisible: (value: boolean) => void
  itemSelected: DailyFood | Meal | Food
}
export function ModalFoodMacro({
  isModalVisible,
  setModalVisible,
  itemSelected,
}: ModalFoodMacroProps) {
  const handleBackdropPress = () => {
    setModalVisible(false)
  }

  const dataItemForChart = {
    calories: itemSelected.calories,
    protein: itemSelected.protein,
    fat: itemSelected.fat,
    carbohydrates: itemSelected.carbohydrates,
  }

  return (
    <View style={styles.container}>
      <Modal
        isVisible={isModalVisible}
        style={styles.modalContainer}
        onBackdropPress={handleBackdropPress}
        backdropOpacity={0.7}
        animationIn="zoomInDown"
        animationOut="fadeOut"
        animationInTiming={700}
        animationOutTiming={2000}
      >
        <View style={styles.contentContainer}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Thông tin macro thực phẩm</Text>
            <View style={styles.separator} />
          </View>
          <PieChartComponent itemSelected={dataItemForChart} />
          <View style={styles.separator} />
          <View style={{ marginTop: 20 }}>
            <Text style={styles.headerText}>Thông tin dinh dưỡng</Text>
          </View>
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              marginTop: 10,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                borderBottomWidth: 1,
                borderColor: "#ccc",
                paddingVertical: 5,
              }}
            >
              <Text
                style={{
                  flex: 1,
                  fontSize: 16,
                  fontWeight: "600",
                  textAlign: "center",
                  opacity: 0.8,
                }}
              >
                Thông tin
              </Text>
              <Text
                style={{
                  flex: 1,
                  fontSize: 16,
                  fontWeight: "600",
                  textAlign: "center",
                  opacity: 0.8,
                }}
              >
                Giá trị
              </Text>
              <Text
                style={{
                  flex: 1,
                  fontSize: 16,
                  fontWeight: "600",
                  textAlign: "center",
                  opacity: 0.8,
                }}
              >
                Đơn vị
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                borderBottomWidth: 1,
                borderColor: "#ccc",
                paddingVertical: 5,
              }}
            >
              <Text style={{ flex: 1, fontSize: 16, textAlign: "center", opacity: 0.6 }}>Calo</Text>
              <Text style={{ flex: 1, fontSize: 16, textAlign: "center", opacity: 0.6 }}>
                {itemSelected.calories}
              </Text>
              <Text style={{ flex: 1, fontSize: 16, textAlign: "center", opacity: 0.6 }}>kcal</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                borderBottomWidth: 1,
                borderColor: "#ccc",
                paddingVertical: 5,
              }}
            >
              <Text style={{ flex: 1, fontSize: 16, textAlign: "center", opacity: 0.6 }}>
                Protein
              </Text>
              <Text style={{ flex: 1, fontSize: 16, textAlign: "center", opacity: 0.6 }}>
                {itemSelected.protein}
              </Text>
              <Text style={{ flex: 1, fontSize: 16, textAlign: "center", opacity: 0.6 }}>g</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                borderBottomWidth: 1,
                borderColor: "#ccc",
                paddingVertical: 5,
              }}
            >
              <Text style={{ flex: 1, fontSize: 16, textAlign: "center", opacity: 0.6 }}>Carb</Text>
              <Text style={{ flex: 1, fontSize: 16, textAlign: "center", opacity: 0.6 }}>
                {itemSelected.carbohydrates}
              </Text>
              <Text style={{ flex: 1, fontSize: 16, textAlign: "center", opacity: 0.6 }}>g</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                borderBottomWidth: 1,
                borderColor: "#ccc",
                paddingVertical: 5,
              }}
            >
              <Text style={{ flex: 1, fontSize: 16, textAlign: "center", opacity: 0.6 }}>Fat</Text>
              <Text style={{ flex: 1, fontSize: 16, textAlign: "center", opacity: 0.6 }}>
                {itemSelected.fat}
              </Text>
              <Text style={{ flex: 1, fontSize: 16, textAlign: "center", opacity: 0.6 }}>g</Text>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    backgroundColor: "white",
    borderRadius: 25,
    height: "70%",
    padding: 20,
    width: "100%",
  },
  header: { marginBottom: -20 },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  modalContainer: {
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    marginHorizontal: 40,
  },
  separator: {
    borderBottomColor: "#E0E0E0",
    borderBottomWidth: 1,
  },
})
