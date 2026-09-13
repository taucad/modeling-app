#!/usr/bin/env node

import assert from 'node:assert/strict'
import { readFile, readdir } from 'node:fs/promises'
import { join, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

const packageDirectory = resolve(process.argv[2] ?? 'rust/kcl-wasm-lib/pkg')
const manifest = JSON.parse(await readFile(join(packageDirectory, 'package.json'), 'utf8'))
const expectedVersion = process.env.KCL_WASM_EXPECTED_VERSION

assert.equal(manifest.name, '@taucad/kcl-wasm-lib')
assert.equal(manifest.private, false)
assert.equal(manifest.license, 'MIT')
assert.equal(manifest.repository?.url, 'git+https://github.com/taucad/modeling-app.git')
assert.equal(manifest.publishConfig?.access, 'public')
if (expectedVersion) assert.equal(manifest.version, expectedVersion)

const expectedTopLevel = [
  'LICENSE',
  'README.md',
  'bindings',
  'kcl_wasm_lib.d.ts',
  'kcl_wasm_lib.js',
  'kcl_wasm_lib_bg.wasm',
  'kcl_wasm_lib_bg.wasm.d.ts',
  'package.json',
]
assert.deepEqual((await readdir(packageDirectory)).sort(), expectedTopLevel)

const bindingFiles = (await readdir(join(packageDirectory, 'bindings'), { recursive: true }))
  .filter((file) => file.endsWith('.ts'))
  .sort()
assert(bindingFiles.length > 200, 'Generated TypeScript bindings are missing')
for (const requiredBinding of ['KclValueView.ts', 'NumericType.ts', 'Program.ts']) {
  assert(bindingFiles.includes(requiredBinding), `Missing generated binding ${requiredBinding}`)
}

const wasm = await import(pathToFileURL(join(packageDirectory, 'kcl_wasm_lib.js')).href)
assert.equal(typeof wasm.default, 'function')
assert.equal(typeof wasm.parse_wasm, 'function')
assert.equal(typeof wasm.Context, 'function')

const wasmBytes = await readFile(join(packageDirectory, 'kcl_wasm_lib_bg.wasm'))
await wasm.default({ module_or_path: wasmBytes })

const source = `fn identity(value: number(Length)): number(Length) { return value }
length = 12mm
profile = sketch(on = XY) {
  edge1 = line(start = [var 0mm, var 0mm], end = [var 10mm, var 0mm])
  edge2 = line(start = [var 10mm, var 0mm], end = [var 0mm, var 10mm])
  edge3 = line(start = [var 0mm, var 10mm], end = [var 0mm, var 0mm])
}
region001 = region(segments = [profile.edge1, profile.edge2, profile.edge3])
solid = extrude(region001, length = 5mm)
`
const [program, issues] = wasm.parse_wasm(source)
assert.deepEqual(
  issues.filter((issue) => issue.severity === 'Error'),
  [],
  'Representative KCL must parse',
)
assert.equal(program.body[0].declaration.init.params[0].param_type.p_type, 'Number')
assert.equal(program.body[0].declaration.init.params[0].param_type.Length, null)

const context = await new wasm.Context(
  {
    fireModelingCommandFromWasm() {},
    async sendModelingCommandFromWasm() {
      return new Uint8Array()
    },
    async startNewSession() {},
  },
  {
    async readFile() {
      throw new Error('Unexpected filesystem read')
    },
    async exists() {
      return false
    },
    async readdir() {
      return []
    },
  },
)
const outcome = await context.executeMock(JSON.stringify(program), 'main.kcl', '{}', false)
assert.deepEqual(outcome.variables.length.ty, { type: 'Length', mm: null })
assert.equal(outcome.variables.solid.type, 'Solid')

console.log(`Verified ${manifest.name}@${manifest.version}`)
