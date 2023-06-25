/* eslint-disable react-native/no-color-literals */
import React, { useState } from "react"
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from "react-native"
import Modal from "react-native-modal"
import { Ionicons } from "@expo/vector-icons"

interface QuantityModalProps {
  isVisible: boolean
  onCancel: () => void
  onConfirm: (quantity: number) => void
}

export function QuantityModal({ isVisible, onCancel, onConfirm }: QuantityModalProps) {
  const [quantity, setQuantity] = useState("")

  const handleConfirm = () => {
    const parsedQuantity = parseFloat(quantity)
    if (!isNaN(parsedQuantity)) {
      onConfirm(parsedQuantity)
    }
  }

  return (
    <Modal isVisible={isVisible} backdropOpacity={0.5} style={styles.modal}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Nhập số lượng</Text>
          <TouchableOpacity style={styles.closeButton} onPress={onCancel}>
            <Ionicons name="close-outline" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
        <View>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={quantity}
            onChangeText={setQuantity}
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
            <Text style={styles.buttonText}>Hủy</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
            <Text style={styles.buttonText}>Xác nhận</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },
  cancelButton: {
    backgroundColor: "#E5E5E5",
    borderRadius: 8,
    marginRight: 10,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  closeButton: {
    alignItems: "center",
    backgroundColor: "#3377FF",
    borderRadius: 50,
    height: 32,
    justifyContent: "center",
    width: 32,
  },
  confirmButton: {
    backgroundColor: "#3377FF",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  container: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingBottom: 16,
    paddingHorizontal: 24,
    paddingTop: 24,
    width: "84%",
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  input: {
    borderColor: "#E5E5E5",
    borderRadius: 8,
    borderWidth: 1,
    fontSize: 16,
    fontWeight: "500",
    height: 40,
    marginBottom: 24,
    paddingHorizontal: 12,
    width: "100%",
  },
  modal: {
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
})
