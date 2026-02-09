import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\Employee\PayslipController::index
 * @see app/Http/Controllers/Api/Employee/PayslipController.php:15
 * @route '/api/v1/employee/payslips'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/v1/employee/payslips',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\Employee\PayslipController::index
 * @see app/Http/Controllers/Api/Employee/PayslipController.php:15
 * @route '/api/v1/employee/payslips'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\Employee\PayslipController::index
 * @see app/Http/Controllers/Api/Employee/PayslipController.php:15
 * @route '/api/v1/employee/payslips'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\Employee\PayslipController::index
 * @see app/Http/Controllers/Api/Employee/PayslipController.php:15
 * @route '/api/v1/employee/payslips'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\Employee\PayslipController::index
 * @see app/Http/Controllers/Api/Employee/PayslipController.php:15
 * @route '/api/v1/employee/payslips'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\Employee\PayslipController::index
 * @see app/Http/Controllers/Api/Employee/PayslipController.php:15
 * @route '/api/v1/employee/payslips'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\Employee\PayslipController::index
 * @see app/Http/Controllers/Api/Employee/PayslipController.php:15
 * @route '/api/v1/employee/payslips'
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
* @see \App\Http\Controllers\Api\Employee\PayslipController::latest
 * @see app/Http/Controllers/Api/Employee/PayslipController.php:49
 * @route '/api/v1/employee/payslips/latest'
 */
export const latest = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: latest.url(options),
    method: 'get',
})

latest.definition = {
    methods: ["get","head"],
    url: '/api/v1/employee/payslips/latest',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\Employee\PayslipController::latest
 * @see app/Http/Controllers/Api/Employee/PayslipController.php:49
 * @route '/api/v1/employee/payslips/latest'
 */
latest.url = (options?: RouteQueryOptions) => {
    return latest.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\Employee\PayslipController::latest
 * @see app/Http/Controllers/Api/Employee/PayslipController.php:49
 * @route '/api/v1/employee/payslips/latest'
 */
latest.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: latest.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\Employee\PayslipController::latest
 * @see app/Http/Controllers/Api/Employee/PayslipController.php:49
 * @route '/api/v1/employee/payslips/latest'
 */
latest.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: latest.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\Employee\PayslipController::latest
 * @see app/Http/Controllers/Api/Employee/PayslipController.php:49
 * @route '/api/v1/employee/payslips/latest'
 */
    const latestForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: latest.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\Employee\PayslipController::latest
 * @see app/Http/Controllers/Api/Employee/PayslipController.php:49
 * @route '/api/v1/employee/payslips/latest'
 */
        latestForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: latest.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\Employee\PayslipController::latest
 * @see app/Http/Controllers/Api/Employee/PayslipController.php:49
 * @route '/api/v1/employee/payslips/latest'
 */
        latestForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: latest.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    latest.form = latestForm
/**
* @see \App\Http\Controllers\Api\Employee\PayslipController::show
 * @see app/Http/Controllers/Api/Employee/PayslipController.php:69
 * @route '/api/v1/employee/payslips/{payslip}'
 */
export const show = (args: { payslip: number | { id: number } } | [payslip: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/api/v1/employee/payslips/{payslip}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\Employee\PayslipController::show
 * @see app/Http/Controllers/Api/Employee/PayslipController.php:69
 * @route '/api/v1/employee/payslips/{payslip}'
 */
show.url = (args: { payslip: number | { id: number } } | [payslip: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { payslip: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { payslip: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    payslip: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        payslip: typeof args.payslip === 'object'
                ? args.payslip.id
                : args.payslip,
                }

    return show.definition.url
            .replace('{payslip}', parsedArgs.payslip.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\Employee\PayslipController::show
 * @see app/Http/Controllers/Api/Employee/PayslipController.php:69
 * @route '/api/v1/employee/payslips/{payslip}'
 */
show.get = (args: { payslip: number | { id: number } } | [payslip: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\Employee\PayslipController::show
 * @see app/Http/Controllers/Api/Employee/PayslipController.php:69
 * @route '/api/v1/employee/payslips/{payslip}'
 */
show.head = (args: { payslip: number | { id: number } } | [payslip: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\Employee\PayslipController::show
 * @see app/Http/Controllers/Api/Employee/PayslipController.php:69
 * @route '/api/v1/employee/payslips/{payslip}'
 */
    const showForm = (args: { payslip: number | { id: number } } | [payslip: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\Employee\PayslipController::show
 * @see app/Http/Controllers/Api/Employee/PayslipController.php:69
 * @route '/api/v1/employee/payslips/{payslip}'
 */
        showForm.get = (args: { payslip: number | { id: number } } | [payslip: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\Employee\PayslipController::show
 * @see app/Http/Controllers/Api/Employee/PayslipController.php:69
 * @route '/api/v1/employee/payslips/{payslip}'
 */
        showForm.head = (args: { payslip: number | { id: number } } | [payslip: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
const PayslipController = { index, latest, show }

export default PayslipController