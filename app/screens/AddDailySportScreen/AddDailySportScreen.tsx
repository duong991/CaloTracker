/* eslint-disable @typescript-eslint/no-unused-vars */
import { observer } from "mobx-react-lite"
import React, { FC, useEffect, useState } from "react"
import {
  View,
  TouchableOpacity,
  FlatList,
  TextStyle,
  ViewStyle,
  ActivityIndicator,
} from "react-native"
import { Text, ListItem, EmptyState, Card, QuantityModal } from "../../components"
import { AppStackScreenProps } from "../../navigators"
import { FixedHeader } from "../../components/FixedHeader"
import { useStores } from "../../models"
import { delay } from "../../utils/delay"
import { colors, spacing } from "../../theme"
import { Exercise } from "../../models/Exercise"
import { PlusSVG, TickSVG } from "../../components/fileSVG"
import { dailyCaloApi } from "../../services/api"

interface AddDailySportScreenProps extends AppStackScreenProps<"AddDailySport"> {}

export const AddDailySportScreen: FC<AddDailySportScreenProps> = observer(
  function AddDailySportScreen(_props) {
    const navigation = _props.navigation
    const { dateStore } = useStores()
    const [refreshing, setRefreshing] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isQuantityModalVisible, setIsQuantityModalVisible] = useState(false)
    const [flag, setFlag] = useState(false)
    const [itemSelected, setItemSelected] = useState<Exercise>()

    useEffect(() => {
      ;(async function load() {
        setIsLoading(true)
        await dateStore.exerciseStoreModel.fetchExercises()
        console.log(dateStore.exerciseStoreModel.exercisesForList)
        setIsLoading(false)
      })()
    }, [dateStore.exerciseStoreModel])

    async function manualRefresh() {
      setRefreshing(true)
      await Promise.all([dateStore.exerciseStoreModel.fetchExercises(), delay(750)])
      setRefreshing(false)
    }
    const handleOpenQuantityModal = (item: Exercise) => {
      setItemSelected(item)
      setIsQuantityModalVisible(true)
    }

    const handleCancelQuantityModal = () => {
      setIsQuantityModalVisible(false)
    }

    const handleSaveQuantityModal = (quantity: number) => {
      setFlag(true)
      const newExercise = {
        ...itemSelected,
        duration: quantity,
        caloriesBurned: (itemSelected.caloriesBurned * quantity) / itemSelected.duration,
      }
      setFlag(true)
      dateStore.exerciseStoreModel.addExercise(newExercise)
      setIsQuantityModalVisible(false)
    }
    async function goBack() {
      if (flag) {
        const date = dateStore.getDateStore().dateTime
        date.setHours(0)
        date.setMinutes(0)
        date.setSeconds(0)
        date.setMilliseconds(0)
        const exerciseIds = dateStore.exerciseStoreModel.exercisesSelectedForList.map((item) => {
          return {
            id: item.id,
            duration: item.duration,
          }
        })
        const res = await dailyCaloApi.updateCaloConsumed({
          date,
          exerciseId: exerciseIds,
        })
        console.log("res", res)
        if (res.kind !== "ok") {
          alert("Có lỗi xảy ra")
        }
      }
      navigation.navigate("Demo")
    }

    const handleRemove = (item: Exercise) => {
      setFlag(true)
      dateStore.exerciseStoreModel.removeExercise(item)
    }
    return (
      <FixedHeader handleGoBack={goBack} title={null}>
        <View style={$flatListContentContainer}>
          {isQuantityModalVisible && (
            <QuantityModal
              title="Nhập số phút tập luyện"
              isVisible={isQuantityModalVisible}
              onCancel={handleCancelQuantityModal}
              onConfirm={handleSaveQuantityModal}
            />
          )}
          {dateStore.exerciseStoreModel.exercisesForList.map((item, index) => (
            <ExerciseCard
              key={item.id}
              isSelected={dateStore.exerciseStoreModel.hasSelected(item)}
              exercise={item}
              onPressToggle={(item) => handleOpenQuantityModal(item)}
              handleRemove={(item) => handleRemove(item)}
            />
          ))}
        </View>
      </FixedHeader>
    )
  },
)

const ExerciseCard = observer(function ExerciseCard({
  exercise,
  isSelected,
  onPressToggle,
  handleRemove,
}: {
  exercise: Exercise
  isSelected: boolean
  onPressToggle: (exercise: any) => void
  handleRemove?: (exercise) => void
}) {
  const [isSelect, setIsSelect] = useState(isSelected)
  useEffect(() => {
    setIsSelect(isSelected)
  }, [isSelected])

  const handleIsClicked = () => {
    if (isSelect) {
      setIsSelect(false)
      handleRemove && handleRemove(exercise)
    } else {
      onPressToggle(exercise)
    }
  }

  return (
    <Card
      style={$item}
      verticalAlignment="force-footer-bottom"
      HeadingComponent={
        <View style={$metadata}>
          <Text style={$metadataText} size="xs">
            {exercise.nameEx}
          </Text>
        </View>
      }
      content={`${exercise.caloriesBurned} kcal - ${exercise.duration} phút`}
      RightComponent={
        <TouchableOpacity onPress={handleIsClicked}>
          <View style={$buttonOfSearchInput}>
            {isSelect ? <TickSVG size={12} /> : <PlusSVG size={12} color="#191919" />}
          </View>
        </TouchableOpacity>
      }
    />
  )
})

const $flatListContentContainer: ViewStyle = {
  paddingHorizontal: spacing.large,
  paddingTop: spacing.large + spacing.extraLarge,
  backgroundColor: colors.background,
  height: "100%",
}

const $item: ViewStyle = {
  padding: spacing.tiny + spacing.tiny,
  paddingHorizontal: spacing.medium + spacing.tiny,
  marginTop: spacing.medium,
  minHeight: 40,
  borderRadius: 40 / 2,
}

const $metadata: TextStyle = {
  color: colors.textDim,
  flexDirection: "row",
}

const $metadataText: TextStyle = {
  color: colors.textDim,
  marginEnd: spacing.tiny,
  marginBottom: spacing.tiny,
}
const $buttonOfSearchInput: ViewStyle = {
  width: 30,
  height: 30,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#EEEEEE",
  borderRadius: 30 / 2,
  marginStart: spacing.extraSmall,
  marginTop: 12,
  opacity: 0.8,
  borderWidth: 0.5,

  shadowRadius: 290,
  shadowColor: "#0F0E0E",
  shadowOpacity: 0.2,
}
