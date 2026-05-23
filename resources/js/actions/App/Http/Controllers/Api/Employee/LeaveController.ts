import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\Employee\LeaveController::types
 * @see app/Http/Controllers/Api/Employee/LeaveController.php:32
 * @route '/api/v1/employee/leave/types'
 */
export const types = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: types.url(options),
    method: 'get',
})

types.definition = {
    methods: ["get","head"],
    url: '/api/v1/employee/leave/types',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\Employee\LeaveController::types
 * @see app/Http/Controllers/Api/Employee/LeaveController.php:32
 * @route '/api/v1/employee/leave/types'
 */
types.url = (options?: RouteQueryOptions) => {
    return types.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\Employee\LeaveController::types
 * @see app/Http/Controllers/Api/Employee/LeaveController.php:32
 * @route '/api/v1/employee/leave/types'
 */
types.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: types.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\Employee\LeaveController::types
 * @see app/Http/Controllers/Api/Employee/LeaveController.php:32
 * @route '/api/v1/employee/leave/types'
 */
types.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: types.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\Employee\LeaveController::types
 * @see app/Http/Controllers/Api/Employee/LeaveController.php:32
 * @route '/api/v1/employee/leave/types'
 */
    const typesForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: types.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\Employee\LeaveController::types
 * @see app/Http/Controllers/Api/Employee/LeaveController.php:32
 * @route '/api/v1/employee/leave/types'
 */
        typesForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: types.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\Employee\LeaveController::types
 * @see app/Http/Controllers/Api/Employee/LeaveController.php:32
 * @route '/api/v1/employee/leave/types'
 */
        typesForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: types.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    types.form = typesForm
/**
* @see \App\Http\Controllers\Api\Employee\LeaveController::index
 * @see app/Http/Controllers/Api/Employee/LeaveController.php:58
 * @route '/api/v1/employee/leave/requests'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/v1/employee/leave/requests',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\Employee\LeaveController::index
 * @see app/Http/Controllers/Api/Employee/LeaveController.php:58
 * @route '/api/v1/employee/leave/requests'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\Employee\LeaveController::index
 * @see app/Http/Controllers/Api/Employee/LeaveController.php:58
 * @route '/api/v1/employee/leave/requests'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\Employee\LeaveController::index
 * @see app/Http/Controllers/Api/Employee/LeaveController.php:58
 * @route '/api/v1/employee/leave/requests'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\Employee\LeaveController::index
 * @see app/Http/Controllers/Api/Employee/LeaveController.php:58
 * @route '/api/v1/employee/leave/requests'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\Employee\LeaveController::index
 * @see app/Http/Controllers/Api/Employee/LeaveController.php:58
 * @route '/api/v1/employee/leave/requests'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\Employee\LeaveController::index
 * @see app/Http/Controllers/Api/Employee/LeaveController.php:58
 * @route '/api/v1/employee/leave/requests'
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
* @see \App\Http\Controllers\Api\Employee\LeaveController::show
 * @see app/Http/Controllers/Api/Employee/LeaveController.php:113
 * @route '/api/v1/employee/leave/requests/{leaveRequest}'
 */
export const show = (args: { leaveRequest: number | { id: number } } | [leaveRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/api/v1/employee/leave/requests/{leaveRequest}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\Employee\LeaveController::show
 * @see app/Http/Controllers/Api/Employee/LeaveController.php:113
 * @route '/api/v1/employee/leave/requests/{leaveRequest}'
 */
show.url = (args: { leaveRequest: number | { id: number } } | [leaveRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { leaveRequest: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { leaveRequest: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    leaveRequest: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        leaveRequest: typeof args.leaveRequest === 'object'
                ? args.leaveRequest.id
                : args.leaveRequest,
                }

    return show.definition.url
            .replace('{leaveRequest}', parsedArgs.leaveRequest.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\Employee\LeaveController::show
 * @see app/Http/Controllers/Api/Employee/LeaveController.php:113
 * @route '/api/v1/employee/leave/requests/{leaveRequest}'
 */
show.get = (args: { leaveRequest: number | { id: number } } | [leaveRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\Employee\LeaveController::show
 * @see app/Http/Controllers/Api/Employee/LeaveController.php:113
 * @route '/api/v1/employee/leave/requests/{leaveRequest}'
 */
show.head = (args: { leaveRequest: number | { id: number } } | [leaveRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\Employee\LeaveController::show
 * @see app/Http/Controllers/Api/Employee/LeaveController.php:113
 * @route '/api/v1/employee/leave/requests/{leaveRequest}'
 */
    const showForm = (args: { leaveRequest: number | { id: number } } | [leaveRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\Employee\LeaveController::show
 * @see app/Http/Controllers/Api/Employee/LeaveController.php:113
 * @route '/api/v1/employee/leave/requests/{leaveRequest}'
 */
        showForm.get = (args: { leaveRequest: number | { id: number } } | [leaveRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\Employee\LeaveController::show
 * @see app/Http/Controllers/Api/Employee/LeaveController.php:113
 * @route '/api/v1/employee/leave/requests/{leaveRequest}'
 */
        showForm.head = (args: { leaveRequest: number | { id: number } } | [leaveRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Api\Employee\LeaveController::store
 * @see app/Http/Controllers/Api/Employee/LeaveController.php:130
 * @route '/api/v1/employee/leave/requests'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/v1/employee/leave/requests',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\Employee\LeaveController::store
 * @see app/Http/Controllers/Api/Employee/LeaveController.php:130
 * @route '/api/v1/employee/leave/requests'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\Employee\LeaveController::store
 * @see app/Http/Controllers/Api/Employee/LeaveController.php:130
 * @route '/api/v1/employee/leave/requests'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Api\Employee\LeaveController::store
 * @see app/Http/Controllers/Api/Employee/LeaveController.php:130
 * @route '/api/v1/employee/leave/requests'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\Employee\LeaveController::store
 * @see app/Http/Controllers/Api/Employee/LeaveController.php:130
 * @route '/api/v1/employee/leave/requests'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Api\Employee\LeaveController::cancel
 * @see app/Http/Controllers/Api/Employee/LeaveController.php:279
 * @route '/api/v1/employee/leave/requests/{leaveRequest}/cancel'
 */
export const cancel = (args: { leaveRequest: number | { id: number } } | [leaveRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: cancel.url(args, options),
    method: 'post',
})

cancel.definition = {
    methods: ["post"],
    url: '/api/v1/employee/leave/requests/{leaveRequest}/cancel',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\Employee\LeaveController::cancel
 * @see app/Http/Controllers/Api/Employee/LeaveController.php:279
 * @route '/api/v1/employee/leave/requests/{leaveRequest}/cancel'
 */
cancel.url = (args: { leaveRequest: number | { id: number } } | [leaveRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { leaveRequest: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { leaveRequest: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    leaveRequest: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        leaveRequest: typeof args.leaveRequest === 'object'
                ? args.leaveRequest.id
                : args.leaveRequest,
                }

    return cancel.definition.url
            .replace('{leaveRequest}', parsedArgs.leaveRequest.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\Employee\LeaveController::cancel
 * @see app/Http/Controllers/Api/Employee/LeaveController.php:279
 * @route '/api/v1/employee/leave/requests/{leaveRequest}/cancel'
 */
cancel.post = (args: { leaveRequest: number | { id: number } } | [leaveRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: cancel.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Api\Employee\LeaveController::cancel
 * @see app/Http/Controllers/Api/Employee/LeaveController.php:279
 * @route '/api/v1/employee/leave/requests/{leaveRequest}/cancel'
 */
    const cancelForm = (args: { leaveRequest: number | { id: number } } | [leaveRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: cancel.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\Employee\LeaveController::cancel
 * @see app/Http/Controllers/Api/Employee/LeaveController.php:279
 * @route '/api/v1/employee/leave/requests/{leaveRequest}/cancel'
 */
        cancelForm.post = (args: { leaveRequest: number | { id: number } } | [leaveRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: cancel.url(args, options),
            method: 'post',
        })
    
    cancel.form = cancelForm
const LeaveController = { types, index, show, store, cancel }

export default LeaveController