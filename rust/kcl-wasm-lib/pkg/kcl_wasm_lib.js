let wasm

const cachedTextDecoder =
  typeof TextDecoder !== 'undefined'
    ? new TextDecoder('utf-8', { ignoreBOM: true, fatal: true })
    : {
        decode: () => {
          throw Error('TextDecoder not available')
        },
      }

if (typeof TextDecoder !== 'undefined') {
  cachedTextDecoder.decode()
}

let cachedUint8ArrayMemory0 = null

function getUint8ArrayMemory0() {
  if (
    cachedUint8ArrayMemory0 === null ||
    cachedUint8ArrayMemory0.byteLength === 0
  ) {
    cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer)
  }
  return cachedUint8ArrayMemory0
}

function getStringFromWasm0(ptr, len) {
  ptr = ptr >>> 0
  return cachedTextDecoder.decode(
    getUint8ArrayMemory0().subarray(ptr, ptr + len)
  )
}

function addToExternrefTable0(obj) {
  const idx = wasm.__externref_table_alloc()
  wasm.__wbindgen_export_2.set(idx, obj)
  return idx
}

function handleError(f, args) {
  try {
    return f.apply(this, args)
  } catch (e) {
    const idx = addToExternrefTable0(e)
    wasm.__wbindgen_exn_store(idx)
  }
}

let WASM_VECTOR_LEN = 0

const cachedTextEncoder =
  typeof TextEncoder !== 'undefined'
    ? new TextEncoder('utf-8')
    : {
        encode: () => {
          throw Error('TextEncoder not available')
        },
      }

const encodeString =
  typeof cachedTextEncoder.encodeInto === 'function'
    ? function (arg, view) {
        return cachedTextEncoder.encodeInto(arg, view)
      }
    : function (arg, view) {
        const buf = cachedTextEncoder.encode(arg)
        view.set(buf)
        return {
          read: arg.length,
          written: buf.length,
        }
      }

function passStringToWasm0(arg, malloc, realloc) {
  if (realloc === undefined) {
    const buf = cachedTextEncoder.encode(arg)
    const ptr = malloc(buf.length, 1) >>> 0
    getUint8ArrayMemory0()
      .subarray(ptr, ptr + buf.length)
      .set(buf)
    WASM_VECTOR_LEN = buf.length
    return ptr
  }

  let len = arg.length
  let ptr = malloc(len, 1) >>> 0

  const mem = getUint8ArrayMemory0()

  let offset = 0

  for (; offset < len; offset++) {
    const code = arg.charCodeAt(offset)
    if (code > 0x7f) break
    mem[ptr + offset] = code
  }

  if (offset !== len) {
    if (offset !== 0) {
      arg = arg.slice(offset)
    }
    ptr = realloc(ptr, len, (len = offset + arg.length * 3), 1) >>> 0
    const view = getUint8ArrayMemory0().subarray(ptr + offset, ptr + len)
    const ret = encodeString(arg, view)

    offset += ret.written
    ptr = realloc(ptr, len, offset, 1) >>> 0
  }

  WASM_VECTOR_LEN = offset
  return ptr
}

let cachedDataViewMemory0 = null

function getDataViewMemory0() {
  if (
    cachedDataViewMemory0 === null ||
    cachedDataViewMemory0.buffer.detached === true ||
    (cachedDataViewMemory0.buffer.detached === undefined &&
      cachedDataViewMemory0.buffer !== wasm.memory.buffer)
  ) {
    cachedDataViewMemory0 = new DataView(wasm.memory.buffer)
  }
  return cachedDataViewMemory0
}

function isLikeNone(x) {
  return x === undefined || x === null
}

function getArrayU8FromWasm0(ptr, len) {
  ptr = ptr >>> 0
  return getUint8ArrayMemory0().subarray(ptr / 1, ptr / 1 + len)
}

const CLOSURE_DTORS =
  typeof FinalizationRegistry === 'undefined'
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry((state) => {
        wasm.__wbindgen_export_6.get(state.dtor)(state.a, state.b)
      })

function makeMutClosure(arg0, arg1, dtor, f) {
  const state = { a: arg0, b: arg1, cnt: 1, dtor }
  const real = (...args) => {
    // First up with a closure we increment the internal reference
    // count. This ensures that the Rust closure environment won't
    // be deallocated while we're invoking it.
    state.cnt++
    const a = state.a
    state.a = 0
    try {
      return f(a, state.b, ...args)
    } finally {
      if (--state.cnt === 0) {
        wasm.__wbindgen_export_6.get(state.dtor)(a, state.b)
        CLOSURE_DTORS.unregister(state)
      } else {
        state.a = a
      }
    }
  }
  real.original = state
  CLOSURE_DTORS.register(real, state, state)
  return real
}

function debugString(val) {
  // primitive types
  const type = typeof val
  if (type == 'number' || type == 'boolean' || val == null) {
    return `${val}`
  }
  if (type == 'string') {
    return `"${val}"`
  }
  if (type == 'symbol') {
    const description = val.description
    if (description == null) {
      return 'Symbol'
    } else {
      return `Symbol(${description})`
    }
  }
  if (type == 'function') {
    const name = val.name
    if (typeof name == 'string' && name.length > 0) {
      return `Function(${name})`
    } else {
      return 'Function'
    }
  }
  // objects
  if (Array.isArray(val)) {
    const length = val.length
    let debug = '['
    if (length > 0) {
      debug += debugString(val[0])
    }
    for (let i = 1; i < length; i++) {
      debug += ', ' + debugString(val[i])
    }
    debug += ']'
    return debug
  }
  // Test for built-in
  const builtInMatches = /\[object ([^\]]+)\]/.exec(toString.call(val))
  let className
  if (builtInMatches && builtInMatches.length > 1) {
    className = builtInMatches[1]
  } else {
    // Failed to match the standard '[object ClassName]'
    return toString.call(val)
  }
  if (className == 'Object') {
    // we're a user defined class or Object
    // JSON.stringify avoids problems with cycles, and is generally much
    // easier than looping through ownProperties of `val`.
    try {
      return 'Object(' + JSON.stringify(val) + ')'
    } catch (_) {
      return 'Object'
    }
  }
  // errors
  if (val instanceof Error) {
    return `${val.name}: ${val.message}\n${val.stack}`
  }
  // TODO we could test for more things here, like `Set`s and `Map`s.
  return className
}

function _assertClass(instance, klass) {
  if (!(instance instanceof klass)) {
    throw new Error(`expected instance of ${klass.name}`)
  }
}
/**
 * Run the `kcl` lsp server.
 * @param {LspServerConfig} config
 * @param {string} token
 * @param {string} baseurl
 * @returns {Promise<void>}
 */
export function lsp_run_kcl(config, token, baseurl) {
  _assertClass(config, LspServerConfig)
  var ptr0 = config.__destroy_into_raw()
  const ptr1 = passStringToWasm0(
    token,
    wasm.__wbindgen_malloc,
    wasm.__wbindgen_realloc
  )
  const len1 = WASM_VECTOR_LEN
  const ptr2 = passStringToWasm0(
    baseurl,
    wasm.__wbindgen_malloc,
    wasm.__wbindgen_realloc
  )
  const len2 = WASM_VECTOR_LEN
  const ret = wasm.lsp_run_kcl(ptr0, ptr1, len1, ptr2, len2)
  return ret
}

/**
 * Run the `copilot` lsp server.
 * @param {LspServerConfig} config
 * @param {string} token
 * @param {string} baseurl
 * @returns {Promise<void>}
 */
export function lsp_run_copilot(config, token, baseurl) {
  _assertClass(config, LspServerConfig)
  var ptr0 = config.__destroy_into_raw()
  const ptr1 = passStringToWasm0(
    token,
    wasm.__wbindgen_malloc,
    wasm.__wbindgen_realloc
  )
  const len1 = WASM_VECTOR_LEN
  const ptr2 = passStringToWasm0(
    baseurl,
    wasm.__wbindgen_malloc,
    wasm.__wbindgen_realloc
  )
  const len2 = WASM_VECTOR_LEN
  const ret = wasm.lsp_run_copilot(ptr0, ptr1, len1, ptr2, len2)
  return ret
}

/**
 * @param {string} program_ast_json
 * @returns {Promise<any>}
 */
export function kcl_lint(program_ast_json) {
  const ptr0 = passStringToWasm0(
    program_ast_json,
    wasm.__wbindgen_malloc,
    wasm.__wbindgen_realloc
  )
  const len0 = WASM_VECTOR_LEN
  const ret = wasm.kcl_lint(ptr0, len0)
  return ret
}

/**
 * @param {string} program_ast_json
 * @param {string} range_json
 * @returns {Promise<any>}
 */
export function node_path_from_range(program_ast_json, range_json) {
  const ptr0 = passStringToWasm0(
    program_ast_json,
    wasm.__wbindgen_malloc,
    wasm.__wbindgen_realloc
  )
  const len0 = WASM_VECTOR_LEN
  const ptr1 = passStringToWasm0(
    range_json,
    wasm.__wbindgen_malloc,
    wasm.__wbindgen_realloc
  )
  const len1 = WASM_VECTOR_LEN
  const ret = wasm.node_path_from_range(ptr0, len0, ptr1, len1)
  return ret
}

