import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\MasterData\MasterDataController::template
 * @see app/Http/Controllers/MasterData/MasterDataController.php:269
 * @route '/modules/shifts/template'
 */
export const template = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: template.url(options),
    method: 'get',
})

template.definition = {
    methods: ["get","head"],
    url: '/modules/shifts/template',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::template
 * @see app/Http/Controllers/MasterData/MasterDataController.php:269
 * @route '/modules/shifts/template'
 */
template.url = (options?: RouteQueryOptions) => {
    return template.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::template
 * @see app/Http/Controllers/MasterData/MasterDataController.php:269
 * @route '/modules/shifts/template'
 */
template.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: template.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\MasterData\MasterDataController::template
 * @see app/Http/Controllers/MasterData/MasterDataController.php:269
 * @route '/modules/shifts/template'
 */
template.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: template.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::template
 * @see app/Http/Controllers/MasterData/MasterDataController.php:269
 * @route '/modules/shifts/template'
 */
    const templateForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: template.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\MasterData\MasterDataController::template
 * @see app/Http/Controllers/MasterData/MasterDataController.php:269
 * @route '/modules/shifts/template'
 */
        templateForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: template.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\MasterData\MasterDataController::template
 * @see app/Http/Controllers/MasterData/MasterDataController.php:269
 * @route '/modules/shifts/template'
 */
        templateForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: template.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    template.form = templateForm
/**
* @see \App\Http\Controllers\MasterData\MasterDataController::exportMethod
 * @see app/Http/Controllers/MasterData/MasterDataController.php:209
 * @route '/modules/shifts/export'
 */
export const exportMethod = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod.url(options),
    method: 'get',
})

exportMethod.definition = {
    methods: ["get","head"],
    url: '/modules/shifts/export',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::exportMethod
 * @see app/Http/Controllers/MasterData/MasterDataController.php:209
 * @route '/modules/shifts/export'
 */
exportMethod.url = (options?: RouteQueryOptions) => {
    return exportMethod.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::exportMethod
 * @see app/Http/Controllers/MasterData/MasterDataController.php:209
 * @route '/modules/shifts/export'
 */
exportMethod.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\MasterData\MasterDataController::exportMethod
 * @see app/Http/Controllers/MasterData/MasterDataController.php:209
 * @route '/modules/shifts/export'
 */
exportMethod.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportMethod.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::exportMethod
 * @see app/Http/Controllers/MasterData/MasterDataController.php:209
 * @route '/modules/shifts/export'
 */
    const exportMethodForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: exportMethod.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\MasterData\MasterDataController::exportMethod
 * @see app/Http/Controllers/MasterData/MasterDataController.php:209
 * @route '/modules/shifts/export'
 */
        exportMethodForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportMethod.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\MasterData\MasterDataController::exportMethod
 * @see app/Http/Controllers/MasterData/MasterDataController.php:209
 * @route '/modules/shifts/export'
 */
        exportMethodForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportMethod.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    exportMethod.form = exportMethodForm
/**
* @see \App\Http\Controllers\MasterData\MasterDataController::importMethod
 * @see app/Http/Controllers/MasterData/MasterDataController.php:341
 * @route '/modules/shifts/import'
 */
export const importMethod = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: importMethod.url(options),
    method: 'post',
})

importMethod.definition = {
    methods: ["post"],
    url: '/modules/shifts/import',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::importMethod
 * @see app/Http/Controllers/MasterData/MasterDataController.php:341
 * @route '/modules/shifts/import'
 */
importMethod.url = (options?: RouteQueryOptions) => {
    return importMethod.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::importMethod
 * @see app/Http/Controllers/MasterData/MasterDataController.php:341
 * @route '/modules/shifts/import'
 */
importMethod.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: importMethod.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::importMethod
 * @see app/Http/Controllers/MasterData/MasterDataController.php:341
 * @route '/modules/shifts/import'
 */
    const importMethodForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: importMethod.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\MasterData\MasterDataController::importMethod
 * @see app/Http/Controllers/MasterData/MasterDataController.php:341
 * @route '/modules/shifts/import'
 */
        importMethodForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: importMethod.url(options),
            method: 'post',
        })
    
    importMethod.form = importMethodForm
/**
* @see \App\Http\Controllers\MasterData\MasterDataController::index
 * @see app/Http/Controllers/MasterData/MasterDataController.php:48
 * @route '/modules/shifts'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/modules/shifts',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::index
 * @see app/Http/Controllers/MasterData/MasterDataController.php:48
 * @route '/modules/shifts'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::index
 * @see app/Http/Controllers/MasterData/MasterDataController.php:48
 * @route '/modules/shifts'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\MasterData\MasterDataController::index
 * @see app/Http/Controllers/MasterData/MasterDataController.php:48
 * @route '/modules/shifts'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::index
 * @see app/Http/Controllers/MasterData/MasterDataController.php:48
 * @route '/modules/shifts'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\MasterData\MasterDataController::index
 * @see app/Http/Controllers/MasterData/MasterDataController.php:48
 * @route '/modules/shifts'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\MasterData\MasterDataController::index
 * @see app/Http/Controllers/MasterData/MasterDataController.php:48
 * @route '/modules/shifts'
 */
        indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
