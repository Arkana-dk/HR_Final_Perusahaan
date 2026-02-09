import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Time\OvertimeController::index
 * @see app/Http/Controllers/Time/OvertimeController.php:13
 * @route '/modules/overtime'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/modules/overtime',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Time\OvertimeController::index
 * @see app/Http/Controllers/Time/OvertimeController.php:13
 * @route '/modules/overtime'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Time\OvertimeController::index
 * @see app/Http/Controllers/Time/OvertimeController.php:13
 * @route '/modules/overtime'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Time\OvertimeController::index
 * @see app/Http/Controllers/Time/OvertimeController.php:13
 * @route '/modules/overtime'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Time\OvertimeController::index
 * @see app/Http/Controllers/Time/OvertimeController.php:13
 * @route '/modules/overtime'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Time\OvertimeController::index
 * @see app/Http/Controllers/Time/OvertimeController.php:13
 * @route '/modules/overtime'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Time\OvertimeController::index
 * @see app/Http/Controllers/Time/OvertimeController.php:13
 * @route '/modules/overtime'
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
* @see \App\Http\Controllers\Time\OvertimeController::approve
 * @see app/Http/Controllers/Time/OvertimeController.php:67
 * @route '/modules/overtime/{overtime}/approve'
 */
export const approve = (args: { overtime: number | { id: number } } | [overtime: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: approve.url(args, options),
    method: 'post',
})

approve.definition = {
    methods: ["post"],
    url: '/modules/overtime/{overtime}/approve',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Time\OvertimeController::approve
 * @see app/Http/Controllers/Time/OvertimeController.php:67
 * @route '/modules/overtime/{overtime}/approve'
 */
approve.url = (args: { overtime: number | { id: number } } | [overtime: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { overtime: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { overtime: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    overtime: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        overtime: typeof args.overtime === 'object'
                ? args.overtime.id
                : args.overtime,
                }

    return approve.definition.url
            .replace('{overtime}', parsedArgs.overtime.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Time\OvertimeController::approve
 * @see app/Http/Controllers/Time/OvertimeController.php:67
 * @route '/modules/overtime/{overtime}/approve'
 */
approve.post = (args: { overtime: number | { id: number } } | [overtime: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: approve.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Time\OvertimeController::approve
 * @see app/Http/Controllers/Time/OvertimeController.php:67
 * @route '/modules/overtime/{overtime}/approve'
 */
    const approveForm = (args: { overtime: number | { id: number } } | [overtime: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: approve.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Time\OvertimeController::approve
 * @see app/Http/Controllers/Time/OvertimeController.php:67
 * @route '/modules/overtime/{overtime}/approve'
 */
        approveForm.post = (args: { overtime: number | { id: number } } | [overtime: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: approve.url(args, options),
            method: 'post',
        })
    
    approve.form = approveForm
/**
* @see \App\Http\Controllers\Time\OvertimeController::reject
 * @see app/Http/Controllers/Time/OvertimeController.php:89
 * @route '/modules/overtime/{overtime}/reject'
 */
export const reject = (args: { overtime: number | { id: number } } | [overtime: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reject.url(args, options),
    method: 'post',
})

reject.definition = {
    methods: ["post"],
    url: '/modules/overtime/{overtime}/reject',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Time\OvertimeController::reject
 * @see app/Http/Controllers/Time/OvertimeController.php:89
 * @route '/modules/overtime/{overtime}/reject'
 */
reject.url = (args: { overtime: number | { id: number } } | [overtime: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { overtime: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { overtime: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    overtime: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        overtime: typeof args.overtime === 'object'
                ? args.overtime.id
                : args.overtime,
                }

    return reject.definition.url
            .replace('{overtime}', parsedArgs.overtime.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Time\OvertimeController::reject
 * @see app/Http/Controllers/Time/OvertimeController.php:89
 * @route '/modules/overtime/{overtime}/reject'
 */
reject.post = (args: { overtime: number | { id: number } } | [overtime: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reject.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Time\OvertimeController::reject
 * @see app/Http/Controllers/Time/OvertimeController.php:89
 * @route '/modules/overtime/{overtime}/reject'
 */
    const rejectForm = (args: { overtime: number | { id: number } } | [overtime: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: reject.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Time\OvertimeController::reject
 * @see app/Http/Controllers/Time/OvertimeController.php:89
 * @route '/modules/overtime/{overtime}/reject'
 */
        rejectForm.post = (args: { overtime: number | { id: number } } | [overtime: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: reject.url(args, options),
            method: 'post',
        })
    
    reject.form = rejectForm
const OvertimeController = { index, approve, reject }

export default OvertimeController