function takeFromExternrefTable0(idx) {
  const value = wasm.__wbindgen_export_2.get(idx)
  wasm.__externref_table_dealloc(idx)
  return value
}
/**
 * @param {string} kcl_program_source
 * @returns {any}
 */
export function parse_wasm(kcl_program_source) {
  const ptr0 = passStringToWasm0(
    kcl_program_source,
    wasm.__wbindgen_malloc,
    wasm.__wbindgen_realloc
  )
  const len0 = WASM_VECTOR_LEN
  const ret = wasm.parse_wasm(ptr0, len0)
  if (ret[2]) {
    throw takeFromExternrefTable0(ret[1])
  }
  return takeFromExternrefTable0(ret[0])
}

/**
 * @param {string} json_str
 * @returns {any}
 */
export function recast_wasm(json_str) {
  const ptr0 = passStringToWasm0(
    json_str,
    wasm.__wbindgen_malloc,
    wasm.__wbindgen_realloc
  )
  const len0 = WASM_VECTOR_LEN
  const ret = wasm.recast_wasm(ptr0, len0)
  if (ret[2]) {
    throw takeFromExternrefTable0(ret[1])
  }
  return takeFromExternrefTable0(ret[0])
}

/**
 * @param {number} value
 * @param {string} suffix_json
 * @returns {string}
 */
export function format_number_literal(value, suffix_json) {
  let deferred3_0
  let deferred3_1
  try {
    const ptr0 = passStringToWasm0(
      suffix_json,
      wasm.__wbindgen_malloc,
      wasm.__wbindgen_realloc
    )
    const len0 = WASM_VECTOR_LEN
    const ret = wasm.format_number_literal(value, ptr0, len0)
    var ptr2 = ret[0]
    var len2 = ret[1]
    if (ret[3]) {
      ptr2 = 0
      len2 = 0
      throw takeFromExternrefTable0(ret[2])
    }
    deferred3_0 = ptr2
    deferred3_1 = len2
    return getStringFromWasm0(ptr2, len2)
  } finally {
    wasm.__wbindgen_free(deferred3_0, deferred3_1, 1)
  }
}

/**
 * @param {number} value
 * @param {string} numeric_type_json
 * @returns {string}
 */
export function format_number_value(value, numeric_type_json) {
  let deferred3_0
  let deferred3_1
  try {
    const ptr0 = passStringToWasm0(
      numeric_type_json,
      wasm.__wbindgen_malloc,
      wasm.__wbindgen_realloc
    )
    const len0 = WASM_VECTOR_LEN
    const ret = wasm.format_number_value(value, ptr0, len0)
    var ptr2 = ret[0]
    var len2 = ret[1]
    if (ret[3]) {
      ptr2 = 0
      len2 = 0
      throw takeFromExternrefTable0(ret[2])
    }
    deferred3_0 = ptr2
    deferred3_1 = len2
    return getStringFromWasm0(ptr2, len2)
  } finally {
    wasm.__wbindgen_free(deferred3_0, deferred3_1, 1)
  }
}

/**
 * @param {number} value
 * @param {string} ty_json
 * @returns {string}
 */
export function human_display_number(value, ty_json) {
  let deferred3_0
  let deferred3_1
  try {
    const ptr0 = passStringToWasm0(
      ty_json,
      wasm.__wbindgen_malloc,
      wasm.__wbindgen_realloc
    )
    const len0 = WASM_VECTOR_LEN
    const ret = wasm.human_display_number(value, ptr0, len0)
    var ptr2 = ret[0]
    var len2 = ret[1]
    if (ret[3]) {
      ptr2 = 0
      len2 = 0
      throw takeFromExternrefTable0(ret[2])
    }
    deferred3_0 = ptr2
    deferred3_1 = len2
    return getStringFromWasm0(ptr2, len2)
  } finally {
    wasm.__wbindgen_free(deferred3_0, deferred3_1, 1)
  }
}

let cachedFloat64ArrayMemory0 = null

function getFloat64ArrayMemory0() {
  if (
    cachedFloat64ArrayMemory0 === null ||
    cachedFloat64ArrayMemory0.byteLength === 0
  ) {
    cachedFloat64ArrayMemory0 = new Float64Array(wasm.memory.buffer)
  }
  return cachedFloat64ArrayMemory0
}

function passArrayF64ToWasm0(arg, malloc) {
  const ptr = malloc(arg.length * 8, 8) >>> 0
  getFloat64ArrayMemory0().set(arg, ptr / 8)
  WASM_VECTOR_LEN = arg.length
  return ptr
}
/**
 * @param {Float64Array} points
 * @returns {number}
 */
export function is_points_ccw(points) {
  const ptr0 = passArrayF64ToWasm0(points, wasm.__wbindgen_malloc)
  const len0 = WASM_VECTOR_LEN
  const ret = wasm.is_points_ccw(ptr0, len0)
  return ret
}

/**
 * @param {number} arc_start_point_x
 * @param {number} arc_start_point_y
 * @param {number} arc_end_point_x
 * @param {number} arc_end_point_y
 * @param {number} tan_previous_point_x
 * @param {number} tan_previous_point_y
 * @param {boolean} obtuse
 * @returns {TangentialArcInfoOutputWasm}
 */
export function get_tangential_arc_to_info(
  arc_start_point_x,
  arc_start_point_y,
  arc_end_point_x,
  arc_end_point_y,
  tan_previous_point_x,
  tan_previous_point_y,
  obtuse
) {
  const ret = wasm.get_tangential_arc_to_info(
    arc_start_point_x,
    arc_start_point_y,
    arc_end_point_x,
    arc_end_point_y,
    tan_previous_point_x,
    tan_previous_point_y,
    obtuse
  )
  return TangentialArcInfoOutputWasm.__wrap(ret)
}

/**
 * Get a coredump.
 * @param {any} core_dump_manager
 * @returns {Promise<any>}
 */
export function coredump(core_dump_manager) {
  const ret = wasm.coredump(core_dump_manager)
  return ret
}

/**
 * Get the default app settings.
 * @returns {any}
 */
export function default_app_settings() {
  const ret = wasm.default_app_settings()
  if (ret[2]) {
    throw takeFromExternrefTable0(ret[1])
  }
  return takeFromExternrefTable0(ret[0])
}

/**
 * Parse the app settings.
 * @param {string} toml_str
 * @returns {any}
 */
export function parse_app_settings(toml_str) {
  const ptr0 = passStringToWasm0(
    toml_str,
    wasm.__wbindgen_malloc,
    wasm.__wbindgen_realloc
  )
  const len0 = WASM_VECTOR_LEN
  const ret = wasm.parse_app_settings(ptr0, len0)
  if (ret[2]) {
    throw takeFromExternrefTable0(ret[1])
  }
  return takeFromExternrefTable0(ret[0])
}

/**
 * Get the default project settings.
 * @returns {any}
 */
export function default_project_settings() {
  const ret = wasm.default_project_settings()
  if (ret[2]) {
    throw takeFromExternrefTable0(ret[1])
  }
  return takeFromExternrefTable0(ret[0])
}

/**
 * Parse (deserialize) the project settings.
 * @param {string} toml_str
 * @returns {any}
 */
export function parse_project_settings(toml_str) {
  const ptr0 = passStringToWasm0(
    toml_str,
    wasm.__wbindgen_malloc,
    wasm.__wbindgen_realloc
  )
  const len0 = WASM_VECTOR_LEN
  const ret = wasm.parse_project_settings(ptr0, len0)
  if (ret[2]) {
    throw takeFromExternrefTable0(ret[1])
  }
  return takeFromExternrefTable0(ret[0])
}

/**
 * Serialize the configuration settings.
 * @param {any} val
 * @returns {any}
 */
export function serialize_configuration(val) {
  const ret = wasm.serialize_configuration(val)
  if (ret[2]) {
    throw takeFromExternrefTable0(ret[1])
  }
  return takeFromExternrefTable0(ret[0])
}

/**
 * Serialize the project configuration settings.
 * @param {any} val
 * @returns {any}
 */
export function serialize_project_configuration(val) {
  const ret = wasm.serialize_project_configuration(val)
  if (ret[2]) {
    throw takeFromExternrefTable0(ret[1])
  }
  return takeFromExternrefTable0(ret[0])
}

/**
 * Base64 decode a string.
 * @param {string} input
 * @returns {Uint8Array}
 */
export function base64_decode(input) {
  const ptr0 = passStringToWasm0(
    input,
    wasm.__wbindgen_malloc,
    wasm.__wbindgen_realloc
  )
  const len0 = WASM_VECTOR_LEN
  const ret = wasm.base64_decode(ptr0, len0)
  if (ret[3]) {
    throw takeFromExternrefTable0(ret[2])
  }
  var v2 = getArrayU8FromWasm0(ret[0], ret[1]).slice()
  wasm.__wbindgen_free(ret[0], ret[1] * 1, 1)
  return v2
}

/**
 * Calculate a circle from 3 points.
 * @param {number} ax
 * @param {number} ay
 * @param {number} bx
 * @param {number} by
 * @param {number} cx
 * @param {number} cy
 * @returns {WasmCircleParams}
 */
