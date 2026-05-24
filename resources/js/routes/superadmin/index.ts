import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\SuperAdmin\DashboardController::dashboard
 * @see app/Http/Controllers/SuperAdmin/DashboardController.php:22
 * @route '/superadmin/dashboard'
 */
export const dashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: '/superadmin/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SuperAdmin\DashboardController::dashboard
 * @see app/Http/Controllers/SuperAdmin/DashboardController.php:22
 * @route '/superadmin/dashboard'
 */
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SuperAdmin\DashboardController::dashboard
 * @see app/Http/Controllers/SuperAdmin/DashboardController.php:22
 * @route '/superadmin/dashboard'
 */
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\SuperAdmin\DashboardController::dashboard
 * @see app/Http/Controllers/SuperAdmin/DashboardController.php:22
 * @route '/superadmin/dashboard'
 */
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\SuperAdmin\DashboardController::dashboard
 * @see app/Http/Controllers/SuperAdmin/DashboardController.php:22
 * @route '/superadmin/dashboard'
 */
    const dashboardForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: dashboard.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\SuperAdmin\DashboardController::dashboard
 * @see app/Http/Controllers/SuperAdmin/DashboardController.php:22
 * @route '/superadmin/dashboard'
 */
        dashboardForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\SuperAdmin\DashboardController::dashboard
 * @see app/Http/Controllers/SuperAdmin/DashboardController.php:22
 * @route '/superadmin/dashboard'
 */
        dashboardForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    dashboard.form = dashboardForm
const superadmin = {
    dashboard: Object.assign(dashboard, dashboard),
}

export default superadmin