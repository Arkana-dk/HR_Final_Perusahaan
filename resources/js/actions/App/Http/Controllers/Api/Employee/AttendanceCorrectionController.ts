import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\Employee\AttendanceCorrectionController::index
 * @see app/Http/Controllers/Api/Employee/AttendanceCorrectionController.php:31
 * @route '/api/v1/employee/attendance/corrections'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/v1/employee/attendance/corrections',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\Employee\AttendanceCorrectionController::index
 * @see app/Http/Controllers/Api/Employee/AttendanceCorrectionController.php:31
 * @route '/api/v1/employee/attendance/corrections'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\Employee\AttendanceCorrectionController::index
 * @see app/Http/Controllers/Api/Employee/AttendanceCorrectionController.php:31
 * @route '/api/v1/employee/attendance/corrections'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\Employee\AttendanceCorrectionController::index
 * @see app/Http/Controllers/Api/Employee/AttendanceCorrectionController.php:31
 * @route '/api/v1/employee/attendance/corrections'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\Employee\AttendanceCorrectionController::index
 * @see app/Http/Controllers/Api/Employee/AttendanceCorrectionController.php:31
 * @route '/api/v1/employee/attendance/corrections'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\Employee\AttendanceCorrectionController::index
 * @see app/Http/Controllers/Api/Employee/AttendanceCorrectionController.php:31
 * @route '/api/v1/employee/attendance/corrections'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\Employee\AttendanceCorrectionController::index
 * @see app/Http/Controllers/Api/Employee/AttendanceCorrectionController.php:31
 * @route '/api/v1/employee/attendance/corrections'
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
* @see \App\Http\Controllers\Api\Employee\AttendanceCorrectionController::show
 * @see app/Http/Controllers/Api/Employee/AttendanceCorrectionController.php:82
 * @route '/api/v1/employee/attendance/corrections/{attendanceCorrection}'
 */