export function calculate_circle_from_3_points(ax, ay, bx, by, cx, cy) {
  const ret = wasm.calculate_circle_from_3_points(ax, ay, bx, by, cx, cy)
  return WasmCircleParams.__wrap(ret)
}

/**
 * Takes a parsed KCL program and returns the Meta settings.  If it's not
 * found, null is returned.
 * @param {string} program_json
 * @returns {any}
 */
export function kcl_settings(program_json) {
  const ptr0 = passStringToWasm0(
    program_json,
    wasm.__wbindgen_malloc,
    wasm.__wbindgen_realloc
  )
  const len0 = WASM_VECTOR_LEN
  const ret = wasm.kcl_settings(ptr0, len0)
  if (ret[2]) {
    throw takeFromExternrefTable0(ret[1])
  }
  return takeFromExternrefTable0(ret[0])
}

/**
 * Takes a kcl string and Meta settings and changes the meta settings in the kcl string.
 * @param {string} code
 * @param {string} len_str
 * @param {string} angle_str
 * @returns {string}
 */
export function change_default_units(code, len_str, angle_str) {
  let deferred5_0
  let deferred5_1
  try {
    const ptr0 = passStringToWasm0(
      code,
      wasm.__wbindgen_malloc,
      wasm.__wbindgen_realloc
    )
    const len0 = WASM_VECTOR_LEN
    const ptr1 = passStringToWasm0(
      len_str,
      wasm.__wbindgen_malloc,
      wasm.__wbindgen_realloc
    )
    const len1 = WASM_VECTOR_LEN
    const ptr2 = passStringToWasm0(
      angle_str,
      wasm.__wbindgen_malloc,
      wasm.__wbindgen_realloc
    )
    const len2 = WASM_VECTOR_LEN
    const ret = wasm.change_default_units(ptr0, len0, ptr1, len1, ptr2, len2)
    var ptr4 = ret[0]
    var len4 = ret[1]
    if (ret[3]) {
      ptr4 = 0
      len4 = 0
      throw takeFromExternrefTable0(ret[2])
    }
    deferred5_0 = ptr4
    deferred5_1 = len4
    return getStringFromWasm0(ptr4, len4)
  } finally {
    wasm.__wbindgen_free(deferred5_0, deferred5_1, 1)
  }
}

/**
 * Returns true if the given KCL is empty or only contains settings that would
 * be auto-generated.
 * @param {string} code
 * @returns {any}
 */
export function is_kcl_empty_or_only_settings(code) {
  const ptr0 = passStringToWasm0(
    code,
    wasm.__wbindgen_malloc,
    wasm.__wbindgen_realloc
  )
  const len0 = WASM_VECTOR_LEN
  const ret = wasm.is_kcl_empty_or_only_settings(ptr0, len0)
  if (ret[2]) {
    throw takeFromExternrefTable0(ret[1])
  }
  return takeFromExternrefTable0(ret[0])
}

/**
 * Get the version of the kcl library.
 * @returns {string}
 */
export function get_kcl_version() {
  let deferred1_0
  let deferred1_1
  try {
    const ret = wasm.get_kcl_version()
    deferred1_0 = ret[0]
    deferred1_1 = ret[1]
    return getStringFromWasm0(ret[0], ret[1])
  } finally {
    wasm.__wbindgen_free(deferred1_0, deferred1_1, 1)
  }
}

function getArrayJsValueFromWasm0(ptr, len) {
  ptr = ptr >>> 0
  const mem = getDataViewMemory0()
  const result = []
  for (let i = ptr; i < ptr + 4 * len; i += 4) {
    result.push(wasm.__wbindgen_export_2.get(mem.getUint32(i, true)))
  }
  wasm.__externref_drop_slice(ptr, len)
  return result
}
/**
 * Get the allowed import file extensions.
 * @returns {string[]}
 */
export function import_file_extensions() {
  const ret = wasm.import_file_extensions()
  if (ret[3]) {
    throw takeFromExternrefTable0(ret[2])
  }
  var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice()
  wasm.__wbindgen_free(ret[0], ret[1] * 4, 4)
  return v1
}

/**
 * Get the allowed relevant file extensions (imports + kcl).
 * @returns {string[]}
 */
export function relevant_file_extensions() {
  const ret = wasm.relevant_file_extensions()
  if (ret[3]) {
    throw takeFromExternrefTable0(ret[2])
  }
  var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice()
  wasm.__wbindgen_free(ret[0], ret[1] * 4, 4)
  return v1
}

function __wbg_adapter_34(arg0, arg1) {
  wasm._dyn_core__ops__function__FnMut_____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__hb7ef66d81bdf505f(
    arg0,
    arg1
  )
}

function __wbg_adapter_37(arg0, arg1) {
  wasm._dyn_core__ops__function__FnMut_____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h8877339e78b0432b(
    arg0,
    arg1
  )
}

function __wbg_adapter_40(arg0, arg1, arg2) {
  wasm.closure5713_externref_shim(arg0, arg1, arg2)
}

function __wbg_adapter_302(arg0, arg1, arg2, arg3) {
  wasm.closure6582_externref_shim(arg0, arg1, arg2, arg3)
}

const __wbindgen_enum_ReadableStreamType = ['bytes']

const __wbindgen_enum_RequestCredentials = ['omit', 'same-origin', 'include']

const __wbindgen_enum_RequestMode = [
  'same-origin',
  'no-cors',
  'cors',
  'navigate',
]

const ContextFinalization =
  typeof FinalizationRegistry === 'undefined'
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry((ptr) => wasm.__wbg_context_free(ptr >>> 0, 1))

export class Context {
  static __wrap(ptr) {
    ptr = ptr >>> 0
    const obj = Object.create(Context.prototype)
    obj.__wbg_ptr = ptr
    ContextFinalization.register(obj, obj.__wbg_ptr, obj)
    return obj
  }

  __destroy_into_raw() {
    const ptr = this.__wbg_ptr
    this.__wbg_ptr = 0
    ContextFinalization.unregister(this)
    return ptr
  }

  free() {
    const ptr = this.__destroy_into_raw()
    wasm.__wbg_context_free(ptr, 0)
  }
  /**
   * @param {any} engine_manager
   * @param {any} fs_manager
   */
  constructor(engine_manager, fs_manager) {
    const ret = wasm.context_new(engine_manager, fs_manager)
    return ret
  }
  /**
   * Execute a program.
   * @param {string} program_ast_json
   * @param {string | null | undefined} path
   * @param {string} settings
   * @returns {Promise<any>}
   */
  execute(program_ast_json, path, settings) {
    const ptr0 = passStringToWasm0(
      program_ast_json,
      wasm.__wbindgen_malloc,
      wasm.__wbindgen_realloc
    )
    const len0 = WASM_VECTOR_LEN
    var ptr1 = isLikeNone(path)
      ? 0
      : passStringToWasm0(path, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc)
    var len1 = WASM_VECTOR_LEN
    const ptr2 = passStringToWasm0(
      settings,
      wasm.__wbindgen_malloc,
      wasm.__wbindgen_realloc
    )
    const len2 = WASM_VECTOR_LEN
    const ret = wasm.context_execute(
      this.__wbg_ptr,
      ptr0,
      len0,
      ptr1,
      len1,
      ptr2,
      len2
    )
    return ret
  }
  /**
   * Reset the scene and bust the cache.
   * ONLY use this if you absolutely need to reset the scene and bust the cache.
   * @param {string} settings
   * @param {string | null} [path]
   * @returns {Promise<any>}
   */
  bustCacheAndResetScene(settings, path) {
    const ptr0 = passStringToWasm0(
      settings,
      wasm.__wbindgen_malloc,
      wasm.__wbindgen_realloc
    )
    const len0 = WASM_VECTOR_LEN
    var ptr1 = isLikeNone(path)
      ? 0
      : passStringToWasm0(path, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc)
    var len1 = WASM_VECTOR_LEN
    const ret = wasm.context_bustCacheAndResetScene(
      this.__wbg_ptr,
      ptr0,
      len0,
      ptr1,
      len1
    )
    return ret
  }
  /**
   * Send a response to kcl lib's engine.
   * @param {Uint8Array} data
   * @returns {Promise<void>}
   */
  sendResponse(data) {
    const ret = wasm.context_sendResponse(this.__wbg_ptr, data)
    return ret
  }
  /**
   * Execute a program in mock mode.
   * @param {string} program_ast_json
   * @param {string | null | undefined} path
   * @param {string} settings
   * @param {boolean} use_prev_memory
   * @returns {Promise<any>}
   */
  executeMock(program_ast_json, path, settings, use_prev_memory) {
    const ptr0 = passStringToWasm0(
      program_ast_json,
      wasm.__wbindgen_malloc,
      wasm.__wbindgen_realloc
    )
    const len0 = WASM_VECTOR_LEN
    var ptr1 = isLikeNone(path)
      ? 0
      : passStringToWasm0(path, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc)
    var len1 = WASM_VECTOR_LEN
    const ptr2 = passStringToWasm0(
      settings,
      wasm.__wbindgen_malloc,
      wasm.__wbindgen_realloc
    )
    const len2 = WASM_VECTOR_LEN
    const ret = wasm.context_executeMock(
      this.__wbg_ptr,
      ptr0,
      len0,
      ptr1,
      len1,
      ptr2,
      len2,
      use_prev_memory
    )
    return ret
  }
  /**
   * Export a scene to a file.
   * @param {string} format_json
   * @param {string} settings
   * @returns {Promise<any>}
   */
  export(format_json, settings) {
    const ptr0 = passStringToWasm0(
      format_json,
      wasm.__wbindgen_malloc,
      wasm.__wbindgen_realloc
    )
    const len0 = WASM_VECTOR_LEN
    const ptr1 = passStringToWasm0(
      settings,
      wasm.__wbindgen_malloc,
      wasm.__wbindgen_realloc
    )
    const len1 = WASM_VECTOR_LEN
    const ret = wasm.context_export(this.__wbg_ptr, ptr0, len0, ptr1, len1)
    return ret
  }
}

