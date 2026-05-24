import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\Payroll\PayslipController::index
 * @see app/Http/Controllers/Payroll/PayslipController.php:27
 * @route '/modules/payslips'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/modules/payslips',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Payroll\PayslipController::index
 * @see app/Http/Controllers/Payroll/PayslipController.php:27
 * @route '/modules/payslips'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Payroll\PayslipController::index
 * @see app/Http/Controllers/Payroll/PayslipController.php:27
 * @route '/modules/payslips'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Payroll\PayslipController::index
 * @see app/Http/Controllers/Payroll/PayslipController.php:27
 * @route '/modules/payslips'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Payroll\PayslipController::index
 * @see app/Http/Controllers/Payroll/PayslipController.php:27
 * @route '/modules/payslips'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Payroll\PayslipController::index
 * @see app/Http/Controllers/Payroll/PayslipController.php:27
 * @route '/modules/payslips'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Payroll\PayslipController::index
 * @see app/Http/Controllers/Payroll/PayslipController.php:27
 * @route '/modules/payslips'
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
* @see \App\Http\Controllers\Payroll\PayslipController::create
 * @see app/Http/Controllers/Payroll/PayslipController.php:49
 * @route '/modules/payslips/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/modules/payslips/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Payroll\PayslipController::create
 * @see app/Http/Controllers/Payroll/PayslipController.php:49
 * @route '/modules/payslips/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Payroll\PayslipController::create
 * @see app/Http/Controllers/Payroll/PayslipController.php:49
 * @route '/modules/payslips/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Payroll\PayslipController::create
 * @see app/Http/Controllers/Payroll/PayslipController.php:49
 * @route '/modules/payslips/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Payroll\PayslipController::create
 * @see app/Http/Controllers/Payroll/PayslipController.php:49
 * @route '/modules/payslips/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Payroll\PayslipController::create
 * @see app/Http/Controllers/Payroll/PayslipController.php:49
 * @route '/modules/payslips/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Payroll\PayslipController::create
 * @see app/Http/Controllers/Payroll/PayslipController.php:49
 * @route '/modules/payslips/create'
 */
        createForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    create.form = createForm
/**
* @see \App\Http\Controllers\Payroll\PayslipController::store
 * @see app/Http/Controllers/Payroll/PayslipController.php:65
 * @route '/modules/payslips'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/modules/payslips',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Payroll\PayslipController::store
 * @see app/Http/Controllers/Payroll/PayslipController.php:65
 * @route '/modules/payslips'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Payroll\PayslipController::store
 * @see app/Http/Controllers/Payroll/PayslipController.php:65
 * @route '/modules/payslips'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Payroll\PayslipController::store
 * @see app/Http/Controllers/Payroll/PayslipController.php:65
 * @route '/modules/payslips'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Payroll\PayslipController::store
 * @see app/Http/Controllers/Payroll/PayslipController.php:65
 * @route '/modules/payslips'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Payroll\PayslipController::edit
 * @see app/Http/Controllers/Payroll/PayslipController.php:110
 * @route '/modules/payslips/{payslip}/edit'
 */
export const edit = (args: { payslip: number | { id: number } } | [payslip: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/modules/payslips/{payslip}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Payroll\PayslipController::edit
 * @see app/Http/Controllers/Payroll/PayslipController.php:110
 * @route '/modules/payslips/{payslip}/edit'
 */
edit.url = (args: { payslip: number | { id: number } } | [payslip: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { payslip: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { payslip: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    payslip: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        payslip: typeof args.payslip === 'object'
                ? args.payslip.id
                : args.payslip,
                }

    return edit.definition.url
            .replace('{payslip}', parsedArgs.payslip.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Payroll\PayslipController::edit
 * @see app/Http/Controllers/Payroll/PayslipController.php:110
 * @route '/modules/payslips/{payslip}/edit'
 */
edit.get = (args: { payslip: number | { id: number } } | [payslip: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Payroll\PayslipController::edit
 * @see app/Http/Controllers/Payroll/PayslipController.php:110
 * @route '/modules/payslips/{payslip}/edit'
 */
edit.head = (args: { payslip: number | { id: number } } | [payslip: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Payroll\PayslipController::edit
 * @see app/Http/Controllers/Payroll/PayslipController.php:110
 * @route '/modules/payslips/{payslip}/edit'
 */
    const editForm = (args: { payslip: number | { id: number } } | [payslip: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Payroll\PayslipController::edit
 * @see app/Http/Controllers/Payroll/PayslipController.php:110
 * @route '/modules/payslips/{payslip}/edit'
 */
        editForm.get = (args: { payslip: number | { id: number } } | [payslip: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Payroll\PayslipController::edit
 * @see app/Http/Controllers/Payroll/PayslipController.php:110
 * @route '/modules/payslips/{payslip}/edit'
 */
        editForm.head = (args: { payslip: number | { id: number } } | [payslip: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    edit.form = editForm
/**
* @see \App\Http\Controllers\Payroll\PayslipController::update
 * @see app/Http/Controllers/Payroll/PayslipController.php:128
 * @route '/modules/payslips/{payslip}'
 */
export const update = (args: { payslip: number | { id: number } } | [payslip: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/modules/payslips/{payslip}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Payroll\PayslipController::update
 * @see app/Http/Controllers/Payroll/PayslipController.php:128
 * @route '/modules/payslips/{payslip}'
 */
update.url = (args: { payslip: number | { id: number } } | [payslip: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { payslip: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { payslip: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    payslip: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        payslip: typeof args.payslip === 'object'
                ? args.payslip.id
                : args.payslip,
                }

    return update.definition.url
            .replace('{payslip}', parsedArgs.payslip.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Payroll\PayslipController::update
 * @see app/Http/Controllers/Payroll/PayslipController.php:128
 * @route '/modules/payslips/{payslip}'
 */
update.put = (args: { payslip: number | { id: number } } | [payslip: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\Payroll\PayslipController::update
 * @see app/Http/Controllers/Payroll/PayslipController.php:128
 * @route '/modules/payslips/{payslip}'
 */
    const updateForm = (args: { payslip: number | { id: number } } | [payslip: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Payroll\PayslipController::update
 * @see app/Http/Controllers/Payroll/PayslipController.php:128
 * @route '/modules/payslips/{payslip}'
 */
        updateForm.put = (args: { payslip: number | { id: number } } | [payslip: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
const payslips = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
}

export default payslips