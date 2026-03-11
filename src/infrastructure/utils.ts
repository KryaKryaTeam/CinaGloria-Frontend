import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export class PerlinNoise {
  private p: number[] = new Array(512);

  constructor(seed?: number) {
    const permutation = Array.from({ length: 256 }, (_, i) => i);

    // Перемішування (Shuffle) на основі сіда
    const m = seed || Math.random();
    for (let i = 255; i > 0; i--) {
      const j = Math.floor(m * (i + 1)) % 256;
      [permutation[i], permutation[j]] = [permutation[j], permutation[i]];
    }

    for (let i = 0; i < 512; i++) {
      this.p[i] = permutation[i % 256];
    }
  }

  public noise(x: number, y: number, z: number = 0): number {
    const X = Math.floor(x) & 255;
    const Y = Math.floor(y) & 255;
    const Z = Math.floor(z) & 255;

    x -= Math.floor(x);
    y -= Math.floor(y);
    z -= Math.floor(z);

    const u = this.fade(x);
    const v = this.fade(y);
    const w = this.fade(z);

    const A = this.p[X] + Y,
      AA = this.p[A] + Z,
      AB = this.p[A + 1] + Z;
    const B = this.p[X + 1] + Y,
      BA = this.p[B] + Z,
      BB = this.p[B + 1] + Z;

    return this.lerp(
      w,
      this.lerp(
        v,
        this.lerp(
          u,
          this.grad(this.p[AA], x, y, z),
          this.grad(this.p[BA], x - 1, y, z),
        ),
        this.lerp(
          u,
          this.grad(this.p[AB], x, y - 1, z),
          this.grad(this.p[BB], x - 1, y - 1, z),
        ),
      ),
      this.lerp(
        v,
        this.lerp(
          u,
          this.grad(this.p[AA + 1], x, y, z - 1),
          this.grad(this.p[BA + 1], x - 1, y, z - 1),
        ),
        this.lerp(
          u,
          this.grad(this.p[AB + 1], x, y - 1, z - 1),
          this.grad(this.p[BB + 1], x - 1, y - 1, z - 1),
        ),
      ),
    );
  }

  private fade(t: number): number {
    return t * t * t * (t * (t * 6 - 15) + 10);
  }
  private lerp(t: number, a: number, b: number): number {
    return a + t * (b - a);
  }
  private grad(hash: number, x: number, y: number, z: number): number {
    const h = hash & 15;
    const u = h < 8 ? x : y;
    const v = h < 4 ? y : h === 12 || h === 14 ? x : z;
    return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
  }
}

const perlin = new PerlinNoise(Math.random() * 10000);
export type Point = {
  x: number;
  y: number;
  size: number;
  color: { r: number; g: number; b: number };
};

export function getRandomChoosen(width: number, height: number, num: number) {
  return new Array(num).fill({ x: 0, y: 0 }).map(() => ({
    x: Math.floor(Math.random() * width),
    y: Math.floor(Math.random() * height),
  }));
}

export function generateWavesForScreen(
  width: number,
  height: number,
  frame: number,
  choosen: { x: number; y: number }[],
): Point[] {
  const dots: Point[] = [];
  const gap = 30;
  const frequency = 0.02;
  const amplitude = 50;
  const speed = 0.5;
  const redCof = 0;
  const greenCof = 10;
  const blueCof = 0;

  for (let x = 0; x < width; x += gap) {
    for (let y = 0; y < height; y += gap) {
      let sum = 0;
      choosen.forEach((el) => {
        const dx = x - el.x;
        const dy = y - el.y;
        sum += Math.sqrt(dx * dx + dy * dy);
      });

      sum = sum / choosen.length;

      const ringEffect = sum * frequency - frame * speed;
      const noise = perlin.noise(ringEffect, x * 0.002, y * 0.002);

      const offsetZ = noise * amplitude;

      const fade = Math.max(0, 1 - sum / (width * 0.8));
      const finalZ = offsetZ * fade;

      const brightness = Math.floor((noise + 1) * 127.5);

      dots.push({
        x: x,
        y: y + finalZ,
        size: Math.min(Math.max(3, finalZ / 10), 10),
        color: {
          r: Math.min(255, 255 - (brightness + redCof)),
          g: Math.min(255, 255 - (brightness + greenCof)),
          b: Math.min(255, 255 - (brightness + blueCof)),
        },
      });
    }
  }

  return dots;
}