const IntoUnderlyingByteSourceFinalization =
  typeof FinalizationRegistry === 'undefined'
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry((ptr) =>
        wasm.__wbg_intounderlyingbytesource_free(ptr >>> 0, 1)
      )

export class IntoUnderlyingByteSource {
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr
    this.__wbg_ptr = 0
    IntoUnderlyingByteSourceFinalization.unregister(this)
    return ptr
  }

  free() {
    const ptr = this.__destroy_into_raw()
    wasm.__wbg_intounderlyingbytesource_free(ptr, 0)
  }
  /**
   * @returns {ReadableStreamType}
   */
  get type() {
    const ret = wasm.intounderlyingbytesource_type(this.__wbg_ptr)
    return __wbindgen_enum_ReadableStreamType[ret]
  }
  /**
   * @returns {number}
   */
  get autoAllocateChunkSize() {
    const ret = wasm.intounderlyingbytesource_autoAllocateChunkSize(
      this.__wbg_ptr
    )
    return ret >>> 0
  }
  /**
   * @param {ReadableByteStreamController} controller
   */
  start(controller) {
    wasm.intounderlyingbytesource_start(this.__wbg_ptr, controller)
  }
  /**
   * @param {ReadableByteStreamController} controller
   * @returns {Promise<any>}
   */
  pull(controller) {
    const ret = wasm.intounderlyingbytesource_pull(this.__wbg_ptr, controller)
    return ret
  }
  cancel() {
    const ptr = this.__destroy_into_raw()
    wasm.intounderlyingbytesource_cancel(ptr)
  }
}

const IntoUnderlyingSinkFinalization =
  typeof FinalizationRegistry === 'undefined'
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry((ptr) =>
        wasm.__wbg_intounderlyingsink_free(ptr >>> 0, 1)
      )

export class IntoUnderlyingSink {
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr
    this.__wbg_ptr = 0
    IntoUnderlyingSinkFinalization.unregister(this)
    return ptr
  }

  free() {
    const ptr = this.__destroy_into_raw()
    wasm.__wbg_intounderlyingsink_free(ptr, 0)
  }
  /**
   * @param {any} chunk
   * @returns {Promise<any>}
   */
  write(chunk) {
    const ret = wasm.intounderlyingsink_write(this.__wbg_ptr, chunk)
    return ret
  }
  /**
   * @returns {Promise<any>}
   */
  close() {
    const ptr = this.__destroy_into_raw()
    const ret = wasm.intounderlyingsink_close(ptr)
    return ret
  }
  /**
   * @param {any} reason
   * @returns {Promise<any>}
   */
  abort(reason) {
    const ptr = this.__destroy_into_raw()
    const ret = wasm.intounderlyingsink_abort(ptr, reason)
    return ret
  }
}

const IntoUnderlyingSourceFinalization =
  typeof FinalizationRegistry === 'undefined'
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry((ptr) =>
        wasm.__wbg_intounderlyingsource_free(ptr >>> 0, 1)
      )

export class IntoUnderlyingSource {
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr
    this.__wbg_ptr = 0
    IntoUnderlyingSourceFinalization.unregister(this)
    return ptr
  }

  free() {
    const ptr = this.__destroy_into_raw()
    wasm.__wbg_intounderlyingsource_free(ptr, 0)
  }
  /**
   * @param {ReadableStreamDefaultController} controller
   * @returns {Promise<any>}
   */
  pull(controller) {
    const ret = wasm.intounderlyingsource_pull(this.__wbg_ptr, controller)
    return ret
  }
  cancel() {
    const ptr = this.__destroy_into_raw()
    wasm.intounderlyingsource_cancel(ptr)
  }
}

const LspServerConfigFinalization =
  typeof FinalizationRegistry === 'undefined'
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry((ptr) =>
        wasm.__wbg_lspserverconfig_free(ptr >>> 0, 1)
      )

export class LspServerConfig {
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr
    this.__wbg_ptr = 0
    LspServerConfigFinalization.unregister(this)
    return ptr
  }

  free() {
    const ptr = this.__destroy_into_raw()
    wasm.__wbg_lspserverconfig_free(ptr, 0)
  }
  /**
   * @param {AsyncIterator<any>} into_server
   * @param {WritableStream} from_server
   * @param {any} fs
   */
  constructor(into_server, from_server, fs) {
    const ret = wasm.lspserverconfig_new(into_server, from_server, fs)
    this.__wbg_ptr = ret >>> 0
    LspServerConfigFinalization.register(this, this.__wbg_ptr, this)
    return this
  }
}

const ResponseContextFinalization =
  typeof FinalizationRegistry === 'undefined'
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry((ptr) =>
        wasm.__wbg_responsecontext_free(ptr >>> 0, 1)
      )

export class ResponseContext {
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr
    this.__wbg_ptr = 0
    ResponseContextFinalization.unregister(this)
    return ptr
  }

  free() {
    const ptr = this.__destroy_into_raw()
    wasm.__wbg_responsecontext_free(ptr, 0)
  }
  constructor() {
    const ret = wasm.responsecontext_new()
    this.__wbg_ptr = ret >>> 0
    ResponseContextFinalization.register(this, this.__wbg_ptr, this)
    return this
  }
  /**
   * @param {Uint8Array} data
   * @returns {Promise<void>}
   */
  send_response(data) {
    const ret = wasm.responsecontext_send_response(this.__wbg_ptr, data)
    return ret
  }
}

const TangentialArcInfoOutputWasmFinalization =
  typeof FinalizationRegistry === 'undefined'
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry((ptr) =>
        wasm.__wbg_tangentialarcinfooutputwasm_free(ptr >>> 0, 1)
      )

export class TangentialArcInfoOutputWasm {
  static __wrap(ptr) {
    ptr = ptr >>> 0
    const obj = Object.create(TangentialArcInfoOutputWasm.prototype)
    obj.__wbg_ptr = ptr
    TangentialArcInfoOutputWasmFinalization.register(obj, obj.__wbg_ptr, obj)
    return obj
  }

  __destroy_into_raw() {
    const ptr = this.__wbg_ptr
    this.__wbg_ptr = 0
    TangentialArcInfoOutputWasmFinalization.unregister(this)
    return ptr
  }

  free() {
    const ptr = this.__destroy_into_raw()
    wasm.__wbg_tangentialarcinfooutputwasm_free(ptr, 0)
  }
  /**
   * The geometric center of the arc x.
   * @returns {number}
   */
  get center_x() {
    const ret = wasm.__wbg_get_tangentialarcinfooutputwasm_center_x(
      this.__wbg_ptr
    )
    return ret
  }
  /**
   * The geometric center of the arc x.
   * @param {number} arg0
   */
  set center_x(arg0) {
    wasm.__wbg_set_tangentialarcinfooutputwasm_center_x(this.__wbg_ptr, arg0)
  }
  /**
   * The geometric center of the arc y.
   * @returns {number}
   */
  get center_y() {
    const ret = wasm.__wbg_get_tangentialarcinfooutputwasm_center_y(
      this.__wbg_ptr
    )
    return ret
  }
  /**
   * The geometric center of the arc y.
   * @param {number} arg0
   */
  set center_y(arg0) {
    wasm.__wbg_set_tangentialarcinfooutputwasm_center_y(this.__wbg_ptr, arg0)
  }
  /**
   * The midpoint of the arc x.
   * @returns {number}
   */
  get arc_mid_point_x() {
    const ret = wasm.__wbg_get_tangentialarcinfooutputwasm_arc_mid_point_x(
      this.__wbg_ptr
    )
    return ret
  }
  /**
   * The midpoint of the arc x.
   * @param {number} arg0
   */
  set arc_mid_point_x(arg0) {
    wasm.__wbg_set_tangentialarcinfooutputwasm_arc_mid_point_x(
      this.__wbg_ptr,
      arg0
    )
  }
  /**
   * The midpoint of the arc y.
   * @returns {number}
   */
  get arc_mid_point_y() {
    const ret = wasm.__wbg_get_tangentialarcinfooutputwasm_arc_mid_point_y(
      this.__wbg_ptr
    )
    return ret
  }
  /**
   * The midpoint of the arc y.
   * @param {number} arg0
   */
  set arc_mid_point_y(arg0) {
    wasm.__wbg_set_tangentialarcinfooutputwasm_arc_mid_point_y(
      this.__wbg_ptr,
      arg0
    )
  }
  /**
   * The radius of the arc.
   * @returns {number}
   */
  get radius() {
    const ret = wasm.__wbg_get_tangentialarcinfooutputwasm_radius(
      this.__wbg_ptr
    )
    return ret
  }
  /**
   * The radius of the arc.
   * @param {number} arg0
   */
  set radius(arg0) {
    wasm.__wbg_set_tangentialarcinfooutputwasm_radius(this.__wbg_ptr, arg0)
  }
  /**
   * Start angle of the arc in radians.
   * @returns {number}
   */
  get start_angle() {
    const ret = wasm.__wbg_get_tangentialarcinfooutputwasm_start_angle(
      this.__wbg_ptr
    )
    return ret
  }
  /**
   * Start angle of the arc in radians.
   * @param {number} arg0
   */
  set start_angle(arg0) {
    wasm.__wbg_set_tangentialarcinfooutputwasm_start_angle(this.__wbg_ptr, arg0)
  }
  /**
   * End angle of the arc in radians.
   * @returns {number}
   */
  get end_angle() {
    const ret = wasm.__wbg_get_tangentialarcinfooutputwasm_end_angle(
      this.__wbg_ptr
    )
    return ret
  }
  /**
   * End angle of the arc in radians.
   * @param {number} arg0
   */
  set end_angle(arg0) {
    wasm.__wbg_set_tangentialarcinfooutputwasm_end_angle(this.__wbg_ptr, arg0)
  }
  /**
   * Flag to determine if the arc is counter clockwise.
   * @returns {number}
   */
  get ccw() {
    const ret = wasm.__wbg_get_tangentialarcinfooutputwasm_ccw(this.__wbg_ptr)
    return ret
  }
  /**
   * Flag to determine if the arc is counter clockwise.
   * @param {number} arg0
   */
  set ccw(arg0) {
    wasm.__wbg_set_tangentialarcinfooutputwasm_ccw(this.__wbg_ptr, arg0)
  }
  /**
   * The length of the arc.
   * @returns {number}
   */
  get arc_length() {
    const ret = wasm.__wbg_get_tangentialarcinfooutputwasm_arc_length(
      this.__wbg_ptr
    )
    return ret
  }
  /**
   * The length of the arc.
   * @param {number} arg0
   */
  set arc_length(arg0) {
    wasm.__wbg_set_tangentialarcinfooutputwasm_arc_length(this.__wbg_ptr, arg0)
  }
}

