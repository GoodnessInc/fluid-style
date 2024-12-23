// Settings
const defaultMinFactor = 0.7,
  defaultMaxBreak = 1440,
  defaultMinBreak = 375;

// Make a CSS clamp with a calc value that fluidly scales a value between the
// max px value and the min px value over the range specified by the maxBreak
// and minBreak values.
// Examples:
// - fluid(40)
// - fluid(40, 20, 1280)
// - fluid(40, 20, { minBreak: 300 })
// - fluid({ max: 40, minBreak: 300 })

export function fluid(...args: FluidOption[]): string {
  const { max, min, maxBreak, minBreak, scalingUnit } = processArgs(args),
    clampValue = makeCalc(max, min, maxBreak, minBreak, scalingUnit);
  return `clamp(${min}px, ${clampValue}, ${max}px)`;
}

// Process the args, which works like the old Stylus function where any arg
// can be a value or the remaining options
function processArgs(args: FluidOption[]): CalcArgs {
  // Default options
  const defaultOptions: any = {
    max: null,
    min: null,
    maxBreak: null,
    minBreak: null,
    scalingUnit: "vw",
    defaultMinFactor,
    defaultMaxBreak,
    defaultMinBreak,
  };

  // Reduce the arry of arg numbers and objects to an object
  const options = args.reduce(
    (options: object, arg: FluidOption, index: number) => {
      if (typeof arg == "object") return { ...options, ...arg };
      else return { ...options, [optionKeyFromIndex(index)]: arg };
    },
    defaultOptions
  ) as any;

  // Set defaults for empty values
  if (options.max == null) throw "Max value is required";
  if (!options.min) options.min = options.max * options.defaultMinFactor;
  if (!options.maxBreak) options.maxBreak = options.defaultMaxBreak;
  if (!options.minBreak) options.minBreak = options.defaultMinBreak;

  // Return options
  return options as CalcArgs;
}

// Figure out which option an arg index represents
function optionKeyFromIndex(argIndex: number) {
  switch (argIndex) {
    case 0:
      return "max";
    case 1:
      return "min";
    case 2:
      return "maxBreak";
    case 3:
      return "minBreak";
    default:
      throw `Unexpected arg index ${argIndex}`;
  }
}

// Make the calc that fluidly scales the value betwee max and min
function makeCalc(
  max: number,
  min: number,
  maxBreak: number,
  minBreak: number,
  scalingUnit: FluidOptions["scalingUnit"]
): string {
  const ratio = (max - min) / (maxBreak - minBreak),
    baseSize = `${min - ratio * minBreak}px`,
    scalingSize = `${ratio * 100}${scalingUnit}`;
  return `calc(${baseSize} + ${scalingSize})`;
}

// A given option may be a number or an options object
type FluidOption = number | FluidOptions;

// The actual options object
interface FluidOptions {
  max?: number;
  min?: number;
  maxBreak?: number;
  minBreak?: number;
  scalingUnit?: "vw" | "vh";

  // Used if wrapping in a function to set defaults
  defaultMinFactor?: number;
  defaultMaxBreak?: number;
  defaultMinBreak?: number;
}

// After processing the args to fluid, we have explicit valus for the following
// properties
type CalcArgs = Required<
  Pick<FluidOptions, "max" | "min" | "maxBreak" | "minBreak" | "scalingUnit">
>;
