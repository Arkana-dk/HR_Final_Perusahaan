import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Time\AttendanceController::index
 * @see app/Http/Controllers/Time/AttendanceController.php:23
 * @route '/modules/attendance'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/modules/attendance',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Time\AttendanceController::index
 * @see app/Http/Controllers/Time/AttendanceController.php:23
 * @route '/modules/attendance'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Time\AttendanceController::index
 * @see app/Http/Controllers/Time/AttendanceController.php:23
 * @route '/modules/attendance'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Time\AttendanceController::index
 * @see app/Http/Controllers/Time/AttendanceController.php:23
 * @route '/modules/attendance'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Time\AttendanceController::index
 * @see app/Http/Controllers/Time/AttendanceController.php:23
 * @route '/modules/attendance'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Time\AttendanceController::index
 * @see app/Http/Controllers/Time/AttendanceController.php:23
 * @route '/modules/attendance'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Time\AttendanceController::index
 * @see app/Http/Controllers/Time/AttendanceController.php:23
 * @route '/modules/attendance'
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
* @see \App\Http\Controllers\Time\AttendanceController::approve
 * @see app/Http/Controllers/Time/AttendanceController.php:88
 * @route '/modules/attendance/{attendance}/approve'
 */
export const approve = (args: { attendance: number | { id: number } } | [attendance: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: approve.url(args, options),
    method: 'post',
})

approve.definition = {
    methods: ["post"],
    url: '/modules/attendance/{attendance}/approve',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Time\AttendanceController::approve
 * @see app/Http/Controllers/Time/AttendanceController.php:88
 * @route '/modules/attendance/{attendance}/approve'
 */
approve.url = (args: { attendance: number | { id: number } } | [attendance: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { attendance: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { attendance: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    attendance: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        attendance: typeof args.attendance === 'object'
                ? args.attendance.id
                : args.attendance,
                }

    return approve.definition.url
            .replace('{attendance}', parsedArgs.attendance.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Time\AttendanceController::approve
 * @see app/Http/Controllers/Time/AttendanceController.php:88
 * @route '/modules/attendance/{attendance}/approve'
 */
approve.post = (args: { attendance: number | { id: number } } | [attendance: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: approve.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Time\AttendanceController::approve
 * @see app/Http/Controllers/Time/AttendanceController.php:88
 * @route '/modules/attendance/{attendance}/approve'
 */
    const approveForm = (args: { attendance: number | { id: number } } | [attendance: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: approve.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Time\AttendanceController::approve
 * @see app/Http/Controllers/Time/AttendanceController.php:88
 * @route '/modules/attendance/{attendance}/approve'
 */
        approveForm.post = (args: { attendance: number | { id: number } } | [attendance: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: approve.url(args, options),
            method: 'post',
        })
    
    approve.form = approveForm
/**
* @see \App\Http\Controllers\Time\AttendanceController::reject
 * @see app/Http/Controllers/Time/AttendanceController.php:136
 * @route '/modules/attendance/{attendance}/reject'
 */
export const reject = (args: { attendance: number | { id: number } } | [attendance: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reject.url(args, options),
    method: 'post',
})

reject.definition = {
    methods: ["post"],
    url: '/modules/attendance/{attendance}/reject',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Time\AttendanceController::reject
 * @see app/Http/Controllers/Time/AttendanceController.php:136
 * @route '/modules/attendance/{attendance}/reject'
 */
reject.url = (args: { attendance: number | { id: number } } | [attendance: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { attendance: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { attendance: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    attendance: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        attendance: typeof args.attendance === 'object'
                ? args.attendance.id
                : args.attendance,
                }

    return reject.definition.url
            .replace('{attendance}', parsedArgs.attendance.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Time\AttendanceController::reject
 * @see app/Http/Controllers/Time/AttendanceController.php:136
 * @route '/modules/attendance/{attendance}/reject'
 */
reject.post = (args: { attendance: number | { id: number } } | [attendance: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reject.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Time\AttendanceController::reject
 * @see app/Http/Controllers/Time/AttendanceController.php:136
 * @route '/modules/attendance/{attendance}/reject'
 */
    const rejectForm = (args: { attendance: number | { id: number } } | [attendance: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: reject.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Time\AttendanceController::reject
 * @see app/Http/Controllers/Time/AttendanceController.php:136
 * @route '/modules/attendance/{attendance}/reject'
 */
        rejectForm.post = (args: { attendance: number | { id: number } } | [attendance: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: reject.url(args, options),
            method: 'post',
        })
    
    reject.form = rejectForm
const AttendanceController = { index, approve, reject }

export default AttendanceController