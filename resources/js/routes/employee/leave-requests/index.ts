import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Employee\EmployeeLeaveRequestController::index
 * @see app/Http/Controllers/Employee/EmployeeLeaveRequestController.php:31
 * @route '/employee/leave-requests'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/employee/leave-requests',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Employee\EmployeeLeaveRequestController::index
 * @see app/Http/Controllers/Employee/EmployeeLeaveRequestController.php:31
 * @route '/employee/leave-requests'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Employee\EmployeeLeaveRequestController::index
 * @see app/Http/Controllers/Employee/EmployeeLeaveRequestController.php:31
 * @route '/employee/leave-requests'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Employee\EmployeeLeaveRequestController::index
 * @see app/Http/Controllers/Employee/EmployeeLeaveRequestController.php:31
 * @route '/employee/leave-requests'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Employee\EmployeeLeaveRequestController::index
 * @see app/Http/Controllers/Employee/EmployeeLeaveRequestController.php:31
 * @route '/employee/leave-requests'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Employee\EmployeeLeaveRequestController::index
 * @see app/Http/Controllers/Employee/EmployeeLeaveRequestController.php:31
 * @route '/employee/leave-requests'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Employee\EmployeeLeaveRequestController::index
 * @see app/Http/Controllers/Employee/EmployeeLeaveRequestController.php:31
 * @route '/employee/leave-requests'
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
* @see \App\Http\Controllers\Employee\EmployeeLeaveRequestController::store
 * @see app/Http/Controllers/Employee/EmployeeLeaveRequestController.php:75
 * @route '/employee/leave-requests'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/employee/leave-requests',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Employee\EmployeeLeaveRequestController::store
 * @see app/Http/Controllers/Employee/EmployeeLeaveRequestController.php:75
 * @route '/employee/leave-requests'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Employee\EmployeeLeaveRequestController::store
 * @see app/Http/Controllers/Employee/EmployeeLeaveRequestController.php:75
 * @route '/employee/leave-requests'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Employee\EmployeeLeaveRequestController::store
 * @see app/Http/Controllers/Employee/EmployeeLeaveRequestController.php:75
 * @route '/employee/leave-requests'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Employee\EmployeeLeaveRequestController::store
 * @see app/Http/Controllers/Employee/EmployeeLeaveRequestController.php:75
 * @route '/employee/leave-requests'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
const leaveRequests = {
    index: Object.assign(index, index),
store: Object.assign(store, store),
}

export default leaveRequests