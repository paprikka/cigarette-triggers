import {
  useState,
  useMemo,
  useRef,
  useEffect,
  type MutableRef,
} from "preact/hooks";
import styles from "./app.module.css";
import { ActionModel, type Action } from "./actionModel";

const fitText = (element: HTMLElement, container: HTMLElement) => {
  // Reset to a large font size to start
  let fontSize = 200;
  element.style.fontSize = `${fontSize}px`;

  // Reduce font size until text fits within container
  while (
    (element.scrollWidth > container.clientWidth ||
      element.scrollHeight > container.clientHeight) &&
    fontSize > 16
  ) {
    console.log({ fontSize });
    fontSize *= 0.95;
    element.style.fontSize = `${fontSize}px`;
  }
};

const useFitTextSize = (
  elementRef: MutableRef<HTMLElement | null>,
  containerRef: MutableRef<HTMLElement | null>,
  text: string,
) => {
  useEffect(() => {
    const element = elementRef.current;
    const container = containerRef.current;
    if (!element) return;
    if (!container) return;
    if (!text) return;

    // Initial fit
    fitText(element, container);

    // Throttled resize handler
    let resizeTimeout: number;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (element && container) {
          fitText(element, container);
        }
      }, 50);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimeout);
    };
  }, [text, elementRef.current, containerRef.current]);
};

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
          Again
        </button>
      </div>
    </div>
  );
}