const WasmCircleParamsFinalization =
  typeof FinalizationRegistry === 'undefined'
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry((ptr) =>
        wasm.__wbg_wasmcircleparams_free(ptr >>> 0, 1)
      )

export class WasmCircleParams {
  static __wrap(ptr) {
    ptr = ptr >>> 0
    const obj = Object.create(WasmCircleParams.prototype)
    obj.__wbg_ptr = ptr
    WasmCircleParamsFinalization.register(obj, obj.__wbg_ptr, obj)
    return obj
  }

  __destroy_into_raw() {
    const ptr = this.__wbg_ptr
    this.__wbg_ptr = 0
    WasmCircleParamsFinalization.unregister(this)
    return ptr
  }

  free() {
    const ptr = this.__destroy_into_raw()
    wasm.__wbg_wasmcircleparams_free(ptr, 0)
  }
  /**
   * @returns {number}
   */
  get center_x() {
    const ret = wasm.__wbg_get_tangentialarcinfooutputwasm_center_x(
      this.__wbg_ptr
    )
    return ret
  }
  /**
   * @param {number} arg0
   */
  set center_x(arg0) {
    wasm.__wbg_set_tangentialarcinfooutputwasm_center_x(this.__wbg_ptr, arg0)
  }
  /**
   * @returns {number}
   */
  get center_y() {
    const ret = wasm.__wbg_get_tangentialarcinfooutputwasm_center_y(
      this.__wbg_ptr
    )
    return ret
  }
  /**
   * @param {number} arg0
   */
  set center_y(arg0) {
    wasm.__wbg_set_tangentialarcinfooutputwasm_center_y(this.__wbg_ptr, arg0)
  }
  /**
   * @returns {number}
   */
  get radius() {
    const ret = wasm.__wbg_get_tangentialarcinfooutputwasm_arc_mid_point_x(
      this.__wbg_ptr
    )
    return ret
  }
  /**
   * @param {number} arg0
   */
  set radius(arg0) {
    wasm.__wbg_set_tangentialarcinfooutputwasm_arc_mid_point_x(
      this.__wbg_ptr,
      arg0
    )
  }
}

async function __wbg_load(module, imports) {
  if (typeof Response === 'function' && module instanceof Response) {
    if (typeof WebAssembly.instantiateStreaming === 'function') {
      try {
        return await WebAssembly.instantiateStreaming(module, imports)
      } catch (e) {
        if (module.headers.get('Content-Type') != 'application/wasm') {
          console.warn(
            '`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n',
            e
          )
        } else {
          throw e
        }
      }
    }

    const bytes = await module.arrayBuffer()
    return await WebAssembly.instantiate(bytes, imports)
  } else {
    const instance = await WebAssembly.instantiate(module, imports)

    if (instance instanceof WebAssembly.Instance) {
      return { instance, module }
    } else {
      return instance
    }
  }
}

