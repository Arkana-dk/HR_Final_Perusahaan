import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\Employee\ReimburseController::index
 * @see app/Http/Controllers/Api/Employee/ReimburseController.php:31
 * @route '/api/v1/employee/reimburse/requests'
 */
const indexa97d04935a8d1bc1e992d89895019701 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexa97d04935a8d1bc1e992d89895019701.url(options),
    method: 'get',
})

indexa97d04935a8d1bc1e992d89895019701.definition = {
    methods: ["get","head"],
    url: '/api/v1/employee/reimburse/requests',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\Employee\ReimburseController::index
 * @see app/Http/Controllers/Api/Employee/ReimburseController.php:31
 * @route '/api/v1/employee/reimburse/requests'
 */
indexa97d04935a8d1bc1e992d89895019701.url = (options?: RouteQueryOptions) => {
    return indexa97d04935a8d1bc1e992d89895019701.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\Employee\ReimburseController::index
 * @see app/Http/Controllers/Api/Employee/ReimburseController.php:31
 * @route '/api/v1/employee/reimburse/requests'
 */
indexa97d04935a8d1bc1e992d89895019701.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexa97d04935a8d1bc1e992d89895019701.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\Employee\ReimburseController::index
 * @see app/Http/Controllers/Api/Employee/ReimburseController.php:31
 * @route '/api/v1/employee/reimburse/requests'
 */
indexa97d04935a8d1bc1e992d89895019701.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: indexa97d04935a8d1bc1e992d89895019701.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\Employee\ReimburseController::index
 * @see app/Http/Controllers/Api/Employee/ReimburseController.php:31
 * @route '/api/v1/employee/reimburse/requests'
 */
    const indexa97d04935a8d1bc1e992d89895019701Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: indexa97d04935a8d1bc1e992d89895019701.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\Employee\ReimburseController::index
 * @see app/Http/Controllers/Api/Employee/ReimburseController.php:31
 * @route '/api/v1/employee/reimburse/requests'
 */
        indexa97d04935a8d1bc1e992d89895019701Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: indexa97d04935a8d1bc1e992d89895019701.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\Employee\ReimburseController::index
 * @see app/Http/Controllers/Api/Employee/ReimburseController.php:31
 * @route '/api/v1/employee/reimburse/requests'
 */
        indexa97d04935a8d1bc1e992d89895019701Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: indexa97d04935a8d1bc1e992d89895019701.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    indexa97d04935a8d1bc1e992d89895019701.form = indexa97d04935a8d1bc1e992d89895019701Form
    /**
* @see \App\Http\Controllers\Api\Employee\ReimburseController::index
 * @see app/Http/Controllers/Api/Employee/ReimburseController.php:31
 * @route '/api/v1/employee/reimbursements'
 */
const indexcecd3eb2fda582e17aaaf7025c0f9df7 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexcecd3eb2fda582e17aaaf7025c0f9df7.url(options),
    method: 'get',
})

