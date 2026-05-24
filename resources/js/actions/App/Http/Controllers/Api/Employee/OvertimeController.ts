import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\Employee\OvertimeController::index
 * @see app/Http/Controllers/Api/Employee/OvertimeController.php:32
 * @route '/api/v1/employee/overtime/requests'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/v1/employee/overtime/requests',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\Employee\OvertimeController::index
 * @see app/Http/Controllers/Api/Employee/OvertimeController.php:32
 * @route '/api/v1/employee/overtime/requests'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\Employee\OvertimeController::index
 * @see app/Http/Controllers/Api/Employee/OvertimeController.php:32
 * @route '/api/v1/employee/overtime/requests'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\Employee\OvertimeController::index
 * @see app/Http/Controllers/Api/Employee/OvertimeController.php:32
 * @route '/api/v1/employee/overtime/requests'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\Employee\OvertimeController::index
 * @see app/Http/Controllers/Api/Employee/OvertimeController.php:32
 * @route '/api/v1/employee/overtime/requests'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\Employee\OvertimeController::index
 * @see app/Http/Controllers/Api/Employee/OvertimeController.php:32
 * @route '/api/v1/employee/overtime/requests'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\Employee\OvertimeController::index
 * @see app/Http/Controllers/Api/Employee/OvertimeController.php:32
 * @route '/api/v1/employee/overtime/requests'
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
* @see \App\Http\Controllers\Api\Employee\OvertimeController::show
 * @see app/Http/Controllers/Api/Employee/OvertimeController.php:78
 * @route '/api/v1/employee/overtime/requests/{overtimeRequest}'
 */
export const show = (args: { overtimeRequest: number | { id: number } } | [overtimeRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/api/v1/employee/overtime/requests/{overtimeRequest}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\Employee\OvertimeController::show
 * @see app/Http/Controllers/Api/Employee/OvertimeController.php:78
 * @route '/api/v1/employee/overtime/requests/{overtimeRequest}'
 */
show.url = (args: { overtimeRequest: number | { id: number } } | [overtimeRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { overtimeRequest: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { overtimeRequest: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    overtimeRequest: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        overtimeRequest: typeof args.overtimeRequest === 'object'
                ? args.overtimeRequest.id
                : args.overtimeRequest,
                }

    return show.definition.url
            .replace('{overtimeRequest}', parsedArgs.overtimeRequest.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\Employee\OvertimeController::show
 * @see app/Http/Controllers/Api/Employee/OvertimeController.php:78
 * @route '/api/v1/employee/overtime/requests/{overtimeRequest}'
 */
show.get = (args: { overtimeRequest: number | { id: number } } | [overtimeRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\Employee\OvertimeController::show
 * @see app/Http/Controllers/Api/Employee/OvertimeController.php:78
 * @route '/api/v1/employee/overtime/requests/{overtimeRequest}'
 */
show.head = (args: { overtimeRequest: number | { id: number } } | [overtimeRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\Employee\OvertimeController::show
 * @see app/Http/Controllers/Api/Employee/OvertimeController.php:78
 * @route '/api/v1/employee/overtime/requests/{overtimeRequest}'
 */
    const showForm = (args: { overtimeRequest: number | { id: number } } | [overtimeRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\Employee\OvertimeController::show
 * @see app/Http/Controllers/Api/Employee/OvertimeController.php:78
 * @route '/api/v1/employee/overtime/requests/{overtimeRequest}'
 */
        showForm.get = (args: { overtimeRequest: number | { id: number } } | [overtimeRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\Employee\OvertimeController::show
 * @see app/Http/Controllers/Api/Employee/OvertimeController.php:78
 * @route '/api/v1/employee/overtime/requests/{overtimeRequest}'
 */
        showForm.head = (args: { overtimeRequest: number | { id: number } } | [overtimeRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Api\Employee\OvertimeController::store
 * @see app/Http/Controllers/Api/Employee/OvertimeController.php:90
 * @route '/api/v1/employee/overtime/requests'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/v1/employee/overtime/requests',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\Employee\OvertimeController::store
 * @see app/Http/Controllers/Api/Employee/OvertimeController.php:90
 * @route '/api/v1/employee/overtime/requests'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\Employee\OvertimeController::store
 * @see app/Http/Controllers/Api/Employee/OvertimeController.php:90
 * @route '/api/v1/employee/overtime/requests'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Api\Employee\OvertimeController::store
 * @see app/Http/Controllers/Api/Employee/OvertimeController.php:90
 * @route '/api/v1/employee/overtime/requests'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\Employee\OvertimeController::store
 * @see app/Http/Controllers/Api/Employee/OvertimeController.php:90
 * @route '/api/v1/employee/overtime/requests'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Api\Employee\OvertimeController::cancel
 * @see app/Http/Controllers/Api/Employee/OvertimeController.php:235
 * @route '/api/v1/employee/overtime/requests/{overtimeRequest}/cancel'
 */
export const cancel = (args: { overtimeRequest: number | { id: number } } | [overtimeRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: cancel.url(args, options),
    method: 'post',
})

cancel.definition = {
    methods: ["post"],
    url: '/api/v1/employee/overtime/requests/{overtimeRequest}/cancel',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\Employee\OvertimeController::cancel
 * @see app/Http/Controllers/Api/Employee/OvertimeController.php:235
 * @route '/api/v1/employee/overtime/requests/{overtimeRequest}/cancel'
 */
cancel.url = (args: { overtimeRequest: number | { id: number } } | [overtimeRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { overtimeRequest: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { overtimeRequest: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    overtimeRequest: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        overtimeRequest: typeof args.overtimeRequest === 'object'
                ? args.overtimeRequest.id
                : args.overtimeRequest,
                }

    return cancel.definition.url
            .replace('{overtimeRequest}', parsedArgs.overtimeRequest.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\Employee\OvertimeController::cancel
 * @see app/Http/Controllers/Api/Employee/OvertimeController.php:235
 * @route '/api/v1/employee/overtime/requests/{overtimeRequest}/cancel'
 */
cancel.post = (args: { overtimeRequest: number | { id: number } } | [overtimeRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: cancel.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Api\Employee\OvertimeController::cancel
 * @see app/Http/Controllers/Api/Employee/OvertimeController.php:235
 * @route '/api/v1/employee/overtime/requests/{overtimeRequest}/cancel'
 */
    const cancelForm = (args: { overtimeRequest: number | { id: number } } | [overtimeRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: cancel.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\Employee\OvertimeController::cancel
 * @see app/Http/Controllers/Api/Employee/OvertimeController.php:235
 * @route '/api/v1/employee/overtime/requests/{overtimeRequest}/cancel'
 */
        cancelForm.post = (args: { overtimeRequest: number | { id: number } } | [overtimeRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: cancel.url(args, options),
            method: 'post',
        })
    
    cancel.form = cancelForm
const OvertimeController = { index, show, store, cancel }

export default OvertimeController