import { useState, useMemo, useRef } from "preact/hooks";
import styles from "./app.module.css";
import { ActionModel, type Action } from "./actionModel";
import { useFitTextSize } from "./useFitTextSize";

export function App() {
  const actionModel = useMemo(() => new ActionModel(), []);
  const [currentAction, setCurrentAction] = useState<Action>(() =>
    actionModel.getRandomAction(),
  );

  const handleNext = () => {
    setCurrentAction(actionModel.getRandomAction());
  };

  const headerEl = useRef<HTMLParagraphElement>(null);
  const containerEl = useRef<HTMLDivElement>(null);

  useFitTextSize(headerEl, containerEl, currentAction.name);

  return (
    <div className={styles.container}>
      <div className={styles.actionCardContainer} ref={containerEl}>
        <div className={styles.actionCard}>
          <p
            className={styles.actionText}
            key={currentAction.name}
            ref={headerEl}
          >
            {currentAction.name}
          </p>
        </div>
      </div>
      <div className={styles.navigation}>
        <button onClick={handleNext} className={styles.button} type="button">
          disobey
        </button>
      </div>
    </div>
  );
}
