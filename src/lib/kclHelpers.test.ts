import type { ParseResult } from '@src/lang/wasm'
import { getCalculatedKclExpressionValue } from '@src/lib/kclHelpers'

describe('KCL expression calculations', () => {
  it('calculates a simple expression without units', async () => {
    const actual = await getCalculatedKclExpressionValue('1 + 2')
    const coercedActual = actual as Exclude<typeof actual, Error | ParseResult>
    expect(coercedActual).not.toHaveProperty('errors')
    expect(coercedActual.valueAsString).toEqual('3')
    expect(coercedActual?.astNode).toBeDefined()
  })
  it('calculates a simple expression with units', async () => {
    const actual = await getCalculatedKclExpressionValue('1deg + 30deg')
    const coercedActual = actual as Exclude<typeof actual, Error | ParseResult>
    expect(coercedActual).not.toHaveProperty('errors')
    expect(coercedActual.valueAsString).toEqual('31deg')
    expect(coercedActual?.astNode).toBeDefined()
  })
  it('returns NAN for an invalid expression', async () => {
    const actual = await getCalculatedKclExpressionValue('1 + x')
    const coercedActual = actual as Exclude<typeof actual, Error | ParseResult>
    expect(coercedActual.valueAsString).toEqual('NAN')
    expect(coercedActual.astNode).toBeDefined()
  })
})
