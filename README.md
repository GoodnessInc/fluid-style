# fluid-style

Make a CSS clamp with a calc value that fluidly scales a value between values.

## Usage

### Function

```js
// tailwind.config.js
import { fluid } from 'fluid-style'
export default {
  theme: {
    extend: {
      spacing: {
        gutter: fluid(32, 16),
      }
    }
  }
}
```

### Tailwind plugin

```js
// tailwind.config.js
import { fluidPlugin } from 'fluid-style'
export default {
  plugins: [
    fluidPlugin,
  ]
}
```

```tsx
export function example() {
  return (
    <div className='fluid-[font-size,100,40,{minBreak:768}]'>
      Hello World
    </div>
  )
}
```

### Preset

Adds fluid versions of all the default spacing values using an `f` suffix. For example:

- `py-8f`
- `h-96f`

```js
// tailwind.config.js
import { fluidPreset } from 'fluid-style'
export default {
  presets: [
    fluidPreset,
  ]
}
```
