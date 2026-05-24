import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\Contracts\EmployeeContractController::index
 * @see app/Http/Controllers/Contracts/EmployeeContractController.php:26
 * @route '/modules/contracts'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/modules/contracts',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Contracts\EmployeeContractController::index
 * @see app/Http/Controllers/Contracts/EmployeeContractController.php:26
 * @route '/modules/contracts'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Contracts\EmployeeContractController::index
 * @see app/Http/Controllers/Contracts/EmployeeContractController.php:26
 * @route '/modules/contracts'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Contracts\EmployeeContractController::index
 * @see app/Http/Controllers/Contracts/EmployeeContractController.php:26
 * @route '/modules/contracts'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Contracts\EmployeeContractController::index
 * @see app/Http/Controllers/Contracts/EmployeeContractController.php:26
 * @route '/modules/contracts'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Contracts\EmployeeContractController::index
 * @see app/Http/Controllers/Contracts/EmployeeContractController.php:26
 * @route '/modules/contracts'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Contracts\EmployeeContractController::index
 * @see app/Http/Controllers/Contracts/EmployeeContractController.php:26
 * @route '/modules/contracts'
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
* @see \App\Http\Controllers\Contracts\EmployeeContractController::create
 * @see app/Http/Controllers/Contracts/EmployeeContractController.php:120
 * @route '/modules/contracts/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/modules/contracts/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Contracts\EmployeeContractController::create
 * @see app/Http/Controllers/Contracts/EmployeeContractController.php:120
 * @route '/modules/contracts/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Contracts\EmployeeContractController::create
 * @see app/Http/Controllers/Contracts/EmployeeContractController.php:120
 * @route '/modules/contracts/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Contracts\EmployeeContractController::create
 * @see app/Http/Controllers/Contracts/EmployeeContractController.php:120
 * @route '/modules/contracts/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Contracts\EmployeeContractController::create
 * @see app/Http/Controllers/Contracts/EmployeeContractController.php:120
 * @route '/modules/contracts/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Contracts\EmployeeContractController::create
 * @see app/Http/Controllers/Contracts/EmployeeContractController.php:120
 * @route '/modules/contracts/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Contracts\EmployeeContractController::create
 * @see app/Http/Controllers/Contracts/EmployeeContractController.php:120
 * @route '/modules/contracts/create'
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
* @see \App\Http\Controllers\Contracts\EmployeeContractController::store
 * @see app/Http/Controllers/Contracts/EmployeeContractController.php:129
 * @route '/modules/contracts'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/modules/contracts',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Contracts\EmployeeContractController::store
 * @see app/Http/Controllers/Contracts/EmployeeContractController.php:129
 * @route '/modules/contracts'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Contracts\EmployeeContractController::store
 * @see app/Http/Controllers/Contracts/EmployeeContractController.php:129
 * @route '/modules/contracts'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Contracts\EmployeeContractController::store
 * @see app/Http/Controllers/Contracts/EmployeeContractController.php:129
 * @route '/modules/contracts'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Contracts\EmployeeContractController::store
 * @see app/Http/Controllers/Contracts/EmployeeContractController.php:129
 * @route '/modules/contracts'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Contracts\EmployeeContractController::edit
 * @see app/Http/Controllers/Contracts/EmployeeContractController.php:164
 * @route '/modules/contracts/{contract}/edit'
 */
