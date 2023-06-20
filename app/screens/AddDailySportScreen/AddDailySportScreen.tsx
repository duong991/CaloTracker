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
import { Text, ListItem, EmptyState, Card } from "../../components"
import { AppStackScreenProps } from "../../navigators"
import { FixedHeader } from "../../components/FixedHeader"
import { useStores } from "../../models"
import { delay } from "../../utils/delay"
import { colors, spacing } from "../../theme"
import { Exercise } from "../../models/Exercise"
import { PlusSVG, TickSVG } from "../../components/fileSVG"

interface AddDailySportScreenProps extends AppStackScreenProps<"AddDailySport"> {}

export const AddDailySportScreen: FC<AddDailySportScreenProps> = observer(
  function AddDailySportScreen(_props) {
    const navigation = _props.navigation
    const { exerciseStore } = useStores()
    const [refreshing, setRefreshing] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
      ;(async function load() {
        setIsLoading(true)
        await exerciseStore.fetchExercises()
        console.log(exerciseStore.exercisesForList)
        setIsLoading(false)
      })()
    }, [exerciseStore])

    async function manualRefresh() {
      setRefreshing(true)
      await Promise.all([exerciseStore.fetchExercises(), delay(750)])
      setRefreshing(false)
    }

    function goBack() {
      navigation.navigate("Demo")
    }
    return (
      <FixedHeader handleGoBack={goBack} title={null}>
        <FlatList<Exercise>
          data={exerciseStore.exercisesForList}
          contentContainerStyle={$flatListContentContainer}
          refreshing={refreshing}
          onRefresh={manualRefresh}
          ListEmptyComponent={isLoading ? <ActivityIndicator /> : <></>}
          renderItem={({ item, index }) => (
            <ExerciseCard
              key={item.id}
              isSelected={exerciseStore.hasSelected(item)}
              exercise={item}
              onPressToggle={() => exerciseStore.toggleSelected(item)}
            />
          )}
        />
      </FixedHeader>
    )
  },
)

const ExerciseCard = observer(function ExerciseCard({
  exercise,
  isSelected,
  onPressToggle,
}: {
  exercise: Exercise
  isSelected: boolean
  onPressToggle: () => void
}) {
  const [isSelect, setIsSelect] = useState(isSelected)
  useEffect(() => {
    setIsSelect(isSelected)
  }, [isSelected])

  const handlePressCard = () => {
    console.log("handlePressCard")
  }

  const handleLongPressCard = () => {
    console.log("handleLongPressCard")
  }

  const handlePressAdd = () => {
    onPressToggle()
    setIsSelect(!isSelect)
  }

  return (
    <Card
      style={$item}
      onPress={handlePressCard}
      onLongPress={handleLongPressCard}
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
        <TouchableOpacity onPress={handlePressAdd}>
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
