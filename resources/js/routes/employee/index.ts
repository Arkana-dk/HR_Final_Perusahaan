import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
import attendance from './attendance'
import leaveRequests from './leave-requests'
import payslips from './payslips'
import overtime from './overtime'
import reimburse from './reimburse'
/**
* @see \App\Http\Controllers\Employee\DashboardController::dashboard
 * @see app/Http/Controllers/Employee/DashboardController.php:11
 * @route '/employee/dashboard'
 */
export const dashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: '/employee/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Employee\DashboardController::dashboard
 * @see app/Http/Controllers/Employee/DashboardController.php:11
 * @route '/employee/dashboard'
 */
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Employee\DashboardController::dashboard
 * @see app/Http/Controllers/Employee/DashboardController.php:11
 * @route '/employee/dashboard'
 */
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Employee\DashboardController::dashboard
 * @see app/Http/Controllers/Employee/DashboardController.php:11
 * @route '/employee/dashboard'
 */
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Employee\DashboardController::dashboard
 * @see app/Http/Controllers/Employee/DashboardController.php:11
 * @route '/employee/dashboard'
 */
    const dashboardForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: dashboard.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Employee\DashboardController::dashboard
 * @see app/Http/Controllers/Employee/DashboardController.php:11
 * @route '/employee/dashboard'
 */
        dashboardForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Employee\DashboardController::dashboard
 * @see app/Http/Controllers/Employee/DashboardController.php:11
 * @route '/employee/dashboard'
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
const employee = {
    attendance: Object.assign(attendance, attendance),
leaveRequests: Object.assign(leaveRequests, leaveRequests),
payslips: Object.assign(payslips, payslips),
overtime: Object.assign(overtime, overtime),
reimburse: Object.assign(reimburse, reimburse),
dashboard: Object.assign(dashboard, dashboard),
}

export default employee