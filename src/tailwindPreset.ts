import { makeFluidSpacingDefaults } from './fluidSpacingDefaults'

// Adds fluid versions of all the default spacing values using an `f` suffix.
export default {
  theme: {
    extend: {
      spacing: makeFluidSpacingDefaults()
    }
  }
}
