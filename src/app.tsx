import { useState, useMemo } from 'preact/hooks'
import styles from './app.module.css'
import { ActionModel, type Action } from './actionModel'

export function App() {
  const actionModel = useMemo(() => new ActionModel(), [])
  const [currentAction, setCurrentAction] = useState<Action>(() => 
    actionModel.getRandomAction()
  )

  const handleNext = () => {
    setCurrentAction(actionModel.getRandomAction())
  }

  return (
    <div className={styles.container}>
      <div className={styles.actionCard}>
        <p className={styles.actionText}>{currentAction.name}</p>
      </div>
      <div className={styles.navigation}>
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