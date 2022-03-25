import { useState, ReactNode } from 'react'
import { StyleSheet, View, FlatList, Button } from 'react-native'
import { StatusBar } from 'expo-status-bar'

import GoalItem from './components/GoalItem'
import GoalInput from './components/GoalInput'

type TState = {
  text: string
  id: string
}

const App: () => ReactNode = () => {
  const [modalIsVisible, setModalIsVisible] = useState(false)
  const [courseGoals, setCourseGoals] = useState<TState[]>([])

  const startAddGoalHandler = () => {
    setModalIsVisible(true)
  }

  const endAndGoalHandler = () => {
    setModalIsVisible(false)
  }

  const addGoalHandler = (enteredGoalText: string) => {
    setCourseGoals((currentCourseGoals) => [
      ...currentCourseGoals,
      { text: enteredGoalText, id: Math.random().toString() },
    ])
    endAndGoalHandler()
  }

  const deleteGoalHandler = (id: string) => {
    setCourseGoals((currentCourseGoals) =>
      currentCourseGoals.filter((goal) => goal.id !== id)
    )
  }

  return (
    <>
      <StatusBar style="light" />
      <View style={styles.appContainer}>
        <Button
          title="Add New Goal"
          color="#a065ec"
          onPress={startAddGoalHandler}
        />
        <GoalInput
          visible={modalIsVisible}
          onAddGoal={addGoalHandler}
          onCancel={endAndGoalHandler}
        />
        <View style={styles.goalsContainer}>
          <FlatList
            data={courseGoals}
            renderItem={(itemData) => (
              <GoalItem
                text={itemData.item.text}
                id={itemData.item.id}
                onDeleteItem={deleteGoalHandler}
              />
            )}
            keyExtractor={(item) => item.id}
            alwaysBounceVertical={false}
          />
        </View>
      </View>
    </>
  )
}

export default App

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
    backgroundColor: '#1e085a',
  },
  goalsContainer: {
    flex: 5,
  },
})
