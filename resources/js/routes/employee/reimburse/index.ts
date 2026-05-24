import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Employee\EmployeeReimburseController::index
 * @see app/Http/Controllers/Employee/EmployeeReimburseController.php:27
 * @route '/employee/reimburse'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/employee/reimburse',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Employee\EmployeeReimburseController::index
 * @see app/Http/Controllers/Employee/EmployeeReimburseController.php:27
 * @route '/employee/reimburse'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Employee\EmployeeReimburseController::index
 * @see app/Http/Controllers/Employee/EmployeeReimburseController.php:27
 * @route '/employee/reimburse'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Employee\EmployeeReimburseController::index
 * @see app/Http/Controllers/Employee/EmployeeReimburseController.php:27
 * @route '/employee/reimburse'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Employee\EmployeeReimburseController::index
 * @see app/Http/Controllers/Employee/EmployeeReimburseController.php:27
 * @route '/employee/reimburse'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Employee\EmployeeReimburseController::index
 * @see app/Http/Controllers/Employee/EmployeeReimburseController.php:27
 * @route '/employee/reimburse'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Employee\EmployeeReimburseController::index
 * @see app/Http/Controllers/Employee/EmployeeReimburseController.php:27
 * @route '/employee/reimburse'
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
* @see \App\Http\Controllers\Employee\EmployeeReimburseController::store
 * @see app/Http/Controllers/Employee/EmployeeReimburseController.php:53
 * @route '/employee/reimburse'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/employee/reimburse',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Employee\EmployeeReimburseController::store
 * @see app/Http/Controllers/Employee/EmployeeReimburseController.php:53
 * @route '/employee/reimburse'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Employee\EmployeeReimburseController::store
 * @see app/Http/Controllers/Employee/EmployeeReimburseController.php:53
 * @route '/employee/reimburse'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Employee\EmployeeReimburseController::store
 * @see app/Http/Controllers/Employee/EmployeeReimburseController.php:53
 * @route '/employee/reimburse'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Employee\EmployeeReimburseController::store
 * @see app/Http/Controllers/Employee/EmployeeReimburseController.php:53
 * @route '/employee/reimburse'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
const reimburse = {
    index: Object.assign(index, index),
store: Object.assign(store, store),
}

export default reimburse