declare const DISTANCE_UNITS: readonly ["mm", "cm", "inch", "dm", "m", "km"];

declare type DistanceUnit = typeof DISTANCE_UNITS[number];

declare type ExtractLetters<T extends string> = T extends `${infer First}${infer Rest}` ? (First extends 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h' | 'i' | 'j' | 'k' | 'l' | 'm' | 'n' | 'o' | 'p' | 'q' | 'r' | 's' | 't' | 'u' | 'v' | 'w' | 'x' | 'y' | 'z' | 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'K' | 'L' | 'M' | 'N' | 'O' | 'P' | 'Q' | 'R' | 'S' | 'T' | 'U' | 'V' | 'W' | 'X' | 'Y' | 'Z' ? `${First}${ExtractLetters<Rest>}` : ExtractLetters<Rest>) : '';

declare const MEMORY_UNITS: readonly ["b", "kb", "mb", "gb", "tb", "pb"];

declare type MemoryUnit = typeof MEMORY_UNITS[number];

export declare type RawInput = `${number | `${number}.${string}`}${TimeUnit}` | `${number | `${number}.${string}`}${DistanceUnit}` | `${number | `${number}.${string}`}${MemoryUnit}`;

declare const TIME_UNITS: readonly ["ms", "s", "min", "h", "d"];

declare type TimeUnit = typeof TIME_UNITS[number];

export declare type ToUnitOptions<T extends string> = Exclude<UnitType<ExtractLetters<T>>, ExtractLetters<T>>;

export declare const u: {
    parse: <T1 extends RawInput, T2 extends ToUnitOptions<T1>>(rawValue: T1, toUnit?: T2) => {
        formattedValue: string;
        valueAsNumber: number;
        unit: T2;
    };
    safeParse: <T1 extends RawInput, T2 extends ToUnitOptions<T1>>(rawValue: T1, toUnit?: T2) => {
        formattedValue: string;
        valueAsNumber: number;
        unit: T2;
    } | null;
};

declare type UnitType<T> = T extends TimeUnit ? TimeUnit : T extends DistanceUnit ? DistanceUnit : T extends MemoryUnit ? MemoryUnit : never;

export { }
