/* eslint-disable react-hooks/refs */
/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useLayoutEffect, useRef, useState } from "react";

interface UsePaginationOptions extends IntersectionObserverInit {
  dependencies?: unknown[];
  startPage?: number;
}

export const usePagination = <PromiseType, E extends Element>(
  fetchFn: (page: number) => Promise<PromiseType>,
  {
    dependencies = [],
    startPage = 1,
    ...observerOptions
  }: UsePaginationOptions,
) => {
  const ref = useRef<E>(null);
  const fetchFnRef = useRef(fetchFn);

  const [page, setPage] = useState(startPage);
  const isExhausted = useRef(false);
  const isLoading = useRef(false);

  useLayoutEffect(() => {
    fetchFnRef.current = fetchFn;
  });

  // Скидаємо все при зміні фільтрів
  useEffect(() => {
    setPage(0);
    isExhausted.current = false;
    isLoading.current = false;
  }, dependencies);

  useEffect(() => {
    const element = ref.current;
    if (!element || isExhausted.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || isExhausted.current || isLoading.current)
        return;

      isLoading.current = true;

      fetchFnRef
        .current(page)
        .then(() => {
          // Якщо запит успішний, ідемо на наступну сторінку
          setPage((prev) => prev + 1);
        })
        .catch((error) => {
          console.log(error);
          if (error?.status === 404 || error?.code === 404) {
            isExhausted.current = true;
            console.log("Pagination exhausted: 404 received");
          } else if (error?.status === 401) {
            isExhausted.current = true;
          }
        })
        .finally(() => {
          isLoading.current = false;
        });
    }, observerOptions);

    observer.observe(element);
    return () => observer.disconnect();
  }, [page, ...dependencies]); // Додаємо page, щоб замикання бачило актуальну сторінку

  return {
    ref,
    page,
    isLoading: isLoading.current,
    isExhausted: isExhausted.current,
  };
};
