// This file was generated by [ts-rs](https://github.com/Aleph-Alpha/ts-rs). Do not edit this file manually.
import type { KclErrorDetails } from './KclErrorDetails'

export type KclError =
  | { kind: 'lexical'; details: KclErrorDetails }
  | { kind: 'syntax'; details: KclErrorDetails }
  | { kind: 'semantic'; details: KclErrorDetails }
  | { kind: 'import_cycle'; details: KclErrorDetails }
  | { kind: 'type'; details: KclErrorDetails }
  | { kind: 'io'; details: KclErrorDetails }
  | { kind: 'unexpected'; details: KclErrorDetails }
  | { kind: 'value_already_defined'; details: KclErrorDetails }
  | { kind: 'undefined_value'; details: KclErrorDetails; name: string | null }
  | { kind: 'invalid_expression'; details: KclErrorDetails }
  | { kind: 'engine'; details: KclErrorDetails }
  | { kind: 'internal'; details: KclErrorDetails }
