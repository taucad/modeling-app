// This file was generated by [ts-rs](https://github.com/Aleph-Alpha/ts-rs). Do not edit this file manually.
import type { ImportedGeometry } from './ImportedGeometry'
import type { Sketch } from './Sketch'
import type { Solid } from './Solid'

/**
 * Data for a solid, sketch, or an imported geometry.
 */
export type SolidOrSketchOrImportedGeometry =
  | ({ type: 'importedGeometry' } & ImportedGeometry)
  | ({ type: 'solidSet' } & Array<Solid>)
  | ({ type: 'sketchSet' } & Array<Sketch>)
