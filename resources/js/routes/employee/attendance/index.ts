import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
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
* @see \App\Http\Controllers\Employee\AttendanceController::checkin
 * @see app/Http/Controllers/Employee/AttendanceController.php:112
 * @route '/employee/attendance/check-in'
 */
export const checkin = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: checkin.url(options),
    method: 'post',
})

checkin.definition = {
    methods: ["post"],
    url: '/employee/attendance/check-in',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Employee\AttendanceController::checkin
 * @see app/Http/Controllers/Employee/AttendanceController.php:112
 * @route '/employee/attendance/check-in'
 */
checkin.url = (options?: RouteQueryOptions) => {
    return checkin.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Employee\AttendanceController::checkin
 * @see app/Http/Controllers/Employee/AttendanceController.php:112
 * @route '/employee/attendance/check-in'
 */
checkin.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: checkin.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Employee\AttendanceController::checkin
 * @see app/Http/Controllers/Employee/AttendanceController.php:112
 * @route '/employee/attendance/check-in'
 */
    const checkinForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: checkin.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Employee\AttendanceController::checkin
 * @see app/Http/Controllers/Employee/AttendanceController.php:112
 * @route '/employee/attendance/check-in'
 */
        checkinForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: checkin.url(options),
            method: 'post',
        })
    
    checkin.form = checkinForm
/**
* @see \App\Http\Controllers\Employee\AttendanceController::checkout
 * @see app/Http/Controllers/Employee/AttendanceController.php:292
 * @route '/employee/attendance/check-out'
 */
export const checkout = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: checkout.url(options),
    method: 'post',
})

checkout.definition = {
    methods: ["post"],
    url: '/employee/attendance/check-out',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Employee\AttendanceController::checkout
 * @see app/Http/Controllers/Employee/AttendanceController.php:292
 * @route '/employee/attendance/check-out'
 */
checkout.url = (options?: RouteQueryOptions) => {
    return checkout.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Employee\AttendanceController::checkout
 * @see app/Http/Controllers/Employee/AttendanceController.php:292
 * @route '/employee/attendance/check-out'
 */
checkout.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: checkout.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Employee\AttendanceController::checkout
 * @see app/Http/Controllers/Employee/AttendanceController.php:292
 * @route '/employee/attendance/check-out'
 */
    const checkoutForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: checkout.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Employee\AttendanceController::checkout
 * @see app/Http/Controllers/Employee/AttendanceController.php:292
 * @route '/employee/attendance/check-out'
 */
        checkoutForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: checkout.url(options),
            method: 'post',
        })
    
    checkout.form = checkoutForm
const attendance = {
    index: Object.assign(index, index),
checkin: Object.assign(checkin, checkin),
checkout: Object.assign(checkout, checkout),
}

export default attendance