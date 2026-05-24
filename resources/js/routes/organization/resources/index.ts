import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\MasterData\MasterDataController::template
 * @see app/Http/Controllers/MasterData/MasterDataController.php:269
 * @route '/modules/organization/{resource}/template'
 */
export const template = (args: { resource: string | number } | [resource: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: template.url(args, options),
    method: 'get',
})

template.definition = {
    methods: ["get","head"],
    url: '/modules/organization/{resource}/template',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::template
 * @see app/Http/Controllers/MasterData/MasterDataController.php:269
 * @route '/modules/organization/{resource}/template'
 */
template.url = (args: { resource: string | number } | [resource: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { resource: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    resource: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        resource: args.resource,
                }

    return template.definition.url
            .replace('{resource}', parsedArgs.resource.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::template
 * @see app/Http/Controllers/MasterData/MasterDataController.php:269
 * @route '/modules/organization/{resource}/template'
 */
template.get = (args: { resource: string | number } | [resource: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: template.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\MasterData\MasterDataController::template
 * @see app/Http/Controllers/MasterData/MasterDataController.php:269
 * @route '/modules/organization/{resource}/template'
 */
template.head = (args: { resource: string | number } | [resource: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: template.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::template
 * @see app/Http/Controllers/MasterData/MasterDataController.php:269
 * @route '/modules/organization/{resource}/template'
 */
    const templateForm = (args: { resource: string | number } | [resource: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: template.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\MasterData\MasterDataController::template
 * @see app/Http/Controllers/MasterData/MasterDataController.php:269
 * @route '/modules/organization/{resource}/template'
 */
        templateForm.get = (args: { resource: string | number } | [resource: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: template.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\MasterData\MasterDataController::template
 * @see app/Http/Controllers/MasterData/MasterDataController.php:269
 * @route '/modules/organization/{resource}/template'
 */
        templateForm.head = (args: { resource: string | number } | [resource: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: template.url(args, {
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
 * @route '/modules/organization/{resource}/export'
 */
export const exportMethod = (args: { resource: string | number } | [resource: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod.url(args, options),
    method: 'get',
})

exportMethod.definition = {
    methods: ["get","head"],
    url: '/modules/organization/{resource}/export',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::exportMethod
 * @see app/Http/Controllers/MasterData/MasterDataController.php:209
 * @route '/modules/organization/{resource}/export'
 */
exportMethod.url = (args: { resource: string | number } | [resource: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { resource: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    resource: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        resource: args.resource,
                }

    return exportMethod.definition.url
            .replace('{resource}', parsedArgs.resource.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::exportMethod
 * @see app/Http/Controllers/MasterData/MasterDataController.php:209
 * @route '/modules/organization/{resource}/export'
 */
exportMethod.get = (args: { resource: string | number } | [resource: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\MasterData\MasterDataController::exportMethod
 * @see app/Http/Controllers/MasterData/MasterDataController.php:209
 * @route '/modules/organization/{resource}/export'
 */
exportMethod.head = (args: { resource: string | number } | [resource: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportMethod.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::exportMethod
 * @see app/Http/Controllers/MasterData/MasterDataController.php:209
 * @route '/modules/organization/{resource}/export'
 */
    const exportMethodForm = (args: { resource: string | number } | [resource: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: exportMethod.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\MasterData\MasterDataController::exportMethod
 * @see app/Http/Controllers/MasterData/MasterDataController.php:209
 * @route '/modules/organization/{resource}/export'
 */
        exportMethodForm.get = (args: { resource: string | number } | [resource: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportMethod.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\MasterData\MasterDataController::exportMethod
 * @see app/Http/Controllers/MasterData/MasterDataController.php:209
 * @route '/modules/organization/{resource}/export'
 */
        exportMethodForm.head = (args: { resource: string | number } | [resource: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportMethod.url(args, {
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
 * @route '/modules/organization/{resource}/import'
 */
export const importMethod = (args: { resource: string | number } | [resource: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: importMethod.url(args, options),
    method: 'post',
})

importMethod.definition = {
    methods: ["post"],
    url: '/modules/organization/{resource}/import',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::importMethod
 * @see app/Http/Controllers/MasterData/MasterDataController.php:341
 * @route '/modules/organization/{resource}/import'
 */
importMethod.url = (args: { resource: string | number } | [resource: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { resource: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    resource: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        resource: args.resource,
                }

    return importMethod.definition.url
            .replace('{resource}', parsedArgs.resource.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::importMethod
 * @see app/Http/Controllers/MasterData/MasterDataController.php:341
 * @route '/modules/organization/{resource}/import'
 */
importMethod.post = (args: { resource: string | number } | [resource: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: importMethod.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::importMethod
 * @see app/Http/Controllers/MasterData/MasterDataController.php:341
 * @route '/modules/organization/{resource}/import'
 */
    const importMethodForm = (args: { resource: string | number } | [resource: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: importMethod.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\MasterData\MasterDataController::importMethod
 * @see app/Http/Controllers/MasterData/MasterDataController.php:341
 * @route '/modules/organization/{resource}/import'
 */
        importMethodForm.post = (args: { resource: string | number } | [resource: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: importMethod.url(args, options),
            method: 'post',
        })
    
    importMethod.form = importMethodForm
/**
* @see \App\Http\Controllers\MasterData\MasterDataController::index
 * @see app/Http/Controllers/MasterData/MasterDataController.php:48
 * @route '/modules/organization/{resource}'
 */
export const index = (args: { resource: string | number } | [resource: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/modules/organization/{resource}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::index
 * @see app/Http/Controllers/MasterData/MasterDataController.php:48
 * @route '/modules/organization/{resource}'
 */
index.url = (args: { resource: string | number } | [resource: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { resource: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    resource: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        resource: args.resource,
                }

    return index.definition.url
            .replace('{resource}', parsedArgs.resource.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::index
 * @see app/Http/Controllers/MasterData/MasterDataController.php:48
 * @route '/modules/organization/{resource}'
 */
index.get = (args: { resource: string | number } | [resource: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\MasterData\MasterDataController::index
 * @see app/Http/Controllers/MasterData/MasterDataController.php:48
 * @route '/modules/organization/{resource}'
 */
index.head = (args: { resource: string | number } | [resource: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::index
 * @see app/Http/Controllers/MasterData/MasterDataController.php:48
 * @route '/modules/organization/{resource}'
 */
    const indexForm = (args: { resource: string | number } | [resource: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\MasterData\MasterDataController::index
 * @see app/Http/Controllers/MasterData/MasterDataController.php:48
 * @route '/modules/organization/{resource}'
 */
        indexForm.get = (args: { resource: string | number } | [resource: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\MasterData\MasterDataController::index
 * @see app/Http/Controllers/MasterData/MasterDataController.php:48
 * @route '/modules/organization/{resource}'
 */
        indexForm.head = (args: { resource: string | number } | [resource: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(args, {
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
 * @route '/modules/organization/{resource}/create'
 */
export const create = (args: { resource: string | number } | [resource: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(args, options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/modules/organization/{resource}/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::create
 * @see app/Http/Controllers/MasterData/MasterDataController.php:72
 * @route '/modules/organization/{resource}/create'
 */
create.url = (args: { resource: string | number } | [resource: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { resource: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    resource: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        resource: args.resource,
                }

    return create.definition.url
            .replace('{resource}', parsedArgs.resource.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::create
 * @see app/Http/Controllers/MasterData/MasterDataController.php:72
 * @route '/modules/organization/{resource}/create'
 */
create.get = (args: { resource: string | number } | [resource: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\MasterData\MasterDataController::create
 * @see app/Http/Controllers/MasterData/MasterDataController.php:72
 * @route '/modules/organization/{resource}/create'
 */
create.head = (args: { resource: string | number } | [resource: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::create
 * @see app/Http/Controllers/MasterData/MasterDataController.php:72
 * @route '/modules/organization/{resource}/create'
 */
    const createForm = (args: { resource: string | number } | [resource: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\MasterData\MasterDataController::create
 * @see app/Http/Controllers/MasterData/MasterDataController.php:72
 * @route '/modules/organization/{resource}/create'
 */
        createForm.get = (args: { resource: string | number } | [resource: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\MasterData\MasterDataController::create
 * @see app/Http/Controllers/MasterData/MasterDataController.php:72
 * @route '/modules/organization/{resource}/create'
 */
        createForm.head = (args: { resource: string | number } | [resource: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(args, {
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
 * @route '/modules/organization/{resource}'
 */
export const store = (args: { resource: string | number } | [resource: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/modules/organization/{resource}',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::store
 * @see app/Http/Controllers/MasterData/MasterDataController.php:88
 * @route '/modules/organization/{resource}'
 */
store.url = (args: { resource: string | number } | [resource: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { resource: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    resource: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        resource: args.resource,
                }

    return store.definition.url
            .replace('{resource}', parsedArgs.resource.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::store
 * @see app/Http/Controllers/MasterData/MasterDataController.php:88
 * @route '/modules/organization/{resource}'
 */
store.post = (args: { resource: string | number } | [resource: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::store
 * @see app/Http/Controllers/MasterData/MasterDataController.php:88
 * @route '/modules/organization/{resource}'
 */
    const storeForm = (args: { resource: string | number } | [resource: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\MasterData\MasterDataController::store
 * @see app/Http/Controllers/MasterData/MasterDataController.php:88
 * @route '/modules/organization/{resource}'
 */
        storeForm.post = (args: { resource: string | number } | [resource: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(args, options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\MasterData\MasterDataController::edit
 * @see app/Http/Controllers/MasterData/MasterDataController.php:108
 * @route '/modules/organization/{resource}/{record}/edit'
 */
export const edit = (args: { resource: string | number, record: string | number } | [resource: string | number, record: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/modules/organization/{resource}/{record}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::edit
 * @see app/Http/Controllers/MasterData/MasterDataController.php:108
 * @route '/modules/organization/{resource}/{record}/edit'
 */
edit.url = (args: { resource: string | number, record: string | number } | [resource: string | number, record: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    resource: args[0],
                    record: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        resource: args.resource,
                                record: args.record,
                }

    return edit.definition.url
            .replace('{resource}', parsedArgs.resource.toString())
            .replace('{record}', parsedArgs.record.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::edit
 * @see app/Http/Controllers/MasterData/MasterDataController.php:108
 * @route '/modules/organization/{resource}/{record}/edit'
 */
edit.get = (args: { resource: string | number, record: string | number } | [resource: string | number, record: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\MasterData\MasterDataController::edit
 * @see app/Http/Controllers/MasterData/MasterDataController.php:108
 * @route '/modules/organization/{resource}/{record}/edit'
 */
edit.head = (args: { resource: string | number, record: string | number } | [resource: string | number, record: string | number ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::edit
 * @see app/Http/Controllers/MasterData/MasterDataController.php:108
 * @route '/modules/organization/{resource}/{record}/edit'
 */
    const editForm = (args: { resource: string | number, record: string | number } | [resource: string | number, record: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\MasterData\MasterDataController::edit
 * @see app/Http/Controllers/MasterData/MasterDataController.php:108
 * @route '/modules/organization/{resource}/{record}/edit'
 */
        editForm.get = (args: { resource: string | number, record: string | number } | [resource: string | number, record: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\MasterData\MasterDataController::edit
 * @see app/Http/Controllers/MasterData/MasterDataController.php:108
 * @route '/modules/organization/{resource}/{record}/edit'
 */
        editForm.head = (args: { resource: string | number, record: string | number } | [resource: string | number, record: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
 * @route '/modules/organization/{resource}/{record}'
 */
export const update = (args: { resource: string | number, record: string | number } | [resource: string | number, record: string | number ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/modules/organization/{resource}/{record}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::update
 * @see app/Http/Controllers/MasterData/MasterDataController.php:127
 * @route '/modules/organization/{resource}/{record}'
 */
update.url = (args: { resource: string | number, record: string | number } | [resource: string | number, record: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    resource: args[0],
                    record: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        resource: args.resource,
                                record: args.record,
                }

    return update.definition.url
            .replace('{resource}', parsedArgs.resource.toString())
            .replace('{record}', parsedArgs.record.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::update
 * @see app/Http/Controllers/MasterData/MasterDataController.php:127
 * @route '/modules/organization/{resource}/{record}'
 */
update.put = (args: { resource: string | number, record: string | number } | [resource: string | number, record: string | number ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::update
 * @see app/Http/Controllers/MasterData/MasterDataController.php:127
 * @route '/modules/organization/{resource}/{record}'
 */
    const updateForm = (args: { resource: string | number, record: string | number } | [resource: string | number, record: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
 * @route '/modules/organization/{resource}/{record}'
 */
        updateForm.put = (args: { resource: string | number, record: string | number } | [resource: string | number, record: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
 * @route '/modules/organization/{resource}/{record}'
 */
export const destroy = (args: { resource: string | number, record: string | number } | [resource: string | number, record: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/modules/organization/{resource}/{record}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::destroy
 * @see app/Http/Controllers/MasterData/MasterDataController.php:149
 * @route '/modules/organization/{resource}/{record}'
 */
destroy.url = (args: { resource: string | number, record: string | number } | [resource: string | number, record: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    resource: args[0],
                    record: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        resource: args.resource,
                                record: args.record,
                }

    return destroy.definition.url
            .replace('{resource}', parsedArgs.resource.toString())
            .replace('{record}', parsedArgs.record.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::destroy
 * @see app/Http/Controllers/MasterData/MasterDataController.php:149
 * @route '/modules/organization/{resource}/{record}'
 */
destroy.delete = (args: { resource: string | number, record: string | number } | [resource: string | number, record: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::destroy
 * @see app/Http/Controllers/MasterData/MasterDataController.php:149
 * @route '/modules/organization/{resource}/{record}'
 */
    const destroyForm = (args: { resource: string | number, record: string | number } | [resource: string | number, record: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
 * @route '/modules/organization/{resource}/{record}'
 */
        destroyForm.delete = (args: { resource: string | number, record: string | number } | [resource: string | number, record: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
/**
* @see \App\Http\Controllers\MasterData\MasterDataController::restore
 * @see app/Http/Controllers/MasterData/MasterDataController.php:192
 * @route '/modules/organization/{resource}/{record}/restore'
 */
export const restore = (args: { resource: string | number, record: string | number } | [resource: string | number, record: string | number ], options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: restore.url(args, options),
    method: 'post',
})

restore.definition = {
    methods: ["post"],
    url: '/modules/organization/{resource}/{record}/restore',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::restore
 * @see app/Http/Controllers/MasterData/MasterDataController.php:192
 * @route '/modules/organization/{resource}/{record}/restore'
 */
restore.url = (args: { resource: string | number, record: string | number } | [resource: string | number, record: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    resource: args[0],
                    record: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        resource: args.resource,
                                record: args.record,
                }

    return restore.definition.url
            .replace('{resource}', parsedArgs.resource.toString())
            .replace('{record}', parsedArgs.record.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::restore
 * @see app/Http/Controllers/MasterData/MasterDataController.php:192
 * @route '/modules/organization/{resource}/{record}/restore'
 */
restore.post = (args: { resource: string | number, record: string | number } | [resource: string | number, record: string | number ], options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: restore.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::restore
 * @see app/Http/Controllers/MasterData/MasterDataController.php:192
 * @route '/modules/organization/{resource}/{record}/restore'
 */
    const restoreForm = (args: { resource: string | number, record: string | number } | [resource: string | number, record: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: restore.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\MasterData\MasterDataController::restore
 * @see app/Http/Controllers/MasterData/MasterDataController.php:192
 * @route '/modules/organization/{resource}/{record}/restore'
 */
        restoreForm.post = (args: { resource: string | number, record: string | number } | [resource: string | number, record: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: restore.url(args, options),
            method: 'post',
        })
    
    restore.form = restoreForm
const resources = {
    template: Object.assign(template, template),
export: Object.assign(exportMethod, exportMethod),
import: Object.assign(importMethod, importMethod),
index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
restore: Object.assign(restore, restore),
}

export default resources