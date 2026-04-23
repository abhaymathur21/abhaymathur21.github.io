import { useEffect, useRef } from "react";

export default function useScrollReveal(selector = ".reveal", stagger = 80) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const elements = container.querySelectorAll(selector);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const delay = el.dataset.revealDelay || 0;
            setTimeout(() => el.classList.add("revealed"), delay);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    elements.forEach((el, i) => {
      el.dataset.revealDelay = i * stagger;
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [selector, stagger]);

  return containerRef;
}
