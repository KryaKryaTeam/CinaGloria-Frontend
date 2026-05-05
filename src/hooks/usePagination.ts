import { useEffect, useLayoutEffect, useRef } from "react";

export const usePagination = <PromiseType, E extends Element>(
  fetchFn: () => Promise<PromiseType>,
  options: IntersectionObserverInit,
) => {
  const ref = useRef<E>(null);
  const fetchFnRef = useRef(fetchFn);
  const isExhausted = useRef(false);
  const isLoading = useRef(false); // ← додано

  useLayoutEffect(() => {
    fetchFnRef.current = fetchFn;
  });

  useEffect(() => {
    const element = ref.current;
    if (!element || isExhausted.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || isExhausted.current || isLoading.current)
        return;

      isLoading.current = true; // ← блокуємо повторні запити
      fetchFnRef
        .current()
        .finally(() => {
          isLoading.current = false;
        })
        .catch((error) => {
          if (error?.status === 401) {
            isExhausted.current = true;
            observer.disconnect();
          }
        });
    }, options);

    observer.observe(element);
    return () => observer.disconnect();
  }, [ref.current, options.root, options.threshold, options.rootMargin]);

  return ref;
};
