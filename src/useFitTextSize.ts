import { type MutableRef, useEffect, useLayoutEffect } from "preact/hooks";

export const fitText = (element: HTMLElement, container: HTMLElement) => {
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

export const useFitTextSize = (
  elementRef: MutableRef<HTMLElement | null>,
  containerRef: MutableRef<HTMLElement | null>,
  text: string,
) => {
  useLayoutEffect(() => {
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
      }, 10);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimeout);
    };
  }, [text]);
};
