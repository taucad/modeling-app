# @taucad/kcl-wasm-lib

WebAssembly bindings for the [KittyCAD Language](https://github.com/KittyCAD/modeling-app/tree/main/rust/kcl-lib) engine, built from the `taucad/modeling-app` fork for Tau.

```js
import init, { parse_wasm } from '@taucad/kcl-wasm-lib'
import wasmUrl from '@taucad/kcl-wasm-lib/kcl.wasm'

await init({ module_or_path: wasmUrl })
const [program, issues] = parse_wasm('length = 12mm')
```

The package is ESM-only and browser-first. Generated type-only bindings are available from `@taucad/kcl-wasm-lib/bindings/*`.

> [!WARNING]
> This prerelease API has no backwards-compatibility guarantee.

Licensed under MIT. Releases are built by GitHub Actions and published to npm with provenance.
