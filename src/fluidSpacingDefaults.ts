import { fluid } from './fluid'

// https://tailwindcss.com/docs/customizing-spacing#default-spacing-scale
const defaultSpaceScale = [
  0,
  0.5, // Jump by 0.5
  1,
  1.5,
  2,
  2.5,
  3,
  3.5,
  4, // Jump by 1
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  14,
  16,
  20,
  24,
  28,
  32,
  36,
  40,
  44,
  48,
  52,
  56,
  60,
  64,
  72,
  80,
  96,
];

// The scale keys result in pixel values by multiplying by 4
const defaultSpaceScaleFactor = 4;

// Make fluid versions of all the default spacing values that have `f`
// prefixes.  So you can do, for instance, `py-8f`.
// https://tailwindcss.com/docs/customizing-spacing#default-spacing-scale
export function makeFluidSpacingDefaults(): object {
  return Object.fromEntries(
    defaultSpaceScale.map((space: number): SpaceEntry => {
      return [`${space}f`, fluid(space * defaultSpaceScaleFactor)];
    })
  );
}

type SpaceEntry = [SpaceName, SpaceFluidValue];
type SpaceName = string;
type SpaceFluidValue = string;