function __wbg_get_imports() {
  const imports = {}
  imports.wbg = {}
  imports.wbg.__wbg_abort_410ec47a64ac6117 = function (arg0, arg1) {
    arg0.abort(arg1)
  }
  imports.wbg.__wbg_abort_775ef1d17fc65868 = function (arg0) {
    arg0.abort()
  }
  imports.wbg.__wbg_append_299d5d48292c0495 = function () {
    return handleError(function (arg0, arg1, arg2, arg3, arg4) {
      arg0.append(
        getStringFromWasm0(arg1, arg2),
        getStringFromWasm0(arg3, arg4)
      )
    }, arguments)
  }
  imports.wbg.__wbg_append_8c7dd8d641a5f01b = function () {
    return handleError(function (arg0, arg1, arg2, arg3, arg4) {
      arg0.append(
        getStringFromWasm0(arg1, arg2),
        getStringFromWasm0(arg3, arg4)
      )
    }, arguments)
  }
  imports.wbg.__wbg_append_b2d1fc16de2a0e81 = function () {
    return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5) {
      arg0.append(
        getStringFromWasm0(arg1, arg2),
        arg3,
        getStringFromWasm0(arg4, arg5)
      )
    }, arguments)
  }
  imports.wbg.__wbg_append_b44785ebeb668479 = function () {
    return handleError(function (arg0, arg1, arg2, arg3) {
      arg0.append(getStringFromWasm0(arg1, arg2), arg3)
    }, arguments)
  }
  imports.wbg.__wbg_authToken_862e417c350ca3c2 = function () {
    return handleError(function (arg0, arg1) {
      const ret = arg1.authToken()
      const ptr1 = passStringToWasm0(
        ret,
        wasm.__wbindgen_malloc,
        wasm.__wbindgen_realloc
      )
      const len1 = WASM_VECTOR_LEN
      getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true)
      getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true)
    }, arguments)
  }
  imports.wbg.__wbg_baseApiUrl_407706b1dd5302d3 = function () {
    return handleError(function (arg0, arg1) {
      const ret = arg1.baseApiUrl()
      const ptr1 = passStringToWasm0(
        ret,
        wasm.__wbindgen_malloc,
        wasm.__wbindgen_realloc
      )
      const len1 = WASM_VECTOR_LEN
      getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true)
      getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true)
    }, arguments)
  }
  imports.wbg.__wbg_buffer_09165b52af8c5237 = function (arg0) {
    const ret = arg0.buffer
    return ret
  }
  imports.wbg.__wbg_buffer_609cc3eee51ed158 = function (arg0) {
    const ret = arg0.buffer
    return ret
  }
  imports.wbg.__wbg_byobRequest_77d9adf63337edfb = function (arg0) {
    const ret = arg0.byobRequest
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret)
  }
  imports.wbg.__wbg_byteLength_e674b853d9c77e1d = function (arg0) {
    const ret = arg0.byteLength
    return ret
  }
  imports.wbg.__wbg_byteOffset_fd862df290ef848d = function (arg0) {
    const ret = arg0.byteOffset
    return ret
  }
  imports.wbg.__wbg_call_672a4d21634d4a24 = function () {
    return handleError(function (arg0, arg1) {
      const ret = arg0.call(arg1)
      return ret
    }, arguments)
  }
  imports.wbg.__wbg_call_7cccdd69e0791ae2 = function () {
    return handleError(function (arg0, arg1, arg2) {
      const ret = arg0.call(arg1, arg2)
      return ret
    }, arguments)
  }
  imports.wbg.__wbg_clearTimeout_0b53d391c1b94dda = function (arg0) {
    const ret = clearTimeout(arg0)
    return ret
  }
  imports.wbg.__wbg_close_304cc1fef3466669 = function () {
    return handleError(function (arg0) {
      arg0.close()
    }, arguments)
  }
  imports.wbg.__wbg_close_5ce03e29be453811 = function () {
    return handleError(function (arg0) {
      arg0.close()
    }, arguments)
  }
  imports.wbg.__wbg_close_fa50b16598acbea1 = function (arg0) {
    const ret = arg0.close()
    return ret
  }
  imports.wbg.__wbg_context_new = function (arg0) {
    const ret = Context.__wrap(arg0)
    return ret
  }
  imports.wbg.__wbg_crypto_ed58b8e10a292839 = function (arg0) {
    const ret = arg0.crypto
    return ret
  }
  imports.wbg.__wbg_done_769e5ede4b31c67b = function (arg0) {
    const ret = arg0.done
    return ret
  }
  imports.wbg.__wbg_enqueue_bb16ba72f537dc9e = function () {
    return handleError(function (arg0, arg1) {
      arg0.enqueue(arg1)
    }, arguments)
  }
  imports.wbg.__wbg_error_7534b8e9a36f1ab4 = function (arg0, arg1) {
    let deferred0_0
    let deferred0_1
    try {
      deferred0_0 = arg0
      deferred0_1 = arg1
      console.error(getStringFromWasm0(arg0, arg1))
    } finally {
      wasm.__wbindgen_free(deferred0_0, deferred0_1, 1)
    }
  }
  imports.wbg.__wbg_exists_5bae371baa636bc8 = function () {
    return handleError(function (arg0, arg1, arg2) {
      let deferred0_0
      let deferred0_1
      try {
        deferred0_0 = arg1
        deferred0_1 = arg2
        const ret = arg0.exists(getStringFromWasm0(arg1, arg2))
        return ret
      } finally {
        wasm.__wbindgen_free(deferred0_0, deferred0_1, 1)
      }
    }, arguments)
  }
  imports.wbg.__wbg_fetch_11bff8299d0ecd2b = function (arg0) {
    const ret = fetch(arg0)
    return ret
  }
  imports.wbg.__wbg_fetch_509096533071c657 = function (arg0, arg1) {
    const ret = arg0.fetch(arg1)
    return ret
  }
  imports.wbg.__wbg_fireModelingCommandFromWasm_ef7207f2750bcdca = function () {
    return handleError(function (
      arg0,
      arg1,
      arg2,
      arg3,
      arg4,
      arg5,
      arg6,
      arg7,
      arg8
    ) {
      let deferred0_0
      let deferred0_1
      let deferred1_0
      let deferred1_1
      let deferred2_0
      let deferred2_1
      let deferred3_0
      let deferred3_1
      try {
        deferred0_0 = arg1
        deferred0_1 = arg2
        deferred1_0 = arg3
        deferred1_1 = arg4
        deferred2_0 = arg5
        deferred2_1 = arg6
        deferred3_0 = arg7
        deferred3_1 = arg8
        arg0.fireModelingCommandFromWasm(
          getStringFromWasm0(arg1, arg2),
          getStringFromWasm0(arg3, arg4),
          getStringFromWasm0(arg5, arg6),
          getStringFromWasm0(arg7, arg8)
        )
      } finally {
        wasm.__wbindgen_free(deferred0_0, deferred0_1, 1)
        wasm.__wbindgen_free(deferred1_0, deferred1_1, 1)
        wasm.__wbindgen_free(deferred2_0, deferred2_1, 1)
        wasm.__wbindgen_free(deferred3_0, deferred3_1, 1)
      }
    }, arguments)
  }
  imports.wbg.__wbg_getAllFiles_888e93608b82f8aa = function () {
    return handleError(function (arg0, arg1, arg2) {
      let deferred0_0
      let deferred0_1
      try {
        deferred0_0 = arg1
        deferred0_1 = arg2
        const ret = arg0.getAllFiles(getStringFromWasm0(arg1, arg2))
        return ret
      } finally {
        wasm.__wbindgen_free(deferred0_0, deferred0_1, 1)
      }
    }, arguments)
  }
  imports.wbg.__wbg_getClientState_d3e664f68010cbd5 = function () {
    return handleError(function (arg0) {
      const ret = arg0.getClientState()
      return ret
    }, arguments)
  }
  imports.wbg.__wbg_getOsInfo_875722598c41dc49 = function () {
    return handleError(function (arg0, arg1) {
      const ret = arg1.getOsInfo()
      const ptr1 = passStringToWasm0(
        ret,
        wasm.__wbindgen_malloc,
        wasm.__wbindgen_realloc
      )
      const len1 = WASM_VECTOR_LEN
      getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true)
      getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true)
    }, arguments)
  }
  imports.wbg.__wbg_getRandomValues_38097e921c2494c3 = function () {
    return handleError(function (arg0, arg1) {
      globalThis.crypto.getRandomValues(getArrayU8FromWasm0(arg0, arg1))
    }, arguments)
  }
  imports.wbg.__wbg_getRandomValues_bcb4912f16000dc4 = function () {
    return handleError(function (arg0, arg1) {
      arg0.getRandomValues(arg1)
    }, arguments)
  }
  imports.wbg.__wbg_getTime_46267b1c24877e30 = function (arg0) {
    const ret = arg0.getTime()
    return ret
  }
  imports.wbg.__wbg_getWebrtcStats_2c9396ad5c837e7b = function () {
    return handleError(function (arg0) {
      const ret = arg0.getWebrtcStats()
      return ret
    }, arguments)
  }
  imports.wbg.__wbg_getWriter_6ce182d0adc3f96b = function () {
    return handleError(function (arg0) {
      const ret = arg0.getWriter()
      return ret
    }, arguments)
  }
  imports.wbg.__wbg_get_67b2ba62fc30de12 = function () {
    return handleError(function (arg0, arg1) {
      const ret = Reflect.get(arg0, arg1)
      return ret
    }, arguments)
  }
  imports.wbg.__wbg_has_a5ea9117f258a0ec = function () {
    return handleError(function (arg0, arg1) {
      const ret = Reflect.has(arg0, arg1)
      return ret
    }, arguments)
  }
  imports.wbg.__wbg_headers_9cb51cfd2ac780a4 = function (arg0) {
    const ret = arg0.headers
    return ret
  }
  imports.wbg.__wbg_instanceof_Response_f2cc20d9f7dfd644 = function (arg0) {
    let result
    try {
      result = arg0 instanceof Response
    } catch (_) {
      result = false
    }
    const ret = result
    return ret
  }
  imports.wbg.__wbg_instanceof_Uint8Array_17156bcf118086a9 = function (arg0) {
    let result
    try {
      result = arg0 instanceof Uint8Array
    } catch (_) {
      result = false
    }
    const ret = result
    return ret
  }
  imports.wbg.__wbg_instanceof_Window_def73ea0955fc569 = function (arg0) {
    let result
    try {
      result = arg0 instanceof Window
    } catch (_) {
      result = false
    }
    const ret = result
    return ret
  }
  imports.wbg.__wbg_instanceof_WorkerGlobalScope_dbdbdea7e3b56493 = function (
    arg0
  ) {
    let result
    try {
      result = arg0 instanceof WorkerGlobalScope
    } catch (_) {
      result = false
    }
    const ret = result
    return ret
  }
  imports.wbg.__wbg_isDesktop_4eed4876d47b55ef = function () {
    return handleError(function (arg0) {
      const ret = arg0.isDesktop()
      return ret
    }, arguments)
  }
  imports.wbg.__wbg_iterator_9a24c88df860dc65 = function () {
    const ret = Symbol.iterator
    return ret
  }
  imports.wbg.__wbg_kclCode_501bedbcc7b29a04 = function () {
    return handleError(function (arg0, arg1) {
      const ret = arg1.kclCode()
      const ptr1 = passStringToWasm0(
        ret,
        wasm.__wbindgen_malloc,
        wasm.__wbindgen_realloc
      )
      const len1 = WASM_VECTOR_LEN
      getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true)
      getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true)
    }, arguments)
  }
  imports.wbg.__wbg_length_a446193dc22c12f8 = function (arg0) {
    const ret = arg0.length
    return ret
  }
  imports.wbg.__wbg_log_c222819a41e063d3 = function (arg0) {
    console.log(arg0)
  }
  imports.wbg.__wbg_msCrypto_0a36e2ec3a343d26 = function (arg0) {
    const ret = arg0.msCrypto
    return ret
  }
  imports.wbg.__wbg_new0_f788a2397c7ca929 = function () {
    const ret = new Date()
    return ret
  }
  imports.wbg.__wbg_new_018dcc2d6c8c2f6a = function () {
    return handleError(function () {
      const ret = new Headers()
      return ret
    }, arguments)
  }
  imports.wbg.__wbg_new_23a2665fac83c611 = function (arg0, arg1) {
    try {
      var state0 = { a: arg0, b: arg1 }
      var cb0 = (arg0, arg1) => {
        const a = state0.a
        state0.a = 0
        try {
          return __wbg_adapter_302(a, state0.b, arg0, arg1)
        } finally {
          state0.a = a
        }
      }
      const ret = new Promise(cb0)
      return ret
    } finally {
      state0.a = state0.b = 0
    }
  }
  imports.wbg.__wbg_new_405e22f390576ce2 = function () {
    const ret = new Object()
    return ret
  }
  imports.wbg.__wbg_new_78feb108b6472713 = function () {
    const ret = new Array()
    return ret
  }
  imports.wbg.__wbg_new_8a6f238a6ece86ea = function () {
    const ret = new Error()
    return ret
  }
  imports.wbg.__wbg_new_9fd39a253424609a = function () {
    return handleError(function () {
      const ret = new FormData()
      return ret
    }, arguments)
  }
  imports.wbg.__wbg_new_a12002a7f91c75be = function (arg0) {
    const ret = new Uint8Array(arg0)
    return ret
  }
  imports.wbg.__wbg_new_c68d7209be747379 = function (arg0, arg1) {
    const ret = new Error(getStringFromWasm0(arg0, arg1))
    return ret
  }
  imports.wbg.__wbg_new_e25e5aab09ff45db = function () {
    return handleError(function () {
      const ret = new AbortController()
      return ret
    }, arguments)
  }
  imports.wbg.__wbg_newnoargs_105ed471475aaf50 = function (arg0, arg1) {
    const ret = new Function(getStringFromWasm0(arg0, arg1))
    return ret
  }
  imports.wbg.__wbg_newwithbyteoffsetandlength_d97e637ebe145a9a = function (
    arg0,
    arg1,
    arg2
  ) {
    const ret = new Uint8Array(arg0, arg1 >>> 0, arg2 >>> 0)
    return ret
  }
  imports.wbg.__wbg_newwithlength_a381634e90c276d4 = function (arg0) {
    const ret = new Uint8Array(arg0 >>> 0)
    return ret
  }
  imports.wbg.__wbg_newwithstrandinit_06c535e0a867c635 = function () {
    return handleError(function (arg0, arg1, arg2) {
      const ret = new Request(getStringFromWasm0(arg0, arg1), arg2)
      return ret
    }, arguments)
  }
  imports.wbg.__wbg_newwithu8arraysequenceandoptions_068570c487f69127 =
    function () {
      return handleError(function (arg0, arg1) {
        const ret = new Blob(arg0, arg1)
        return ret
      }, arguments)
    }
  imports.wbg.__wbg_next_25feadfc0913fea9 = function (arg0) {
    const ret = arg0.next
    return ret
  }
  imports.wbg.__wbg_next_6574e1a8a62d1055 = function () {
    return handleError(function (arg0) {
      const ret = arg0.next()
      return ret
    }, arguments)
  }
  imports.wbg.__wbg_next_c3ab0d59847b3b5c = function () {
    return handleError(function (arg0) {
      const ret = arg0.next()
      return ret
    }, arguments)
  }
  imports.wbg.__wbg_node_02999533c4ea02e3 = function (arg0) {
    const ret = arg0.node
    return ret
  }
  imports.wbg.__wbg_now_2c95c9de01293173 = function (arg0) {
    const ret = arg0.now()
    return ret
  }
  imports.wbg.__wbg_now_d18023d54d4e5500 = function (arg0) {
    const ret = arg0.now()
    return ret
  }
  imports.wbg.__wbg_parse_def2e24ef1252aff = function () {
    return handleError(function (arg0, arg1) {
      const ret = JSON.parse(getStringFromWasm0(arg0, arg1))
      return ret
    }, arguments)
  }
  imports.wbg.__wbg_performance_7a3ffd0b17f663ad = function (arg0) {
    const ret = arg0.performance
    return ret
  }
  imports.wbg.__wbg_pool_8d859d5c31939ad9 = function () {
    return handleError(function (arg0, arg1) {
      const ret = arg1.pool()
      const ptr1 = passStringToWasm0(
        ret,
        wasm.__wbindgen_malloc,
        wasm.__wbindgen_realloc
      )
      const len1 = WASM_VECTOR_LEN
      getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true)
      getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true)
    }, arguments)
  }
  imports.wbg.__wbg_process_5c1d670bc53614b8 = function (arg0) {
    const ret = arg0.process
    return ret
  }
  imports.wbg.__wbg_push_737cfc8c1432c2c6 = function (arg0, arg1) {
    const ret = arg0.push(arg1)
    return ret
  }
  imports.wbg.__wbg_queueMicrotask_97d92b4fcc8a61c5 = function (arg0) {
    queueMicrotask(arg0)
  }
  imports.wbg.__wbg_queueMicrotask_d3219def82552485 = function (arg0) {
    const ret = arg0.queueMicrotask
    return ret
  }
  imports.wbg.__wbg_randomFillSync_ab2cfe79ebbf2740 = function () {
    return handleError(function (arg0, arg1) {
      arg0.randomFillSync(arg1)
    }, arguments)
  }
  imports.wbg.__wbg_readFile_e2b4be89abc733a6 = function () {
    return handleError(function (arg0, arg1, arg2) {
      let deferred0_0
      let deferred0_1
      try {
        deferred0_0 = arg1
        deferred0_1 = arg2
        const ret = arg0.readFile(getStringFromWasm0(arg1, arg2))
        return ret
      } finally {
        wasm.__wbindgen_free(deferred0_0, deferred0_1, 1)
      }
    }, arguments)
  }
  imports.wbg.__wbg_ready_480b0e63c18378c7 = function (arg0) {
    const ret = arg0.ready
    return ret
  }
  imports.wbg.__wbg_releaseLock_a389e6ea62ce0f4d = function (arg0) {
    arg0.releaseLock()
  }
  imports.wbg.__wbg_require_79b1e9274cde3c87 = function () {
    return handleError(function () {
      const ret = module.require
      return ret
    }, arguments)
  }
  imports.wbg.__wbg_resolve_4851785c9c5f573d = function (arg0) {
    const ret = Promise.resolve(arg0)
    return ret
  }
  imports.wbg.__wbg_respond_1f279fa9f8edcb1c = function () {
    return handleError(function (arg0, arg1) {
      arg0.respond(arg1 >>> 0)
    }, arguments)
  }
  imports.wbg.__wbg_screenshot_8f85775d4b524b2d = function () {
    return handleError(function (arg0) {
      const ret = arg0.screenshot()
      return ret
    }, arguments)
  }
  imports.wbg.__wbg_sendModelingCommandFromWasm_d74824e05e9d0431 = function () {
    return handleError(function (
      arg0,
      arg1,
      arg2,
      arg3,
      arg4,
      arg5,
      arg6,
      arg7,
      arg8
    ) {
      let deferred0_0
      let deferred0_1
      let deferred1_0
      let deferred1_1
      let deferred2_0
      let deferred2_1
      let deferred3_0
      let deferred3_1
      try {
        deferred0_0 = arg1
        deferred0_1 = arg2
        deferred1_0 = arg3
        deferred1_1 = arg4
        deferred2_0 = arg5
        deferred2_1 = arg6
        deferred3_0 = arg7
        deferred3_1 = arg8
        const ret = arg0.sendModelingCommandFromWasm(
          getStringFromWasm0(arg1, arg2),
          getStringFromWasm0(arg3, arg4),
          getStringFromWasm0(arg5, arg6),
          getStringFromWasm0(arg7, arg8)
        )
        return ret
      } finally {
        wasm.__wbindgen_free(deferred0_0, deferred0_1, 1)
        wasm.__wbindgen_free(deferred1_0, deferred1_1, 1)
        wasm.__wbindgen_free(deferred2_0, deferred2_1, 1)
        wasm.__wbindgen_free(deferred3_0, deferred3_1, 1)
      }
    }, arguments)
  }
  imports.wbg.__wbg_setTimeout_73ce8df12de4f2f2 = function (arg0, arg1) {
    const ret = setTimeout(arg0, arg1)
    return ret
  }
  imports.wbg.__wbg_setTimeout_b4ee584b3f982e97 = function () {
    return handleError(function (arg0, arg1, arg2) {
      const ret = arg0.setTimeout(arg1, arg2)
      return ret
    }, arguments)
  }
  imports.wbg.__wbg_setTimeout_f2fe5af8e3debeb3 = function () {
    return handleError(function (arg0, arg1, arg2) {
      const ret = arg0.setTimeout(arg1, arg2)
      return ret
    }, arguments)
  }
  imports.wbg.__wbg_set_65595bdd868b3009 = function (arg0, arg1, arg2) {
    arg0.set(arg1, arg2 >>> 0)
  }
  imports.wbg.__wbg_setbody_5923b78a95eedf29 = function (arg0, arg1) {
    arg0.body = arg1
  }
  imports.wbg.__wbg_setcredentials_c3a22f1cd105a2c6 = function (arg0, arg1) {
    arg0.credentials = __wbindgen_enum_RequestCredentials[arg1]
  }
  imports.wbg.__wbg_setheaders_834c0bdb6a8949ad = function (arg0, arg1) {
    arg0.headers = arg1
  }
  imports.wbg.__wbg_setmethod_3c5280fe5d890842 = function (arg0, arg1, arg2) {
    arg0.method = getStringFromWasm0(arg1, arg2)
  }
  imports.wbg.__wbg_setmode_5dc300b865044b65 = function (arg0, arg1) {
    arg0.mode = __wbindgen_enum_RequestMode[arg1]
  }
  imports.wbg.__wbg_setsignal_75b21ef3a81de905 = function (arg0, arg1) {
    arg0.signal = arg1
  }
  imports.wbg.__wbg_settype_39ed370d3edd403c = function (arg0, arg1, arg2) {
    arg0.type = getStringFromWasm0(arg1, arg2)
  }
  imports.wbg.__wbg_signal_aaf9ad74119f20a4 = function (arg0) {
    const ret = arg0.signal
    return ret
  }
  imports.wbg.__wbg_stack_0ed75d68575b0f3c = function (arg0, arg1) {
    const ret = arg1.stack
    const ptr1 = passStringToWasm0(
      ret,
      wasm.__wbindgen_malloc,
      wasm.__wbindgen_realloc
    )
    const len1 = WASM_VECTOR_LEN
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true)
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true)
  }
  imports.wbg.__wbg_startNewSession_ef3ac324fce93ed2 = function () {
    return handleError(function (arg0) {
      const ret = arg0.startNewSession()
      return ret
    }, arguments)
  }
  imports.wbg.__wbg_static_accessor_GLOBAL_88a902d13a557d07 = function () {
    const ret = typeof global === 'undefined' ? null : global
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret)
  }
  imports.wbg.__wbg_static_accessor_GLOBAL_THIS_56578be7e9f832b0 = function () {
    const ret = typeof globalThis === 'undefined' ? null : globalThis
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret)
  }
  imports.wbg.__wbg_static_accessor_SELF_37c5d418e4bf5819 = function () {
    const ret = typeof self === 'undefined' ? null : self
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret)
  }
  imports.wbg.__wbg_static_accessor_WINDOW_5de37043a91a9c40 = function () {
    const ret = typeof window === 'undefined' ? null : window
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret)
  }
  imports.wbg.__wbg_status_f6360336ca686bf0 = function (arg0) {
    const ret = arg0.status
    return ret
  }
  imports.wbg.__wbg_stringify_f7ed6987935b4a24 = function () {
    return handleError(function (arg0) {
      const ret = JSON.stringify(arg0)
      return ret
    }, arguments)
  }
  imports.wbg.__wbg_subarray_aa9065fa9dc5df96 = function (arg0, arg1, arg2) {
    const ret = arg0.subarray(arg1 >>> 0, arg2 >>> 0)
    return ret
  }
  imports.wbg.__wbg_text_7805bea50de2af49 = function () {
    return handleError(function (arg0) {
      const ret = arg0.text()
      return ret
    }, arguments)
  }
  imports.wbg.__wbg_then_44b73946d2fb3e7d = function (arg0, arg1) {
    const ret = arg0.then(arg1)
    return ret
  }
  imports.wbg.__wbg_then_48b406749878a531 = function (arg0, arg1, arg2) {
    const ret = arg0.then(arg1, arg2)
    return ret
  }
  imports.wbg.__wbg_toString_5285597960676b7b = function (arg0) {
    const ret = arg0.toString()
    return ret
  }
  imports.wbg.__wbg_toString_c813bbd34d063839 = function (arg0) {
    const ret = arg0.toString()
    return ret
  }
  imports.wbg.__wbg_url_ae10c34ca209681d = function (arg0, arg1) {
    const ret = arg1.url
    const ptr1 = passStringToWasm0(
      ret,
      wasm.__wbindgen_malloc,
      wasm.__wbindgen_realloc
    )
    const len1 = WASM_VECTOR_LEN
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true)
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true)
  }
  imports.wbg.__wbg_value_cd1ffa7b1ab794f1 = function (arg0) {
    const ret = arg0.value
    return ret
  }
  imports.wbg.__wbg_version_2aca5efcd7b120c1 = function () {
    return handleError(function (arg0, arg1) {
      const ret = arg1.version()
      const ptr1 = passStringToWasm0(
        ret,
        wasm.__wbindgen_malloc,
        wasm.__wbindgen_realloc
      )
      const len1 = WASM_VECTOR_LEN
      getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true)
      getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true)
    }, arguments)
  }
  imports.wbg.__wbg_versions_c71aa1626a93e0a1 = function (arg0) {
    const ret = arg0.versions
    return ret
  }
  imports.wbg.__wbg_view_fd8a56e8983f448d = function (arg0) {
    const ret = arg0.view
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret)
  }
  imports.wbg.__wbg_warn_4ca3906c248c47c4 = function (arg0) {
    console.warn(arg0)
  }
  imports.wbg.__wbg_write_311434e30ee214e5 = function (arg0, arg1) {
    const ret = arg0.write(arg1)
    return ret
  }
  imports.wbg.__wbindgen_boolean_get = function (arg0) {
    const v = arg0
    const ret = typeof v === 'boolean' ? (v ? 1 : 0) : 2
    return ret
  }
  imports.wbg.__wbindgen_cb_drop = function (arg0) {
    const obj = arg0.original
    if (obj.cnt-- == 1) {
      obj.a = 0
      return true
    }
    const ret = false
    return ret
  }
  imports.wbg.__wbindgen_closure_wrapper14672 = function (arg0, arg1, arg2) {
    const ret = makeMutClosure(arg0, arg1, 5220, __wbg_adapter_34)
    return ret
  }
  imports.wbg.__wbindgen_closure_wrapper16296 = function (arg0, arg1, arg2) {
    const ret = makeMutClosure(arg0, arg1, 5667, __wbg_adapter_37)
    return ret
  }
  imports.wbg.__wbindgen_closure_wrapper16435 = function (arg0, arg1, arg2) {
    const ret = makeMutClosure(arg0, arg1, 5714, __wbg_adapter_40)
    return ret
  }
  imports.wbg.__wbindgen_debug_string = function (arg0, arg1) {
    const ret = debugString(arg1)
    const ptr1 = passStringToWasm0(
      ret,
      wasm.__wbindgen_malloc,
      wasm.__wbindgen_realloc
    )
    const len1 = WASM_VECTOR_LEN
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true)
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true)
  }
  imports.wbg.__wbindgen_error_new = function (arg0, arg1) {
    const ret = new Error(getStringFromWasm0(arg0, arg1))
    return ret
  }
  imports.wbg.__wbindgen_init_externref_table = function () {
    const table = wasm.__wbindgen_export_2
    const offset = table.grow(4)
    table.set(0, undefined)
    table.set(offset + 0, undefined)
    table.set(offset + 1, null)
    table.set(offset + 2, true)
    table.set(offset + 3, false)
  }
  imports.wbg.__wbindgen_is_function = function (arg0) {
    const ret = typeof arg0 === 'function'
    return ret
  }
  imports.wbg.__wbindgen_is_null = function (arg0) {
    const ret = arg0 === null
    return ret
  }
  imports.wbg.__wbindgen_is_object = function (arg0) {
    const val = arg0
    const ret = typeof val === 'object' && val !== null
    return ret
  }
  imports.wbg.__wbindgen_is_string = function (arg0) {
    const ret = typeof arg0 === 'string'
    return ret
  }
  imports.wbg.__wbindgen_is_undefined = function (arg0) {
    const ret = arg0 === undefined
    return ret
  }
  imports.wbg.__wbindgen_memory = function () {
    const ret = wasm.memory
    return ret
  }
  imports.wbg.__wbindgen_string_get = function (arg0, arg1) {
    const obj = arg1
    const ret = typeof obj === 'string' ? obj : undefined
    var ptr1 = isLikeNone(ret)
      ? 0
      : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc)
    var len1 = WASM_VECTOR_LEN
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true)
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true)
  }
  imports.wbg.__wbindgen_string_new = function (arg0, arg1) {
    const ret = getStringFromWasm0(arg0, arg1)
    return ret
  }
  imports.wbg.__wbindgen_throw = function (arg0, arg1) {
    throw new Error(getStringFromWasm0(arg0, arg1))
  }

  return imports
}

