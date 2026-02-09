import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\Employee\DashboardController::index
 * @see app/Http/Controllers/Api/Employee/DashboardController.php:21
 * @route '/api/v1/employee/dashboard'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/v1/employee/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\Employee\DashboardController::index
 * @see app/Http/Controllers/Api/Employee/DashboardController.php:21
 * @route '/api/v1/employee/dashboard'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\Employee\DashboardController::index
 * @see app/Http/Controllers/Api/Employee/DashboardController.php:21
 * @route '/api/v1/employee/dashboard'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\Employee\DashboardController::index
 * @see app/Http/Controllers/Api/Employee/DashboardController.php:21
 * @route '/api/v1/employee/dashboard'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\Employee\DashboardController::index
 * @see app/Http/Controllers/Api/Employee/DashboardController.php:21
 * @route '/api/v1/employee/dashboard'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\Employee\DashboardController::index
 * @see app/Http/Controllers/Api/Employee/DashboardController.php:21
 * @route '/api/v1/employee/dashboard'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\Employee\DashboardController::index
 * @see app/Http/Controllers/Api/Employee/DashboardController.php:21
 * @route '/api/v1/employee/dashboard'
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
const DashboardController = { index }

export default DashboardController