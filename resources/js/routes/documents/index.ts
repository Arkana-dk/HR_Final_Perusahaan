import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\Documents\EmployeeDocumentController::index
 * @see app/Http/Controllers/Documents/EmployeeDocumentController.php:25
 * @route '/modules/documents'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/modules/documents',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Documents\EmployeeDocumentController::index
 * @see app/Http/Controllers/Documents/EmployeeDocumentController.php:25
 * @route '/modules/documents'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Documents\EmployeeDocumentController::index
 * @see app/Http/Controllers/Documents/EmployeeDocumentController.php:25
 * @route '/modules/documents'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Documents\EmployeeDocumentController::index
 * @see app/Http/Controllers/Documents/EmployeeDocumentController.php:25
 * @route '/modules/documents'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Documents\EmployeeDocumentController::index
 * @see app/Http/Controllers/Documents/EmployeeDocumentController.php:25
 * @route '/modules/documents'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Documents\EmployeeDocumentController::index
 * @see app/Http/Controllers/Documents/EmployeeDocumentController.php:25
 * @route '/modules/documents'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Documents\EmployeeDocumentController::index
 * @see app/Http/Controllers/Documents/EmployeeDocumentController.php:25
 * @route '/modules/documents'
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
* @see \App\Http\Controllers\Documents\EmployeeDocumentController::create
 * @see app/Http/Controllers/Documents/EmployeeDocumentController.php:121
 * @route '/modules/documents/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/modules/documents/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Documents\EmployeeDocumentController::create
 * @see app/Http/Controllers/Documents/EmployeeDocumentController.php:121
 * @route '/modules/documents/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Documents\EmployeeDocumentController::create
 * @see app/Http/Controllers/Documents/EmployeeDocumentController.php:121
 * @route '/modules/documents/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Documents\EmployeeDocumentController::create
 * @see app/Http/Controllers/Documents/EmployeeDocumentController.php:121
 * @route '/modules/documents/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Documents\EmployeeDocumentController::create
 * @see app/Http/Controllers/Documents/EmployeeDocumentController.php:121
 * @route '/modules/documents/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Documents\EmployeeDocumentController::create
 * @see app/Http/Controllers/Documents/EmployeeDocumentController.php:121
 * @route '/modules/documents/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Documents\EmployeeDocumentController::create
 * @see app/Http/Controllers/Documents/EmployeeDocumentController.php:121
 * @route '/modules/documents/create'
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
* @see \App\Http\Controllers\Documents\EmployeeDocumentController::store
 * @see app/Http/Controllers/Documents/EmployeeDocumentController.php:130
 * @route '/modules/documents'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/modules/documents',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Documents\EmployeeDocumentController::store
 * @see app/Http/Controllers/Documents/EmployeeDocumentController.php:130
 * @route '/modules/documents'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Documents\EmployeeDocumentController::store
 * @see app/Http/Controllers/Documents/EmployeeDocumentController.php:130
 * @route '/modules/documents'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Documents\EmployeeDocumentController::store
 * @see app/Http/Controllers/Documents/EmployeeDocumentController.php:130
 * @route '/modules/documents'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Documents\EmployeeDocumentController::store
 * @see app/Http/Controllers/Documents/EmployeeDocumentController.php:130
 * @route '/modules/documents'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Documents\EmployeeDocumentController::edit
 * @see app/Http/Controllers/Documents/EmployeeDocumentController.php:165
 * @route '/modules/documents/{document}/edit'
 */
