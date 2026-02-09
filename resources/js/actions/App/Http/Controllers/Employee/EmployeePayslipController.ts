import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Employee\EmployeePayslipController::downloadLatest
 * @see [unknown]:0
 * @route '/employee/payslips/latest/download'
 */
export const downloadLatest = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: downloadLatest.url(options),
    method: 'get',
})

downloadLatest.definition = {
    methods: ["get","head"],
    url: '/employee/payslips/latest/download',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Employee\EmployeePayslipController::downloadLatest
 * @see [unknown]:0
 * @route '/employee/payslips/latest/download'
 */
downloadLatest.url = (options?: RouteQueryOptions) => {
    return downloadLatest.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Employee\EmployeePayslipController::downloadLatest
 * @see [unknown]:0
 * @route '/employee/payslips/latest/download'
 */
downloadLatest.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: downloadLatest.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Employee\EmployeePayslipController::downloadLatest
 * @see [unknown]:0
 * @route '/employee/payslips/latest/download'
 */
downloadLatest.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: downloadLatest.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Employee\EmployeePayslipController::downloadLatest
 * @see [unknown]:0
 * @route '/employee/payslips/latest/download'
 */
    const downloadLatestForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: downloadLatest.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Employee\EmployeePayslipController::downloadLatest
 * @see [unknown]:0
 * @route '/employee/payslips/latest/download'
 */
        downloadLatestForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: downloadLatest.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Employee\EmployeePayslipController::downloadLatest
 * @see [unknown]:0
 * @route '/employee/payslips/latest/download'
 */
        downloadLatestForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: downloadLatest.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    downloadLatest.form = downloadLatestForm
const EmployeePayslipController = { downloadLatest }

export default EmployeePayslipController