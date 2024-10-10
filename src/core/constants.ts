export const TIME_UNITS = ["ms", "s", "min", "h", "d"] as const;
export const DISTANCE_UNITS = ["mm", "cm", "inch", "dm", "m", "km"] as const;
export const MEMORY_UNITS = ["b", "kb", "mb", "gb", "tb", "pb"] as const;

export type TimeUnit = typeof TIME_UNITS[number];
export type DistanceUnit = typeof DISTANCE_UNITS[number];
export type MemoryUnit = typeof MEMORY_UNITS[number];

type UnitConversionConfiguration<T extends readonly any[]> = {
  units: T,
  conversions: Record<T[number], number>
};

type UnitsConversionMap = {
  time: UnitConversionConfiguration<typeof TIME_UNITS>;
  distance: UnitConversionConfiguration<typeof DISTANCE_UNITS>;
  memory: UnitConversionConfiguration<typeof MEMORY_UNITS>;
};

export const UNITS_CONVERSION_MAP: UnitsConversionMap = {
  time: {
    units: TIME_UNITS,
    conversions: {
      ms: 1,
      s: 1000,
      min: 1000 * 60,
      h: 1000 * 60 * 60,
      d: 1000 * 60 * 60 * 24,
    }
  },
  distance: {
    units: DISTANCE_UNITS,
    conversions: {
      mm: 1,
      cm: 10,
      inch: 25.4,
      dm: 100,
      m: 1000,
      km: 1000 * 1000
    }
  },
  memory: {
    units: MEMORY_UNITS,
    conversions: {
      b: 1,
      kb: 1000,
      mb: 1024 ** 2,
      gb: 1024 ** 3,
      tb: 1024 ** 4,
      pb: 1024 ** 5
    }
  }
} as const;

type UnitConfiguration<T> = {
  precision: number;
  defaultParseTo: T
}

type ParserConfiguration = {
  units: {
    time: UnitConfiguration<TimeUnit>;
    distance: UnitConfiguration<DistanceUnit>;
    memory: UnitConfiguration<MemoryUnit>
  };
};

export const defaultConfiguration: ParserConfiguration = {
  units: {
    time: {
      defaultParseTo: "ms",
      precision: 0,
    },
    distance: {
      defaultParseTo: "mm",
      precision: 2,
    },
    memory: {
      defaultParseTo: "b",
      precision: 0,
    }
  }
};