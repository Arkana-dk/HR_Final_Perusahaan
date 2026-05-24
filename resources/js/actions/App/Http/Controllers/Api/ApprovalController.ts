import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\ApprovalController::pending
 * @see app/Http/Controllers/Api/ApprovalController.php:36
 * @route '/api/v1/approvals/pending'
 */
export const pending = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: pending.url(options),
    method: 'get',
})

pending.definition = {
    methods: ["get","head"],
    url: '/api/v1/approvals/pending',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\ApprovalController::pending
 * @see app/Http/Controllers/Api/ApprovalController.php:36
 * @route '/api/v1/approvals/pending'
 */
pending.url = (options?: RouteQueryOptions) => {
    return pending.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\ApprovalController::pending
 * @see app/Http/Controllers/Api/ApprovalController.php:36
 * @route '/api/v1/approvals/pending'
 */
pending.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: pending.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\ApprovalController::pending
 * @see app/Http/Controllers/Api/ApprovalController.php:36
 * @route '/api/v1/approvals/pending'
 */
pending.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: pending.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\ApprovalController::pending
 * @see app/Http/Controllers/Api/ApprovalController.php:36
 * @route '/api/v1/approvals/pending'
 */
    const pendingForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: pending.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\ApprovalController::pending
 * @see app/Http/Controllers/Api/ApprovalController.php:36
 * @route '/api/v1/approvals/pending'
 */
        pendingForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: pending.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\ApprovalController::pending
 * @see app/Http/Controllers/Api/ApprovalController.php:36
 * @route '/api/v1/approvals/pending'
 */
        pendingForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: pending.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    pending.form = pendingForm
/**
* @see \App\Http\Controllers\Api\ApprovalController::approve
 * @see app/Http/Controllers/Api/ApprovalController.php:90
 * @route '/api/v1/approvals/{type}/{id}/approve'
 */
export const approve = (args: { type: string | number, id: string | number } | [type: string | number, id: string | number ], options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: approve.url(args, options),
    method: 'post',
})

approve.definition = {
    methods: ["post"],
    url: '/api/v1/approvals/{type}/{id}/approve',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\ApprovalController::approve
 * @see app/Http/Controllers/Api/ApprovalController.php:90
 * @route '/api/v1/approvals/{type}/{id}/approve'
 */
approve.url = (args: { type: string | number, id: string | number } | [type: string | number, id: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    type: args[0],
                    id: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        type: args.type,
                                id: args.id,
                }

    return approve.definition.url
            .replace('{type}', parsedArgs.type.toString())
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\ApprovalController::approve
 * @see app/Http/Controllers/Api/ApprovalController.php:90
 * @route '/api/v1/approvals/{type}/{id}/approve'
 */
approve.post = (args: { type: string | number, id: string | number } | [type: string | number, id: string | number ], options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: approve.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Api\ApprovalController::approve
 * @see app/Http/Controllers/Api/ApprovalController.php:90
 * @route '/api/v1/approvals/{type}/{id}/approve'
 */
    const approveForm = (args: { type: string | number, id: string | number } | [type: string | number, id: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: approve.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\ApprovalController::approve
 * @see app/Http/Controllers/Api/ApprovalController.php:90
 * @route '/api/v1/approvals/{type}/{id}/approve'
 */
        approveForm.post = (args: { type: string | number, id: string | number } | [type: string | number, id: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: approve.url(args, options),
            method: 'post',
        })
    
    approve.form = approveForm
/**
* @see \App\Http\Controllers\Api\ApprovalController::reject
 * @see app/Http/Controllers/Api/ApprovalController.php:104
 * @route '/api/v1/approvals/{type}/{id}/reject'
 */
export const reject = (args: { type: string | number, id: string | number } | [type: string | number, id: string | number ], options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reject.url(args, options),
    method: 'post',
})

reject.definition = {
    methods: ["post"],
    url: '/api/v1/approvals/{type}/{id}/reject',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\ApprovalController::reject
 * @see app/Http/Controllers/Api/ApprovalController.php:104
 * @route '/api/v1/approvals/{type}/{id}/reject'
 */
reject.url = (args: { type: string | number, id: string | number } | [type: string | number, id: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    type: args[0],
                    id: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        type: args.type,
                                id: args.id,
                }

    return reject.definition.url
            .replace('{type}', parsedArgs.type.toString())
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\ApprovalController::reject
 * @see app/Http/Controllers/Api/ApprovalController.php:104
 * @route '/api/v1/approvals/{type}/{id}/reject'
 */
reject.post = (args: { type: string | number, id: string | number } | [type: string | number, id: string | number ], options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reject.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Api\ApprovalController::reject
 * @see app/Http/Controllers/Api/ApprovalController.php:104
 * @route '/api/v1/approvals/{type}/{id}/reject'
 */
    const rejectForm = (args: { type: string | number, id: string | number } | [type: string | number, id: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: reject.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\ApprovalController::reject
 * @see app/Http/Controllers/Api/ApprovalController.php:104
 * @route '/api/v1/approvals/{type}/{id}/reject'
 */
        rejectForm.post = (args: { type: string | number, id: string | number } | [type: string | number, id: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: reject.url(args, options),
            method: 'post',
        })
    
    reject.form = rejectForm
const ApprovalController = { pending, approve, reject }

export default ApprovalController