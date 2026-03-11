"use client";
import { useCallback, useEffect, useState } from "react";
import { animate } from "animejs";

function Stick({ x, y, dl }: { x: number; y: number; dl: number }) {
  const ref = useCallback(
    (el: HTMLDivElement) => {
      animate(el, {
        ease: "inOut",
        delay: dl * 100,
        duration: 2000,
        y: { from: -100, to: 0 },
        opacity: { from: 0, to: 1 },
      });
    },
    [dl],
  );
  return (
    <div
      className="absolute w-20 h-200 overflow-hidden flex items-center"
      style={{ top: y, left: x }}
      ref={ref}
    >
      <div className="gradient1 blur-3xl w-[110%] h-1/2"></div>
    </div>
  );
}

function SticksBackground() {
  const [Sticks, setSticks] = useState<{ x: number; y: number; dl: number }[]>(
    [],
  );

  const callback = () => {
    if (typeof window === "undefined") return;
    const sticks = [];

    for (let x = 0; x < 20; x++) {
      sticks.push({ x: 60 * x, y: 70 * x, dl: x });
      sticks.push({ x: window.innerWidth - 60 * x - 80, y: 70 * x, dl: x });
    }

    ((sticks_: { x: number; y: number; dl: number }[]) => setSticks(sticks_))(
      sticks,
    );
  };

  useEffect(() => {
    callback();

    addEventListener("resize", callback);

    return () => {
      removeEventListener("resize", callback);
    };
  }, []);
  return (
    <div className="w-full h-full gradient2 overflow-hidden relative">
      {Sticks.map((el) => (
        <Stick key={el.x + "_" + el.y} {...el} />
      ))}
    </div>
  );
}

export default SticksBackground;
