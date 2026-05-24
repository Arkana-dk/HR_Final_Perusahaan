import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Employee\AttendanceController::index
 * @see app/Http/Controllers/Employee/AttendanceController.php:32
 * @route '/employee/attendance'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/employee/attendance',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Employee\AttendanceController::index
 * @see app/Http/Controllers/Employee/AttendanceController.php:32
 * @route '/employee/attendance'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Employee\AttendanceController::index
 * @see app/Http/Controllers/Employee/AttendanceController.php:32
 * @route '/employee/attendance'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Employee\AttendanceController::index
 * @see app/Http/Controllers/Employee/AttendanceController.php:32
 * @route '/employee/attendance'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Employee\AttendanceController::index
 * @see app/Http/Controllers/Employee/AttendanceController.php:32
 * @route '/employee/attendance'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Employee\AttendanceController::index
 * @see app/Http/Controllers/Employee/AttendanceController.php:32
 * @route '/employee/attendance'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Employee\AttendanceController::index
 * @see app/Http/Controllers/Employee/AttendanceController.php:32
 * @route '/employee/attendance'
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
* @see \App\Http\Controllers\Employee\AttendanceController::checkIn
 * @see app/Http/Controllers/Employee/AttendanceController.php:112
 * @route '/employee/attendance/check-in'
 */
export const checkIn = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: checkIn.url(options),
    method: 'post',
})

checkIn.definition = {
    methods: ["post"],
    url: '/employee/attendance/check-in',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Employee\AttendanceController::checkIn
 * @see app/Http/Controllers/Employee/AttendanceController.php:112
 * @route '/employee/attendance/check-in'
 */
checkIn.url = (options?: RouteQueryOptions) => {
    return checkIn.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Employee\AttendanceController::checkIn
 * @see app/Http/Controllers/Employee/AttendanceController.php:112
 * @route '/employee/attendance/check-in'
 */
checkIn.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: checkIn.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Employee\AttendanceController::checkIn
 * @see app/Http/Controllers/Employee/AttendanceController.php:112
 * @route '/employee/attendance/check-in'
 */
    const checkInForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: checkIn.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Employee\AttendanceController::checkIn
 * @see app/Http/Controllers/Employee/AttendanceController.php:112
 * @route '/employee/attendance/check-in'
 */
        checkInForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: checkIn.url(options),
            method: 'post',
        })
    
    checkIn.form = checkInForm
/**
* @see \App\Http\Controllers\Employee\AttendanceController::checkOut
 * @see app/Http/Controllers/Employee/AttendanceController.php:292
 * @route '/employee/attendance/check-out'
 */
export const checkOut = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: checkOut.url(options),
    method: 'post',
})

checkOut.definition = {
    methods: ["post"],
    url: '/employee/attendance/check-out',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Employee\AttendanceController::checkOut
 * @see app/Http/Controllers/Employee/AttendanceController.php:292
 * @route '/employee/attendance/check-out'
 */
checkOut.url = (options?: RouteQueryOptions) => {
    return checkOut.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Employee\AttendanceController::checkOut
 * @see app/Http/Controllers/Employee/AttendanceController.php:292
 * @route '/employee/attendance/check-out'
 */
checkOut.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: checkOut.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Employee\AttendanceController::checkOut
 * @see app/Http/Controllers/Employee/AttendanceController.php:292
 * @route '/employee/attendance/check-out'
 */
    const checkOutForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: checkOut.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Employee\AttendanceController::checkOut
 * @see app/Http/Controllers/Employee/AttendanceController.php:292
 * @route '/employee/attendance/check-out'
 */
        checkOutForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: checkOut.url(options),
            method: 'post',
        })
    
    checkOut.form = checkOutForm
const AttendanceController = { index, checkIn, checkOut }

export default AttendanceController