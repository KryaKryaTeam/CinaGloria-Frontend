import { useEffect, useLayoutEffect, useRef } from "react";

export const usePagination = <PromiseType, E extends Element>(
  fetchFn: () => Promise<PromiseType>,
  options: IntersectionObserverInit
) => {
  const ref = useRef<E>(null);
  const fetchFnRef = useRef(fetchFn);
  const isExhausted = useRef(false); // 404 = більше не фетчимо

  useLayoutEffect(() => {
    fetchFnRef.current = fetchFn;
  });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (isExhausted.current) return; // елемент змінився, але дані скінчились

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        if (isExhausted.current) {
          observer.disconnect();
          return;
        }

        fetchFnRef.current().catch((error) => {
          if (error?.status === 404) {
            isExhausted.current = true;
            observer.disconnect();
          }
        });
      },
      options
    );

    observer.observe(element);
    return () => observer.disconnect();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref.current, options.root, options.threshold, options.rootMargin]);

  return ref;
};