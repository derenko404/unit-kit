import type { DistanceUnit, MemoryUnit, TimeUnit } from "./constants";

export type ExtractLetters<T extends string> =
  T extends `${infer First}${infer Rest}`
  ? (First extends 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h' | 'i' | 'j'
    | 'k' | 'l' | 'm' | 'n' | 'o' | 'p' | 'q' | 'r' | 's' | 't'
    | 'u' | 'v' | 'w' | 'x' | 'y' | 'z'
    | 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J'
    | 'K' | 'L' | 'M' | 'N' | 'O' | 'P' | 'Q' | 'R' | 'S' | 'T'
    | 'U' | 'V' | 'W' | 'X' | 'Y' | 'Z'
    ? `${First}${ExtractLetters<Rest>}`
    : ExtractLetters<Rest>)
  : '';

type UnitType<T> =
  T extends TimeUnit ? TimeUnit :
  T extends DistanceUnit ? DistanceUnit :
  T extends MemoryUnit ? MemoryUnit : never;

export type RawInput = `${number | `${number}.${string}`}${TimeUnit}` | `${number | `${number}.${string}`}${DistanceUnit}` | `${number | `${number}.${string}`}${MemoryUnit}`;

export type ToUnitOptions<T extends string> = Exclude<UnitType<ExtractLetters<T>>, ExtractLetters<T>>;

export type ParsedRawValue = {
  value: number;
  type: "time";
  unit: TimeUnit;
} | {
  value: number;
  type: "distance";
  unit: DistanceUnit;
} | {
  value: number;
  type: "memory";
  unit: MemoryUnit;
};