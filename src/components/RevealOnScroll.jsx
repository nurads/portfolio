import { useEffect, useRef } from "react";

export const RevealOnScroll = ({ children }) => {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // A ratio-based threshold can never be met by sections taller than the
    // viewport, so reveal as soon as any part of the element scrolls in.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("visible");
        observer.disconnect();
      },
      { threshold: 0, rootMargin: "0px 0px -80px 0px" }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="reveal">
      {children}
    </div>
  );
};
