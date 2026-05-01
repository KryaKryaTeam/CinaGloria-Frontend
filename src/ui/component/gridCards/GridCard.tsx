import { useLoadMachine } from "@/hooks/loadMachine/useLoadMachine.hook";
import { cn } from "@/infrastructure/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import { clear } from "console";
import { observer } from "mobx-react-lite";
import { useAnimate, useIsPresent, usePresence } from "motion/react";
import React, {
  Children,
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

const _GridCardDelayContext = createContext<{
  register(): number;
  clear(ind: number): void;
}>({
  register() {
    return 0;
  },
  clear(ind: number) {},
});

export const GridCardDelayContext = {
  use() {
    return useContext(_GridCardDelayContext);
  },
  Provider({ value, children }: PropsWithChildren<{ value: number }>) {
    const indexRef = useRef(0);

    const api = useMemo(
      () => ({
        register: () => {
          const current = indexRef.current;
          indexRef.current++;
          return (current * value) / 100;
        },
        clear: (ind: number) => {
          if ((ind / value) * 100 === indexRef.current - 1)
            indexRef.current = 0;
        },
      }),
      [value],
    );

    return (
      <_GridCardDelayContext.Provider value={api}>
        {children}
      </_GridCardDelayContext.Provider>
    );
  },

  useRegister: () => {
    const ctx = useContext(_GridCardDelayContext);
    const [delay, setDelay] = useState<number>(0);
    const registered = useRef(false);

    useLayoutEffect(() => {
      if (!ctx || registered.current) return;

      const val = ctx.register();
      setDelay(val);
      registered.current = true;

      return () => {
        ctx.clear(val);
        registered.current = false;
      };
    }, [ctx]);

    return delay;
  },
};

function GridCard({
  name,
  children,
  className,
  ...props
}: PropsWithChildren<{ name?: string }> & React.ComponentProps<"div">) {
  const loadMachine = useLoadMachine();
  const [scope, animate] = useAnimate();
  const isPresent = useIsPresent();

  const delay = GridCardDelayContext.useRegister();

  const animateCallback = useRef<() => void>(null);

  useLayoutEffect(() => {
    animateCallback.current = () =>
      animate(
        scope.current,
        { y: [-200, 0], opacity: [0, 1] },
        {
          duration: 0.5,
          ease: "circInOut",
          delay,
        },
      );
  }, [delay]);

  useEffect(() => {
    if (isPresent && !loadMachine.isAppBlocking) {
      animateCallback.current!();
    }
  }, [isPresent, loadMachine.isAppBlocking, delay]);

  return (
    <Card
      className={cn("overflow-hidden relative", className)}
      {...props}
      ref={scope}
    >
      {name ? (
        <CardHeader>
          <CardTitle>{name}</CardTitle>
        </CardHeader>
      ) : null}
      <CardContent>{children}</CardContent>
    </Card>
  );
}

export default observer(GridCard);