import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\Leave\LeaveRequestController::index
 * @see app/Http/Controllers/Leave/LeaveRequestController.php:26
 * @route '/modules/leave-requests'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/modules/leave-requests',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Leave\LeaveRequestController::index
 * @see app/Http/Controllers/Leave/LeaveRequestController.php:26
 * @route '/modules/leave-requests'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Leave\LeaveRequestController::index
 * @see app/Http/Controllers/Leave/LeaveRequestController.php:26
 * @route '/modules/leave-requests'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Leave\LeaveRequestController::index
 * @see app/Http/Controllers/Leave/LeaveRequestController.php:26
 * @route '/modules/leave-requests'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Leave\LeaveRequestController::index
 * @see app/Http/Controllers/Leave/LeaveRequestController.php:26
 * @route '/modules/leave-requests'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Leave\LeaveRequestController::index
 * @see app/Http/Controllers/Leave/LeaveRequestController.php:26
 * @route '/modules/leave-requests'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Leave\LeaveRequestController::index
 * @see app/Http/Controllers/Leave/LeaveRequestController.php:26
 * @route '/modules/leave-requests'
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
* @see \App\Http\Controllers\Leave\LeaveRequestController::approve
 * @see app/Http/Controllers/Leave/LeaveRequestController.php:102
 * @route '/modules/leave-requests/{leaveRequest}/approve'
 */
export const approve = (args: { leaveRequest: number | { id: number } } | [leaveRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: approve.url(args, options),
    method: 'post',
})

approve.definition = {
    methods: ["post"],
    url: '/modules/leave-requests/{leaveRequest}/approve',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Leave\LeaveRequestController::approve
 * @see app/Http/Controllers/Leave/LeaveRequestController.php:102
 * @route '/modules/leave-requests/{leaveRequest}/approve'
 */
approve.url = (args: { leaveRequest: number | { id: number } } | [leaveRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { leaveRequest: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { leaveRequest: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    leaveRequest: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        leaveRequest: typeof args.leaveRequest === 'object'
                ? args.leaveRequest.id
                : args.leaveRequest,
                }

    return approve.definition.url
            .replace('{leaveRequest}', parsedArgs.leaveRequest.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Leave\LeaveRequestController::approve
 * @see app/Http/Controllers/Leave/LeaveRequestController.php:102
 * @route '/modules/leave-requests/{leaveRequest}/approve'
 */
approve.post = (args: { leaveRequest: number | { id: number } } | [leaveRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: approve.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Leave\LeaveRequestController::approve
 * @see app/Http/Controllers/Leave/LeaveRequestController.php:102
 * @route '/modules/leave-requests/{leaveRequest}/approve'
 */
    const approveForm = (args: { leaveRequest: number | { id: number } } | [leaveRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: approve.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Leave\LeaveRequestController::approve
 * @see app/Http/Controllers/Leave/LeaveRequestController.php:102
 * @route '/modules/leave-requests/{leaveRequest}/approve'
 */
        approveForm.post = (args: { leaveRequest: number | { id: number } } | [leaveRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: approve.url(args, options),
            method: 'post',
        })
    
    approve.form = approveForm
/**
* @see \App\Http\Controllers\Leave\LeaveRequestController::reject
 * @see app/Http/Controllers/Leave/LeaveRequestController.php:186
 * @route '/modules/leave-requests/{leaveRequest}/reject'
 */
export const reject = (args: { leaveRequest: number | { id: number } } | [leaveRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reject.url(args, options),
    method: 'post',
})

reject.definition = {
    methods: ["post"],
    url: '/modules/leave-requests/{leaveRequest}/reject',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Leave\LeaveRequestController::reject
 * @see app/Http/Controllers/Leave/LeaveRequestController.php:186
 * @route '/modules/leave-requests/{leaveRequest}/reject'
 */
reject.url = (args: { leaveRequest: number | { id: number } } | [leaveRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { leaveRequest: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { leaveRequest: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    leaveRequest: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        leaveRequest: typeof args.leaveRequest === 'object'
                ? args.leaveRequest.id
                : args.leaveRequest,
                }

    return reject.definition.url
            .replace('{leaveRequest}', parsedArgs.leaveRequest.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Leave\LeaveRequestController::reject
 * @see app/Http/Controllers/Leave/LeaveRequestController.php:186
 * @route '/modules/leave-requests/{leaveRequest}/reject'
 */
reject.post = (args: { leaveRequest: number | { id: number } } | [leaveRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reject.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Leave\LeaveRequestController::reject
 * @see app/Http/Controllers/Leave/LeaveRequestController.php:186
 * @route '/modules/leave-requests/{leaveRequest}/reject'
 */
    const rejectForm = (args: { leaveRequest: number | { id: number } } | [leaveRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: reject.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Leave\LeaveRequestController::reject
 * @see app/Http/Controllers/Leave/LeaveRequestController.php:186
 * @route '/modules/leave-requests/{leaveRequest}/reject'
 */
        rejectForm.post = (args: { leaveRequest: number | { id: number } } | [leaveRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: reject.url(args, options),
            method: 'post',
        })
    
    reject.form = rejectForm
const leaveRequests = {
    index: Object.assign(index, index),
approve: Object.assign(approve, approve),
reject: Object.assign(reject, reject),
}

export default leaveRequests