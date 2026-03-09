"use client";
import {
  generateWavesForScreen,
  getRandomChoosen,
  Point,
} from "@/infrastructure/utils";
import { useCallback, useRef } from "react";

export default function WaveBackground() {
  const requestRef = useRef<number>(null);

  const setUpAnimation = useCallback((canvas: HTMLCanvasElement | null) => {
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const width = window.innerWidth;
    const height = window.innerHeight;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    let frame = 0;

    const choosen = getRandomChoosen(width, height, 2);
    console.log(choosen);

    function render() {
      ctx!.fillStyle = "black";
      ctx!.fillRect(0, 0, width, height);

      const dots = generateWavesForScreen(width, height, frame, choosen);

      dots.forEach((dot: Point) => {
        ctx!.fillStyle = `rgb(${dot.color.r},${dot.color.g},${dot.color.b})`;

        ctx!.beginPath();
        ctx!.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
        ctx!.fill();
      });

      frame += 0.01; // Швидкість анімації
      requestRef.current = requestAnimationFrame(render);
    }

    render();

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <canvas
      className="fixed inset-0 w-[110%] h-[110%] z-[-1] top-[-5%] left-[-5%] bg-black blur-xl"
      ref={setUpAnimation}
    ></canvas>
  );
}
