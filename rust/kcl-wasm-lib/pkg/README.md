This package is a pre-built WASM bundle of the kcl-lib crate for use in TauCAD.

To build, follow the instructions in the [CONTRIBUTING.md](../../../CONTRIBUTING.md) file.

Then copy the API bindings to keep the entire KCL WASM API in a single package:

```bash
cp -r ./rust/kcl-lib/bindings ./rust/kcl-wasm-lib/pkg/
```

Then publish the package to npm:

```bash
npm publish
```

Modifications:

- The package.json is updated to include correct subpath `exports` for dual ESM/CommonJS support.