function __wbg_init_memory(imports, memory) {}

function __wbg_finalize_init(instance, module) {
  wasm = instance.exports
  __wbg_init.__wbindgen_wasm_module = module
  cachedDataViewMemory0 = null
  cachedFloat64ArrayMemory0 = null
  cachedUint8ArrayMemory0 = null

  wasm.__wbindgen_start()
  return wasm
}

function initSync(module) {
  if (wasm !== undefined) return wasm

  if (typeof module !== 'undefined') {
    if (Object.getPrototypeOf(module) === Object.prototype) {
      ;({ module } = module)
    } else {
      console.warn(
        'using deprecated parameters for `initSync()`; pass a single object instead'
      )
    }
  }

  const imports = __wbg_get_imports()

  __wbg_init_memory(imports)

  if (!(module instanceof WebAssembly.Module)) {
    module = new WebAssembly.Module(module)
  }

  const instance = new WebAssembly.Instance(module, imports)

  return __wbg_finalize_init(instance, module)
}

async function __wbg_init(module_or_path) {
  if (wasm !== undefined) return wasm

  if (typeof module_or_path !== 'undefined') {
    if (Object.getPrototypeOf(module_or_path) === Object.prototype) {
      ;({ module_or_path } = module_or_path)
    } else {
      console.warn(
        'using deprecated parameters for the initialization function; pass a single object instead'
      )
    }
  }

  if (typeof module_or_path === 'undefined') {
    module_or_path = new URL('kcl_wasm_lib_bg.wasm', import.meta.url)
  }
  const imports = __wbg_get_imports()

  if (
    typeof module_or_path === 'string' ||
    (typeof Request === 'function' && module_or_path instanceof Request) ||
    (typeof URL === 'function' && module_or_path instanceof URL)
  ) {
    module_or_path = fetch(module_or_path)
  }

  __wbg_init_memory(imports)

  const { instance, module } = await __wbg_load(await module_or_path, imports)

  return __wbg_finalize_init(instance, module)
}

export { initSync }
export default __wbg_init
