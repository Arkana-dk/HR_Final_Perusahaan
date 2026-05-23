import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Employee\EmployeeOvertimeController::index
 * @see app/Http/Controllers/Employee/EmployeeOvertimeController.php:24
 * @route '/employee/overtime'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/employee/overtime',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Employee\EmployeeOvertimeController::index
 * @see app/Http/Controllers/Employee/EmployeeOvertimeController.php:24
 * @route '/employee/overtime'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Employee\EmployeeOvertimeController::index
 * @see app/Http/Controllers/Employee/EmployeeOvertimeController.php:24
 * @route '/employee/overtime'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Employee\EmployeeOvertimeController::index
 * @see app/Http/Controllers/Employee/EmployeeOvertimeController.php:24
 * @route '/employee/overtime'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Employee\EmployeeOvertimeController::index
 * @see app/Http/Controllers/Employee/EmployeeOvertimeController.php:24
 * @route '/employee/overtime'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Employee\EmployeeOvertimeController::index
 * @see app/Http/Controllers/Employee/EmployeeOvertimeController.php:24
 * @route '/employee/overtime'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Employee\EmployeeOvertimeController::index
 * @see app/Http/Controllers/Employee/EmployeeOvertimeController.php:24
 * @route '/employee/overtime'
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
* @see \App\Http\Controllers\Employee\EmployeeOvertimeController::store
 * @see app/Http/Controllers/Employee/EmployeeOvertimeController.php:50
 * @route '/employee/overtime'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/employee/overtime',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Employee\EmployeeOvertimeController::store
 * @see app/Http/Controllers/Employee/EmployeeOvertimeController.php:50
 * @route '/employee/overtime'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Employee\EmployeeOvertimeController::store
 * @see app/Http/Controllers/Employee/EmployeeOvertimeController.php:50
 * @route '/employee/overtime'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Employee\EmployeeOvertimeController::store
 * @see app/Http/Controllers/Employee/EmployeeOvertimeController.php:50
 * @route '/employee/overtime'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Employee\EmployeeOvertimeController::store
 * @see app/Http/Controllers/Employee/EmployeeOvertimeController.php:50
 * @route '/employee/overtime'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
const EmployeeOvertimeController = { index, store }

export default EmployeeOvertimeController