export const show = (args: { attendanceCorrection: string | number | { id: string | number } } | [attendanceCorrection: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/api/v1/employee/attendance/corrections/{attendanceCorrection}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\Employee\AttendanceCorrectionController::show
 * @see app/Http/Controllers/Api/Employee/AttendanceCorrectionController.php:82
 * @route '/api/v1/employee/attendance/corrections/{attendanceCorrection}'
 */
show.url = (args: { attendanceCorrection: string | number | { id: string | number } } | [attendanceCorrection: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { attendanceCorrection: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { attendanceCorrection: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    attendanceCorrection: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        attendanceCorrection: typeof args.attendanceCorrection === 'object'
                ? args.attendanceCorrection.id
                : args.attendanceCorrection,
                }

    return show.definition.url
            .replace('{attendanceCorrection}', parsedArgs.attendanceCorrection.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\Employee\AttendanceCorrectionController::show
 * @see app/Http/Controllers/Api/Employee/AttendanceCorrectionController.php:82
 * @route '/api/v1/employee/attendance/corrections/{attendanceCorrection}'
 */
show.get = (args: { attendanceCorrection: string | number | { id: string | number } } | [attendanceCorrection: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\Employee\AttendanceCorrectionController::show
 * @see app/Http/Controllers/Api/Employee/AttendanceCorrectionController.php:82
 * @route '/api/v1/employee/attendance/corrections/{attendanceCorrection}'
 */
show.head = (args: { attendanceCorrection: string | number | { id: string | number } } | [attendanceCorrection: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\Employee\AttendanceCorrectionController::show
 * @see app/Http/Controllers/Api/Employee/AttendanceCorrectionController.php:82
 * @route '/api/v1/employee/attendance/corrections/{attendanceCorrection}'
 */
    const showForm = (args: { attendanceCorrection: string | number | { id: string | number } } | [attendanceCorrection: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\Employee\AttendanceCorrectionController::show
 * @see app/Http/Controllers/Api/Employee/AttendanceCorrectionController.php:82
 * @route '/api/v1/employee/attendance/corrections/{attendanceCorrection}'
 */
        showForm.get = (args: { attendanceCorrection: string | number | { id: string | number } } | [attendanceCorrection: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\Employee\AttendanceCorrectionController::show
 * @see app/Http/Controllers/Api/Employee/AttendanceCorrectionController.php:82
 * @route '/api/v1/employee/attendance/corrections/{attendanceCorrection}'
 */
        showForm.head = (args: { attendanceCorrection: string | number | { id: string | number } } | [attendanceCorrection: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
/**
* @see \App\Http\Controllers\Api\Employee\AttendanceCorrectionController::store
 * @see app/Http/Controllers/Api/Employee/AttendanceCorrectionController.php:99
 * @route '/api/v1/employee/attendance/corrections'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/v1/employee/attendance/corrections',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\Employee\AttendanceCorrectionController::store
 * @see app/Http/Controllers/Api/Employee/AttendanceCorrectionController.php:99
 * @route '/api/v1/employee/attendance/corrections'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\Employee\AttendanceCorrectionController::store
 * @see app/Http/Controllers/Api/Employee/AttendanceCorrectionController.php:99
 * @route '/api/v1/employee/attendance/corrections'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Api\Employee\AttendanceCorrectionController::store
 * @see app/Http/Controllers/Api/Employee/AttendanceCorrectionController.php:99
 * @route '/api/v1/employee/attendance/corrections'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\Employee\AttendanceCorrectionController::store
 * @see app/Http/Controllers/Api/Employee/AttendanceCorrectionController.php:99
 * @route '/api/v1/employee/attendance/corrections'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Api\Employee\AttendanceCorrectionController::cancel
 * @see app/Http/Controllers/Api/Employee/AttendanceCorrectionController.php:242
 * @route '/api/v1/employee/attendance/corrections/{attendanceCorrection}/cancel'
 */
export const cancel = (args: { attendanceCorrection: string | number | { id: string | number } } | [attendanceCorrection: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: cancel.url(args, options),
    method: 'post',
})

cancel.definition = {
    methods: ["post"],
    url: '/api/v1/employee/attendance/corrections/{attendanceCorrection}/cancel',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\Employee\AttendanceCorrectionController::cancel
 * @see app/Http/Controllers/Api/Employee/AttendanceCorrectionController.php:242
 * @route '/api/v1/employee/attendance/corrections/{attendanceCorrection}/cancel'
 */
cancel.url = (args: { attendanceCorrection: string | number | { id: string | number } } | [attendanceCorrection: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { attendanceCorrection: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { attendanceCorrection: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    attendanceCorrection: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        attendanceCorrection: typeof args.attendanceCorrection === 'object'
                ? args.attendanceCorrection.id
                : args.attendanceCorrection,
                }

    return cancel.definition.url
            .replace('{attendanceCorrection}', parsedArgs.attendanceCorrection.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\Employee\AttendanceCorrectionController::cancel
 * @see app/Http/Controllers/Api/Employee/AttendanceCorrectionController.php:242
 * @route '/api/v1/employee/attendance/corrections/{attendanceCorrection}/cancel'
 */
cancel.post = (args: { attendanceCorrection: string | number | { id: string | number } } | [attendanceCorrection: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: cancel.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Api\Employee\AttendanceCorrectionController::cancel
 * @see app/Http/Controllers/Api/Employee/AttendanceCorrectionController.php:242
 * @route '/api/v1/employee/attendance/corrections/{attendanceCorrection}/cancel'
 */
    const cancelForm = (args: { attendanceCorrection: string | number | { id: string | number } } | [attendanceCorrection: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: cancel.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\Employee\AttendanceCorrectionController::cancel
 * @see app/Http/Controllers/Api/Employee/AttendanceCorrectionController.php:242
 * @route '/api/v1/employee/attendance/corrections/{attendanceCorrection}/cancel'
 */
        cancelForm.post = (args: { attendanceCorrection: string | number | { id: string | number } } | [attendanceCorrection: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: cancel.url(args, options),
            method: 'post',
        })
    
    cancel.form = cancelForm
const AttendanceCorrectionController = { index, show, store, cancel }

export default AttendanceCorrectionController