export const edit = (args: { document: number | { id: number } } | [document: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/modules/documents/{document}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Documents\EmployeeDocumentController::edit
 * @see app/Http/Controllers/Documents/EmployeeDocumentController.php:165
 * @route '/modules/documents/{document}/edit'
 */
edit.url = (args: { document: number | { id: number } } | [document: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { document: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { document: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    document: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        document: typeof args.document === 'object'
                ? args.document.id
                : args.document,
                }

    return edit.definition.url
            .replace('{document}', parsedArgs.document.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Documents\EmployeeDocumentController::edit
 * @see app/Http/Controllers/Documents/EmployeeDocumentController.php:165
 * @route '/modules/documents/{document}/edit'
 */
edit.get = (args: { document: number | { id: number } } | [document: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Documents\EmployeeDocumentController::edit
 * @see app/Http/Controllers/Documents/EmployeeDocumentController.php:165
 * @route '/modules/documents/{document}/edit'
 */
edit.head = (args: { document: number | { id: number } } | [document: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Documents\EmployeeDocumentController::edit
 * @see app/Http/Controllers/Documents/EmployeeDocumentController.php:165
 * @route '/modules/documents/{document}/edit'
 */
    const editForm = (args: { document: number | { id: number } } | [document: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Documents\EmployeeDocumentController::edit
 * @see app/Http/Controllers/Documents/EmployeeDocumentController.php:165
 * @route '/modules/documents/{document}/edit'
 */
        editForm.get = (args: { document: number | { id: number } } | [document: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Documents\EmployeeDocumentController::edit
 * @see app/Http/Controllers/Documents/EmployeeDocumentController.php:165
 * @route '/modules/documents/{document}/edit'
 */
        editForm.head = (args: { document: number | { id: number } } | [document: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Documents\EmployeeDocumentController::update
 * @see app/Http/Controllers/Documents/EmployeeDocumentController.php:177
 * @route '/modules/documents/{document}'
 */
export const update = (args: { document: number | { id: number } } | [document: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/modules/documents/{document}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Documents\EmployeeDocumentController::update
 * @see app/Http/Controllers/Documents/EmployeeDocumentController.php:177
 * @route '/modules/documents/{document}'
 */
update.url = (args: { document: number | { id: number } } | [document: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { document: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { document: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    document: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        document: typeof args.document === 'object'
                ? args.document.id
                : args.document,
                }

    return update.definition.url
            .replace('{document}', parsedArgs.document.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Documents\EmployeeDocumentController::update
 * @see app/Http/Controllers/Documents/EmployeeDocumentController.php:177
 * @route '/modules/documents/{document}'
 */
update.put = (args: { document: number | { id: number } } | [document: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\Documents\EmployeeDocumentController::update
 * @see app/Http/Controllers/Documents/EmployeeDocumentController.php:177
 * @route '/modules/documents/{document}'
 */
    const updateForm = (args: { document: number | { id: number } } | [document: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Documents\EmployeeDocumentController::update
 * @see app/Http/Controllers/Documents/EmployeeDocumentController.php:177
 * @route '/modules/documents/{document}'
 */
        updateForm.put = (args: { document: number | { id: number } } | [document: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Documents\EmployeeDocumentController::destroy
 * @see app/Http/Controllers/Documents/EmployeeDocumentController.php:215
 * @route '/modules/documents/{document}'
 */
export const destroy = (args: { document: number | { id: number } } | [document: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/modules/documents/{document}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Documents\EmployeeDocumentController::destroy
 * @see app/Http/Controllers/Documents/EmployeeDocumentController.php:215
 * @route '/modules/documents/{document}'
 */
destroy.url = (args: { document: number | { id: number } } | [document: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { document: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { document: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    document: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        document: typeof args.document === 'object'
                ? args.document.id
                : args.document,
                }

    return destroy.definition.url
            .replace('{document}', parsedArgs.document.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Documents\EmployeeDocumentController::destroy
 * @see app/Http/Controllers/Documents/EmployeeDocumentController.php:215
 * @route '/modules/documents/{document}'
 */
destroy.delete = (args: { document: number | { id: number } } | [document: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Documents\EmployeeDocumentController::destroy
 * @see app/Http/Controllers/Documents/EmployeeDocumentController.php:215
 * @route '/modules/documents/{document}'
 */
    const destroyForm = (args: { document: number | { id: number } } | [document: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Documents\EmployeeDocumentController::destroy
 * @see app/Http/Controllers/Documents/EmployeeDocumentController.php:215
 * @route '/modules/documents/{document}'
 */
        destroyForm.delete = (args: { document: number | { id: number } } | [document: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const documents = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default documents