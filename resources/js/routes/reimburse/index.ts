import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\Finance\ReimburseController::index
 * @see app/Http/Controllers/Finance/ReimburseController.php:13
 * @route '/modules/reimburse'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/modules/reimburse',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Finance\ReimburseController::index
 * @see app/Http/Controllers/Finance/ReimburseController.php:13
 * @route '/modules/reimburse'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Finance\ReimburseController::index
 * @see app/Http/Controllers/Finance/ReimburseController.php:13
 * @route '/modules/reimburse'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Finance\ReimburseController::index
 * @see app/Http/Controllers/Finance/ReimburseController.php:13
 * @route '/modules/reimburse'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Finance\ReimburseController::index
 * @see app/Http/Controllers/Finance/ReimburseController.php:13
 * @route '/modules/reimburse'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Finance\ReimburseController::index
 * @see app/Http/Controllers/Finance/ReimburseController.php:13
 * @route '/modules/reimburse'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Finance\ReimburseController::index
 * @see app/Http/Controllers/Finance/ReimburseController.php:13
 * @route '/modules/reimburse'
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
* @see \App\Http\Controllers\Finance\ReimburseController::approve
 * @see app/Http/Controllers/Finance/ReimburseController.php:67
 * @route '/modules/reimburse/{reimburse}/approve'
 */
export const approve = (args: { reimburse: number | { id: number } } | [reimburse: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: approve.url(args, options),
    method: 'post',
})

approve.definition = {
    methods: ["post"],
    url: '/modules/reimburse/{reimburse}/approve',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Finance\ReimburseController::approve
 * @see app/Http/Controllers/Finance/ReimburseController.php:67
 * @route '/modules/reimburse/{reimburse}/approve'
 */
approve.url = (args: { reimburse: number | { id: number } } | [reimburse: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { reimburse: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { reimburse: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    reimburse: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        reimburse: typeof args.reimburse === 'object'
                ? args.reimburse.id
                : args.reimburse,
                }

    return approve.definition.url
            .replace('{reimburse}', parsedArgs.reimburse.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Finance\ReimburseController::approve
 * @see app/Http/Controllers/Finance/ReimburseController.php:67
 * @route '/modules/reimburse/{reimburse}/approve'
 */
approve.post = (args: { reimburse: number | { id: number } } | [reimburse: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: approve.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Finance\ReimburseController::approve
 * @see app/Http/Controllers/Finance/ReimburseController.php:67
 * @route '/modules/reimburse/{reimburse}/approve'
 */
    const approveForm = (args: { reimburse: number | { id: number } } | [reimburse: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: approve.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Finance\ReimburseController::approve
 * @see app/Http/Controllers/Finance/ReimburseController.php:67
 * @route '/modules/reimburse/{reimburse}/approve'
 */
        approveForm.post = (args: { reimburse: number | { id: number } } | [reimburse: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: approve.url(args, options),
            method: 'post',
        })
    
    approve.form = approveForm
/**
* @see \App\Http\Controllers\Finance\ReimburseController::reject
 * @see app/Http/Controllers/Finance/ReimburseController.php:89
 * @route '/modules/reimburse/{reimburse}/reject'
 */
export const reject = (args: { reimburse: number | { id: number } } | [reimburse: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reject.url(args, options),
    method: 'post',
})

reject.definition = {
    methods: ["post"],
    url: '/modules/reimburse/{reimburse}/reject',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Finance\ReimburseController::reject
 * @see app/Http/Controllers/Finance/ReimburseController.php:89
 * @route '/modules/reimburse/{reimburse}/reject'
 */
reject.url = (args: { reimburse: number | { id: number } } | [reimburse: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { reimburse: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { reimburse: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    reimburse: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        reimburse: typeof args.reimburse === 'object'
                ? args.reimburse.id
                : args.reimburse,
                }

    return reject.definition.url
            .replace('{reimburse}', parsedArgs.reimburse.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Finance\ReimburseController::reject
 * @see app/Http/Controllers/Finance/ReimburseController.php:89
 * @route '/modules/reimburse/{reimburse}/reject'
 */
reject.post = (args: { reimburse: number | { id: number } } | [reimburse: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reject.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Finance\ReimburseController::reject
 * @see app/Http/Controllers/Finance/ReimburseController.php:89
 * @route '/modules/reimburse/{reimburse}/reject'
 */
    const rejectForm = (args: { reimburse: number | { id: number } } | [reimburse: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: reject.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Finance\ReimburseController::reject
 * @see app/Http/Controllers/Finance/ReimburseController.php:89
 * @route '/modules/reimburse/{reimburse}/reject'
 */
        rejectForm.post = (args: { reimburse: number | { id: number } } | [reimburse: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: reject.url(args, options),
            method: 'post',
        })
    
    reject.form = rejectForm
const reimburse = {
    index: Object.assign(index, index),
approve: Object.assign(approve, approve),
reject: Object.assign(reject, reject),
}

export default reimburse