indexcecd3eb2fda582e17aaaf7025c0f9df7.definition = {
    methods: ["get","head"],
    url: '/api/v1/employee/reimbursements',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\Employee\ReimburseController::index
 * @see app/Http/Controllers/Api/Employee/ReimburseController.php:31
 * @route '/api/v1/employee/reimbursements'
 */
indexcecd3eb2fda582e17aaaf7025c0f9df7.url = (options?: RouteQueryOptions) => {
    return indexcecd3eb2fda582e17aaaf7025c0f9df7.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\Employee\ReimburseController::index
 * @see app/Http/Controllers/Api/Employee/ReimburseController.php:31
 * @route '/api/v1/employee/reimbursements'
 */
indexcecd3eb2fda582e17aaaf7025c0f9df7.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexcecd3eb2fda582e17aaaf7025c0f9df7.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\Employee\ReimburseController::index
 * @see app/Http/Controllers/Api/Employee/ReimburseController.php:31
 * @route '/api/v1/employee/reimbursements'
 */
indexcecd3eb2fda582e17aaaf7025c0f9df7.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: indexcecd3eb2fda582e17aaaf7025c0f9df7.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\Employee\ReimburseController::index
 * @see app/Http/Controllers/Api/Employee/ReimburseController.php:31
 * @route '/api/v1/employee/reimbursements'
 */
    const indexcecd3eb2fda582e17aaaf7025c0f9df7Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: indexcecd3eb2fda582e17aaaf7025c0f9df7.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\Employee\ReimburseController::index
 * @see app/Http/Controllers/Api/Employee/ReimburseController.php:31
 * @route '/api/v1/employee/reimbursements'
 */
        indexcecd3eb2fda582e17aaaf7025c0f9df7Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: indexcecd3eb2fda582e17aaaf7025c0f9df7.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\Employee\ReimburseController::index
 * @see app/Http/Controllers/Api/Employee/ReimburseController.php:31
 * @route '/api/v1/employee/reimbursements'
 */
        indexcecd3eb2fda582e17aaaf7025c0f9df7Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: indexcecd3eb2fda582e17aaaf7025c0f9df7.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    indexcecd3eb2fda582e17aaaf7025c0f9df7.form = indexcecd3eb2fda582e17aaaf7025c0f9df7Form

export const index = {
    '/api/v1/employee/reimburse/requests': indexa97d04935a8d1bc1e992d89895019701,
    '/api/v1/employee/reimbursements': indexcecd3eb2fda582e17aaaf7025c0f9df7,
}

/**
* @see \App\Http\Controllers\Api\Employee\ReimburseController::show
 * @see app/Http/Controllers/Api/Employee/ReimburseController.php:77
 * @route '/api/v1/employee/reimburse/requests/{reimburseRequest}'
 */
const showf831b10e068f8b3744c0b389b18cb46d = (args: { reimburseRequest: number | { id: number } } | [reimburseRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showf831b10e068f8b3744c0b389b18cb46d.url(args, options),
    method: 'get',
})

showf831b10e068f8b3744c0b389b18cb46d.definition = {
    methods: ["get","head"],
    url: '/api/v1/employee/reimburse/requests/{reimburseRequest}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\Employee\ReimburseController::show
 * @see app/Http/Controllers/Api/Employee/ReimburseController.php:77
 * @route '/api/v1/employee/reimburse/requests/{reimburseRequest}'
 */
showf831b10e068f8b3744c0b389b18cb46d.url = (args: { reimburseRequest: number | { id: number } } | [reimburseRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { reimburseRequest: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { reimburseRequest: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    reimburseRequest: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        reimburseRequest: typeof args.reimburseRequest === 'object'
                ? args.reimburseRequest.id
                : args.reimburseRequest,
                }

    return showf831b10e068f8b3744c0b389b18cb46d.definition.url
            .replace('{reimburseRequest}', parsedArgs.reimburseRequest.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\Employee\ReimburseController::show
 * @see app/Http/Controllers/Api/Employee/ReimburseController.php:77
 * @route '/api/v1/employee/reimburse/requests/{reimburseRequest}'
 */
showf831b10e068f8b3744c0b389b18cb46d.get = (args: { reimburseRequest: number | { id: number } } | [reimburseRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showf831b10e068f8b3744c0b389b18cb46d.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\Employee\ReimburseController::show
 * @see app/Http/Controllers/Api/Employee/ReimburseController.php:77
 * @route '/api/v1/employee/reimburse/requests/{reimburseRequest}'
 */
showf831b10e068f8b3744c0b389b18cb46d.head = (args: { reimburseRequest: number | { id: number } } | [reimburseRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: showf831b10e068f8b3744c0b389b18cb46d.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\Employee\ReimburseController::show
 * @see app/Http/Controllers/Api/Employee/ReimburseController.php:77
 * @route '/api/v1/employee/reimburse/requests/{reimburseRequest}'
 */
    const showf831b10e068f8b3744c0b389b18cb46dForm = (args: { reimburseRequest: number | { id: number } } | [reimburseRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: showf831b10e068f8b3744c0b389b18cb46d.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\Employee\ReimburseController::show
 * @see app/Http/Controllers/Api/Employee/ReimburseController.php:77
 * @route '/api/v1/employee/reimburse/requests/{reimburseRequest}'
 */
        showf831b10e068f8b3744c0b389b18cb46dForm.get = (args: { reimburseRequest: number | { id: number } } | [reimburseRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: showf831b10e068f8b3744c0b389b18cb46d.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\Employee\ReimburseController::show
 * @see app/Http/Controllers/Api/Employee/ReimburseController.php:77
 * @route '/api/v1/employee/reimburse/requests/{reimburseRequest}'
 */
        showf831b10e068f8b3744c0b389b18cb46dForm.head = (args: { reimburseRequest: number | { id: number } } | [reimburseRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: showf831b10e068f8b3744c0b389b18cb46d.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    showf831b10e068f8b3744c0b389b18cb46d.form = showf831b10e068f8b3744c0b389b18cb46dForm
    /**
* @see \App\Http\Controllers\Api\Employee\ReimburseController::show
 * @see app/Http/Controllers/Api/Employee/ReimburseController.php:77
 * @route '/api/v1/employee/reimbursements/{reimburseRequest}'
 */
const show7f20a771da463089b6a33dc7d2689a08 = (args: { reimburseRequest: number | { id: number } } | [reimburseRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show7f20a771da463089b6a33dc7d2689a08.url(args, options),
    method: 'get',
})

show7f20a771da463089b6a33dc7d2689a08.definition = {
    methods: ["get","head"],
    url: '/api/v1/employee/reimbursements/{reimburseRequest}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\Employee\ReimburseController::show
 * @see app/Http/Controllers/Api/Employee/ReimburseController.php:77
 * @route '/api/v1/employee/reimbursements/{reimburseRequest}'
 */
show7f20a771da463089b6a33dc7d2689a08.url = (args: { reimburseRequest: number | { id: number } } | [reimburseRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { reimburseRequest: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { reimburseRequest: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    reimburseRequest: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        reimburseRequest: typeof args.reimburseRequest === 'object'
                ? args.reimburseRequest.id
                : args.reimburseRequest,
                }

    return show7f20a771da463089b6a33dc7d2689a08.definition.url
            .replace('{reimburseRequest}', parsedArgs.reimburseRequest.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\Employee\ReimburseController::show
 * @see app/Http/Controllers/Api/Employee/ReimburseController.php:77
 * @route '/api/v1/employee/reimbursements/{reimburseRequest}'
 */
show7f20a771da463089b6a33dc7d2689a08.get = (args: { reimburseRequest: number | { id: number } } | [reimburseRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show7f20a771da463089b6a33dc7d2689a08.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\Employee\ReimburseController::show
 * @see app/Http/Controllers/Api/Employee/ReimburseController.php:77
 * @route '/api/v1/employee/reimbursements/{reimburseRequest}'
 */
show7f20a771da463089b6a33dc7d2689a08.head = (args: { reimburseRequest: number | { id: number } } | [reimburseRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show7f20a771da463089b6a33dc7d2689a08.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\Employee\ReimburseController::show
 * @see app/Http/Controllers/Api/Employee/ReimburseController.php:77
 * @route '/api/v1/employee/reimbursements/{reimburseRequest}'
 */
    const show7f20a771da463089b6a33dc7d2689a08Form = (args: { reimburseRequest: number | { id: number } } | [reimburseRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show7f20a771da463089b6a33dc7d2689a08.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\Employee\ReimburseController::show
 * @see app/Http/Controllers/Api/Employee/ReimburseController.php:77
 * @route '/api/v1/employee/reimbursements/{reimburseRequest}'
 */
        show7f20a771da463089b6a33dc7d2689a08Form.get = (args: { reimburseRequest: number | { id: number } } | [reimburseRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show7f20a771da463089b6a33dc7d2689a08.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\Employee\ReimburseController::show
 * @see app/Http/Controllers/Api/Employee/ReimburseController.php:77
 * @route '/api/v1/employee/reimbursements/{reimburseRequest}'
 */
        show7f20a771da463089b6a33dc7d2689a08Form.head = (args: { reimburseRequest: number | { id: number } } | [reimburseRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show7f20a771da463089b6a33dc7d2689a08.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show7f20a771da463089b6a33dc7d2689a08.form = show7f20a771da463089b6a33dc7d2689a08Form

export const show = {
    '/api/v1/employee/reimburse/requests/{reimburseRequest}': showf831b10e068f8b3744c0b389b18cb46d,
    '/api/v1/employee/reimbursements/{reimburseRequest}': show7f20a771da463089b6a33dc7d2689a08,
}

/**
* @see \App\Http\Controllers\Api\Employee\ReimburseController::store
 * @see app/Http/Controllers/Api/Employee/ReimburseController.php:89
 * @route '/api/v1/employee/reimburse/requests'
 */
const storea97d04935a8d1bc1e992d89895019701 = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storea97d04935a8d1bc1e992d89895019701.url(options),
    method: 'post',
})

storea97d04935a8d1bc1e992d89895019701.definition = {
    methods: ["post"],
    url: '/api/v1/employee/reimburse/requests',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\Employee\ReimburseController::store
 * @see app/Http/Controllers/Api/Employee/ReimburseController.php:89
 * @route '/api/v1/employee/reimburse/requests'
 */
storea97d04935a8d1bc1e992d89895019701.url = (options?: RouteQueryOptions) => {
    return storea97d04935a8d1bc1e992d89895019701.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\Employee\ReimburseController::store
 * @see app/Http/Controllers/Api/Employee/ReimburseController.php:89
 * @route '/api/v1/employee/reimburse/requests'
 */
storea97d04935a8d1bc1e992d89895019701.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storea97d04935a8d1bc1e992d89895019701.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Api\Employee\ReimburseController::store
 * @see app/Http/Controllers/Api/Employee/ReimburseController.php:89
 * @route '/api/v1/employee/reimburse/requests'
 */
    const storea97d04935a8d1bc1e992d89895019701Form = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: storea97d04935a8d1bc1e992d89895019701.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\Employee\ReimburseController::store
 * @see app/Http/Controllers/Api/Employee/ReimburseController.php:89
 * @route '/api/v1/employee/reimburse/requests'
 */
        storea97d04935a8d1bc1e992d89895019701Form.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: storea97d04935a8d1bc1e992d89895019701.url(options),
            method: 'post',
        })
    
    storea97d04935a8d1bc1e992d89895019701.form = storea97d04935a8d1bc1e992d89895019701Form
    /**
* @see \App\Http\Controllers\Api\Employee\ReimburseController::store
 * @see app/Http/Controllers/Api/Employee/ReimburseController.php:89
 * @route '/api/v1/employee/reimbursements'
 */
const storececd3eb2fda582e17aaaf7025c0f9df7 = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storececd3eb2fda582e17aaaf7025c0f9df7.url(options),
    method: 'post',
})

storececd3eb2fda582e17aaaf7025c0f9df7.definition = {
    methods: ["post"],
    url: '/api/v1/employee/reimbursements',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\Employee\ReimburseController::store
 * @see app/Http/Controllers/Api/Employee/ReimburseController.php:89
 * @route '/api/v1/employee/reimbursements'
 */
storececd3eb2fda582e17aaaf7025c0f9df7.url = (options?: RouteQueryOptions) => {
    return storececd3eb2fda582e17aaaf7025c0f9df7.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\Employee\ReimburseController::store
 * @see app/Http/Controllers/Api/Employee/ReimburseController.php:89
 * @route '/api/v1/employee/reimbursements'
 */
storececd3eb2fda582e17aaaf7025c0f9df7.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storececd3eb2fda582e17aaaf7025c0f9df7.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Api\Employee\ReimburseController::store
 * @see app/Http/Controllers/Api/Employee/ReimburseController.php:89
 * @route '/api/v1/employee/reimbursements'
 */
    const storececd3eb2fda582e17aaaf7025c0f9df7Form = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: storececd3eb2fda582e17aaaf7025c0f9df7.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\Employee\ReimburseController::store
 * @see app/Http/Controllers/Api/Employee/ReimburseController.php:89
 * @route '/api/v1/employee/reimbursements'
 */
        storececd3eb2fda582e17aaaf7025c0f9df7Form.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: storececd3eb2fda582e17aaaf7025c0f9df7.url(options),
            method: 'post',
        })
    
    storececd3eb2fda582e17aaaf7025c0f9df7.form = storececd3eb2fda582e17aaaf7025c0f9df7Form

export const store = {
    '/api/v1/employee/reimburse/requests': storea97d04935a8d1bc1e992d89895019701,
    '/api/v1/employee/reimbursements': storececd3eb2fda582e17aaaf7025c0f9df7,
}

/**
* @see \App\Http\Controllers\Api\Employee\ReimburseController::cancel
 * @see app/Http/Controllers/Api/Employee/ReimburseController.php:161
 * @route '/api/v1/employee/reimburse/requests/{reimburseRequest}/cancel'
 */
const cancel340af9f44da6a908893d76a92808f7bd = (args: { reimburseRequest: number | { id: number } } | [reimburseRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: cancel340af9f44da6a908893d76a92808f7bd.url(args, options),
    method: 'post',
})

cancel340af9f44da6a908893d76a92808f7bd.definition = {
    methods: ["post"],
    url: '/api/v1/employee/reimburse/requests/{reimburseRequest}/cancel',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\Employee\ReimburseController::cancel
 * @see app/Http/Controllers/Api/Employee/ReimburseController.php:161
 * @route '/api/v1/employee/reimburse/requests/{reimburseRequest}/cancel'
 */
cancel340af9f44da6a908893d76a92808f7bd.url = (args: { reimburseRequest: number | { id: number } } | [reimburseRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { reimburseRequest: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { reimburseRequest: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    reimburseRequest: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        reimburseRequest: typeof args.reimburseRequest === 'object'
                ? args.reimburseRequest.id
                : args.reimburseRequest,
                }

    return cancel340af9f44da6a908893d76a92808f7bd.definition.url
            .replace('{reimburseRequest}', parsedArgs.reimburseRequest.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\Employee\ReimburseController::cancel
 * @see app/Http/Controllers/Api/Employee/ReimburseController.php:161
 * @route '/api/v1/employee/reimburse/requests/{reimburseRequest}/cancel'
 */
cancel340af9f44da6a908893d76a92808f7bd.post = (args: { reimburseRequest: number | { id: number } } | [reimburseRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: cancel340af9f44da6a908893d76a92808f7bd.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Api\Employee\ReimburseController::cancel
 * @see app/Http/Controllers/Api/Employee/ReimburseController.php:161
 * @route '/api/v1/employee/reimburse/requests/{reimburseRequest}/cancel'
 */
    const cancel340af9f44da6a908893d76a92808f7bdForm = (args: { reimburseRequest: number | { id: number } } | [reimburseRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: cancel340af9f44da6a908893d76a92808f7bd.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\Employee\ReimburseController::cancel
 * @see app/Http/Controllers/Api/Employee/ReimburseController.php:161
 * @route '/api/v1/employee/reimburse/requests/{reimburseRequest}/cancel'
 */
        cancel340af9f44da6a908893d76a92808f7bdForm.post = (args: { reimburseRequest: number | { id: number } } | [reimburseRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: cancel340af9f44da6a908893d76a92808f7bd.url(args, options),
            method: 'post',
        })
    
    cancel340af9f44da6a908893d76a92808f7bd.form = cancel340af9f44da6a908893d76a92808f7bdForm
    /**
* @see \App\Http\Controllers\Api\Employee\ReimburseController::cancel
 * @see app/Http/Controllers/Api/Employee/ReimburseController.php:161
 * @route '/api/v1/employee/reimbursements/{reimburseRequest}/cancel'
 */
const cancel0ac6d2859115beae6d0f4a3b27b4cb92 = (args: { reimburseRequest: number | { id: number } } | [reimburseRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: cancel0ac6d2859115beae6d0f4a3b27b4cb92.url(args, options),
    method: 'post',
})

cancel0ac6d2859115beae6d0f4a3b27b4cb92.definition = {
    methods: ["post"],
    url: '/api/v1/employee/reimbursements/{reimburseRequest}/cancel',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\Employee\ReimburseController::cancel
 * @see app/Http/Controllers/Api/Employee/ReimburseController.php:161
 * @route '/api/v1/employee/reimbursements/{reimburseRequest}/cancel'
 */
cancel0ac6d2859115beae6d0f4a3b27b4cb92.url = (args: { reimburseRequest: number | { id: number } } | [reimburseRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { reimburseRequest: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { reimburseRequest: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    reimburseRequest: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        reimburseRequest: typeof args.reimburseRequest === 'object'
                ? args.reimburseRequest.id
                : args.reimburseRequest,
                }

    return cancel0ac6d2859115beae6d0f4a3b27b4cb92.definition.url
            .replace('{reimburseRequest}', parsedArgs.reimburseRequest.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\Employee\ReimburseController::cancel
 * @see app/Http/Controllers/Api/Employee/ReimburseController.php:161
 * @route '/api/v1/employee/reimbursements/{reimburseRequest}/cancel'
 */
cancel0ac6d2859115beae6d0f4a3b27b4cb92.post = (args: { reimburseRequest: number | { id: number } } | [reimburseRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: cancel0ac6d2859115beae6d0f4a3b27b4cb92.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Api\Employee\ReimburseController::cancel
 * @see app/Http/Controllers/Api/Employee/ReimburseController.php:161
 * @route '/api/v1/employee/reimbursements/{reimburseRequest}/cancel'
 */
    const cancel0ac6d2859115beae6d0f4a3b27b4cb92Form = (args: { reimburseRequest: number | { id: number } } | [reimburseRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: cancel0ac6d2859115beae6d0f4a3b27b4cb92.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\Employee\ReimburseController::cancel
 * @see app/Http/Controllers/Api/Employee/ReimburseController.php:161
 * @route '/api/v1/employee/reimbursements/{reimburseRequest}/cancel'
 */
        cancel0ac6d2859115beae6d0f4a3b27b4cb92Form.post = (args: { reimburseRequest: number | { id: number } } | [reimburseRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: cancel0ac6d2859115beae6d0f4a3b27b4cb92.url(args, options),
            method: 'post',
        })
    
    cancel0ac6d2859115beae6d0f4a3b27b4cb92.form = cancel0ac6d2859115beae6d0f4a3b27b4cb92Form

export const cancel = {
    '/api/v1/employee/reimburse/requests/{reimburseRequest}/cancel': cancel340af9f44da6a908893d76a92808f7bd,
    '/api/v1/employee/reimbursements/{reimburseRequest}/cancel': cancel0ac6d2859115beae6d0f4a3b27b4cb92,
}

const ReimburseController = { index, show, store, cancel }

export default ReimburseController