/**
* @see \App\Http\Controllers\MasterData\MasterDataController::create
 * @see app/Http/Controllers/MasterData/MasterDataController.php:72
 * @route '/modules/shifts/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/modules/shifts/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::create
 * @see app/Http/Controllers/MasterData/MasterDataController.php:72
 * @route '/modules/shifts/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::create
 * @see app/Http/Controllers/MasterData/MasterDataController.php:72
 * @route '/modules/shifts/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\MasterData\MasterDataController::create
 * @see app/Http/Controllers/MasterData/MasterDataController.php:72
 * @route '/modules/shifts/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::create
 * @see app/Http/Controllers/MasterData/MasterDataController.php:72
 * @route '/modules/shifts/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\MasterData\MasterDataController::create
 * @see app/Http/Controllers/MasterData/MasterDataController.php:72
 * @route '/modules/shifts/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\MasterData\MasterDataController::create
 * @see app/Http/Controllers/MasterData/MasterDataController.php:72
 * @route '/modules/shifts/create'
 */
        createForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    create.form = createForm
/**
* @see \App\Http\Controllers\MasterData\MasterDataController::store
 * @see app/Http/Controllers/MasterData/MasterDataController.php:88
 * @route '/modules/shifts'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/modules/shifts',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::store
 * @see app/Http/Controllers/MasterData/MasterDataController.php:88
 * @route '/modules/shifts'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::store
 * @see app/Http/Controllers/MasterData/MasterDataController.php:88
 * @route '/modules/shifts'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::store
 * @see app/Http/Controllers/MasterData/MasterDataController.php:88
 * @route '/modules/shifts'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\MasterData\MasterDataController::store
 * @see app/Http/Controllers/MasterData/MasterDataController.php:88
 * @route '/modules/shifts'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\MasterData\MasterDataController::edit
 * @see app/Http/Controllers/MasterData/MasterDataController.php:108
 * @route '/modules/shifts/{record}/edit'
 */
export const edit = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/modules/shifts/{record}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::edit
 * @see app/Http/Controllers/MasterData/MasterDataController.php:108
 * @route '/modules/shifts/{record}/edit'
 */
edit.url = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { record: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    record: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        record: args.record,
                }

    return edit.definition.url
            .replace('{record}', parsedArgs.record.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::edit
 * @see app/Http/Controllers/MasterData/MasterDataController.php:108
 * @route '/modules/shifts/{record}/edit'
 */
edit.get = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\MasterData\MasterDataController::edit
 * @see app/Http/Controllers/MasterData/MasterDataController.php:108
 * @route '/modules/shifts/{record}/edit'
 */
edit.head = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::edit
 * @see app/Http/Controllers/MasterData/MasterDataController.php:108
 * @route '/modules/shifts/{record}/edit'
 */
    const editForm = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\MasterData\MasterDataController::edit
 * @see app/Http/Controllers/MasterData/MasterDataController.php:108
 * @route '/modules/shifts/{record}/edit'
 */
        editForm.get = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\MasterData\MasterDataController::edit
 * @see app/Http/Controllers/MasterData/MasterDataController.php:108
 * @route '/modules/shifts/{record}/edit'
 */
        editForm.head = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    edit.form = editForm
/**
* @see \App\Http\Controllers\MasterData\MasterDataController::update
 * @see app/Http/Controllers/MasterData/MasterDataController.php:127
 * @route '/modules/shifts/{record}'
 */
export const update = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/modules/shifts/{record}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::update
 * @see app/Http/Controllers/MasterData/MasterDataController.php:127
 * @route '/modules/shifts/{record}'
 */
update.url = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { record: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    record: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        record: args.record,
                }

    return update.definition.url
            .replace('{record}', parsedArgs.record.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::update
 * @see app/Http/Controllers/MasterData/MasterDataController.php:127
 * @route '/modules/shifts/{record}'
 */
update.put = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::update
 * @see app/Http/Controllers/MasterData/MasterDataController.php:127
 * @route '/modules/shifts/{record}'
 */
    const updateForm = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\MasterData\MasterDataController::update
 * @see app/Http/Controllers/MasterData/MasterDataController.php:127
 * @route '/modules/shifts/{record}'
 */
        updateForm.put = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \App\Http\Controllers\MasterData\MasterDataController::destroy
 * @see app/Http/Controllers/MasterData/MasterDataController.php:149
 * @route '/modules/shifts/{record}'
 */
export const destroy = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/modules/shifts/{record}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::destroy
 * @see app/Http/Controllers/MasterData/MasterDataController.php:149
 * @route '/modules/shifts/{record}'
 */
destroy.url = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { record: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    record: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        record: args.record,
                }

    return destroy.definition.url
            .replace('{record}', parsedArgs.record.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::destroy
 * @see app/Http/Controllers/MasterData/MasterDataController.php:149
 * @route '/modules/shifts/{record}'
 */
destroy.delete = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::destroy
 * @see app/Http/Controllers/MasterData/MasterDataController.php:149
 * @route '/modules/shifts/{record}'
 */
    const destroyForm = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\MasterData\MasterDataController::destroy
 * @see app/Http/Controllers/MasterData/MasterDataController.php:149
 * @route '/modules/shifts/{record}'
 */
        destroyForm.delete = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const shifts = {
    template: Object.assign(template, template),
export: Object.assign(exportMethod, exportMethod),
import: Object.assign(importMethod, importMethod),
index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default shifts