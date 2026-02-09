import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Employee\EmployeePayslipController::downloadLatest
 * @see app/Http/Controllers/Employee/EmployeePayslipController.php:12
 * @route '/api/v1/employee/payslips/latest/download'
 */
const downloadLatestc7edb191db029060016c797bde3dfe6f = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: downloadLatestc7edb191db029060016c797bde3dfe6f.url(options),
    method: 'get',
})

downloadLatestc7edb191db029060016c797bde3dfe6f.definition = {
    methods: ["get","head"],
    url: '/api/v1/employee/payslips/latest/download',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Employee\EmployeePayslipController::downloadLatest
 * @see app/Http/Controllers/Employee/EmployeePayslipController.php:12
 * @route '/api/v1/employee/payslips/latest/download'
 */
downloadLatestc7edb191db029060016c797bde3dfe6f.url = (options?: RouteQueryOptions) => {
    return downloadLatestc7edb191db029060016c797bde3dfe6f.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Employee\EmployeePayslipController::downloadLatest
 * @see app/Http/Controllers/Employee/EmployeePayslipController.php:12
 * @route '/api/v1/employee/payslips/latest/download'
 */
downloadLatestc7edb191db029060016c797bde3dfe6f.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: downloadLatestc7edb191db029060016c797bde3dfe6f.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Employee\EmployeePayslipController::downloadLatest
 * @see app/Http/Controllers/Employee/EmployeePayslipController.php:12
 * @route '/api/v1/employee/payslips/latest/download'
 */
downloadLatestc7edb191db029060016c797bde3dfe6f.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: downloadLatestc7edb191db029060016c797bde3dfe6f.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Employee\EmployeePayslipController::downloadLatest
 * @see app/Http/Controllers/Employee/EmployeePayslipController.php:12
 * @route '/api/v1/employee/payslips/latest/download'
 */
    const downloadLatestc7edb191db029060016c797bde3dfe6fForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: downloadLatestc7edb191db029060016c797bde3dfe6f.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Employee\EmployeePayslipController::downloadLatest
 * @see app/Http/Controllers/Employee/EmployeePayslipController.php:12
 * @route '/api/v1/employee/payslips/latest/download'
 */
        downloadLatestc7edb191db029060016c797bde3dfe6fForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: downloadLatestc7edb191db029060016c797bde3dfe6f.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Employee\EmployeePayslipController::downloadLatest
 * @see app/Http/Controllers/Employee/EmployeePayslipController.php:12
 * @route '/api/v1/employee/payslips/latest/download'
 */
        downloadLatestc7edb191db029060016c797bde3dfe6fForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: downloadLatestc7edb191db029060016c797bde3dfe6f.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    downloadLatestc7edb191db029060016c797bde3dfe6f.form = downloadLatestc7edb191db029060016c797bde3dfe6fForm
    /**
* @see \App\Http\Controllers\Employee\EmployeePayslipController::downloadLatest
 * @see app/Http/Controllers/Employee/EmployeePayslipController.php:12
 * @route '/employee/payslips/latest/download'
 */
const downloadLatestc08d04de3aa617f16bed18dceae90480 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: downloadLatestc08d04de3aa617f16bed18dceae90480.url(options),
    method: 'get',
})

downloadLatestc08d04de3aa617f16bed18dceae90480.definition = {
    methods: ["get","head"],
    url: '/employee/payslips/latest/download',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Employee\EmployeePayslipController::downloadLatest
 * @see app/Http/Controllers/Employee/EmployeePayslipController.php:12
 * @route '/employee/payslips/latest/download'
 */
downloadLatestc08d04de3aa617f16bed18dceae90480.url = (options?: RouteQueryOptions) => {
    return downloadLatestc08d04de3aa617f16bed18dceae90480.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Employee\EmployeePayslipController::downloadLatest
 * @see app/Http/Controllers/Employee/EmployeePayslipController.php:12
 * @route '/employee/payslips/latest/download'
 */
downloadLatestc08d04de3aa617f16bed18dceae90480.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: downloadLatestc08d04de3aa617f16bed18dceae90480.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Employee\EmployeePayslipController::downloadLatest
 * @see app/Http/Controllers/Employee/EmployeePayslipController.php:12
 * @route '/employee/payslips/latest/download'
 */
downloadLatestc08d04de3aa617f16bed18dceae90480.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: downloadLatestc08d04de3aa617f16bed18dceae90480.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Employee\EmployeePayslipController::downloadLatest
 * @see app/Http/Controllers/Employee/EmployeePayslipController.php:12
 * @route '/employee/payslips/latest/download'
 */
    const downloadLatestc08d04de3aa617f16bed18dceae90480Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: downloadLatestc08d04de3aa617f16bed18dceae90480.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Employee\EmployeePayslipController::downloadLatest
 * @see app/Http/Controllers/Employee/EmployeePayslipController.php:12
 * @route '/employee/payslips/latest/download'
 */
        downloadLatestc08d04de3aa617f16bed18dceae90480Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: downloadLatestc08d04de3aa617f16bed18dceae90480.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Employee\EmployeePayslipController::downloadLatest
 * @see app/Http/Controllers/Employee/EmployeePayslipController.php:12
 * @route '/employee/payslips/latest/download'
 */
        downloadLatestc08d04de3aa617f16bed18dceae90480Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: downloadLatestc08d04de3aa617f16bed18dceae90480.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    downloadLatestc08d04de3aa617f16bed18dceae90480.form = downloadLatestc08d04de3aa617f16bed18dceae90480Form

export const downloadLatest = {
    '/api/v1/employee/payslips/latest/download': downloadLatestc7edb191db029060016c797bde3dfe6f,
    '/employee/payslips/latest/download': downloadLatestc08d04de3aa617f16bed18dceae90480,
}

const EmployeePayslipController = { downloadLatest }

export default EmployeePayslipController