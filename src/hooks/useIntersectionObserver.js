import { useEffect, useRef } from "react";

export function useIntersectionObserver(callback) {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) callback();
    });

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [callback]);

  return ref;
}
