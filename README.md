# fluid-style

Makes a CSS clamp with a calc value that fluidly scales a value between values.

## Usage

### Function

```ts
// tailwind.config.js
import { fluid } from 'fluid-style'
export deafult {
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

```ts
// tailwind.config.js
import { fluidPlugin } from 'fluid-style'
export deafult {
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
