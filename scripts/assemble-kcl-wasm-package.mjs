#!/usr/bin/env node

import assert from 'node:assert/strict'
import { cp, readFile, readdir, rm, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = dirname(dirname(fileURLToPath(import.meta.url)))
const crate = join(root, 'rust/kcl-wasm-lib')
const output = join(crate, 'pkg')
const requiredGenerated = [
  'kcl_wasm_lib.d.ts',
  'kcl_wasm_lib.js',
  'kcl_wasm_lib_bg.wasm',
  'kcl_wasm_lib_bg.wasm.d.ts',
]

const cargo = await readFile(join(crate, 'Cargo.toml'), 'utf8')
const packageSection = cargo.match(/^\[package\]\s*\n([\s\S]*?)(?=^\[|\Z)/m)?.[1]
const version = packageSection?.match(/^version\s*=\s*"([^"]+)"\s*$/m)?.[1]
assert(version, 'rust/kcl-wasm-lib/Cargo.toml must declare [package].version')

for (const file of requiredGenerated) {
  await readFile(join(output, file))
}

await rm(join(output, '.gitignore'), { force: true })
await rm(join(output, 'src'), { force: true, recursive: true })
await rm(join(output, 'snippets'), { force: true, recursive: true })

const template = JSON.parse(await readFile(join(crate, 'package.template.json'), 'utf8'))
assert.equal(template.name, '@taucad/kcl-wasm-lib')
assert.equal(template.license, 'MIT')
assert.equal(template.repository?.url, 'git+https://github.com/taucad/modeling-app.git')

await rm(join(output, 'bindings'), { force: true, recursive: true })
await cp(join(root, 'rust/kcl-lib/expected-bindings/ts-rs'), join(output, 'bindings'), {
  recursive: true,
})
await normalizeBindings(join(output, 'bindings'))
await cp(join(crate, 'README.md'), join(output, 'README.md'))
await cp(join(crate, 'LICENSE'), join(output, 'LICENSE'))
await writeFile(join(output, 'package.json'), `${JSON.stringify({ ...template, version }, null, 2)}\n`)

const allowed = new Set([
  ...requiredGenerated,
  'LICENSE',
  'README.md',
  'bindings',
  'package.json',
])
const unexpected = (await readdir(output)).filter((entry) => !allowed.has(entry))
assert.deepEqual(unexpected, [], `Unexpected package payload: ${unexpected.join(', ')}`)

console.log(`Assembled @taucad/kcl-wasm-lib@${version}`)

async function normalizeBindings(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name)
    if (entry.isDirectory()) {
      await normalizeBindings(path)
    } else if (entry.name.endsWith('.ts')) {
      const source = await readFile(path, 'utf8')
      const normalized = source
        .replace(/from "\.\/([^".]+)"/g, 'from "./$1.js"')
        .replace(/[ \t]+$/gm, '')
      await writeFile(path, normalized)
    }
  }
}
