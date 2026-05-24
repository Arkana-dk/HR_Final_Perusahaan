import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\Employee\AttendanceController::today
 * @see app/Http/Controllers/Api/Employee/AttendanceController.php:35
 * @route '/api/v1/employee/attendance/today'
 */
export const today = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: today.url(options),
    method: 'get',
})

today.definition = {
    methods: ["get","head"],
    url: '/api/v1/employee/attendance/today',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\Employee\AttendanceController::today
 * @see app/Http/Controllers/Api/Employee/AttendanceController.php:35
 * @route '/api/v1/employee/attendance/today'
 */
today.url = (options?: RouteQueryOptions) => {
    return today.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\Employee\AttendanceController::today
 * @see app/Http/Controllers/Api/Employee/AttendanceController.php:35
 * @route '/api/v1/employee/attendance/today'
 */
today.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: today.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\Employee\AttendanceController::today
 * @see app/Http/Controllers/Api/Employee/AttendanceController.php:35
 * @route '/api/v1/employee/attendance/today'
 */
today.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: today.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\Employee\AttendanceController::today
 * @see app/Http/Controllers/Api/Employee/AttendanceController.php:35
 * @route '/api/v1/employee/attendance/today'
 */
    const todayForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: today.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\Employee\AttendanceController::today
 * @see app/Http/Controllers/Api/Employee/AttendanceController.php:35
 * @route '/api/v1/employee/attendance/today'
 */
        todayForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: today.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\Employee\AttendanceController::today
 * @see app/Http/Controllers/Api/Employee/AttendanceController.php:35
 * @route '/api/v1/employee/attendance/today'
 */
        todayForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: today.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    today.form = todayForm
/**
* @see \App\Http\Controllers\Api\Employee\AttendanceController::history
 * @see app/Http/Controllers/Api/Employee/AttendanceController.php:98
 * @route '/api/v1/employee/attendance/history'
 */
export const history = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: history.url(options),
    method: 'get',
})

history.definition = {
    methods: ["get","head"],
    url: '/api/v1/employee/attendance/history',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\Employee\AttendanceController::history
 * @see app/Http/Controllers/Api/Employee/AttendanceController.php:98
 * @route '/api/v1/employee/attendance/history'
 */
history.url = (options?: RouteQueryOptions) => {
    return history.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\Employee\AttendanceController::history
 * @see app/Http/Controllers/Api/Employee/AttendanceController.php:98
 * @route '/api/v1/employee/attendance/history'
 */
history.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: history.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\Employee\AttendanceController::history
 * @see app/Http/Controllers/Api/Employee/AttendanceController.php:98
 * @route '/api/v1/employee/attendance/history'
 */
history.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: history.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\Employee\AttendanceController::history
 * @see app/Http/Controllers/Api/Employee/AttendanceController.php:98
 * @route '/api/v1/employee/attendance/history'
 */
    const historyForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: history.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\Employee\AttendanceController::history
 * @see app/Http/Controllers/Api/Employee/AttendanceController.php:98
 * @route '/api/v1/employee/attendance/history'
 */
        historyForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: history.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\Employee\AttendanceController::history
 * @see app/Http/Controllers/Api/Employee/AttendanceController.php:98
 * @route '/api/v1/employee/attendance/history'
 */
        historyForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: history.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    history.form = historyForm
/**
* @see \App\Http\Controllers\Api\Employee\AttendanceController::checkIn
 * @see app/Http/Controllers/Api/Employee/AttendanceController.php:149
 * @route '/api/v1/employee/attendance/check-in'
 */
export const checkIn = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: checkIn.url(options),
    method: 'post',
})

checkIn.definition = {
    methods: ["post"],
    url: '/api/v1/employee/attendance/check-in',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\Employee\AttendanceController::checkIn
 * @see app/Http/Controllers/Api/Employee/AttendanceController.php:149
 * @route '/api/v1/employee/attendance/check-in'
 */
checkIn.url = (options?: RouteQueryOptions) => {
    return checkIn.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\Employee\AttendanceController::checkIn
 * @see app/Http/Controllers/Api/Employee/AttendanceController.php:149
 * @route '/api/v1/employee/attendance/check-in'
 */
checkIn.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: checkIn.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Api\Employee\AttendanceController::checkIn
 * @see app/Http/Controllers/Api/Employee/AttendanceController.php:149
 * @route '/api/v1/employee/attendance/check-in'
 */
    const checkInForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: checkIn.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\Employee\AttendanceController::checkIn
 * @see app/Http/Controllers/Api/Employee/AttendanceController.php:149
 * @route '/api/v1/employee/attendance/check-in'
 */
        checkInForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: checkIn.url(options),
            method: 'post',
        })
    
    checkIn.form = checkInForm
/**
* @see \App\Http\Controllers\Api\Employee\AttendanceController::checkOut
 * @see app/Http/Controllers/Api/Employee/AttendanceController.php:312
 * @route '/api/v1/employee/attendance/check-out'
 */
export const checkOut = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: checkOut.url(options),
    method: 'post',
})

checkOut.definition = {
    methods: ["post"],
    url: '/api/v1/employee/attendance/check-out',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\Employee\AttendanceController::checkOut
 * @see app/Http/Controllers/Api/Employee/AttendanceController.php:312
 * @route '/api/v1/employee/attendance/check-out'
 */
checkOut.url = (options?: RouteQueryOptions) => {
    return checkOut.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\Employee\AttendanceController::checkOut
 * @see app/Http/Controllers/Api/Employee/AttendanceController.php:312
 * @route '/api/v1/employee/attendance/check-out'
 */
checkOut.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: checkOut.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Api\Employee\AttendanceController::checkOut
 * @see app/Http/Controllers/Api/Employee/AttendanceController.php:312
 * @route '/api/v1/employee/attendance/check-out'
 */
    const checkOutForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: checkOut.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\Employee\AttendanceController::checkOut
 * @see app/Http/Controllers/Api/Employee/AttendanceController.php:312
 * @route '/api/v1/employee/attendance/check-out'
 */
        checkOutForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: checkOut.url(options),
            method: 'post',
        })
    
    checkOut.form = checkOutForm
const AttendanceController = { today, history, checkIn, checkOut }

export default AttendanceController