export const edit = (args: { contract: number | { id: number } } | [contract: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/modules/contracts/{contract}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Contracts\EmployeeContractController::edit
 * @see app/Http/Controllers/Contracts/EmployeeContractController.php:164
 * @route '/modules/contracts/{contract}/edit'
 */
edit.url = (args: { contract: number | { id: number } } | [contract: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { contract: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { contract: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    contract: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        contract: typeof args.contract === 'object'
                ? args.contract.id
                : args.contract,
                }

    return edit.definition.url
            .replace('{contract}', parsedArgs.contract.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Contracts\EmployeeContractController::edit
 * @see app/Http/Controllers/Contracts/EmployeeContractController.php:164
 * @route '/modules/contracts/{contract}/edit'
 */
edit.get = (args: { contract: number | { id: number } } | [contract: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Contracts\EmployeeContractController::edit
 * @see app/Http/Controllers/Contracts/EmployeeContractController.php:164
 * @route '/modules/contracts/{contract}/edit'
 */
edit.head = (args: { contract: number | { id: number } } | [contract: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Contracts\EmployeeContractController::edit
 * @see app/Http/Controllers/Contracts/EmployeeContractController.php:164
 * @route '/modules/contracts/{contract}/edit'
 */
    const editForm = (args: { contract: number | { id: number } } | [contract: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Contracts\EmployeeContractController::edit
 * @see app/Http/Controllers/Contracts/EmployeeContractController.php:164
 * @route '/modules/contracts/{contract}/edit'
 */
        editForm.get = (args: { contract: number | { id: number } } | [contract: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Contracts\EmployeeContractController::edit
 * @see app/Http/Controllers/Contracts/EmployeeContractController.php:164
 * @route '/modules/contracts/{contract}/edit'
 */
        editForm.head = (args: { contract: number | { id: number } } | [contract: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Contracts\EmployeeContractController::update
 * @see app/Http/Controllers/Contracts/EmployeeContractController.php:176
 * @route '/modules/contracts/{contract}'
 */
export const update = (args: { contract: number | { id: number } } | [contract: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/modules/contracts/{contract}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Contracts\EmployeeContractController::update
 * @see app/Http/Controllers/Contracts/EmployeeContractController.php:176
 * @route '/modules/contracts/{contract}'
 */
update.url = (args: { contract: number | { id: number } } | [contract: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { contract: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { contract: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    contract: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        contract: typeof args.contract === 'object'
                ? args.contract.id
                : args.contract,
                }

    return update.definition.url
            .replace('{contract}', parsedArgs.contract.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Contracts\EmployeeContractController::update
 * @see app/Http/Controllers/Contracts/EmployeeContractController.php:176
 * @route '/modules/contracts/{contract}'
 */
update.put = (args: { contract: number | { id: number } } | [contract: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\Contracts\EmployeeContractController::update
 * @see app/Http/Controllers/Contracts/EmployeeContractController.php:176
 * @route '/modules/contracts/{contract}'
 */
    const updateForm = (args: { contract: number | { id: number } } | [contract: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Contracts\EmployeeContractController::update
 * @see app/Http/Controllers/Contracts/EmployeeContractController.php:176
 * @route '/modules/contracts/{contract}'
 */
        updateForm.put = (args: { contract: number | { id: number } } | [contract: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Contracts\EmployeeContractController::destroy
 * @see app/Http/Controllers/Contracts/EmployeeContractController.php:214
 * @route '/modules/contracts/{contract}'
 */
export const destroy = (args: { contract: number | { id: number } } | [contract: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/modules/contracts/{contract}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Contracts\EmployeeContractController::destroy
 * @see app/Http/Controllers/Contracts/EmployeeContractController.php:214
 * @route '/modules/contracts/{contract}'
 */
destroy.url = (args: { contract: number | { id: number } } | [contract: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { contract: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { contract: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    contract: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        contract: typeof args.contract === 'object'
                ? args.contract.id
                : args.contract,
                }

    return destroy.definition.url
            .replace('{contract}', parsedArgs.contract.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Contracts\EmployeeContractController::destroy
 * @see app/Http/Controllers/Contracts/EmployeeContractController.php:214
 * @route '/modules/contracts/{contract}'
 */
destroy.delete = (args: { contract: number | { id: number } } | [contract: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Contracts\EmployeeContractController::destroy
 * @see app/Http/Controllers/Contracts/EmployeeContractController.php:214
 * @route '/modules/contracts/{contract}'
 */
    const destroyForm = (args: { contract: number | { id: number } } | [contract: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Contracts\EmployeeContractController::destroy
 * @see app/Http/Controllers/Contracts/EmployeeContractController.php:214
 * @route '/modules/contracts/{contract}'
 */
        destroyForm.delete = (args: { contract: number | { id: number } } | [contract: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const contracts = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default contracts