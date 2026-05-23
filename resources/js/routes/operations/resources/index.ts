import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\MasterData\MasterDataController::template
 * @see app/Http/Controllers/MasterData/MasterDataController.php:266
 * @route '/modules/{resource}/template'
 */
export const template = (args: { resource: string | number } | [resource: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: template.url(args, options),
    method: 'get',
})

template.definition = {
    methods: ["get","head"],
    url: '/modules/{resource}/template',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::template
 * @see app/Http/Controllers/MasterData/MasterDataController.php:266
 * @route '/modules/{resource}/template'
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
 * @see app/Http/Controllers/MasterData/MasterDataController.php:266
 * @route '/modules/{resource}/template'
 */
template.get = (args: { resource: string | number } | [resource: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: template.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\MasterData\MasterDataController::template
 * @see app/Http/Controllers/MasterData/MasterDataController.php:266
 * @route '/modules/{resource}/template'
 */
template.head = (args: { resource: string | number } | [resource: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: template.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::template
 * @see app/Http/Controllers/MasterData/MasterDataController.php:266
 * @route '/modules/{resource}/template'
 */
    const templateForm = (args: { resource: string | number } | [resource: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: template.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\MasterData\MasterDataController::template
 * @see app/Http/Controllers/MasterData/MasterDataController.php:266
 * @route '/modules/{resource}/template'
 */
        templateForm.get = (args: { resource: string | number } | [resource: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: template.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\MasterData\MasterDataController::template
 * @see app/Http/Controllers/MasterData/MasterDataController.php:266
 * @route '/modules/{resource}/template'
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
 * @see app/Http/Controllers/MasterData/MasterDataController.php:206
 * @route '/modules/{resource}/export'
 */
export const exportMethod = (args: { resource: string | number } | [resource: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod.url(args, options),
    method: 'get',
})

exportMethod.definition = {
    methods: ["get","head"],
    url: '/modules/{resource}/export',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::exportMethod
 * @see app/Http/Controllers/MasterData/MasterDataController.php:206
 * @route '/modules/{resource}/export'
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
 * @see app/Http/Controllers/MasterData/MasterDataController.php:206
 * @route '/modules/{resource}/export'
 */
exportMethod.get = (args: { resource: string | number } | [resource: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\MasterData\MasterDataController::exportMethod
 * @see app/Http/Controllers/MasterData/MasterDataController.php:206
 * @route '/modules/{resource}/export'
 */
exportMethod.head = (args: { resource: string | number } | [resource: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportMethod.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::exportMethod
 * @see app/Http/Controllers/MasterData/MasterDataController.php:206
 * @route '/modules/{resource}/export'
 */
    const exportMethodForm = (args: { resource: string | number } | [resource: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: exportMethod.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\MasterData\MasterDataController::exportMethod
 * @see app/Http/Controllers/MasterData/MasterDataController.php:206
 * @route '/modules/{resource}/export'
 */
        exportMethodForm.get = (args: { resource: string | number } | [resource: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportMethod.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\MasterData\MasterDataController::exportMethod
 * @see app/Http/Controllers/MasterData/MasterDataController.php:206
 * @route '/modules/{resource}/export'
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
 * @see app/Http/Controllers/MasterData/MasterDataController.php:338
 * @route '/modules/{resource}/import'
 */
export const importMethod = (args: { resource: string | number } | [resource: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: importMethod.url(args, options),
    method: 'post',
})

importMethod.definition = {
    methods: ["post"],
    url: '/modules/{resource}/import',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::importMethod
 * @see app/Http/Controllers/MasterData/MasterDataController.php:338
 * @route '/modules/{resource}/import'
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
 * @see app/Http/Controllers/MasterData/MasterDataController.php:338
 * @route '/modules/{resource}/import'
 */
importMethod.post = (args: { resource: string | number } | [resource: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: importMethod.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::importMethod
 * @see app/Http/Controllers/MasterData/MasterDataController.php:338
 * @route '/modules/{resource}/import'
 */
    const importMethodForm = (args: { resource: string | number } | [resource: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: importMethod.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\MasterData\MasterDataController::importMethod
 * @see app/Http/Controllers/MasterData/MasterDataController.php:338
 * @route '/modules/{resource}/import'
 */
        importMethodForm.post = (args: { resource: string | number } | [resource: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: importMethod.url(args, options),
            method: 'post',
        })
    
    importMethod.form = importMethodForm
/**
* @see \App\Http\Controllers\MasterData\MasterDataController::index
 * @see app/Http/Controllers/MasterData/MasterDataController.php:47
 * @route '/modules/{resource}'
 */
export const index = (args: { resource: string | number } | [resource: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/modules/{resource}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::index
 * @see app/Http/Controllers/MasterData/MasterDataController.php:47
 * @route '/modules/{resource}'
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
 * @see app/Http/Controllers/MasterData/MasterDataController.php:47
 * @route '/modules/{resource}'
 */
index.get = (args: { resource: string | number } | [resource: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\MasterData\MasterDataController::index
 * @see app/Http/Controllers/MasterData/MasterDataController.php:47
 * @route '/modules/{resource}'
 */
index.head = (args: { resource: string | number } | [resource: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::index
 * @see app/Http/Controllers/MasterData/MasterDataController.php:47
 * @route '/modules/{resource}'
 */
    const indexForm = (args: { resource: string | number } | [resource: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\MasterData\MasterDataController::index
 * @see app/Http/Controllers/MasterData/MasterDataController.php:47
 * @route '/modules/{resource}'
 */
        indexForm.get = (args: { resource: string | number } | [resource: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\MasterData\MasterDataController::index
 * @see app/Http/Controllers/MasterData/MasterDataController.php:47
 * @route '/modules/{resource}'
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
 * @see app/Http/Controllers/MasterData/MasterDataController.php:71
 * @route '/modules/{resource}/create'
 */
export const create = (args: { resource: string | number } | [resource: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(args, options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/modules/{resource}/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::create
 * @see app/Http/Controllers/MasterData/MasterDataController.php:71
 * @route '/modules/{resource}/create'
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
 * @see app/Http/Controllers/MasterData/MasterDataController.php:71
 * @route '/modules/{resource}/create'
 */
create.get = (args: { resource: string | number } | [resource: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\MasterData\MasterDataController::create
 * @see app/Http/Controllers/MasterData/MasterDataController.php:71
 * @route '/modules/{resource}/create'
 */
create.head = (args: { resource: string | number } | [resource: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::create
 * @see app/Http/Controllers/MasterData/MasterDataController.php:71
 * @route '/modules/{resource}/create'
 */
    const createForm = (args: { resource: string | number } | [resource: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\MasterData\MasterDataController::create
 * @see app/Http/Controllers/MasterData/MasterDataController.php:71
 * @route '/modules/{resource}/create'
 */
        createForm.get = (args: { resource: string | number } | [resource: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\MasterData\MasterDataController::create
 * @see app/Http/Controllers/MasterData/MasterDataController.php:71
 * @route '/modules/{resource}/create'
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
 * @see app/Http/Controllers/MasterData/MasterDataController.php:87
 * @route '/modules/{resource}'
 */
export const store = (args: { resource: string | number } | [resource: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/modules/{resource}',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::store
 * @see app/Http/Controllers/MasterData/MasterDataController.php:87
 * @route '/modules/{resource}'
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
 * @see app/Http/Controllers/MasterData/MasterDataController.php:87
 * @route '/modules/{resource}'
 */
store.post = (args: { resource: string | number } | [resource: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::store
 * @see app/Http/Controllers/MasterData/MasterDataController.php:87
 * @route '/modules/{resource}'
 */
    const storeForm = (args: { resource: string | number } | [resource: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\MasterData\MasterDataController::store
 * @see app/Http/Controllers/MasterData/MasterDataController.php:87
 * @route '/modules/{resource}'
 */
        storeForm.post = (args: { resource: string | number } | [resource: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(args, options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\MasterData\MasterDataController::edit
 * @see app/Http/Controllers/MasterData/MasterDataController.php:106
 * @route '/modules/{resource}/{record}/edit'
 */
export const edit = (args: { resource: string | number, record: string | number } | [resource: string | number, record: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/modules/{resource}/{record}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::edit
 * @see app/Http/Controllers/MasterData/MasterDataController.php:106
 * @route '/modules/{resource}/{record}/edit'
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
 * @see app/Http/Controllers/MasterData/MasterDataController.php:106
 * @route '/modules/{resource}/{record}/edit'
 */
edit.get = (args: { resource: string | number, record: string | number } | [resource: string | number, record: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\MasterData\MasterDataController::edit
 * @see app/Http/Controllers/MasterData/MasterDataController.php:106
 * @route '/modules/{resource}/{record}/edit'
 */
edit.head = (args: { resource: string | number, record: string | number } | [resource: string | number, record: string | number ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::edit
 * @see app/Http/Controllers/MasterData/MasterDataController.php:106
 * @route '/modules/{resource}/{record}/edit'
 */
    const editForm = (args: { resource: string | number, record: string | number } | [resource: string | number, record: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\MasterData\MasterDataController::edit
 * @see app/Http/Controllers/MasterData/MasterDataController.php:106
 * @route '/modules/{resource}/{record}/edit'
 */
        editForm.get = (args: { resource: string | number, record: string | number } | [resource: string | number, record: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\MasterData\MasterDataController::edit
 * @see app/Http/Controllers/MasterData/MasterDataController.php:106
 * @route '/modules/{resource}/{record}/edit'
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
 * @see app/Http/Controllers/MasterData/MasterDataController.php:125
 * @route '/modules/{resource}/{record}'
 */
export const update = (args: { resource: string | number, record: string | number } | [resource: string | number, record: string | number ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/modules/{resource}/{record}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::update
 * @see app/Http/Controllers/MasterData/MasterDataController.php:125
 * @route '/modules/{resource}/{record}'
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
 * @see app/Http/Controllers/MasterData/MasterDataController.php:125
 * @route '/modules/{resource}/{record}'
 */
update.put = (args: { resource: string | number, record: string | number } | [resource: string | number, record: string | number ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::update
 * @see app/Http/Controllers/MasterData/MasterDataController.php:125
 * @route '/modules/{resource}/{record}'
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
 * @see app/Http/Controllers/MasterData/MasterDataController.php:125
 * @route '/modules/{resource}/{record}'
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
 * @see app/Http/Controllers/MasterData/MasterDataController.php:146
 * @route '/modules/{resource}/{record}'
 */
export const destroy = (args: { resource: string | number, record: string | number } | [resource: string | number, record: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/modules/{resource}/{record}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::destroy
 * @see app/Http/Controllers/MasterData/MasterDataController.php:146
 * @route '/modules/{resource}/{record}'
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
 * @see app/Http/Controllers/MasterData/MasterDataController.php:146
 * @route '/modules/{resource}/{record}'
 */
destroy.delete = (args: { resource: string | number, record: string | number } | [resource: string | number, record: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::destroy
 * @see app/Http/Controllers/MasterData/MasterDataController.php:146
 * @route '/modules/{resource}/{record}'
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
 * @see app/Http/Controllers/MasterData/MasterDataController.php:146
 * @route '/modules/{resource}/{record}'
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
}

export default resources