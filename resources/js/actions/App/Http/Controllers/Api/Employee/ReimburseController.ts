import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\Employee\ReimburseController::index
 * @see app/Http/Controllers/Api/Employee/ReimburseController.php:28
 * @route '/api/v1/employee/reimburse/requests'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/v1/employee/reimburse/requests',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\Employee\ReimburseController::index
 * @see app/Http/Controllers/Api/Employee/ReimburseController.php:28
 * @route '/api/v1/employee/reimburse/requests'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\Employee\ReimburseController::index
 * @see app/Http/Controllers/Api/Employee/ReimburseController.php:28
 * @route '/api/v1/employee/reimburse/requests'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\Employee\ReimburseController::index
 * @see app/Http/Controllers/Api/Employee/ReimburseController.php:28
 * @route '/api/v1/employee/reimburse/requests'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\Employee\ReimburseController::index
 * @see app/Http/Controllers/Api/Employee/ReimburseController.php:28
 * @route '/api/v1/employee/reimburse/requests'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\Employee\ReimburseController::index
 * @see app/Http/Controllers/Api/Employee/ReimburseController.php:28
 * @route '/api/v1/employee/reimburse/requests'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\Employee\ReimburseController::index
 * @see app/Http/Controllers/Api/Employee/ReimburseController.php:28
 * @route '/api/v1/employee/reimburse/requests'
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
* @see \App\Http\Controllers\Api\Employee\ReimburseController::show
 * @see app/Http/Controllers/Api/Employee/ReimburseController.php:74
 * @route '/api/v1/employee/reimburse/requests/{reimburseRequest}'
 */
export const show = (args: { reimburseRequest: number | { id: number } } | [reimburseRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/api/v1/employee/reimburse/requests/{reimburseRequest}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\Employee\ReimburseController::show
 * @see app/Http/Controllers/Api/Employee/ReimburseController.php:74
 * @route '/api/v1/employee/reimburse/requests/{reimburseRequest}'
 */
show.url = (args: { reimburseRequest: number | { id: number } } | [reimburseRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { reimburseRequest: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { reimburseRequest: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    reimburseRequest: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        reimburseRequest: typeof args.reimburseRequest === 'object'
                ? args.reimburseRequest.id
                : args.reimburseRequest,
                }

    return show.definition.url
            .replace('{reimburseRequest}', parsedArgs.reimburseRequest.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\Employee\ReimburseController::show
 * @see app/Http/Controllers/Api/Employee/ReimburseController.php:74
 * @route '/api/v1/employee/reimburse/requests/{reimburseRequest}'
 */
show.get = (args: { reimburseRequest: number | { id: number } } | [reimburseRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\Employee\ReimburseController::show
 * @see app/Http/Controllers/Api/Employee/ReimburseController.php:74
 * @route '/api/v1/employee/reimburse/requests/{reimburseRequest}'
 */
show.head = (args: { reimburseRequest: number | { id: number } } | [reimburseRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\Employee\ReimburseController::show
 * @see app/Http/Controllers/Api/Employee/ReimburseController.php:74
 * @route '/api/v1/employee/reimburse/requests/{reimburseRequest}'
 */
    const showForm = (args: { reimburseRequest: number | { id: number } } | [reimburseRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\Employee\ReimburseController::show
 * @see app/Http/Controllers/Api/Employee/ReimburseController.php:74
 * @route '/api/v1/employee/reimburse/requests/{reimburseRequest}'
 */
        showForm.get = (args: { reimburseRequest: number | { id: number } } | [reimburseRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\Employee\ReimburseController::show
 * @see app/Http/Controllers/Api/Employee/ReimburseController.php:74
 * @route '/api/v1/employee/reimburse/requests/{reimburseRequest}'
 */
        showForm.head = (args: { reimburseRequest: number | { id: number } } | [reimburseRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
/**
* @see \App\Http\Controllers\Api\Employee\ReimburseController::store
 * @see app/Http/Controllers/Api/Employee/ReimburseController.php:86
 * @route '/api/v1/employee/reimburse/requests'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/v1/employee/reimburse/requests',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\Employee\ReimburseController::store
 * @see app/Http/Controllers/Api/Employee/ReimburseController.php:86
 * @route '/api/v1/employee/reimburse/requests'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\Employee\ReimburseController::store
 * @see app/Http/Controllers/Api/Employee/ReimburseController.php:86
 * @route '/api/v1/employee/reimburse/requests'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Api\Employee\ReimburseController::store
 * @see app/Http/Controllers/Api/Employee/ReimburseController.php:86
 * @route '/api/v1/employee/reimburse/requests'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\Employee\ReimburseController::store
 * @see app/Http/Controllers/Api/Employee/ReimburseController.php:86
 * @route '/api/v1/employee/reimburse/requests'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Api\Employee\ReimburseController::cancel
 * @see app/Http/Controllers/Api/Employee/ReimburseController.php:151
 * @route '/api/v1/employee/reimburse/requests/{reimburseRequest}/cancel'
 */
export const cancel = (args: { reimburseRequest: number | { id: number } } | [reimburseRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: cancel.url(args, options),
    method: 'post',
})

cancel.definition = {
    methods: ["post"],
    url: '/api/v1/employee/reimburse/requests/{reimburseRequest}/cancel',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\Employee\ReimburseController::cancel
 * @see app/Http/Controllers/Api/Employee/ReimburseController.php:151
 * @route '/api/v1/employee/reimburse/requests/{reimburseRequest}/cancel'
 */
cancel.url = (args: { reimburseRequest: number | { id: number } } | [reimburseRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { reimburseRequest: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { reimburseRequest: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    reimburseRequest: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        reimburseRequest: typeof args.reimburseRequest === 'object'
                ? args.reimburseRequest.id
                : args.reimburseRequest,
                }

    return cancel.definition.url
            .replace('{reimburseRequest}', parsedArgs.reimburseRequest.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\Employee\ReimburseController::cancel
 * @see app/Http/Controllers/Api/Employee/ReimburseController.php:151
 * @route '/api/v1/employee/reimburse/requests/{reimburseRequest}/cancel'
 */
cancel.post = (args: { reimburseRequest: number | { id: number } } | [reimburseRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: cancel.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Api\Employee\ReimburseController::cancel
 * @see app/Http/Controllers/Api/Employee/ReimburseController.php:151
 * @route '/api/v1/employee/reimburse/requests/{reimburseRequest}/cancel'
 */
    const cancelForm = (args: { reimburseRequest: number | { id: number } } | [reimburseRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: cancel.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\Employee\ReimburseController::cancel
 * @see app/Http/Controllers/Api/Employee/ReimburseController.php:151
 * @route '/api/v1/employee/reimburse/requests/{reimburseRequest}/cancel'
 */
        cancelForm.post = (args: { reimburseRequest: number | { id: number } } | [reimburseRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: cancel.url(args, options),
            method: 'post',
        })
    
    cancel.form = cancelForm
const ReimburseController = { index, show, store, cancel }

export default ReimburseController