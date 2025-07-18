// This file was generated by [ts-rs](https://github.com/Aleph-Alpha/ts-rs). Do not edit this file manually.
import type { DefaultTrue } from './DefaultTrue'
import type { UnitLength } from './UnitLength'

/**
 * Project specific settings that affect the behavior while modeling.
 */
export type ProjectModelingSettings = {
  /**
   * The default unit to use in modeling dimensions.
   */
  base_unit?: UnitLength
  /**
   * Highlight edges of 3D objects?
   */
  highlight_edges?: DefaultTrue
  /**
   * Whether or not Screen Space Ambient Occlusion (SSAO) is enabled.
   */
  enable_ssao?: DefaultTrue
}
