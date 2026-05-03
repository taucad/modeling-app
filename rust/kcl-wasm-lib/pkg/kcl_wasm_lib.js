/* @ts-self-types="./kcl_wasm_lib.d.ts" */

export class Context {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        ContextFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_context_free(ptr, 0);
    }
    /**
     * Add a constraint to sketch.
     * @param {string} version_json
     * @param {string} sketch_json
     * @param {string} constraint_json
     * @param {string} settings
     * @param {boolean} create_checkpoint
     * @returns {Promise<any>}
     */
    add_constraint(version_json, sketch_json, constraint_json, settings, create_checkpoint) {
        const ptr0 = passStringToWasm0(version_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(sketch_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(constraint_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        const ptr3 = passStringToWasm0(settings, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len3 = WASM_VECTOR_LEN;
        const ret = wasm.context_add_constraint(this.__wbg_ptr, ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, create_checkpoint);
        return ret;
    }
    /**
     * @param {number} project
     * @param {string} file
     * @returns {Promise<void>}
     */
    add_file(project, file) {
        const ptr0 = passStringToWasm0(file, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.context_add_file(this.__wbg_ptr, project, ptr0, len0);
        return ret;
    }
    /**
     * Add segment to sketch.
     * @param {string} version_json
     * @param {string} sketch_json
     * @param {string} segment_json
     * @param {string | null | undefined} label
     * @param {string} settings
     * @param {boolean} create_checkpoint
     * @returns {Promise<any>}
     */
    add_segment(version_json, sketch_json, segment_json, label, settings, create_checkpoint) {
        const ptr0 = passStringToWasm0(version_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(sketch_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(segment_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        var ptr3 = isLikeNone(label) ? 0 : passStringToWasm0(label, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len3 = WASM_VECTOR_LEN;
        const ptr4 = passStringToWasm0(settings, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len4 = WASM_VECTOR_LEN;
        const ret = wasm.context_add_segment(this.__wbg_ptr, ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, ptr4, len4, create_checkpoint);
        return ret;
    }
    /**
     * Reset the scene and bust the cache.
     * ONLY use this if you absolutely need to reset the scene and bust the cache.
     * @param {string} settings
     * @param {string | null} [path]
     * @returns {Promise<any>}
     */
    bustCacheAndResetScene(settings, path) {
        const ptr0 = passStringToWasm0(settings, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        var ptr1 = isLikeNone(path) ? 0 : passStringToWasm0(path, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        const ret = wasm.context_bustCacheAndResetScene(this.__wbg_ptr, ptr0, len0, ptr1, len1);
        return ret;
    }
    /**
     * Chain a segment to a previous segment by adding it and creating a coincident constraint.
     * @param {string} version_json
     * @param {string} sketch_json
     * @param {string} previous_segment_end_point_id_json
     * @param {string} segment_json
     * @param {string | null | undefined} label
     * @param {string} settings
     * @param {boolean} create_checkpoint
     * @returns {Promise<any>}
     */
    chain_segment(version_json, sketch_json, previous_segment_end_point_id_json, segment_json, label, settings, create_checkpoint) {
        const ptr0 = passStringToWasm0(version_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(sketch_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(previous_segment_end_point_id_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        const ptr3 = passStringToWasm0(segment_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len3 = WASM_VECTOR_LEN;
        var ptr4 = isLikeNone(label) ? 0 : passStringToWasm0(label, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len4 = WASM_VECTOR_LEN;
        const ptr5 = passStringToWasm0(settings, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len5 = WASM_VECTOR_LEN;
        const ret = wasm.context_chain_segment(this.__wbg_ptr, ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, ptr4, len4, ptr5, len5, create_checkpoint);
        return ret;
    }
    /**
     * @returns {Promise<void>}
     */
    clear_sketch_checkpoints() {
        const ret = wasm.context_clear_sketch_checkpoints(this.__wbg_ptr);
        return ret;
    }
    /**
     * Delete segments and constraints in sketch.
     * @param {string} version_json
     * @param {string} sketch_json
     * @param {string} constraint_ids_json
     * @param {string} segment_ids_json
     * @param {string} settings
     * @param {boolean} create_checkpoint
     * @returns {Promise<any>}
     */
    delete_objects(version_json, sketch_json, constraint_ids_json, segment_ids_json, settings, create_checkpoint) {
        const ptr0 = passStringToWasm0(version_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(sketch_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(constraint_ids_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        const ptr3 = passStringToWasm0(segment_ids_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len3 = WASM_VECTOR_LEN;
        const ptr4 = passStringToWasm0(settings, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len4 = WASM_VECTOR_LEN;
        const ret = wasm.context_delete_objects(this.__wbg_ptr, ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, ptr4, len4, create_checkpoint);
        return ret;
    }
    /**
     * Delete sketch.
     * @param {string} version_json
     * @param {string} sketch_json
     * @param {string} settings
     * @returns {Promise<any>}
     */
    delete_sketch(version_json, sketch_json, settings) {
        const ptr0 = passStringToWasm0(version_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(sketch_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(settings, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        const ret = wasm.context_delete_sketch(this.__wbg_ptr, ptr0, len0, ptr1, len1, ptr2, len2);
        return ret;
    }
    /**
     * Edit a constraint in a sketch.
     * @param {string} version_json
     * @param {string} sketch_json
     * @param {string} constraint_id_json
     * @param {string} value_expression
     * @param {string} settings
     * @param {boolean} create_checkpoint
     * @returns {Promise<any>}
     */
    edit_constraint(version_json, sketch_json, constraint_id_json, value_expression, settings, create_checkpoint) {
        const ptr0 = passStringToWasm0(version_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(sketch_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(constraint_id_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        const ptr3 = passStringToWasm0(value_expression, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len3 = WASM_VECTOR_LEN;
        const ptr4 = passStringToWasm0(settings, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len4 = WASM_VECTOR_LEN;
        const ret = wasm.context_edit_constraint(this.__wbg_ptr, ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, ptr4, len4, create_checkpoint);
        return ret;
    }
    /**
     * Edit a distance constraint label position in a sketch.
     * @param {string} version_json
     * @param {string} sketch_json
     * @param {string} constraint_id_json
     * @param {string} label_position_json
     * @param {string} settings
     * @param {boolean} create_checkpoint
     * @param {string} anchor_segment_ids_json
     * @returns {Promise<any>}
     */
    edit_distance_constraint_label_position(version_json, sketch_json, constraint_id_json, label_position_json, settings, create_checkpoint, anchor_segment_ids_json) {
        const ptr0 = passStringToWasm0(version_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(sketch_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(constraint_id_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        const ptr3 = passStringToWasm0(label_position_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len3 = WASM_VECTOR_LEN;
        const ptr4 = passStringToWasm0(settings, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len4 = WASM_VECTOR_LEN;
        const ptr5 = passStringToWasm0(anchor_segment_ids_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len5 = WASM_VECTOR_LEN;
        const ret = wasm.context_edit_distance_constraint_label_position(this.__wbg_ptr, ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, ptr4, len4, create_checkpoint, ptr5, len5);
        return ret;
    }
    /**
     * Edit segment in sketch.
     * @param {string} version_json
     * @param {string} sketch_json
     * @param {string} segments_json
     * @param {string} settings
     * @param {boolean} create_checkpoint
     * @returns {Promise<any>}
     */
    edit_segments(version_json, sketch_json, segments_json, settings, create_checkpoint) {
        const ptr0 = passStringToWasm0(version_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(sketch_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(segments_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        const ptr3 = passStringToWasm0(settings, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len3 = WASM_VECTOR_LEN;
        const ret = wasm.context_edit_segments(this.__wbg_ptr, ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, create_checkpoint);
        return ret;
    }
    /**
     * Enter sketch mode for an existing sketch.
     * @param {string} project_json
     * @param {string} file_json
     * @param {string} version_json
     * @param {string} sketch_json
     * @param {string} settings
     * @returns {Promise<any>}
     */
    edit_sketch(project_json, file_json, version_json, sketch_json, settings) {
        const ptr0 = passStringToWasm0(project_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(file_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(version_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        const ptr3 = passStringToWasm0(sketch_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len3 = WASM_VECTOR_LEN;
        const ptr4 = passStringToWasm0(settings, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len4 = WASM_VECTOR_LEN;
        const ret = wasm.context_edit_sketch(this.__wbg_ptr, ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, ptr4, len4);
        return ret;
    }
    /**
     * Execute a program.
     * @param {string} program_ast_json
     * @param {string | null | undefined} path
     * @param {string} settings
     * @returns {Promise<any>}
     */
    execute(program_ast_json, path, settings) {
        const ptr0 = passStringToWasm0(program_ast_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        var ptr1 = isLikeNone(path) ? 0 : passStringToWasm0(path, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(settings, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        const ret = wasm.context_execute(this.__wbg_ptr, ptr0, len0, ptr1, len1, ptr2, len2);
        return ret;
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
        const ptr0 = passStringToWasm0(program_ast_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        var ptr1 = isLikeNone(path) ? 0 : passStringToWasm0(path, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(settings, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        const ret = wasm.context_executeMock(this.__wbg_ptr, ptr0, len0, ptr1, len1, ptr2, len2, use_prev_memory);
        return ret;
    }
    /**
     * Execute trim operations on a sketch.
     * This runs the full trim loop internally, executing all trim operations.
     * @param {string} version_json
     * @param {string} sketch_json
     * @param {Float64Array} points
     * @param {string} settings
     * @returns {Promise<any>}
     */
    execute_trim(version_json, sketch_json, points, settings) {
        const ptr0 = passStringToWasm0(version_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(sketch_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passArrayF64ToWasm0(points, wasm.__wbindgen_malloc);
        const len2 = WASM_VECTOR_LEN;
        const ptr3 = passStringToWasm0(settings, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len3 = WASM_VECTOR_LEN;
        const ret = wasm.context_execute_trim(this.__wbg_ptr, ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3);
        return ret;
    }
    /**
     * Exit sketch mode.
     * @param {string} version_json
     * @param {string} sketch_json
     * @param {string} settings
     * @returns {Promise<any>}
     */
    exit_sketch(version_json, sketch_json, settings) {
        const ptr0 = passStringToWasm0(version_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(sketch_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(settings, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        const ret = wasm.context_exit_sketch(this.__wbg_ptr, ptr0, len0, ptr1, len1, ptr2, len2);
        return ret;
    }
    /**
     * Export a scene to a file.
     * @param {string} format_json
     * @param {string} settings
     * @returns {Promise<any>}
     */
    export(format_json, settings) {
        const ptr0 = passStringToWasm0(format_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(settings, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ret = wasm.context_export(this.__wbg_ptr, ptr0, len0, ptr1, len1);
        return ret;
    }
    /**
     * @param {number} project_id
     * @param {number} file_id
     * @returns {Promise<any>}
     */
    get_file(project_id, file_id) {
        const ret = wasm.context_get_file(this.__wbg_ptr, project_id, file_id);
        return ret;
    }
    /**
     * @param {number} project_id
     * @returns {Promise<any>}
     */
    get_project(project_id) {
        const ret = wasm.context_get_project(this.__wbg_ptr, project_id);
        return ret;
    }
    /**
     * Set the current program AST and execute it. Temporary hack for
     * development purposes only.
     * @param {string} program_ast_json
     * @param {string} settings
     * @returns {Promise<any>}
     */
    hack_set_program(program_ast_json, settings) {
        const ptr0 = passStringToWasm0(program_ast_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(settings, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ret = wasm.context_hack_set_program(this.__wbg_ptr, ptr0, len0, ptr1, len1);
        return ret;
    }
    /**
     * @param {any} engine_manager
     * @param {any} fs_manager
     */
    constructor(engine_manager, fs_manager) {
        const ret = wasm.context_new(engine_manager, fs_manager);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        this.__wbg_ptr = ret[0] >>> 0;
        ContextFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * Create new sketch and enter sketch mode.
     * @param {string} project_json
     * @param {string} file_json
     * @param {string} version_json
     * @param {string} args_json
     * @param {string} settings
     * @returns {Promise<any>}
     */
    new_sketch(project_json, file_json, version_json, args_json, settings) {
        const ptr0 = passStringToWasm0(project_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(file_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(version_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        const ptr3 = passStringToWasm0(args_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len3 = WASM_VECTOR_LEN;
        const ptr4 = passStringToWasm0(settings, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len4 = WASM_VECTOR_LEN;
        const ret = wasm.context_new_sketch(this.__wbg_ptr, ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, ptr4, len4);
        return ret;
    }
    /**
     * @param {number} project
     * @param {string} files
     * @param {number} open_file
     * @returns {Promise<void>}
     */
    open_project(project, files, open_file) {
        const ptr0 = passStringToWasm0(files, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.context_open_project(this.__wbg_ptr, project, ptr0, len0, open_file);
        return ret;
    }
    /**
     * @param {number} project
     * @returns {Promise<void>}
     */
    refresh(project) {
        const ret = wasm.context_refresh(this.__wbg_ptr, project);
        return ret;
    }
    /**
     * @param {number} project
     * @param {number} file
     * @returns {Promise<void>}
     */
    remove_file(project, file) {
        const ret = wasm.context_remove_file(this.__wbg_ptr, project, file);
        return ret;
    }
    /**
     * @param {string} checkpoint_id_json
     * @returns {Promise<any>}
     */
    restore_sketch_checkpoint(checkpoint_id_json) {
        const ptr0 = passStringToWasm0(checkpoint_id_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.context_restore_sketch_checkpoint(this.__wbg_ptr, ptr0, len0);
        return ret;
    }
    /**
     * Send a response to kcl lib's engine.
     * @param {Uint8Array} data
     * @returns {Promise<void>}
     */
    sendResponse(data) {
        const ret = wasm.context_sendResponse(this.__wbg_ptr, data);
        return ret;
    }
    /**
     * Execute the sketch in mock mode, without changing anything. This is
     * useful after editing segments, and the user releases the mouse button.
     * @param {string} version_json
     * @param {string} sketch_json
     * @param {string} settings
     * @returns {Promise<any>}
     */
    sketch_execute_mock(version_json, sketch_json, settings) {
        const ptr0 = passStringToWasm0(version_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(sketch_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(settings, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        const ret = wasm.context_sketch_execute_mock(this.__wbg_ptr, ptr0, len0, ptr1, len1, ptr2, len2);
        return ret;
    }
    /**
     * @param {number} project
     * @param {number} file
     * @returns {Promise<void>}
     */
    switch_file(project, file) {
        const ret = wasm.context_switch_file(this.__wbg_ptr, project, file);
        return ret;
    }
    /**
     * Transpile old sketch syntax (startProfile in pipe) to new sketch block syntax.
     *
     * This function re-executes the program using the execution cache (which should be very fast
     * if the program hasn't changed), then extracts the sketch and transpiles it.
     *
     * # Arguments
     * * `program_ast_json` - Program AST as JSON string
     * * `variable_name` - Name of the variable containing the old sketch syntax
     * * `path` - Optional file path for execution context
     * * `settings` - Execution settings as JSON string
     *
     * # Returns
     * The transpiled code as a string, or an error if execution or transpilation fails.
     * @param {string} program_ast_json
     * @param {string} variable_name
     * @param {string | null | undefined} path
     * @param {string} settings
     * @returns {Promise<any>}
     */
    transpile_old_sketch(program_ast_json, variable_name, path, settings) {
        const ptr0 = passStringToWasm0(program_ast_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(variable_name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        var ptr2 = isLikeNone(path) ? 0 : passStringToWasm0(path, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len2 = WASM_VECTOR_LEN;
        const ptr3 = passStringToWasm0(settings, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len3 = WASM_VECTOR_LEN;
        const ret = wasm.context_transpile_old_sketch(this.__wbg_ptr, ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3);
        return ret;
    }
    /**
     * @param {number} project
     * @param {number} file
     * @param {string} text
     * @returns {Promise<void>}
     */
    update_file(project, file, text) {
        const ptr0 = passStringToWasm0(text, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.context_update_file(this.__wbg_ptr, project, file, ptr0, len0);
        return ret;
    }
}
if (Symbol.dispose) Context.prototype[Symbol.dispose] = Context.prototype.free;

export class IntoUnderlyingByteSource {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        IntoUnderlyingByteSourceFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_intounderlyingbytesource_free(ptr, 0);
    }
    /**
     * @returns {number}
     */
    get autoAllocateChunkSize() {
        const ret = wasm.intounderlyingbytesource_autoAllocateChunkSize(this.__wbg_ptr);
        return ret >>> 0;
    }
    cancel() {
        const ptr = this.__destroy_into_raw();
        wasm.intounderlyingbytesource_cancel(ptr);
    }
    /**
     * @param {ReadableByteStreamController} controller
     * @returns {Promise<any>}
     */
    pull(controller) {
        const ret = wasm.intounderlyingbytesource_pull(this.__wbg_ptr, controller);
        return ret;
    }
    /**
     * @param {ReadableByteStreamController} controller
     */
    start(controller) {
        wasm.intounderlyingbytesource_start(this.__wbg_ptr, controller);
    }
    /**
     * @returns {ReadableStreamType}
     */
    get type() {
        const ret = wasm.intounderlyingbytesource_type(this.__wbg_ptr);
        return __wbindgen_enum_ReadableStreamType[ret];
    }
}
if (Symbol.dispose) IntoUnderlyingByteSource.prototype[Symbol.dispose] = IntoUnderlyingByteSource.prototype.free;

export class IntoUnderlyingSink {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        IntoUnderlyingSinkFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_intounderlyingsink_free(ptr, 0);
    }
    /**
     * @param {any} reason
     * @returns {Promise<any>}
     */
    abort(reason) {
        const ptr = this.__destroy_into_raw();
        const ret = wasm.intounderlyingsink_abort(ptr, reason);
        return ret;
    }
    /**
     * @returns {Promise<any>}
     */
    close() {
        const ptr = this.__destroy_into_raw();
        const ret = wasm.intounderlyingsink_close(ptr);
        return ret;
    }
    /**
     * @param {any} chunk
     * @returns {Promise<any>}
     */
    write(chunk) {
        const ret = wasm.intounderlyingsink_write(this.__wbg_ptr, chunk);
        return ret;
    }
}
if (Symbol.dispose) IntoUnderlyingSink.prototype[Symbol.dispose] = IntoUnderlyingSink.prototype.free;

export class IntoUnderlyingSource {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        IntoUnderlyingSourceFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_intounderlyingsource_free(ptr, 0);
    }
    cancel() {
        const ptr = this.__destroy_into_raw();
        wasm.intounderlyingsource_cancel(ptr);
    }
    /**
     * @param {ReadableStreamDefaultController} controller
     * @returns {Promise<any>}
     */
    pull(controller) {
        const ret = wasm.intounderlyingsource_pull(this.__wbg_ptr, controller);
        return ret;
    }
}
if (Symbol.dispose) IntoUnderlyingSource.prototype[Symbol.dispose] = IntoUnderlyingSource.prototype.free;

export class LspServerConfig {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        LspServerConfigFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_lspserverconfig_free(ptr, 0);
    }
    /**
     * @param {AsyncIterator<any>} into_server
     * @param {WritableStream} from_server
     * @param {any} fs
     */
    constructor(into_server, from_server, fs) {
        const ret = wasm.lspserverconfig_new(into_server, from_server, fs);
        this.__wbg_ptr = ret >>> 0;
        LspServerConfigFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
}
if (Symbol.dispose) LspServerConfig.prototype[Symbol.dispose] = LspServerConfig.prototype.free;

export class ResponseContext {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        ResponseContextFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_responsecontext_free(ptr, 0);
    }
    constructor() {
        const ret = wasm.responsecontext_new();
        this.__wbg_ptr = ret >>> 0;
        ResponseContextFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @param {Uint8Array} data
     * @returns {Promise<void>}
     */
    send_response(data) {
        const ret = wasm.responsecontext_send_response(this.__wbg_ptr, data);
        return ret;
    }
}
if (Symbol.dispose) ResponseContext.prototype[Symbol.dispose] = ResponseContext.prototype.free;

export class TangentialArcInfoOutputWasm {
    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(TangentialArcInfoOutputWasm.prototype);
        obj.__wbg_ptr = ptr;
        TangentialArcInfoOutputWasmFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        TangentialArcInfoOutputWasmFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_tangentialarcinfooutputwasm_free(ptr, 0);
    }
    /**
     * The length of the arc.
     * @returns {number}
     */
    get arc_length() {
        const ret = wasm.__wbg_get_tangentialarcinfooutputwasm_arc_length(this.__wbg_ptr);
        return ret;
    }
    /**
     * The midpoint of the arc x.
     * @returns {number}
     */
    get arc_mid_point_x() {
        const ret = wasm.__wbg_get_tangentialarcinfooutputwasm_arc_mid_point_x(this.__wbg_ptr);
        return ret;
    }
    /**
     * The midpoint of the arc y.
     * @returns {number}
     */
    get arc_mid_point_y() {
        const ret = wasm.__wbg_get_tangentialarcinfooutputwasm_arc_mid_point_y(this.__wbg_ptr);
        return ret;
    }
    /**
     * Flag to determine if the arc is counter clockwise.
     * @returns {number}
     */
    get ccw() {
        const ret = wasm.__wbg_get_tangentialarcinfooutputwasm_ccw(this.__wbg_ptr);
        return ret;
    }
    /**
     * The geometric center of the arc x.
     * @returns {number}
     */
    get center_x() {
        const ret = wasm.__wbg_get_tangentialarcinfooutputwasm_center_x(this.__wbg_ptr);
        return ret;
    }
    /**
     * The geometric center of the arc y.
     * @returns {number}
     */
    get center_y() {
        const ret = wasm.__wbg_get_tangentialarcinfooutputwasm_center_y(this.__wbg_ptr);
        return ret;
    }
    /**
     * End angle of the arc in radians.
     * @returns {number}
     */
    get end_angle() {
        const ret = wasm.__wbg_get_tangentialarcinfooutputwasm_end_angle(this.__wbg_ptr);
        return ret;
    }
    /**
     * The radius of the arc.
     * @returns {number}
     */
    get radius() {
        const ret = wasm.__wbg_get_tangentialarcinfooutputwasm_radius(this.__wbg_ptr);
        return ret;
    }
    /**
     * Start angle of the arc in radians.
     * @returns {number}
     */
    get start_angle() {
        const ret = wasm.__wbg_get_tangentialarcinfooutputwasm_start_angle(this.__wbg_ptr);
        return ret;
    }
    /**
     * The length of the arc.
     * @param {number} arg0
     */
    set arc_length(arg0) {
        wasm.__wbg_set_tangentialarcinfooutputwasm_arc_length(this.__wbg_ptr, arg0);
    }
    /**
     * The midpoint of the arc x.
     * @param {number} arg0
     */
    set arc_mid_point_x(arg0) {
        wasm.__wbg_set_tangentialarcinfooutputwasm_arc_mid_point_x(this.__wbg_ptr, arg0);
    }
    /**
     * The midpoint of the arc y.
     * @param {number} arg0
     */
    set arc_mid_point_y(arg0) {
        wasm.__wbg_set_tangentialarcinfooutputwasm_arc_mid_point_y(this.__wbg_ptr, arg0);
    }
    /**
     * Flag to determine if the arc is counter clockwise.
     * @param {number} arg0
     */
    set ccw(arg0) {
        wasm.__wbg_set_tangentialarcinfooutputwasm_ccw(this.__wbg_ptr, arg0);
    }
    /**
     * The geometric center of the arc x.
     * @param {number} arg0
     */
    set center_x(arg0) {
        wasm.__wbg_set_tangentialarcinfooutputwasm_center_x(this.__wbg_ptr, arg0);
    }
    /**
     * The geometric center of the arc y.
     * @param {number} arg0
     */
    set center_y(arg0) {
        wasm.__wbg_set_tangentialarcinfooutputwasm_center_y(this.__wbg_ptr, arg0);
    }
    /**
     * End angle of the arc in radians.
     * @param {number} arg0
     */
    set end_angle(arg0) {
        wasm.__wbg_set_tangentialarcinfooutputwasm_end_angle(this.__wbg_ptr, arg0);
    }
    /**
     * The radius of the arc.
     * @param {number} arg0
     */
    set radius(arg0) {
        wasm.__wbg_set_tangentialarcinfooutputwasm_radius(this.__wbg_ptr, arg0);
    }
    /**
     * Start angle of the arc in radians.
     * @param {number} arg0
     */
    set start_angle(arg0) {
        wasm.__wbg_set_tangentialarcinfooutputwasm_start_angle(this.__wbg_ptr, arg0);
    }
}
if (Symbol.dispose) TangentialArcInfoOutputWasm.prototype[Symbol.dispose] = TangentialArcInfoOutputWasm.prototype.free;

export class WasmCircleParams {
    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(WasmCircleParams.prototype);
        obj.__wbg_ptr = ptr;
        WasmCircleParamsFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        WasmCircleParamsFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_wasmcircleparams_free(ptr, 0);
    }
    /**
     * @returns {number}
     */
    get center_x() {
        const ret = wasm.__wbg_get_wasmcircleparams_center_x(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get center_y() {
        const ret = wasm.__wbg_get_wasmcircleparams_center_y(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get radius() {
        const ret = wasm.__wbg_get_wasmcircleparams_radius(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set center_x(arg0) {
        wasm.__wbg_set_wasmcircleparams_center_x(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set center_y(arg0) {
        wasm.__wbg_set_wasmcircleparams_center_y(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set radius(arg0) {
        wasm.__wbg_set_wasmcircleparams_radius(this.__wbg_ptr, arg0);
    }
}
if (Symbol.dispose) WasmCircleParams.prototype[Symbol.dispose] = WasmCircleParams.prototype.free;

/**
 * Base64 decode a string.
 * @param {string} input
 * @returns {Uint8Array}
 */
export function base64_decode(input) {
    const ptr0 = passStringToWasm0(input, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.base64_decode(ptr0, len0);
    if (ret[3]) {
        throw takeFromExternrefTable0(ret[2]);
    }
    var v2 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
    wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
    return v2;
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
    const ret = wasm.calculate_circle_from_3_points(ax, ay, bx, by, cx, cy);
    return WasmCircleParams.__wrap(ret);
}

/**
 * Takes a kcl string and Meta settings and changes the meta settings in the kcl string.
 * @param {string} code
 * @param {string} len_str
 * @returns {string}
 */
export function change_default_units(code, len_str) {
    let deferred4_0;
    let deferred4_1;
    try {
        const ptr0 = passStringToWasm0(code, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(len_str, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ret = wasm.change_default_units(ptr0, len0, ptr1, len1);
        var ptr3 = ret[0];
        var len3 = ret[1];
        if (ret[3]) {
            ptr3 = 0; len3 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred4_0 = ptr3;
        deferred4_1 = len3;
        return getStringFromWasm0(ptr3, len3);
    } finally {
        wasm.__wbindgen_free(deferred4_0, deferred4_1, 1);
    }
}

/**
 * Takes a kcl string and Meta settings and changes the meta settings in the kcl string.
 * @param {string} code
 * @param {string} level_str
 * @returns {string}
 */
export function change_experimental_features(code, level_str) {
    let deferred4_0;
    let deferred4_1;
    try {
        const ptr0 = passStringToWasm0(code, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(level_str, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ret = wasm.change_experimental_features(ptr0, len0, ptr1, len1);
        var ptr3 = ret[0];
        var len3 = ret[1];
        if (ret[3]) {
            ptr3 = 0; len3 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred4_0 = ptr3;
        deferred4_1 = len3;
        return getStringFromWasm0(ptr3, len3);
    } finally {
        wasm.__wbindgen_free(deferred4_0, deferred4_1, 1);
    }
}

/**
 * Get a coredump.
 * @param {any} core_dump_manager
 * @returns {Promise<any>}
 */
export function coredump(core_dump_manager) {
    const ret = wasm.coredump(core_dump_manager);
    return ret;
}

/**
 * Get the default app settings.
 * @returns {any}
 */
export function default_app_settings() {
    const ret = wasm.default_app_settings();
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
}

/**
 * Get the default project settings.
 * @returns {any}
 */
export function default_project_settings() {
    const ret = wasm.default_project_settings();
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
}

/**
 * @param {number} value
 * @param {string} suffix_json
 * @param {number | null} [decimals]
 * @returns {string}
 */
export function format_number_literal(value, suffix_json, decimals) {
    let deferred3_0;
    let deferred3_1;
    try {
        const ptr0 = passStringToWasm0(suffix_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.format_number_literal(value, ptr0, len0, isLikeNone(decimals) ? 0x100000001 : (decimals) >>> 0);
        var ptr2 = ret[0];
        var len2 = ret[1];
        if (ret[3]) {
            ptr2 = 0; len2 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred3_0 = ptr2;
        deferred3_1 = len2;
        return getStringFromWasm0(ptr2, len2);
    } finally {
        wasm.__wbindgen_free(deferred3_0, deferred3_1, 1);
    }
}

/**
 * @param {number} value
 * @param {string} numeric_type_json
 * @returns {string}
 */
export function format_number_value(value, numeric_type_json) {
    let deferred3_0;
    let deferred3_1;
    try {
        const ptr0 = passStringToWasm0(numeric_type_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.format_number_value(value, ptr0, len0);
        var ptr2 = ret[0];
        var len2 = ret[1];
        if (ret[3]) {
            ptr2 = 0; len2 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred3_0 = ptr2;
        deferred3_1 = len2;
        return getStringFromWasm0(ptr2, len2);
    } finally {
        wasm.__wbindgen_free(deferred3_0, deferred3_1, 1);
    }
}

/**
 * Get the version of the kcl library.
 * @returns {string}
 */
export function get_kcl_version() {
    let deferred1_0;
    let deferred1_1;
    try {
        const ret = wasm.get_kcl_version();
        deferred1_0 = ret[0];
        deferred1_1 = ret[1];
        return getStringFromWasm0(ret[0], ret[1]);
    } finally {
        wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
    }
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
export function get_tangential_arc_to_info(arc_start_point_x, arc_start_point_y, arc_end_point_x, arc_end_point_y, tan_previous_point_x, tan_previous_point_y, obtuse) {
    const ret = wasm.get_tangential_arc_to_info(arc_start_point_x, arc_start_point_y, arc_end_point_x, arc_end_point_y, tan_previous_point_x, tan_previous_point_y, obtuse);
    return TangentialArcInfoOutputWasm.__wrap(ret);
}

/**
 * @param {number} value
 * @param {string} ty_json
 * @returns {string}
 */
export function human_display_number(value, ty_json) {
    let deferred3_0;
    let deferred3_1;
    try {
        const ptr0 = passStringToWasm0(ty_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.human_display_number(value, ptr0, len0);
        var ptr2 = ret[0];
        var len2 = ret[1];
        if (ret[3]) {
            ptr2 = 0; len2 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred3_0 = ptr2;
        deferred3_1 = len2;
        return getStringFromWasm0(ptr2, len2);
    } finally {
        wasm.__wbindgen_free(deferred3_0, deferred3_1, 1);
    }
}

/**
 * Get the allowed import file extensions.
 * @returns {string[]}
 */
export function import_file_extensions() {
    const ret = wasm.import_file_extensions();
    if (ret[3]) {
        throw takeFromExternrefTable0(ret[2]);
    }
    var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
    wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
    return v1;
}

/**
 * Returns true if the given KCL is empty or only contains settings that would
 * be auto-generated.
 * @param {string} code
 * @returns {any}
 */
export function is_kcl_empty_or_only_settings(code) {
    const ptr0 = passStringToWasm0(code, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.is_kcl_empty_or_only_settings(ptr0, len0);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
}

/**
 * @param {Float64Array} points
 * @returns {number}
 */
export function is_points_ccw(points) {
    const ptr0 = passArrayF64ToWasm0(points, wasm.__wbindgen_malloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.is_points_ccw(ptr0, len0);
    return ret;
}

/**
 * @param {string} program_ast_json
 * @returns {Promise<any>}
 */
export function kcl_lint(program_ast_json) {
    const ptr0 = passStringToWasm0(program_ast_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.kcl_lint(ptr0, len0);
    return ret;
}

/**
 * Takes a parsed KCL program and returns the Meta settings.  If it's not
 * found, null is returned.
 * @param {string} program_json
 * @returns {any}
 */
export function kcl_settings(program_json) {
    const ptr0 = passStringToWasm0(program_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.kcl_settings(ptr0, len0);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
}

/**
 * Run the `copilot` lsp server.
 * @param {LspServerConfig} config
 * @param {string} token
 * @param {string} baseurl
 * @returns {Promise<void>}
 */
export function lsp_run_copilot(config, token, baseurl) {
    _assertClass(config, LspServerConfig);
    var ptr0 = config.__destroy_into_raw();
    const ptr1 = passStringToWasm0(token, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    const ptr2 = passStringToWasm0(baseurl, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len2 = WASM_VECTOR_LEN;
    const ret = wasm.lsp_run_copilot(ptr0, ptr1, len1, ptr2, len2);
    return ret;
}

/**
 * Run the `kcl` lsp server.
 * @param {LspServerConfig} config
 * @param {string} token
 * @param {string} baseurl
 * @returns {Promise<void>}
 */
export function lsp_run_kcl(config, token, baseurl) {
    _assertClass(config, LspServerConfig);
    var ptr0 = config.__destroy_into_raw();
    const ptr1 = passStringToWasm0(token, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    const ptr2 = passStringToWasm0(baseurl, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len2 = WASM_VECTOR_LEN;
    const ret = wasm.lsp_run_kcl(ptr0, ptr1, len1, ptr2, len2);
    return ret;
}

/**
 * @param {string} program_ast_json
 * @param {string} range_json
 * @returns {Promise<any>}
 */
export function node_path_from_range(program_ast_json, range_json) {
    const ptr0 = passStringToWasm0(program_ast_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ptr1 = passStringToWasm0(range_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    const ret = wasm.node_path_from_range(ptr0, len0, ptr1, len1);
    return ret;
}

/**
 * Parse the app settings.
 * @param {string} toml_str
 * @returns {any}
 */
export function parse_app_settings(toml_str) {
    const ptr0 = passStringToWasm0(toml_str, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.parse_app_settings(ptr0, len0);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
}

/**
 * Parse (deserialize) the project settings.
 * @param {string} toml_str
 * @returns {any}
 */
export function parse_project_settings(toml_str) {
    const ptr0 = passStringToWasm0(toml_str, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.parse_project_settings(ptr0, len0);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
}

/**
 * @param {string} kcl_program_source
 * @returns {any}
 */
export function parse_wasm(kcl_program_source) {
    const ptr0 = passStringToWasm0(kcl_program_source, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.parse_wasm(ptr0, len0);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
}

/**
 * @param {string} point_json
 * @param {string} from_len_unit_json
 * @param {string} to_len_unit_json
 * @returns {Float64Array}
 */
export function point_to_unit(point_json, from_len_unit_json, to_len_unit_json) {
    const ptr0 = passStringToWasm0(point_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ptr1 = passStringToWasm0(from_len_unit_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    const ptr2 = passStringToWasm0(to_len_unit_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len2 = WASM_VECTOR_LEN;
    const ret = wasm.point_to_unit(ptr0, len0, ptr1, len1, ptr2, len2);
    if (ret[3]) {
        throw takeFromExternrefTable0(ret[2]);
    }
    var v4 = getArrayF64FromWasm0(ret[0], ret[1]).slice();
    wasm.__wbindgen_free(ret[0], ret[1] * 8, 8);
    return v4;
}

/**
 * @param {string} json_str
 * @returns {any}
 */
export function recast_wasm(json_str) {
    const ptr0 = passStringToWasm0(json_str, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.recast_wasm(ptr0, len0);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
}

/**
 * Get the allowed relevant file extensions (imports + kcl).
 * @returns {string[]}
 */
export function relevant_file_extensions() {
    const ret = wasm.relevant_file_extensions();
    if (ret[3]) {
        throw takeFromExternrefTable0(ret[2]);
    }
    var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
    wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
    return v1;
}

/**
 * Serialize the configuration settings.
 * @param {any} val
 * @returns {any}
 */
export function serialize_configuration(val) {
    const ret = wasm.serialize_configuration(val);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
}

/**
 * Serialize the project configuration settings.
 * @param {any} val
 * @returns {any}
 */
export function serialize_project_configuration(val) {
    const ret = wasm.serialize_project_configuration(val);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
}

/**
 * @returns {number}
 */
export function sketch_checkpoint_limit() {
    const ret = wasm.sketch_checkpoint_limit();
    return ret >>> 0;
}

function __wbg_get_imports() {
    const import0 = {
        __proto__: null,
        __wbg_Error_55538483de6e3abe: function(arg0, arg1) {
            const ret = Error(getStringFromWasm0(arg0, arg1));
            return ret;
        },
        __wbg___wbindgen_boolean_get_fe2a24fdfdb4064f: function(arg0) {
            const v = arg0;
            const ret = typeof(v) === 'boolean' ? v : undefined;
            return isLikeNone(ret) ? 0xFFFFFF : ret ? 1 : 0;
        },
        __wbg___wbindgen_debug_string_d89627202d0155b7: function(arg0, arg1) {
            const ret = debugString(arg1);
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg___wbindgen_is_function_2a95406423ea8626: function(arg0) {
            const ret = typeof(arg0) === 'function';
            return ret;
        },
        __wbg___wbindgen_is_null_8d90524c9e0af183: function(arg0) {
            const ret = arg0 === null;
            return ret;
        },
        __wbg___wbindgen_is_object_59a002e76b059312: function(arg0) {
            const val = arg0;
            const ret = typeof(val) === 'object' && val !== null;
            return ret;
        },
        __wbg___wbindgen_is_undefined_87a3a837f331fef5: function(arg0) {
            const ret = arg0 === undefined;
            return ret;
        },
        __wbg___wbindgen_string_get_f1161390414f9b59: function(arg0, arg1) {
            const obj = arg1;
            const ret = typeof(obj) === 'string' ? obj : undefined;
            var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            var len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg___wbindgen_throw_5549492daedad139: function(arg0, arg1) {
            throw new Error(getStringFromWasm0(arg0, arg1));
        },
        __wbg__wbg_cb_unref_fbe69bb076c16bad: function(arg0) {
            arg0._wbg_cb_unref();
        },
        __wbg_buffer_0a57788cdfce21ba: function(arg0) {
            const ret = arg0.buffer;
            return ret;
        },
        __wbg_byobRequest_ab0e57f55bf774f2: function(arg0) {
            const ret = arg0.byobRequest;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_byteLength_9931db00e5861bf9: function(arg0) {
            const ret = arg0.byteLength;
            return ret;
        },
        __wbg_byteOffset_0a985a98f8ffb8d7: function(arg0) {
            const ret = arg0.byteOffset;
            return ret;
        },
        __wbg_call_8f5d7bb070283508: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = arg0.call(arg1, arg2);
            return ret;
        }, arguments); },
        __wbg_close_62f6a4eadc94565f: function() { return handleError(function (arg0) {
            arg0.close();
        }, arguments); },
        __wbg_close_871e516a273d15f8: function(arg0) {
            const ret = arg0.close();
            return ret;
        },
        __wbg_close_f287058716088a50: function() { return handleError(function (arg0) {
            arg0.close();
        }, arguments); },
        __wbg_done_19f92cb1f8738aba: function(arg0) {
            const ret = arg0.done;
            return ret;
        },
        __wbg_enqueue_ee0593cea9be93bd: function() { return handleError(function (arg0, arg1) {
            arg0.enqueue(arg1);
        }, arguments); },
        __wbg_error_a6fa202b58aa1cd3: function(arg0, arg1) {
            let deferred0_0;
            let deferred0_1;
            try {
                deferred0_0 = arg0;
                deferred0_1 = arg1;
                console.error(getStringFromWasm0(arg0, arg1));
            } finally {
                wasm.__wbindgen_free(deferred0_0, deferred0_1, 1);
            }
        },
        __wbg_error_de6b86e598505246: function(arg0) {
            console.error(arg0);
        },
        __wbg_exists_3a71e870ac7196eb: function() { return handleError(function (arg0, arg1, arg2) {
            let deferred0_0;
            let deferred0_1;
            try {
                deferred0_0 = arg1;
                deferred0_1 = arg2;
                const ret = arg0.exists(getStringFromWasm0(arg1, arg2));
                return ret;
            } finally {
                wasm.__wbindgen_free(deferred0_0, deferred0_1, 1);
            }
        }, arguments); },
        __wbg_fireModelingCommandFromWasm_5d1efcf5d1348cf6: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8) {
            let deferred0_0;
            let deferred0_1;
            let deferred1_0;
            let deferred1_1;
            let deferred2_0;
            let deferred2_1;
            let deferred3_0;
            let deferred3_1;
            try {
                deferred0_0 = arg1;
                deferred0_1 = arg2;
                deferred1_0 = arg3;
                deferred1_1 = arg4;
                deferred2_0 = arg5;
                deferred2_1 = arg6;
                deferred3_0 = arg7;
                deferred3_1 = arg8;
                arg0.fireModelingCommandFromWasm(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4), getStringFromWasm0(arg5, arg6), getStringFromWasm0(arg7, arg8));
            } finally {
                wasm.__wbindgen_free(deferred0_0, deferred0_1, 1);
                wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
                wasm.__wbindgen_free(deferred2_0, deferred2_1, 1);
                wasm.__wbindgen_free(deferred3_0, deferred3_1, 1);
            }
        }, arguments); },
        __wbg_getAllFiles_f7ec65da9f301df6: function() { return handleError(function (arg0, arg1, arg2) {
            let deferred0_0;
            let deferred0_1;
            try {
                deferred0_0 = arg1;
                deferred0_1 = arg2;
                const ret = arg0.getAllFiles(getStringFromWasm0(arg1, arg2));
                return ret;
            } finally {
                wasm.__wbindgen_free(deferred0_0, deferred0_1, 1);
            }
        }, arguments); },
        __wbg_getClientState_4d6f5ad42537c5b3: function() { return handleError(function (arg0) {
            const ret = arg0.getClientState();
            return ret;
        }, arguments); },
        __wbg_getOsInfo_16816e9b78f4091e: function() { return handleError(function (arg0, arg1) {
            const ret = arg1.getOsInfo();
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        }, arguments); },
        __wbg_getRandomValues_3f44b700395062e5: function() { return handleError(function (arg0, arg1) {
            globalThis.crypto.getRandomValues(getArrayU8FromWasm0(arg0, arg1));
        }, arguments); },
        __wbg_getRandomValues_ef12552bf5acd2fe: function() { return handleError(function (arg0, arg1) {
            globalThis.crypto.getRandomValues(getArrayU8FromWasm0(arg0, arg1));
        }, arguments); },
        __wbg_getTime_c3af35594e283356: function(arg0) {
            const ret = arg0.getTime();
            return ret;
        },
        __wbg_getWebrtcStats_9656c18e2b40f352: function() { return handleError(function (arg0) {
            const ret = arg0.getWebrtcStats();
            return ret;
        }, arguments); },
        __wbg_getWriter_7c953149af273c29: function() { return handleError(function (arg0) {
            const ret = arg0.getWriter();
            return ret;
        }, arguments); },
        __wbg_get_ff5f1fb220233477: function() { return handleError(function (arg0, arg1) {
            const ret = Reflect.get(arg0, arg1);
            return ret;
        }, arguments); },
        __wbg_instanceof_Uint8Array_ce24d58a5f4bdcc3: function(arg0) {
            let result;
            try {
                result = arg0 instanceof Uint8Array;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_Window_2fa8d9c2d5b6104a: function(arg0) {
            let result;
            try {
                result = arg0 instanceof Window;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_WorkerGlobalScope_a4307c85f73d83c3: function(arg0) {
            let result;
            try {
                result = arg0 instanceof WorkerGlobalScope;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_isDesktop_b06e7ff6b6a99a17: function() { return handleError(function (arg0) {
            const ret = arg0.isDesktop();
            return ret;
        }, arguments); },
        __wbg_kclCode_41433ac5628c9208: function() { return handleError(function (arg0, arg1) {
            const ret = arg1.kclCode();
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        }, arguments); },
        __wbg_length_e6e1633fbea6cfa9: function(arg0) {
            const ret = arg0.length;
            return ret;
        },
        __wbg_log_6a75b71d6316e935: function(arg0) {
            console.log(arg0);
        },
        __wbg_new_0_e649c99e7382313f: function() {
            const ret = new Date();
            return ret;
        },
        __wbg_new_1d96678aaacca32e: function(arg0) {
            const ret = new Uint8Array(arg0);
            return ret;
        },
        __wbg_new_227d7c05414eb861: function() {
            const ret = new Error();
            return ret;
        },
        __wbg_new_4a843fe2ee4082a9: function(arg0, arg1) {
            const ret = new Error(getStringFromWasm0(arg0, arg1));
            return ret;
        },
        __wbg_new_from_slice_0bc58e36f82a1b50: function(arg0, arg1) {
            const ret = new Uint8Array(getArrayU8FromWasm0(arg0, arg1));
            return ret;
        },
        __wbg_new_typed_25dda2388d7e5e9f: function(arg0, arg1) {
            try {
                var state0 = {a: arg0, b: arg1};
                var cb0 = (arg0, arg1) => {
                    const a = state0.a;
                    state0.a = 0;
                    try {
                        return wasm_bindgen__convert__closures_____invoke__h0da0fd0e528d9496(a, state0.b, arg0, arg1);
                    } finally {
                        state0.a = a;
                    }
                };
                const ret = new Promise(cb0);
                return ret;
            } finally {
                state0.a = 0;
            }
        },
        __wbg_new_with_byte_offset_and_length_ab1e1002d7a694e4: function(arg0, arg1, arg2) {
            const ret = new Uint8Array(arg0, arg1 >>> 0, arg2 >>> 0);
            return ret;
        },
        __wbg_next_1b7b5c007966560f: function() { return handleError(function (arg0) {
            const ret = arg0.next();
            return ret;
        }, arguments); },
        __wbg_now_a9af4554edb7ac78: function(arg0) {
            const ret = arg0.now();
            return ret;
        },
        __wbg_now_e7c6795a7f81e10f: function(arg0) {
            const ret = arg0.now();
            return ret;
        },
        __wbg_parse_e5703fd52211e688: function() { return handleError(function (arg0, arg1) {
            const ret = JSON.parse(getStringFromWasm0(arg0, arg1));
            return ret;
        }, arguments); },
        __wbg_performance_3fcf6e32a7e1ed0a: function(arg0) {
            const ret = arg0.performance;
            return ret;
        },
        __wbg_prototypesetcall_3875d54d12ef2eec: function(arg0, arg1, arg2) {
            Uint8Array.prototype.set.call(getArrayU8FromWasm0(arg0, arg1), arg2);
        },
        __wbg_queueMicrotask_8868365114fe23b5: function(arg0) {
            queueMicrotask(arg0);
        },
        __wbg_queueMicrotask_cfc5a0e62f9ebdbe: function(arg0) {
            const ret = arg0.queueMicrotask;
            return ret;
        },
        __wbg_readFile_22b057a30ecc6915: function() { return handleError(function (arg0, arg1, arg2) {
            let deferred0_0;
            let deferred0_1;
            try {
                deferred0_0 = arg1;
                deferred0_1 = arg2;
                const ret = arg0.readFile(getStringFromWasm0(arg1, arg2));
                return ret;
            } finally {
                wasm.__wbindgen_free(deferred0_0, deferred0_1, 1);
            }
        }, arguments); },
        __wbg_ready_5856db6f00e3e20a: function(arg0) {
            const ret = arg0.ready;
            return ret;
        },
        __wbg_releaseLock_95bbc7cf7b87977d: function(arg0) {
            arg0.releaseLock();
        },
        __wbg_resolve_d8059bc113e215bf: function(arg0) {
            const ret = Promise.resolve(arg0);
            return ret;
        },
        __wbg_respond_1ec29395edbe7fce: function() { return handleError(function (arg0, arg1) {
            arg0.respond(arg1 >>> 0);
        }, arguments); },
        __wbg_sendModelingCommandFromWasm_256877b7b3f4ed53: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8) {
            let deferred0_0;
            let deferred0_1;
            let deferred1_0;
            let deferred1_1;
            let deferred2_0;
            let deferred2_1;
            let deferred3_0;
            let deferred3_1;
            try {
                deferred0_0 = arg1;
                deferred0_1 = arg2;
                deferred1_0 = arg3;
                deferred1_1 = arg4;
                deferred2_0 = arg5;
                deferred2_1 = arg6;
                deferred3_0 = arg7;
                deferred3_1 = arg8;
                const ret = arg0.sendModelingCommandFromWasm(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4), getStringFromWasm0(arg5, arg6), getStringFromWasm0(arg7, arg8));
                return ret;
            } finally {
                wasm.__wbindgen_free(deferred0_0, deferred0_1, 1);
                wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
                wasm.__wbindgen_free(deferred2_0, deferred2_1, 1);
                wasm.__wbindgen_free(deferred3_0, deferred3_1, 1);
            }
        }, arguments); },
        __wbg_setTimeout_466d50f3512245cb: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = arg0.setTimeout(arg1, arg2);
            return ret;
        }, arguments); },
        __wbg_setTimeout_c1c9a18b6343ebd3: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = arg0.setTimeout(arg1, arg2);
            return ret;
        }, arguments); },
        __wbg_set_295bad3b5ead4e99: function(arg0, arg1, arg2) {
            arg0.set(getArrayU8FromWasm0(arg1, arg2));
        },
        __wbg_stack_3b0d974bbf31e44f: function(arg0, arg1) {
            const ret = arg1.stack;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_startNewSession_d14c08f34381d15e: function() { return handleError(function (arg0) {
            const ret = arg0.startNewSession();
            return ret;
        }, arguments); },
        __wbg_static_accessor_GLOBAL_8dfb7f5e26ebe523: function() {
            const ret = typeof global === 'undefined' ? null : global;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_static_accessor_GLOBAL_THIS_941154efc8395cdd: function() {
            const ret = typeof globalThis === 'undefined' ? null : globalThis;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_static_accessor_SELF_58dac9af822f561f: function() {
            const ret = typeof self === 'undefined' ? null : self;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_static_accessor_WINDOW_ee64f0b3d8354c0b: function() {
            const ret = typeof window === 'undefined' ? null : window;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_stringify_b67e2c8c60b93f69: function() { return handleError(function (arg0) {
            const ret = JSON.stringify(arg0);
            return ret;
        }, arguments); },
        __wbg_then_0150352e4ad20344: function(arg0, arg1, arg2) {
            const ret = arg0.then(arg1, arg2);
            return ret;
        },
        __wbg_then_5160486c67ddb98a: function(arg0, arg1) {
            const ret = arg0.then(arg1);
            return ret;
        },
        __wbg_toString_553b5f6e95e3e41b: function(arg0) {
            const ret = arg0.toString();
            return ret;
        },
        __wbg_toString_9e7353a77cb415a2: function(arg0) {
            const ret = arg0.toString();
            return ret;
        },
        __wbg_value_d5b248ce8419bd1b: function(arg0) {
            const ret = arg0.value;
            return ret;
        },
        __wbg_version_8516015dea539e16: function() { return handleError(function (arg0, arg1) {
            const ret = arg1.version();
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        }, arguments); },
        __wbg_view_38a930844c964103: function(arg0) {
            const ret = arg0.view;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_warn_86ef03db8cfb4dd4: function(arg0) {
            console.warn(arg0);
        },
        __wbg_write_ff3a3de4902aa8bf: function(arg0, arg1) {
            const ret = arg0.write(arg1);
            return ret;
        },
        __wbindgen_cast_0000000000000001: function(arg0, arg1) {
            // Cast intrinsic for `Closure(Closure { owned: true, function: Function { arguments: [Externref], shim_idx: 7795, ret: Result(Unit), inner_ret: Some(Result(Unit)) }, mutable: true }) -> Externref`.
            const ret = makeMutClosure(arg0, arg1, wasm_bindgen__convert__closures_____invoke__hdde041e5150ea9c2);
            return ret;
        },
        __wbindgen_cast_0000000000000002: function(arg0, arg1) {
            // Cast intrinsic for `Closure(Closure { owned: true, function: Function { arguments: [NamedExternref("IteratorResult<any>")], shim_idx: 803, ret: Result(Unit), inner_ret: Some(Result(Unit)) }, mutable: true }) -> Externref`.
            const ret = makeMutClosure(arg0, arg1, wasm_bindgen__convert__closures_____invoke__hece1f1adbb89b9e9);
            return ret;
        },
        __wbindgen_cast_0000000000000003: function(arg0, arg1) {
            // Cast intrinsic for `Closure(Closure { owned: true, function: Function { arguments: [], shim_idx: 6669, ret: Unit, inner_ret: Some(Unit) }, mutable: true }) -> Externref`.
            const ret = makeMutClosure(arg0, arg1, wasm_bindgen__convert__closures_____invoke__h0d53c4d20e6ba524);
            return ret;
        },
        __wbindgen_cast_0000000000000004: function(arg0, arg1) {
            // Cast intrinsic for `Ref(String) -> Externref`.
            const ret = getStringFromWasm0(arg0, arg1);
            return ret;
        },
        __wbindgen_init_externref_table: function() {
            const table = wasm.__wbindgen_externrefs;
            const offset = table.grow(4);
            table.set(0, undefined);
            table.set(offset + 0, undefined);
            table.set(offset + 1, null);
            table.set(offset + 2, true);
            table.set(offset + 3, false);
        },
    };
    return {
        __proto__: null,
        "./kcl_wasm_lib_bg.js": import0,
    };
}

function wasm_bindgen__convert__closures_____invoke__h0d53c4d20e6ba524(arg0, arg1) {
    wasm.wasm_bindgen__convert__closures_____invoke__h0d53c4d20e6ba524(arg0, arg1);
}

function wasm_bindgen__convert__closures_____invoke__hdde041e5150ea9c2(arg0, arg1, arg2) {
    const ret = wasm.wasm_bindgen__convert__closures_____invoke__hdde041e5150ea9c2(arg0, arg1, arg2);
    if (ret[1]) {
        throw takeFromExternrefTable0(ret[0]);
    }
}

function wasm_bindgen__convert__closures_____invoke__hece1f1adbb89b9e9(arg0, arg1, arg2) {
    const ret = wasm.wasm_bindgen__convert__closures_____invoke__hece1f1adbb89b9e9(arg0, arg1, arg2);
    if (ret[1]) {
        throw takeFromExternrefTable0(ret[0]);
    }
}

function wasm_bindgen__convert__closures_____invoke__h0da0fd0e528d9496(arg0, arg1, arg2, arg3) {
    wasm.wasm_bindgen__convert__closures_____invoke__h0da0fd0e528d9496(arg0, arg1, arg2, arg3);
}


const __wbindgen_enum_ReadableStreamType = ["bytes"];
const ContextFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_context_free(ptr >>> 0, 1));
const IntoUnderlyingByteSourceFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_intounderlyingbytesource_free(ptr >>> 0, 1));
const IntoUnderlyingSinkFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_intounderlyingsink_free(ptr >>> 0, 1));
const IntoUnderlyingSourceFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_intounderlyingsource_free(ptr >>> 0, 1));
const LspServerConfigFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_lspserverconfig_free(ptr >>> 0, 1));
const ResponseContextFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_responsecontext_free(ptr >>> 0, 1));
const TangentialArcInfoOutputWasmFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_tangentialarcinfooutputwasm_free(ptr >>> 0, 1));
const WasmCircleParamsFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_wasmcircleparams_free(ptr >>> 0, 1));

function addToExternrefTable0(obj) {
    const idx = wasm.__externref_table_alloc();
    wasm.__wbindgen_externrefs.set(idx, obj);
    return idx;
}

function _assertClass(instance, klass) {
    if (!(instance instanceof klass)) {
        throw new Error(`expected instance of ${klass.name}`);
    }
}

const CLOSURE_DTORS = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(state => wasm.__wbindgen_destroy_closure(state.a, state.b));

function debugString(val) {
    // primitive types
    const type = typeof val;
    if (type == 'number' || type == 'boolean' || val == null) {
        return  `${val}`;
    }
    if (type == 'string') {
        return `"${val}"`;
    }
    if (type == 'symbol') {
        const description = val.description;
        if (description == null) {
            return 'Symbol';
        } else {
            return `Symbol(${description})`;
        }
    }
    if (type == 'function') {
        const name = val.name;
        if (typeof name == 'string' && name.length > 0) {
            return `Function(${name})`;
        } else {
            return 'Function';
        }
    }
    // objects
    if (Array.isArray(val)) {
        const length = val.length;
        let debug = '[';
        if (length > 0) {
            debug += debugString(val[0]);
        }
        for(let i = 1; i < length; i++) {
            debug += ', ' + debugString(val[i]);
        }
        debug += ']';
        return debug;
    }
    // Test for built-in
    const builtInMatches = /\[object ([^\]]+)\]/.exec(toString.call(val));
    let className;
    if (builtInMatches && builtInMatches.length > 1) {
        className = builtInMatches[1];
    } else {
        // Failed to match the standard '[object ClassName]'
        return toString.call(val);
    }
    if (className == 'Object') {
        // we're a user defined class or Object
        // JSON.stringify avoids problems with cycles, and is generally much
        // easier than looping through ownProperties of `val`.
        try {
            return 'Object(' + JSON.stringify(val) + ')';
        } catch (_) {
            return 'Object';
        }
    }
    // errors
    if (val instanceof Error) {
        return `${val.name}: ${val.message}\n${val.stack}`;
    }
    // TODO we could test for more things here, like `Set`s and `Map`s.
    return className;
}

function getArrayF64FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getFloat64ArrayMemory0().subarray(ptr / 8, ptr / 8 + len);
}

function getArrayJsValueFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    const mem = getDataViewMemory0();
    const result = [];
    for (let i = ptr; i < ptr + 4 * len; i += 4) {
        result.push(wasm.__wbindgen_externrefs.get(mem.getUint32(i, true)));
    }
    wasm.__externref_drop_slice(ptr, len);
    return result;
}

function getArrayU8FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getUint8ArrayMemory0().subarray(ptr / 1, ptr / 1 + len);
}

let cachedDataViewMemory0 = null;
function getDataViewMemory0() {
    if (cachedDataViewMemory0 === null || cachedDataViewMemory0.buffer.detached === true || (cachedDataViewMemory0.buffer.detached === undefined && cachedDataViewMemory0.buffer !== wasm.memory.buffer)) {
        cachedDataViewMemory0 = new DataView(wasm.memory.buffer);
    }
    return cachedDataViewMemory0;
}

let cachedFloat64ArrayMemory0 = null;
function getFloat64ArrayMemory0() {
    if (cachedFloat64ArrayMemory0 === null || cachedFloat64ArrayMemory0.byteLength === 0) {
        cachedFloat64ArrayMemory0 = new Float64Array(wasm.memory.buffer);
    }
    return cachedFloat64ArrayMemory0;
}

function getStringFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return decodeText(ptr, len);
}

let cachedUint8ArrayMemory0 = null;
function getUint8ArrayMemory0() {
    if (cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.byteLength === 0) {
        cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8ArrayMemory0;
}

function handleError(f, args) {
    try {
        return f.apply(this, args);
    } catch (e) {
        const idx = addToExternrefTable0(e);
        wasm.__wbindgen_exn_store(idx);
    }
}

function isLikeNone(x) {
    return x === undefined || x === null;
}

function makeMutClosure(arg0, arg1, f) {
    const state = { a: arg0, b: arg1, cnt: 1 };
    const real = (...args) => {

        // First up with a closure we increment the internal reference
        // count. This ensures that the Rust closure environment won't
        // be deallocated while we're invoking it.
        state.cnt++;
        const a = state.a;
        state.a = 0;
        try {
            return f(a, state.b, ...args);
        } finally {
            state.a = a;
            real._wbg_cb_unref();
        }
    };
    real._wbg_cb_unref = () => {
        if (--state.cnt === 0) {
            wasm.__wbindgen_destroy_closure(state.a, state.b);
            state.a = 0;
            CLOSURE_DTORS.unregister(state);
        }
    };
    CLOSURE_DTORS.register(real, state, state);
    return real;
}

function passArrayF64ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 8, 8) >>> 0;
    getFloat64ArrayMemory0().set(arg, ptr / 8);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}

function passStringToWasm0(arg, malloc, realloc) {
    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length, 1) >>> 0;
        getUint8ArrayMemory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len, 1) >>> 0;

    const mem = getUint8ArrayMemory0();

    let offset = 0;

    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
        mem[ptr + offset] = code;
    }
    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3, 1) >>> 0;
        const view = getUint8ArrayMemory0().subarray(ptr + offset, ptr + len);
        const ret = cachedTextEncoder.encodeInto(arg, view);

        offset += ret.written;
        ptr = realloc(ptr, len, offset, 1) >>> 0;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}

function takeFromExternrefTable0(idx) {
    const value = wasm.__wbindgen_externrefs.get(idx);
    wasm.__externref_table_dealloc(idx);
    return value;
}

let cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });
cachedTextDecoder.decode();
const MAX_SAFARI_DECODE_BYTES = 2146435072;
let numBytesDecoded = 0;
function decodeText(ptr, len) {
    numBytesDecoded += len;
    if (numBytesDecoded >= MAX_SAFARI_DECODE_BYTES) {
        cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });
        cachedTextDecoder.decode();
        numBytesDecoded = len;
    }
    return cachedTextDecoder.decode(getUint8ArrayMemory0().subarray(ptr, ptr + len));
}

const cachedTextEncoder = new TextEncoder();

if (!('encodeInto' in cachedTextEncoder)) {
    cachedTextEncoder.encodeInto = function (arg, view) {
        const buf = cachedTextEncoder.encode(arg);
        view.set(buf);
        return {
            read: arg.length,
            written: buf.length
        };
    };
}

let WASM_VECTOR_LEN = 0;

let wasmModule, wasm;
function __wbg_finalize_init(instance, module) {
    wasm = instance.exports;
    wasmModule = module;
    cachedDataViewMemory0 = null;
    cachedFloat64ArrayMemory0 = null;
    cachedUint8ArrayMemory0 = null;
    wasm.__wbindgen_start();
    return wasm;
}

async function __wbg_load(module, imports) {
    if (typeof Response === 'function' && module instanceof Response) {
        if (typeof WebAssembly.instantiateStreaming === 'function') {
            try {
                return await WebAssembly.instantiateStreaming(module, imports);
            } catch (e) {
                const validResponse = module.ok && expectedResponseType(module.type);

                if (validResponse && module.headers.get('Content-Type') !== 'application/wasm') {
                    console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);

                } else { throw e; }
            }
        }

        const bytes = await module.arrayBuffer();
        return await WebAssembly.instantiate(bytes, imports);
    } else {
        const instance = await WebAssembly.instantiate(module, imports);

        if (instance instanceof WebAssembly.Instance) {
            return { instance, module };
        } else {
            return instance;
        }
    }

    function expectedResponseType(type) {
        switch (type) {
            case 'basic': case 'cors': case 'default': return true;
        }
        return false;
    }
}

function initSync(module) {
    if (wasm !== undefined) return wasm;


    if (module !== undefined) {
        if (Object.getPrototypeOf(module) === Object.prototype) {
            ({module} = module)
        } else {
            console.warn('using deprecated parameters for `initSync()`; pass a single object instead')
        }
    }

    const imports = __wbg_get_imports();
    if (!(module instanceof WebAssembly.Module)) {
        module = new WebAssembly.Module(module);
    }
    const instance = new WebAssembly.Instance(module, imports);
    return __wbg_finalize_init(instance, module);
}

async function __wbg_init(module_or_path) {
    if (wasm !== undefined) return wasm;


    if (module_or_path !== undefined) {
        if (Object.getPrototypeOf(module_or_path) === Object.prototype) {
            ({module_or_path} = module_or_path)
        } else {
            console.warn('using deprecated parameters for the initialization function; pass a single object instead')
        }
    }

    if (module_or_path === undefined) {
        module_or_path = new URL('kcl_wasm_lib_bg.wasm', import.meta.url);
    }
    const imports = __wbg_get_imports();

    if (typeof module_or_path === 'string' || (typeof Request === 'function' && module_or_path instanceof Request) || (typeof URL === 'function' && module_or_path instanceof URL)) {
        module_or_path = fetch(module_or_path);
    }

    const { instance, module } = await __wbg_load(await module_or_path, imports);

    return __wbg_finalize_init(instance, module);
}

export { initSync, __wbg_init as default };
