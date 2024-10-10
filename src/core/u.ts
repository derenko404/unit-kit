import type { ParsedRawValue, RawInput, ToUnitOptions } from "./types";

import { UNITS_CONVERSION_MAP, defaultConfiguration } from "./constants";

const REGEXP = /^(\d+(\.\d+)?)(\s?)([a-zA-Z]+)$/;

const parseRawValue = (input: string): ParsedRawValue => {
  const match = input.trim().match(REGEXP);

  if (!match) {
    throw new Error(`unknown input format ${input}`);
  };

  const value = parseFloat(match[1]);
  const unit = match[4].toLowerCase();

  for (const [type, { units }] of Object.entries(UNITS_CONVERSION_MAP)) {
    // @ts-expect-error
    if (units.includes(unit)) {
      // @ts-expect-error
      return { value, type, unit };
    }
  };

  throw new Error(`unknown unit type ${input}`);
};

const parse = <T1 extends RawInput, T2 extends ToUnitOptions<T1>>(rawValue: T1, toUnit?: T2) => {
  const parsedValue = parseRawValue(rawValue);

  const configuration = defaultConfiguration.units[parsedValue.type];
  const finalUnit = toUnit ?? configuration.defaultParseTo;

  const { conversions, units } = UNITS_CONVERSION_MAP[parsedValue.type];

  // @ts-expect-error
  if (!units.includes(finalUnit)) {
    throw new Error(`unknown output unit ${finalUnit}`);
  };

  // @ts-expect-error
  const valueInBaseUnit = parsedValue.value * conversions[parsedValue.unit];

  // @ts-expect-error
  const valueInTargetUnit = valueInBaseUnit / conversions[finalUnit];

  const precision = configuration.precision;

  const formattedValueInTargetUnit = `${valueInTargetUnit.toFixed(precision)}`;

  return {
    formattedValue: formattedValueInTargetUnit,
    valueAsNumber: valueInTargetUnit,
    unit: finalUnit as T2,
  };
};

const safeParse = <T1 extends RawInput, T2 extends ToUnitOptions<T1>>(rawValue: T1, toUnit?: T2) => {
  try {
    return parse(rawValue, toUnit);
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const u = {
  parse,
  safeParse,
};