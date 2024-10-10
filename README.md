
# UnitKit - Parse and Convert Units Effortlessly

**UnitKit** is a lightweight JavaScript library that parses and converts units of measurement such as time, distance, and memory. With full **TypeScript** support, UnitKit provides strongly typed utility functions to easily handle unit conversion across various types.

## Road Map

- [ ] add ability to use custom global configuration ⏳
- [ ] add more units and unit-types ⏳

## Installation

Install the library using npm:

```bash
npm install unit-kit
```

or yarn:

```bash
yarn add unit-kit
```

## Supported units ⏳

```
export const TIME_UNITS = ["ms", "s", "min", "h", "d"] as const;

export const DISTANCE_UNITS = ["mm", "cm", "inch", "dm", "m", "km"] as const;

export const MEMORY_UNITS = ["b", "kb", "mb", "gb", "tb", "pb"] as const;
```

## Usage

UnitKit exports two main functions: `parse` and `safeParse`. These functions handle parsing input strings into unit values and converting them to the desired unit.

### `parse`

The `parse` function takes an input string containing a raw value and a unit, then converts it to a target unit. If no target unit is provided, it defaults to a configured unit for the type.

#### Example:

```typescript
import { u } from 'unit-kit';

// Convert 1 hour to minutes
const result = u.parse("1h", "min");
console.log(result); 
// Output: { formattedValue: '60.00', valueAsNumber: 60, unit: 'min' }
```

#### Parameters:

- `rawValue` (string): A string representing the value and unit, e.g., `"5km"`, `"1024mb"`, `"2h"`.
- `toUnit` (string): Optional. The unit you want to convert the value to. If omitted, it defaults to the unit defined in the configuration.

#### Return Value:

The `parse` function returns an object containing:
- `formattedValue`: The converted value as a string.
- `valueAsNumber`: The converted value as a number.
- `unit`: The unit the value was converted to.

### `safeParse`

The `safeParse` function works like `parse` but wraps the conversion in a `try-catch` block. If an error occurs (e.g., unsupported unit or invalid input), it logs the error and returns `null`.

#### Example:

```typescript
const result = u.safeParse("invalid input");
console.log(result); // Output: null
```

### Error Handling

UnitKit will throw an error if the input format or unit is not recognized:

```typescript
u.parse("100 xyz"); // Error: unknown unit type 100 xyz
```

## Full TypeScript Support

UnitKit is fully written in TypeScript, ensuring strong type safety for all its functions. The types for inputs and outputs are fully defined, making it easy to integrate into TypeScript projects.

### Example (TypeScript):

```typescript
import { u } from 'unit-kit';

const result = u.parse("500b", "kb");

type ConversionResult = {
  formattedValue: string;
  valueAsNumber: number;
  unit: string;
};

console.log(result.formattedValue); // Output: '0.5'
```

## API

### `parseRawValue(input: string) => ParsedRawValue`

Parses a raw string into its value and unit type.

### Constants

- **`UNITS_CONVERSION_MAP`**: A mapping between different types of units (e.g., time, distance) and their respective conversion factors.
- **`defaultConfiguration`**: Contains default settings like precision and the default unit to convert to.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request if you find a bug or have suggestions for improvements.

## License

This project is licensed under the MIT License.
