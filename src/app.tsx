import { useState } from 'preact/hooks'
import styles from './app.module.css'
import actionsData from './actions.json'

type Action = {
  name: string
  categories: string[]
}

export function App() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const actions = actionsData as Action[]

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : actions.length - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < actions.length - 1 ? prev + 1 : 0))
  }

  const currentAction = actions[currentIndex]

  return (
    <div className={styles.container}>
      <div className={styles.actionCard}>
        <p className={styles.actionText}>{currentAction.name}</p>
      </div>
      <div className={styles.navigation}>
        <button 
          onClick={handlePrevious} 
          className={styles.button}
          type="button"
        >
          Previous
        </button>
        <button 
          onClick={handleNext} 
          className={styles.button}
          type="button"
        >
          Next
        </button>
      </div>
    </div>
  )
}