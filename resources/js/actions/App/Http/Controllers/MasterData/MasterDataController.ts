import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\MasterData\MasterDataController::template
 * @see app/Http/Controllers/MasterData/MasterDataController.php:269
 * @route '/modules/organization/{resource}/template'
 */
const template91ed5b9756a02b410174b9bb1146801b = (args: { resource: string | number } | [resource: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: template91ed5b9756a02b410174b9bb1146801b.url(args, options),
    method: 'get',
})

template91ed5b9756a02b410174b9bb1146801b.definition = {
    methods: ["get","head"],
    url: '/modules/organization/{resource}/template',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::template
 * @see app/Http/Controllers/MasterData/MasterDataController.php:269
 * @route '/modules/organization/{resource}/template'
 */
template91ed5b9756a02b410174b9bb1146801b.url = (args: { resource: string | number } | [resource: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { resource: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    resource: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        resource: args.resource,
                }

    return template91ed5b9756a02b410174b9bb1146801b.definition.url
            .replace('{resource}', parsedArgs.resource.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::template
 * @see app/Http/Controllers/MasterData/MasterDataController.php:269
 * @route '/modules/organization/{resource}/template'
 */
template91ed5b9756a02b410174b9bb1146801b.get = (args: { resource: string | number } | [resource: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: template91ed5b9756a02b410174b9bb1146801b.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\MasterData\MasterDataController::template
 * @see app/Http/Controllers/MasterData/MasterDataController.php:269
 * @route '/modules/organization/{resource}/template'
 */
template91ed5b9756a02b410174b9bb1146801b.head = (args: { resource: string | number } | [resource: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: template91ed5b9756a02b410174b9bb1146801b.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::template
 * @see app/Http/Controllers/MasterData/MasterDataController.php:269
 * @route '/modules/organization/{resource}/template'
 */
    const template91ed5b9756a02b410174b9bb1146801bForm = (args: { resource: string | number } | [resource: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: template91ed5b9756a02b410174b9bb1146801b.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\MasterData\MasterDataController::template
 * @see app/Http/Controllers/MasterData/MasterDataController.php:269
 * @route '/modules/organization/{resource}/template'
 */
        template91ed5b9756a02b410174b9bb1146801bForm.get = (args: { resource: string | number } | [resource: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: template91ed5b9756a02b410174b9bb1146801b.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\MasterData\MasterDataController::template
 * @see app/Http/Controllers/MasterData/MasterDataController.php:269
 * @route '/modules/organization/{resource}/template'
 */
        template91ed5b9756a02b410174b9bb1146801bForm.head = (args: { resource: string | number } | [resource: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: template91ed5b9756a02b410174b9bb1146801b.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    template91ed5b9756a02b410174b9bb1146801b.form = template91ed5b9756a02b410174b9bb1146801bForm
    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::template
 * @see app/Http/Controllers/MasterData/MasterDataController.php:269
 * @route '/modules/employees/template'
 */
const templatecb1930d01bb1c34de88da8e05a5b36ca = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: templatecb1930d01bb1c34de88da8e05a5b36ca.url(options),
    method: 'get',
})

templatecb1930d01bb1c34de88da8e05a5b36ca.definition = {
    methods: ["get","head"],
    url: '/modules/employees/template',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::template
 * @see app/Http/Controllers/MasterData/MasterDataController.php:269
 * @route '/modules/employees/template'
 */
templatecb1930d01bb1c34de88da8e05a5b36ca.url = (options?: RouteQueryOptions) => {
    return templatecb1930d01bb1c34de88da8e05a5b36ca.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::template
 * @see app/Http/Controllers/MasterData/MasterDataController.php:269
 * @route '/modules/employees/template'
 */
templatecb1930d01bb1c34de88da8e05a5b36ca.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: templatecb1930d01bb1c34de88da8e05a5b36ca.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\MasterData\MasterDataController::template
 * @see app/Http/Controllers/MasterData/MasterDataController.php:269
 * @route '/modules/employees/template'
 */
templatecb1930d01bb1c34de88da8e05a5b36ca.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: templatecb1930d01bb1c34de88da8e05a5b36ca.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::template
 * @see app/Http/Controllers/MasterData/MasterDataController.php:269
 * @route '/modules/employees/template'
 */
    const templatecb1930d01bb1c34de88da8e05a5b36caForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: templatecb1930d01bb1c34de88da8e05a5b36ca.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\MasterData\MasterDataController::template
 * @see app/Http/Controllers/MasterData/MasterDataController.php:269
 * @route '/modules/employees/template'
 */
        templatecb1930d01bb1c34de88da8e05a5b36caForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: templatecb1930d01bb1c34de88da8e05a5b36ca.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\MasterData\MasterDataController::template
 * @see app/Http/Controllers/MasterData/MasterDataController.php:269
 * @route '/modules/employees/template'
 */
        templatecb1930d01bb1c34de88da8e05a5b36caForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: templatecb1930d01bb1c34de88da8e05a5b36ca.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    templatecb1930d01bb1c34de88da8e05a5b36ca.form = templatecb1930d01bb1c34de88da8e05a5b36caForm
    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::template
 * @see app/Http/Controllers/MasterData/MasterDataController.php:269
 * @route '/modules/attendance/template'
 */
const templateb8e163650583cd85d7c7c2332c9853ab = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: templateb8e163650583cd85d7c7c2332c9853ab.url(options),
    method: 'get',
})

templateb8e163650583cd85d7c7c2332c9853ab.definition = {
    methods: ["get","head"],
    url: '/modules/attendance/template',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::template
 * @see app/Http/Controllers/MasterData/MasterDataController.php:269
 * @route '/modules/attendance/template'
 */
templateb8e163650583cd85d7c7c2332c9853ab.url = (options?: RouteQueryOptions) => {
    return templateb8e163650583cd85d7c7c2332c9853ab.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::template
 * @see app/Http/Controllers/MasterData/MasterDataController.php:269
 * @route '/modules/attendance/template'
 */
templateb8e163650583cd85d7c7c2332c9853ab.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: templateb8e163650583cd85d7c7c2332c9853ab.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\MasterData\MasterDataController::template
 * @see app/Http/Controllers/MasterData/MasterDataController.php:269
 * @route '/modules/attendance/template'
 */
templateb8e163650583cd85d7c7c2332c9853ab.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: templateb8e163650583cd85d7c7c2332c9853ab.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::template
 * @see app/Http/Controllers/MasterData/MasterDataController.php:269
 * @route '/modules/attendance/template'
 */
    const templateb8e163650583cd85d7c7c2332c9853abForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: templateb8e163650583cd85d7c7c2332c9853ab.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\MasterData\MasterDataController::template
 * @see app/Http/Controllers/MasterData/MasterDataController.php:269
 * @route '/modules/attendance/template'
 */
        templateb8e163650583cd85d7c7c2332c9853abForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: templateb8e163650583cd85d7c7c2332c9853ab.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\MasterData\MasterDataController::template
 * @see app/Http/Controllers/MasterData/MasterDataController.php:269
 * @route '/modules/attendance/template'
 */
        templateb8e163650583cd85d7c7c2332c9853abForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: templateb8e163650583cd85d7c7c2332c9853ab.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    templateb8e163650583cd85d7c7c2332c9853ab.form = templateb8e163650583cd85d7c7c2332c9853abForm
    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::template
 * @see app/Http/Controllers/MasterData/MasterDataController.php:269
 * @route '/modules/shifts/template'
 */
const templatedf003dda200db20cab1219d6a492910b = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: templatedf003dda200db20cab1219d6a492910b.url(options),
    method: 'get',
})

templatedf003dda200db20cab1219d6a492910b.definition = {
    methods: ["get","head"],
    url: '/modules/shifts/template',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::template
 * @see app/Http/Controllers/MasterData/MasterDataController.php:269
 * @route '/modules/shifts/template'
 */
templatedf003dda200db20cab1219d6a492910b.url = (options?: RouteQueryOptions) => {
    return templatedf003dda200db20cab1219d6a492910b.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::template
 * @see app/Http/Controllers/MasterData/MasterDataController.php:269
 * @route '/modules/shifts/template'
 */
templatedf003dda200db20cab1219d6a492910b.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: templatedf003dda200db20cab1219d6a492910b.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\MasterData\MasterDataController::template
 * @see app/Http/Controllers/MasterData/MasterDataController.php:269
 * @route '/modules/shifts/template'
 */
templatedf003dda200db20cab1219d6a492910b.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: templatedf003dda200db20cab1219d6a492910b.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::template
 * @see app/Http/Controllers/MasterData/MasterDataController.php:269
 * @route '/modules/shifts/template'
 */
    const templatedf003dda200db20cab1219d6a492910bForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: templatedf003dda200db20cab1219d6a492910b.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\MasterData\MasterDataController::template
 * @see app/Http/Controllers/MasterData/MasterDataController.php:269
 * @route '/modules/shifts/template'
 */
        templatedf003dda200db20cab1219d6a492910bForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: templatedf003dda200db20cab1219d6a492910b.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\MasterData\MasterDataController::template
 * @see app/Http/Controllers/MasterData/MasterDataController.php:269
 * @route '/modules/shifts/template'
 */
        templatedf003dda200db20cab1219d6a492910bForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: templatedf003dda200db20cab1219d6a492910b.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    templatedf003dda200db20cab1219d6a492910b.form = templatedf003dda200db20cab1219d6a492910bForm
    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::template
 * @see app/Http/Controllers/MasterData/MasterDataController.php:269
 * @route '/modules/leave-types/template'
 */
const template2a777b858ff0a8a31aa8790ea605e4bc = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: template2a777b858ff0a8a31aa8790ea605e4bc.url(options),
    method: 'get',
})

template2a777b858ff0a8a31aa8790ea605e4bc.definition = {
    methods: ["get","head"],
    url: '/modules/leave-types/template',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::template
 * @see app/Http/Controllers/MasterData/MasterDataController.php:269
 * @route '/modules/leave-types/template'
 */
template2a777b858ff0a8a31aa8790ea605e4bc.url = (options?: RouteQueryOptions) => {
    return template2a777b858ff0a8a31aa8790ea605e4bc.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::template
 * @see app/Http/Controllers/MasterData/MasterDataController.php:269
 * @route '/modules/leave-types/template'
 */
template2a777b858ff0a8a31aa8790ea605e4bc.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: template2a777b858ff0a8a31aa8790ea605e4bc.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\MasterData\MasterDataController::template
 * @see app/Http/Controllers/MasterData/MasterDataController.php:269
 * @route '/modules/leave-types/template'
 */
template2a777b858ff0a8a31aa8790ea605e4bc.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: template2a777b858ff0a8a31aa8790ea605e4bc.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::template
 * @see app/Http/Controllers/MasterData/MasterDataController.php:269
 * @route '/modules/leave-types/template'
 */
    const template2a777b858ff0a8a31aa8790ea605e4bcForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: template2a777b858ff0a8a31aa8790ea605e4bc.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\MasterData\MasterDataController::template
 * @see app/Http/Controllers/MasterData/MasterDataController.php:269
 * @route '/modules/leave-types/template'
 */
        template2a777b858ff0a8a31aa8790ea605e4bcForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: template2a777b858ff0a8a31aa8790ea605e4bc.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\MasterData\MasterDataController::template
 * @see app/Http/Controllers/MasterData/MasterDataController.php:269
 * @route '/modules/leave-types/template'
 */
        template2a777b858ff0a8a31aa8790ea605e4bcForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: template2a777b858ff0a8a31aa8790ea605e4bc.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    template2a777b858ff0a8a31aa8790ea605e4bc.form = template2a777b858ff0a8a31aa8790ea605e4bcForm
    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::template
 * @see app/Http/Controllers/MasterData/MasterDataController.php:269
 * @route '/modules/schedules/template'
 */
const template96005a44a8e4dcbd91dac16612e00bb2 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: template96005a44a8e4dcbd91dac16612e00bb2.url(options),
    method: 'get',
})

template96005a44a8e4dcbd91dac16612e00bb2.definition = {
    methods: ["get","head"],
    url: '/modules/schedules/template',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::template
 * @see app/Http/Controllers/MasterData/MasterDataController.php:269
 * @route '/modules/schedules/template'
 */
template96005a44a8e4dcbd91dac16612e00bb2.url = (options?: RouteQueryOptions) => {
    return template96005a44a8e4dcbd91dac16612e00bb2.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::template
 * @see app/Http/Controllers/MasterData/MasterDataController.php:269
 * @route '/modules/schedules/template'
 */
template96005a44a8e4dcbd91dac16612e00bb2.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: template96005a44a8e4dcbd91dac16612e00bb2.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\MasterData\MasterDataController::template
 * @see app/Http/Controllers/MasterData/MasterDataController.php:269
 * @route '/modules/schedules/template'
 */
template96005a44a8e4dcbd91dac16612e00bb2.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: template96005a44a8e4dcbd91dac16612e00bb2.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::template
 * @see app/Http/Controllers/MasterData/MasterDataController.php:269
 * @route '/modules/schedules/template'
 */
    const template96005a44a8e4dcbd91dac16612e00bb2Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: template96005a44a8e4dcbd91dac16612e00bb2.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\MasterData\MasterDataController::template
 * @see app/Http/Controllers/MasterData/MasterDataController.php:269
 * @route '/modules/schedules/template'
 */
        template96005a44a8e4dcbd91dac16612e00bb2Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: template96005a44a8e4dcbd91dac16612e00bb2.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\MasterData\MasterDataController::template
 * @see app/Http/Controllers/MasterData/MasterDataController.php:269
 * @route '/modules/schedules/template'
 */
        template96005a44a8e4dcbd91dac16612e00bb2Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: template96005a44a8e4dcbd91dac16612e00bb2.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    template96005a44a8e4dcbd91dac16612e00bb2.form = template96005a44a8e4dcbd91dac16612e00bb2Form
    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::template
 * @see app/Http/Controllers/MasterData/MasterDataController.php:269
 * @route '/modules/{resource}/template'
 */
const template93bc8779aa738af71e091bf38ba2c079 = (args: { resource: string | number } | [resource: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: template93bc8779aa738af71e091bf38ba2c079.url(args, options),
    method: 'get',
})

template93bc8779aa738af71e091bf38ba2c079.definition = {
    methods: ["get","head"],
    url: '/modules/{resource}/template',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::template
 * @see app/Http/Controllers/MasterData/MasterDataController.php:269
 * @route '/modules/{resource}/template'
 */
template93bc8779aa738af71e091bf38ba2c079.url = (args: { resource: string | number } | [resource: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { resource: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    resource: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        resource: args.resource,
                }

    return template93bc8779aa738af71e091bf38ba2c079.definition.url
            .replace('{resource}', parsedArgs.resource.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::template
 * @see app/Http/Controllers/MasterData/MasterDataController.php:269
 * @route '/modules/{resource}/template'
 */
template93bc8779aa738af71e091bf38ba2c079.get = (args: { resource: string | number } | [resource: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: template93bc8779aa738af71e091bf38ba2c079.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\MasterData\MasterDataController::template
 * @see app/Http/Controllers/MasterData/MasterDataController.php:269
 * @route '/modules/{resource}/template'
 */
template93bc8779aa738af71e091bf38ba2c079.head = (args: { resource: string | number } | [resource: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: template93bc8779aa738af71e091bf38ba2c079.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::template
 * @see app/Http/Controllers/MasterData/MasterDataController.php:269
 * @route '/modules/{resource}/template'
 */
    const template93bc8779aa738af71e091bf38ba2c079Form = (args: { resource: string | number } | [resource: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: template93bc8779aa738af71e091bf38ba2c079.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\MasterData\MasterDataController::template
 * @see app/Http/Controllers/MasterData/MasterDataController.php:269
 * @route '/modules/{resource}/template'
 */
        template93bc8779aa738af71e091bf38ba2c079Form.get = (args: { resource: string | number } | [resource: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: template93bc8779aa738af71e091bf38ba2c079.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\MasterData\MasterDataController::template
 * @see app/Http/Controllers/MasterData/MasterDataController.php:269
 * @route '/modules/{resource}/template'
 */
        template93bc8779aa738af71e091bf38ba2c079Form.head = (args: { resource: string | number } | [resource: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: template93bc8779aa738af71e091bf38ba2c079.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    template93bc8779aa738af71e091bf38ba2c079.form = template93bc8779aa738af71e091bf38ba2c079Form
    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::template
 * @see app/Http/Controllers/MasterData/MasterDataController.php:269
 * @route '/modules/salary-components/template'
 */
const template41d657ba8abeed6ed19ac924dbdeacf2 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: template41d657ba8abeed6ed19ac924dbdeacf2.url(options),
    method: 'get',
})

template41d657ba8abeed6ed19ac924dbdeacf2.definition = {
    methods: ["get","head"],
    url: '/modules/salary-components/template',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::template
 * @see app/Http/Controllers/MasterData/MasterDataController.php:269
 * @route '/modules/salary-components/template'
 */
template41d657ba8abeed6ed19ac924dbdeacf2.url = (options?: RouteQueryOptions) => {
    return template41d657ba8abeed6ed19ac924dbdeacf2.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::template
 * @see app/Http/Controllers/MasterData/MasterDataController.php:269
 * @route '/modules/salary-components/template'
 */
template41d657ba8abeed6ed19ac924dbdeacf2.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: template41d657ba8abeed6ed19ac924dbdeacf2.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\MasterData\MasterDataController::template
 * @see app/Http/Controllers/MasterData/MasterDataController.php:269
 * @route '/modules/salary-components/template'
 */
template41d657ba8abeed6ed19ac924dbdeacf2.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: template41d657ba8abeed6ed19ac924dbdeacf2.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::template
 * @see app/Http/Controllers/MasterData/MasterDataController.php:269
 * @route '/modules/salary-components/template'
 */
    const template41d657ba8abeed6ed19ac924dbdeacf2Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: template41d657ba8abeed6ed19ac924dbdeacf2.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\MasterData\MasterDataController::template
 * @see app/Http/Controllers/MasterData/MasterDataController.php:269
 * @route '/modules/salary-components/template'
 */
        template41d657ba8abeed6ed19ac924dbdeacf2Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: template41d657ba8abeed6ed19ac924dbdeacf2.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\MasterData\MasterDataController::template
 * @see app/Http/Controllers/MasterData/MasterDataController.php:269
 * @route '/modules/salary-components/template'
 */
        template41d657ba8abeed6ed19ac924dbdeacf2Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: template41d657ba8abeed6ed19ac924dbdeacf2.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    template41d657ba8abeed6ed19ac924dbdeacf2.form = template41d657ba8abeed6ed19ac924dbdeacf2Form
    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::template
 * @see app/Http/Controllers/MasterData/MasterDataController.php:269
 * @route '/modules/payroll-periods/template'
 */
const template7e4c861bedac3305c16f1a08ef19526b = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: template7e4c861bedac3305c16f1a08ef19526b.url(options),
    method: 'get',
})

template7e4c861bedac3305c16f1a08ef19526b.definition = {
    methods: ["get","head"],
    url: '/modules/payroll-periods/template',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::template
 * @see app/Http/Controllers/MasterData/MasterDataController.php:269
 * @route '/modules/payroll-periods/template'
 */
template7e4c861bedac3305c16f1a08ef19526b.url = (options?: RouteQueryOptions) => {
    return template7e4c861bedac3305c16f1a08ef19526b.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::template
 * @see app/Http/Controllers/MasterData/MasterDataController.php:269
 * @route '/modules/payroll-periods/template'
 */
template7e4c861bedac3305c16f1a08ef19526b.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: template7e4c861bedac3305c16f1a08ef19526b.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\MasterData\MasterDataController::template
 * @see app/Http/Controllers/MasterData/MasterDataController.php:269
 * @route '/modules/payroll-periods/template'
 */
template7e4c861bedac3305c16f1a08ef19526b.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: template7e4c861bedac3305c16f1a08ef19526b.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::template
 * @see app/Http/Controllers/MasterData/MasterDataController.php:269
 * @route '/modules/payroll-periods/template'
 */
    const template7e4c861bedac3305c16f1a08ef19526bForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: template7e4c861bedac3305c16f1a08ef19526b.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\MasterData\MasterDataController::template
 * @see app/Http/Controllers/MasterData/MasterDataController.php:269
 * @route '/modules/payroll-periods/template'
 */
        template7e4c861bedac3305c16f1a08ef19526bForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: template7e4c861bedac3305c16f1a08ef19526b.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\MasterData\MasterDataController::template
 * @see app/Http/Controllers/MasterData/MasterDataController.php:269
 * @route '/modules/payroll-periods/template'
 */
        template7e4c861bedac3305c16f1a08ef19526bForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: template7e4c861bedac3305c16f1a08ef19526b.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    template7e4c861bedac3305c16f1a08ef19526b.form = template7e4c861bedac3305c16f1a08ef19526bForm

export const template = {
    '/modules/organization/{resource}/template': template91ed5b9756a02b410174b9bb1146801b,
    '/modules/employees/template': templatecb1930d01bb1c34de88da8e05a5b36ca,
    '/modules/attendance/template': templateb8e163650583cd85d7c7c2332c9853ab,
    '/modules/shifts/template': templatedf003dda200db20cab1219d6a492910b,
    '/modules/leave-types/template': template2a777b858ff0a8a31aa8790ea605e4bc,
    '/modules/schedules/template': template96005a44a8e4dcbd91dac16612e00bb2,
    '/modules/{resource}/template': template93bc8779aa738af71e091bf38ba2c079,
    '/modules/salary-components/template': template41d657ba8abeed6ed19ac924dbdeacf2,
    '/modules/payroll-periods/template': template7e4c861bedac3305c16f1a08ef19526b,
}

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::exportMethod
 * @see app/Http/Controllers/MasterData/MasterDataController.php:209
 * @route '/modules/organization/{resource}/export'
 */
const exportMethodc49ccef7cbbb1081613d42b04f5a8dc6 = (args: { resource: string | number } | [resource: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethodc49ccef7cbbb1081613d42b04f5a8dc6.url(args, options),
    method: 'get',
})

exportMethodc49ccef7cbbb1081613d42b04f5a8dc6.definition = {
    methods: ["get","head"],
    url: '/modules/organization/{resource}/export',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::exportMethod
 * @see app/Http/Controllers/MasterData/MasterDataController.php:209
 * @route '/modules/organization/{resource}/export'
 */
exportMethodc49ccef7cbbb1081613d42b04f5a8dc6.url = (args: { resource: string | number } | [resource: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { resource: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    resource: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        resource: args.resource,
                }

    return exportMethodc49ccef7cbbb1081613d42b04f5a8dc6.definition.url
            .replace('{resource}', parsedArgs.resource.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::exportMethod
 * @see app/Http/Controllers/MasterData/MasterDataController.php:209
 * @route '/modules/organization/{resource}/export'
 */
exportMethodc49ccef7cbbb1081613d42b04f5a8dc6.get = (args: { resource: string | number } | [resource: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethodc49ccef7cbbb1081613d42b04f5a8dc6.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\MasterData\MasterDataController::exportMethod
 * @see app/Http/Controllers/MasterData/MasterDataController.php:209
 * @route '/modules/organization/{resource}/export'
 */
exportMethodc49ccef7cbbb1081613d42b04f5a8dc6.head = (args: { resource: string | number } | [resource: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportMethodc49ccef7cbbb1081613d42b04f5a8dc6.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::exportMethod
 * @see app/Http/Controllers/MasterData/MasterDataController.php:209
 * @route '/modules/organization/{resource}/export'
 */
    const exportMethodc49ccef7cbbb1081613d42b04f5a8dc6Form = (args: { resource: string | number } | [resource: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: exportMethodc49ccef7cbbb1081613d42b04f5a8dc6.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\MasterData\MasterDataController::exportMethod
 * @see app/Http/Controllers/MasterData/MasterDataController.php:209
 * @route '/modules/organization/{resource}/export'
 */
        exportMethodc49ccef7cbbb1081613d42b04f5a8dc6Form.get = (args: { resource: string | number } | [resource: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportMethodc49ccef7cbbb1081613d42b04f5a8dc6.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\MasterData\MasterDataController::exportMethod
 * @see app/Http/Controllers/MasterData/MasterDataController.php:209
 * @route '/modules/organization/{resource}/export'
 */
        exportMethodc49ccef7cbbb1081613d42b04f5a8dc6Form.head = (args: { resource: string | number } | [resource: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportMethodc49ccef7cbbb1081613d42b04f5a8dc6.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    exportMethodc49ccef7cbbb1081613d42b04f5a8dc6.form = exportMethodc49ccef7cbbb1081613d42b04f5a8dc6Form
    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::exportMethod
 * @see app/Http/Controllers/MasterData/MasterDataController.php:209
 * @route '/modules/employees/export'
 */
const exportMethod45a09f6bf2cb3cb039871ce549d9df10 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod45a09f6bf2cb3cb039871ce549d9df10.url(options),
    method: 'get',
})

exportMethod45a09f6bf2cb3cb039871ce549d9df10.definition = {
    methods: ["get","head"],
    url: '/modules/employees/export',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::exportMethod
 * @see app/Http/Controllers/MasterData/MasterDataController.php:209
 * @route '/modules/employees/export'
 */
exportMethod45a09f6bf2cb3cb039871ce549d9df10.url = (options?: RouteQueryOptions) => {
    return exportMethod45a09f6bf2cb3cb039871ce549d9df10.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::exportMethod
 * @see app/Http/Controllers/MasterData/MasterDataController.php:209
 * @route '/modules/employees/export'
 */
exportMethod45a09f6bf2cb3cb039871ce549d9df10.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod45a09f6bf2cb3cb039871ce549d9df10.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\MasterData\MasterDataController::exportMethod
 * @see app/Http/Controllers/MasterData/MasterDataController.php:209
 * @route '/modules/employees/export'
 */
exportMethod45a09f6bf2cb3cb039871ce549d9df10.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportMethod45a09f6bf2cb3cb039871ce549d9df10.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::exportMethod
 * @see app/Http/Controllers/MasterData/MasterDataController.php:209
 * @route '/modules/employees/export'
 */
    const exportMethod45a09f6bf2cb3cb039871ce549d9df10Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: exportMethod45a09f6bf2cb3cb039871ce549d9df10.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\MasterData\MasterDataController::exportMethod
 * @see app/Http/Controllers/MasterData/MasterDataController.php:209
 * @route '/modules/employees/export'
 */
        exportMethod45a09f6bf2cb3cb039871ce549d9df10Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportMethod45a09f6bf2cb3cb039871ce549d9df10.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\MasterData\MasterDataController::exportMethod
 * @see app/Http/Controllers/MasterData/MasterDataController.php:209
 * @route '/modules/employees/export'
 */
        exportMethod45a09f6bf2cb3cb039871ce549d9df10Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportMethod45a09f6bf2cb3cb039871ce549d9df10.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    exportMethod45a09f6bf2cb3cb039871ce549d9df10.form = exportMethod45a09f6bf2cb3cb039871ce549d9df10Form
    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::exportMethod
 * @see app/Http/Controllers/MasterData/MasterDataController.php:209
 * @route '/modules/attendance/export'
 */
const exportMethod993269b5174e75de83a909bd39b51944 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod993269b5174e75de83a909bd39b51944.url(options),
    method: 'get',
})

exportMethod993269b5174e75de83a909bd39b51944.definition = {
    methods: ["get","head"],
    url: '/modules/attendance/export',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::exportMethod
 * @see app/Http/Controllers/MasterData/MasterDataController.php:209
 * @route '/modules/attendance/export'
 */
exportMethod993269b5174e75de83a909bd39b51944.url = (options?: RouteQueryOptions) => {
    return exportMethod993269b5174e75de83a909bd39b51944.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::exportMethod
 * @see app/Http/Controllers/MasterData/MasterDataController.php:209
 * @route '/modules/attendance/export'
 */
exportMethod993269b5174e75de83a909bd39b51944.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod993269b5174e75de83a909bd39b51944.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\MasterData\MasterDataController::exportMethod
 * @see app/Http/Controllers/MasterData/MasterDataController.php:209
 * @route '/modules/attendance/export'
 */
exportMethod993269b5174e75de83a909bd39b51944.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportMethod993269b5174e75de83a909bd39b51944.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::exportMethod
 * @see app/Http/Controllers/MasterData/MasterDataController.php:209
 * @route '/modules/attendance/export'
 */
    const exportMethod993269b5174e75de83a909bd39b51944Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: exportMethod993269b5174e75de83a909bd39b51944.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\MasterData\MasterDataController::exportMethod
 * @see app/Http/Controllers/MasterData/MasterDataController.php:209
 * @route '/modules/attendance/export'
 */
        exportMethod993269b5174e75de83a909bd39b51944Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportMethod993269b5174e75de83a909bd39b51944.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\MasterData\MasterDataController::exportMethod
 * @see app/Http/Controllers/MasterData/MasterDataController.php:209
 * @route '/modules/attendance/export'
 */
        exportMethod993269b5174e75de83a909bd39b51944Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportMethod993269b5174e75de83a909bd39b51944.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    exportMethod993269b5174e75de83a909bd39b51944.form = exportMethod993269b5174e75de83a909bd39b51944Form
    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::exportMethod
 * @see app/Http/Controllers/MasterData/MasterDataController.php:209
 * @route '/modules/shifts/export'
 */
const exportMethodadfd495ff7f01b9fc2239d16cfd16168 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethodadfd495ff7f01b9fc2239d16cfd16168.url(options),
    method: 'get',
})

exportMethodadfd495ff7f01b9fc2239d16cfd16168.definition = {
    methods: ["get","head"],
    url: '/modules/shifts/export',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::exportMethod
 * @see app/Http/Controllers/MasterData/MasterDataController.php:209
 * @route '/modules/shifts/export'
 */
exportMethodadfd495ff7f01b9fc2239d16cfd16168.url = (options?: RouteQueryOptions) => {
    return exportMethodadfd495ff7f01b9fc2239d16cfd16168.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::exportMethod
 * @see app/Http/Controllers/MasterData/MasterDataController.php:209
 * @route '/modules/shifts/export'
 */
exportMethodadfd495ff7f01b9fc2239d16cfd16168.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethodadfd495ff7f01b9fc2239d16cfd16168.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\MasterData\MasterDataController::exportMethod
 * @see app/Http/Controllers/MasterData/MasterDataController.php:209
 * @route '/modules/shifts/export'
 */
exportMethodadfd495ff7f01b9fc2239d16cfd16168.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportMethodadfd495ff7f01b9fc2239d16cfd16168.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::exportMethod
 * @see app/Http/Controllers/MasterData/MasterDataController.php:209
 * @route '/modules/shifts/export'
 */
    const exportMethodadfd495ff7f01b9fc2239d16cfd16168Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: exportMethodadfd495ff7f01b9fc2239d16cfd16168.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\MasterData\MasterDataController::exportMethod
 * @see app/Http/Controllers/MasterData/MasterDataController.php:209
 * @route '/modules/shifts/export'
 */
        exportMethodadfd495ff7f01b9fc2239d16cfd16168Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportMethodadfd495ff7f01b9fc2239d16cfd16168.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\MasterData\MasterDataController::exportMethod
 * @see app/Http/Controllers/MasterData/MasterDataController.php:209
 * @route '/modules/shifts/export'
 */
        exportMethodadfd495ff7f01b9fc2239d16cfd16168Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportMethodadfd495ff7f01b9fc2239d16cfd16168.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    exportMethodadfd495ff7f01b9fc2239d16cfd16168.form = exportMethodadfd495ff7f01b9fc2239d16cfd16168Form
    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::exportMethod
 * @see app/Http/Controllers/MasterData/MasterDataController.php:209
 * @route '/modules/leave-types/export'
 */
const exportMethod397faf37539a5fa2d899d84575f384be = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod397faf37539a5fa2d899d84575f384be.url(options),
    method: 'get',
})

exportMethod397faf37539a5fa2d899d84575f384be.definition = {
    methods: ["get","head"],
    url: '/modules/leave-types/export',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::exportMethod
 * @see app/Http/Controllers/MasterData/MasterDataController.php:209
 * @route '/modules/leave-types/export'
 */
exportMethod397faf37539a5fa2d899d84575f384be.url = (options?: RouteQueryOptions) => {
    return exportMethod397faf37539a5fa2d899d84575f384be.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::exportMethod
 * @see app/Http/Controllers/MasterData/MasterDataController.php:209
 * @route '/modules/leave-types/export'
 */
exportMethod397faf37539a5fa2d899d84575f384be.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod397faf37539a5fa2d899d84575f384be.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\MasterData\MasterDataController::exportMethod
 * @see app/Http/Controllers/MasterData/MasterDataController.php:209
 * @route '/modules/leave-types/export'
 */
exportMethod397faf37539a5fa2d899d84575f384be.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportMethod397faf37539a5fa2d899d84575f384be.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::exportMethod
 * @see app/Http/Controllers/MasterData/MasterDataController.php:209
 * @route '/modules/leave-types/export'
 */
    const exportMethod397faf37539a5fa2d899d84575f384beForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: exportMethod397faf37539a5fa2d899d84575f384be.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\MasterData\MasterDataController::exportMethod
 * @see app/Http/Controllers/MasterData/MasterDataController.php:209
 * @route '/modules/leave-types/export'
 */
        exportMethod397faf37539a5fa2d899d84575f384beForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportMethod397faf37539a5fa2d899d84575f384be.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\MasterData\MasterDataController::exportMethod
 * @see app/Http/Controllers/MasterData/MasterDataController.php:209
 * @route '/modules/leave-types/export'
 */
        exportMethod397faf37539a5fa2d899d84575f384beForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportMethod397faf37539a5fa2d899d84575f384be.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    exportMethod397faf37539a5fa2d899d84575f384be.form = exportMethod397faf37539a5fa2d899d84575f384beForm
    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::exportMethod
 * @see app/Http/Controllers/MasterData/MasterDataController.php:209
 * @route '/modules/schedules/export'
 */
const exportMethod6ae6673cca5b326aa14d818d2226f215 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod6ae6673cca5b326aa14d818d2226f215.url(options),
    method: 'get',
})

exportMethod6ae6673cca5b326aa14d818d2226f215.definition = {
    methods: ["get","head"],
    url: '/modules/schedules/export',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::exportMethod
 * @see app/Http/Controllers/MasterData/MasterDataController.php:209
 * @route '/modules/schedules/export'
 */
exportMethod6ae6673cca5b326aa14d818d2226f215.url = (options?: RouteQueryOptions) => {
    return exportMethod6ae6673cca5b326aa14d818d2226f215.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::exportMethod
 * @see app/Http/Controllers/MasterData/MasterDataController.php:209
 * @route '/modules/schedules/export'
 */
exportMethod6ae6673cca5b326aa14d818d2226f215.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod6ae6673cca5b326aa14d818d2226f215.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\MasterData\MasterDataController::exportMethod
 * @see app/Http/Controllers/MasterData/MasterDataController.php:209
 * @route '/modules/schedules/export'
 */
exportMethod6ae6673cca5b326aa14d818d2226f215.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportMethod6ae6673cca5b326aa14d818d2226f215.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::exportMethod
 * @see app/Http/Controllers/MasterData/MasterDataController.php:209
 * @route '/modules/schedules/export'
 */
    const exportMethod6ae6673cca5b326aa14d818d2226f215Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: exportMethod6ae6673cca5b326aa14d818d2226f215.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\MasterData\MasterDataController::exportMethod
 * @see app/Http/Controllers/MasterData/MasterDataController.php:209
 * @route '/modules/schedules/export'
 */
        exportMethod6ae6673cca5b326aa14d818d2226f215Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportMethod6ae6673cca5b326aa14d818d2226f215.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\MasterData\MasterDataController::exportMethod
 * @see app/Http/Controllers/MasterData/MasterDataController.php:209
 * @route '/modules/schedules/export'
 */
        exportMethod6ae6673cca5b326aa14d818d2226f215Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportMethod6ae6673cca5b326aa14d818d2226f215.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    exportMethod6ae6673cca5b326aa14d818d2226f215.form = exportMethod6ae6673cca5b326aa14d818d2226f215Form
    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::exportMethod
 * @see app/Http/Controllers/MasterData/MasterDataController.php:209
 * @route '/modules/{resource}/export'
 */
const exportMethodbe1321bfae65d6ae0c8b98a88c98b2b3 = (args: { resource: string | number } | [resource: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethodbe1321bfae65d6ae0c8b98a88c98b2b3.url(args, options),
    method: 'get',
})

exportMethodbe1321bfae65d6ae0c8b98a88c98b2b3.definition = {
    methods: ["get","head"],
    url: '/modules/{resource}/export',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::exportMethod
 * @see app/Http/Controllers/MasterData/MasterDataController.php:209
 * @route '/modules/{resource}/export'
 */
exportMethodbe1321bfae65d6ae0c8b98a88c98b2b3.url = (args: { resource: string | number } | [resource: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { resource: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    resource: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        resource: args.resource,
                }

    return exportMethodbe1321bfae65d6ae0c8b98a88c98b2b3.definition.url
            .replace('{resource}', parsedArgs.resource.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::exportMethod
 * @see app/Http/Controllers/MasterData/MasterDataController.php:209
 * @route '/modules/{resource}/export'
 */
exportMethodbe1321bfae65d6ae0c8b98a88c98b2b3.get = (args: { resource: string | number } | [resource: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethodbe1321bfae65d6ae0c8b98a88c98b2b3.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\MasterData\MasterDataController::exportMethod
 * @see app/Http/Controllers/MasterData/MasterDataController.php:209
 * @route '/modules/{resource}/export'
 */
exportMethodbe1321bfae65d6ae0c8b98a88c98b2b3.head = (args: { resource: string | number } | [resource: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportMethodbe1321bfae65d6ae0c8b98a88c98b2b3.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::exportMethod
 * @see app/Http/Controllers/MasterData/MasterDataController.php:209
 * @route '/modules/{resource}/export'
 */
    const exportMethodbe1321bfae65d6ae0c8b98a88c98b2b3Form = (args: { resource: string | number } | [resource: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: exportMethodbe1321bfae65d6ae0c8b98a88c98b2b3.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\MasterData\MasterDataController::exportMethod
 * @see app/Http/Controllers/MasterData/MasterDataController.php:209
 * @route '/modules/{resource}/export'
 */
        exportMethodbe1321bfae65d6ae0c8b98a88c98b2b3Form.get = (args: { resource: string | number } | [resource: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportMethodbe1321bfae65d6ae0c8b98a88c98b2b3.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\MasterData\MasterDataController::exportMethod
 * @see app/Http/Controllers/MasterData/MasterDataController.php:209
 * @route '/modules/{resource}/export'
 */
        exportMethodbe1321bfae65d6ae0c8b98a88c98b2b3Form.head = (args: { resource: string | number } | [resource: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportMethodbe1321bfae65d6ae0c8b98a88c98b2b3.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    exportMethodbe1321bfae65d6ae0c8b98a88c98b2b3.form = exportMethodbe1321bfae65d6ae0c8b98a88c98b2b3Form
    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::exportMethod
 * @see app/Http/Controllers/MasterData/MasterDataController.php:209
 * @route '/modules/salary-components/export'
 */
const exportMethod54dbb7c6e85ea4410f7bb7e85f6802f5 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod54dbb7c6e85ea4410f7bb7e85f6802f5.url(options),
    method: 'get',
})

exportMethod54dbb7c6e85ea4410f7bb7e85f6802f5.definition = {
    methods: ["get","head"],
    url: '/modules/salary-components/export',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::exportMethod
 * @see app/Http/Controllers/MasterData/MasterDataController.php:209
 * @route '/modules/salary-components/export'
 */
exportMethod54dbb7c6e85ea4410f7bb7e85f6802f5.url = (options?: RouteQueryOptions) => {
    return exportMethod54dbb7c6e85ea4410f7bb7e85f6802f5.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::exportMethod
 * @see app/Http/Controllers/MasterData/MasterDataController.php:209
 * @route '/modules/salary-components/export'
 */
exportMethod54dbb7c6e85ea4410f7bb7e85f6802f5.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod54dbb7c6e85ea4410f7bb7e85f6802f5.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\MasterData\MasterDataController::exportMethod
 * @see app/Http/Controllers/MasterData/MasterDataController.php:209
 * @route '/modules/salary-components/export'
 */
exportMethod54dbb7c6e85ea4410f7bb7e85f6802f5.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportMethod54dbb7c6e85ea4410f7bb7e85f6802f5.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::exportMethod
 * @see app/Http/Controllers/MasterData/MasterDataController.php:209
 * @route '/modules/salary-components/export'
 */
    const exportMethod54dbb7c6e85ea4410f7bb7e85f6802f5Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: exportMethod54dbb7c6e85ea4410f7bb7e85f6802f5.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\MasterData\MasterDataController::exportMethod
 * @see app/Http/Controllers/MasterData/MasterDataController.php:209
 * @route '/modules/salary-components/export'
 */
        exportMethod54dbb7c6e85ea4410f7bb7e85f6802f5Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportMethod54dbb7c6e85ea4410f7bb7e85f6802f5.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\MasterData\MasterDataController::exportMethod
 * @see app/Http/Controllers/MasterData/MasterDataController.php:209
 * @route '/modules/salary-components/export'
 */
        exportMethod54dbb7c6e85ea4410f7bb7e85f6802f5Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportMethod54dbb7c6e85ea4410f7bb7e85f6802f5.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    exportMethod54dbb7c6e85ea4410f7bb7e85f6802f5.form = exportMethod54dbb7c6e85ea4410f7bb7e85f6802f5Form
    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::exportMethod
 * @see app/Http/Controllers/MasterData/MasterDataController.php:209
 * @route '/modules/payroll-periods/export'
 */
const exportMethod5b60734e48a9348e6879eef742071fdd = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod5b60734e48a9348e6879eef742071fdd.url(options),
    method: 'get',
})

exportMethod5b60734e48a9348e6879eef742071fdd.definition = {
    methods: ["get","head"],
    url: '/modules/payroll-periods/export',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::exportMethod
 * @see app/Http/Controllers/MasterData/MasterDataController.php:209
 * @route '/modules/payroll-periods/export'
 */
exportMethod5b60734e48a9348e6879eef742071fdd.url = (options?: RouteQueryOptions) => {
    return exportMethod5b60734e48a9348e6879eef742071fdd.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::exportMethod
 * @see app/Http/Controllers/MasterData/MasterDataController.php:209
 * @route '/modules/payroll-periods/export'
 */
exportMethod5b60734e48a9348e6879eef742071fdd.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod5b60734e48a9348e6879eef742071fdd.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\MasterData\MasterDataController::exportMethod
 * @see app/Http/Controllers/MasterData/MasterDataController.php:209
 * @route '/modules/payroll-periods/export'
 */
exportMethod5b60734e48a9348e6879eef742071fdd.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportMethod5b60734e48a9348e6879eef742071fdd.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::exportMethod
 * @see app/Http/Controllers/MasterData/MasterDataController.php:209
 * @route '/modules/payroll-periods/export'
 */
    const exportMethod5b60734e48a9348e6879eef742071fddForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: exportMethod5b60734e48a9348e6879eef742071fdd.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\MasterData\MasterDataController::exportMethod
 * @see app/Http/Controllers/MasterData/MasterDataController.php:209
 * @route '/modules/payroll-periods/export'
 */
        exportMethod5b60734e48a9348e6879eef742071fddForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportMethod5b60734e48a9348e6879eef742071fdd.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\MasterData\MasterDataController::exportMethod
 * @see app/Http/Controllers/MasterData/MasterDataController.php:209
 * @route '/modules/payroll-periods/export'
 */
        exportMethod5b60734e48a9348e6879eef742071fddForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportMethod5b60734e48a9348e6879eef742071fdd.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    exportMethod5b60734e48a9348e6879eef742071fdd.form = exportMethod5b60734e48a9348e6879eef742071fddForm

export const exportMethod = {
    '/modules/organization/{resource}/export': exportMethodc49ccef7cbbb1081613d42b04f5a8dc6,
    '/modules/employees/export': exportMethod45a09f6bf2cb3cb039871ce549d9df10,
    '/modules/attendance/export': exportMethod993269b5174e75de83a909bd39b51944,
    '/modules/shifts/export': exportMethodadfd495ff7f01b9fc2239d16cfd16168,
    '/modules/leave-types/export': exportMethod397faf37539a5fa2d899d84575f384be,
    '/modules/schedules/export': exportMethod6ae6673cca5b326aa14d818d2226f215,
    '/modules/{resource}/export': exportMethodbe1321bfae65d6ae0c8b98a88c98b2b3,
    '/modules/salary-components/export': exportMethod54dbb7c6e85ea4410f7bb7e85f6802f5,
    '/modules/payroll-periods/export': exportMethod5b60734e48a9348e6879eef742071fdd,
}

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::importMethod
 * @see app/Http/Controllers/MasterData/MasterDataController.php:341
 * @route '/modules/organization/{resource}/import'
 */
const importMethod62f80c9f6a21347779d8b91791911758 = (args: { resource: string | number } | [resource: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: importMethod62f80c9f6a21347779d8b91791911758.url(args, options),
    method: 'post',
})

importMethod62f80c9f6a21347779d8b91791911758.definition = {
    methods: ["post"],
    url: '/modules/organization/{resource}/import',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::importMethod
 * @see app/Http/Controllers/MasterData/MasterDataController.php:341
 * @route '/modules/organization/{resource}/import'
 */
importMethod62f80c9f6a21347779d8b91791911758.url = (args: { resource: string | number } | [resource: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { resource: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    resource: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        resource: args.resource,
                }

    return importMethod62f80c9f6a21347779d8b91791911758.definition.url
            .replace('{resource}', parsedArgs.resource.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::importMethod
 * @see app/Http/Controllers/MasterData/MasterDataController.php:341
 * @route '/modules/organization/{resource}/import'
 */
importMethod62f80c9f6a21347779d8b91791911758.post = (args: { resource: string | number } | [resource: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: importMethod62f80c9f6a21347779d8b91791911758.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::importMethod
 * @see app/Http/Controllers/MasterData/MasterDataController.php:341
 * @route '/modules/organization/{resource}/import'
 */
    const importMethod62f80c9f6a21347779d8b91791911758Form = (args: { resource: string | number } | [resource: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: importMethod62f80c9f6a21347779d8b91791911758.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\MasterData\MasterDataController::importMethod
 * @see app/Http/Controllers/MasterData/MasterDataController.php:341
 * @route '/modules/organization/{resource}/import'
 */
        importMethod62f80c9f6a21347779d8b91791911758Form.post = (args: { resource: string | number } | [resource: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: importMethod62f80c9f6a21347779d8b91791911758.url(args, options),
            method: 'post',
        })
    
    importMethod62f80c9f6a21347779d8b91791911758.form = importMethod62f80c9f6a21347779d8b91791911758Form
    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::importMethod
 * @see app/Http/Controllers/MasterData/MasterDataController.php:341
 * @route '/modules/employees/import'
 */
const importMethod4ed460ea37c485b4ed72cae932be6bae = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: importMethod4ed460ea37c485b4ed72cae932be6bae.url(options),
    method: 'post',
})

importMethod4ed460ea37c485b4ed72cae932be6bae.definition = {
    methods: ["post"],
    url: '/modules/employees/import',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::importMethod
 * @see app/Http/Controllers/MasterData/MasterDataController.php:341
 * @route '/modules/employees/import'
 */
importMethod4ed460ea37c485b4ed72cae932be6bae.url = (options?: RouteQueryOptions) => {
    return importMethod4ed460ea37c485b4ed72cae932be6bae.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::importMethod
 * @see app/Http/Controllers/MasterData/MasterDataController.php:341
 * @route '/modules/employees/import'
 */
importMethod4ed460ea37c485b4ed72cae932be6bae.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: importMethod4ed460ea37c485b4ed72cae932be6bae.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::importMethod
 * @see app/Http/Controllers/MasterData/MasterDataController.php:341
 * @route '/modules/employees/import'
 */
    const importMethod4ed460ea37c485b4ed72cae932be6baeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: importMethod4ed460ea37c485b4ed72cae932be6bae.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\MasterData\MasterDataController::importMethod
 * @see app/Http/Controllers/MasterData/MasterDataController.php:341
 * @route '/modules/employees/import'
 */
        importMethod4ed460ea37c485b4ed72cae932be6baeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: importMethod4ed460ea37c485b4ed72cae932be6bae.url(options),
            method: 'post',
        })
    
    importMethod4ed460ea37c485b4ed72cae932be6bae.form = importMethod4ed460ea37c485b4ed72cae932be6baeForm
    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::importMethod
 * @see app/Http/Controllers/MasterData/MasterDataController.php:341
 * @route '/modules/attendance/import'
 */
const importMethod81014b7b93cbb547bc5e4752830d399a = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: importMethod81014b7b93cbb547bc5e4752830d399a.url(options),
    method: 'post',
})

importMethod81014b7b93cbb547bc5e4752830d399a.definition = {
    methods: ["post"],
    url: '/modules/attendance/import',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::importMethod
 * @see app/Http/Controllers/MasterData/MasterDataController.php:341
 * @route '/modules/attendance/import'
 */
importMethod81014b7b93cbb547bc5e4752830d399a.url = (options?: RouteQueryOptions) => {
    return importMethod81014b7b93cbb547bc5e4752830d399a.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::importMethod
 * @see app/Http/Controllers/MasterData/MasterDataController.php:341
 * @route '/modules/attendance/import'
 */
importMethod81014b7b93cbb547bc5e4752830d399a.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: importMethod81014b7b93cbb547bc5e4752830d399a.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::importMethod
 * @see app/Http/Controllers/MasterData/MasterDataController.php:341
 * @route '/modules/attendance/import'
 */
    const importMethod81014b7b93cbb547bc5e4752830d399aForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: importMethod81014b7b93cbb547bc5e4752830d399a.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\MasterData\MasterDataController::importMethod
 * @see app/Http/Controllers/MasterData/MasterDataController.php:341
 * @route '/modules/attendance/import'
 */
        importMethod81014b7b93cbb547bc5e4752830d399aForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: importMethod81014b7b93cbb547bc5e4752830d399a.url(options),
            method: 'post',
        })
    
    importMethod81014b7b93cbb547bc5e4752830d399a.form = importMethod81014b7b93cbb547bc5e4752830d399aForm
    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::importMethod
 * @see app/Http/Controllers/MasterData/MasterDataController.php:341
 * @route '/modules/shifts/import'
 */
const importMethod276c5f23fc39e4c8660122c67ef18ed6 = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: importMethod276c5f23fc39e4c8660122c67ef18ed6.url(options),
    method: 'post',
})

importMethod276c5f23fc39e4c8660122c67ef18ed6.definition = {
    methods: ["post"],
    url: '/modules/shifts/import',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::importMethod
 * @see app/Http/Controllers/MasterData/MasterDataController.php:341
 * @route '/modules/shifts/import'
 */
importMethod276c5f23fc39e4c8660122c67ef18ed6.url = (options?: RouteQueryOptions) => {
    return importMethod276c5f23fc39e4c8660122c67ef18ed6.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::importMethod
 * @see app/Http/Controllers/MasterData/MasterDataController.php:341
 * @route '/modules/shifts/import'
 */
importMethod276c5f23fc39e4c8660122c67ef18ed6.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: importMethod276c5f23fc39e4c8660122c67ef18ed6.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::importMethod
 * @see app/Http/Controllers/MasterData/MasterDataController.php:341
 * @route '/modules/shifts/import'
 */
    const importMethod276c5f23fc39e4c8660122c67ef18ed6Form = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: importMethod276c5f23fc39e4c8660122c67ef18ed6.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\MasterData\MasterDataController::importMethod
 * @see app/Http/Controllers/MasterData/MasterDataController.php:341
 * @route '/modules/shifts/import'
 */
        importMethod276c5f23fc39e4c8660122c67ef18ed6Form.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: importMethod276c5f23fc39e4c8660122c67ef18ed6.url(options),
            method: 'post',
        })
    
    importMethod276c5f23fc39e4c8660122c67ef18ed6.form = importMethod276c5f23fc39e4c8660122c67ef18ed6Form
    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::importMethod
 * @see app/Http/Controllers/MasterData/MasterDataController.php:341
 * @route '/modules/leave-types/import'
 */
const importMethod280bdd04502d7ef9453794f03d192ab0 = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: importMethod280bdd04502d7ef9453794f03d192ab0.url(options),
    method: 'post',
})

importMethod280bdd04502d7ef9453794f03d192ab0.definition = {
    methods: ["post"],
    url: '/modules/leave-types/import',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::importMethod
 * @see app/Http/Controllers/MasterData/MasterDataController.php:341
 * @route '/modules/leave-types/import'
 */
importMethod280bdd04502d7ef9453794f03d192ab0.url = (options?: RouteQueryOptions) => {
    return importMethod280bdd04502d7ef9453794f03d192ab0.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::importMethod
 * @see app/Http/Controllers/MasterData/MasterDataController.php:341
 * @route '/modules/leave-types/import'
 */
importMethod280bdd04502d7ef9453794f03d192ab0.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: importMethod280bdd04502d7ef9453794f03d192ab0.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::importMethod
 * @see app/Http/Controllers/MasterData/MasterDataController.php:341
 * @route '/modules/leave-types/import'
 */
    const importMethod280bdd04502d7ef9453794f03d192ab0Form = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: importMethod280bdd04502d7ef9453794f03d192ab0.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\MasterData\MasterDataController::importMethod
 * @see app/Http/Controllers/MasterData/MasterDataController.php:341
 * @route '/modules/leave-types/import'
 */
        importMethod280bdd04502d7ef9453794f03d192ab0Form.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: importMethod280bdd04502d7ef9453794f03d192ab0.url(options),
            method: 'post',
        })
    
    importMethod280bdd04502d7ef9453794f03d192ab0.form = importMethod280bdd04502d7ef9453794f03d192ab0Form
    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::importMethod
 * @see app/Http/Controllers/MasterData/MasterDataController.php:341
 * @route '/modules/schedules/import'
 */
const importMethod74495e2962a56fa31bb1155de59a2155 = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: importMethod74495e2962a56fa31bb1155de59a2155.url(options),
    method: 'post',
})

importMethod74495e2962a56fa31bb1155de59a2155.definition = {
    methods: ["post"],
    url: '/modules/schedules/import',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::importMethod
 * @see app/Http/Controllers/MasterData/MasterDataController.php:341
 * @route '/modules/schedules/import'
 */
importMethod74495e2962a56fa31bb1155de59a2155.url = (options?: RouteQueryOptions) => {
    return importMethod74495e2962a56fa31bb1155de59a2155.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::importMethod
 * @see app/Http/Controllers/MasterData/MasterDataController.php:341
 * @route '/modules/schedules/import'
 */
importMethod74495e2962a56fa31bb1155de59a2155.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: importMethod74495e2962a56fa31bb1155de59a2155.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::importMethod
 * @see app/Http/Controllers/MasterData/MasterDataController.php:341
 * @route '/modules/schedules/import'
 */
    const importMethod74495e2962a56fa31bb1155de59a2155Form = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: importMethod74495e2962a56fa31bb1155de59a2155.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\MasterData\MasterDataController::importMethod
 * @see app/Http/Controllers/MasterData/MasterDataController.php:341
 * @route '/modules/schedules/import'
 */
        importMethod74495e2962a56fa31bb1155de59a2155Form.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: importMethod74495e2962a56fa31bb1155de59a2155.url(options),
            method: 'post',
        })
    
    importMethod74495e2962a56fa31bb1155de59a2155.form = importMethod74495e2962a56fa31bb1155de59a2155Form
    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::importMethod
 * @see app/Http/Controllers/MasterData/MasterDataController.php:341
 * @route '/modules/{resource}/import'
 */
const importMethodb9caa58eadcd002f5f547469b7d82d4c = (args: { resource: string | number } | [resource: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: importMethodb9caa58eadcd002f5f547469b7d82d4c.url(args, options),
    method: 'post',
})

importMethodb9caa58eadcd002f5f547469b7d82d4c.definition = {
    methods: ["post"],
    url: '/modules/{resource}/import',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::importMethod
 * @see app/Http/Controllers/MasterData/MasterDataController.php:341
 * @route '/modules/{resource}/import'
 */
importMethodb9caa58eadcd002f5f547469b7d82d4c.url = (args: { resource: string | number } | [resource: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { resource: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    resource: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        resource: args.resource,
                }

    return importMethodb9caa58eadcd002f5f547469b7d82d4c.definition.url
            .replace('{resource}', parsedArgs.resource.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::importMethod
 * @see app/Http/Controllers/MasterData/MasterDataController.php:341
 * @route '/modules/{resource}/import'
 */
importMethodb9caa58eadcd002f5f547469b7d82d4c.post = (args: { resource: string | number } | [resource: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: importMethodb9caa58eadcd002f5f547469b7d82d4c.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::importMethod
 * @see app/Http/Controllers/MasterData/MasterDataController.php:341
 * @route '/modules/{resource}/import'
 */
    const importMethodb9caa58eadcd002f5f547469b7d82d4cForm = (args: { resource: string | number } | [resource: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: importMethodb9caa58eadcd002f5f547469b7d82d4c.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\MasterData\MasterDataController::importMethod
 * @see app/Http/Controllers/MasterData/MasterDataController.php:341
 * @route '/modules/{resource}/import'
 */
        importMethodb9caa58eadcd002f5f547469b7d82d4cForm.post = (args: { resource: string | number } | [resource: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: importMethodb9caa58eadcd002f5f547469b7d82d4c.url(args, options),
            method: 'post',
        })
    
    importMethodb9caa58eadcd002f5f547469b7d82d4c.form = importMethodb9caa58eadcd002f5f547469b7d82d4cForm
    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::importMethod
 * @see app/Http/Controllers/MasterData/MasterDataController.php:341
 * @route '/modules/salary-components/import'
 */
const importMethodb60400106e8759f5960df0c6a8273d61 = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: importMethodb60400106e8759f5960df0c6a8273d61.url(options),
    method: 'post',
})

importMethodb60400106e8759f5960df0c6a8273d61.definition = {
    methods: ["post"],
    url: '/modules/salary-components/import',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::importMethod
 * @see app/Http/Controllers/MasterData/MasterDataController.php:341
 * @route '/modules/salary-components/import'
 */
importMethodb60400106e8759f5960df0c6a8273d61.url = (options?: RouteQueryOptions) => {
    return importMethodb60400106e8759f5960df0c6a8273d61.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::importMethod
 * @see app/Http/Controllers/MasterData/MasterDataController.php:341
 * @route '/modules/salary-components/import'
 */
importMethodb60400106e8759f5960df0c6a8273d61.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: importMethodb60400106e8759f5960df0c6a8273d61.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::importMethod
 * @see app/Http/Controllers/MasterData/MasterDataController.php:341
 * @route '/modules/salary-components/import'
 */
    const importMethodb60400106e8759f5960df0c6a8273d61Form = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: importMethodb60400106e8759f5960df0c6a8273d61.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\MasterData\MasterDataController::importMethod
 * @see app/Http/Controllers/MasterData/MasterDataController.php:341
 * @route '/modules/salary-components/import'
 */
        importMethodb60400106e8759f5960df0c6a8273d61Form.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: importMethodb60400106e8759f5960df0c6a8273d61.url(options),
            method: 'post',
        })
    
    importMethodb60400106e8759f5960df0c6a8273d61.form = importMethodb60400106e8759f5960df0c6a8273d61Form
    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::importMethod
 * @see app/Http/Controllers/MasterData/MasterDataController.php:341
 * @route '/modules/payroll-periods/import'
 */
const importMethod8ed332c4da82735b57a7c8d4c5b953d8 = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: importMethod8ed332c4da82735b57a7c8d4c5b953d8.url(options),
    method: 'post',
})

importMethod8ed332c4da82735b57a7c8d4c5b953d8.definition = {
    methods: ["post"],
    url: '/modules/payroll-periods/import',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::importMethod
 * @see app/Http/Controllers/MasterData/MasterDataController.php:341
 * @route '/modules/payroll-periods/import'
 */
importMethod8ed332c4da82735b57a7c8d4c5b953d8.url = (options?: RouteQueryOptions) => {
    return importMethod8ed332c4da82735b57a7c8d4c5b953d8.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::importMethod
 * @see app/Http/Controllers/MasterData/MasterDataController.php:341
 * @route '/modules/payroll-periods/import'
 */
importMethod8ed332c4da82735b57a7c8d4c5b953d8.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: importMethod8ed332c4da82735b57a7c8d4c5b953d8.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::importMethod
 * @see app/Http/Controllers/MasterData/MasterDataController.php:341
 * @route '/modules/payroll-periods/import'
 */
    const importMethod8ed332c4da82735b57a7c8d4c5b953d8Form = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: importMethod8ed332c4da82735b57a7c8d4c5b953d8.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\MasterData\MasterDataController::importMethod
 * @see app/Http/Controllers/MasterData/MasterDataController.php:341
 * @route '/modules/payroll-periods/import'
 */
        importMethod8ed332c4da82735b57a7c8d4c5b953d8Form.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: importMethod8ed332c4da82735b57a7c8d4c5b953d8.url(options),
            method: 'post',
        })
    
    importMethod8ed332c4da82735b57a7c8d4c5b953d8.form = importMethod8ed332c4da82735b57a7c8d4c5b953d8Form

export const importMethod = {
    '/modules/organization/{resource}/import': importMethod62f80c9f6a21347779d8b91791911758,
    '/modules/employees/import': importMethod4ed460ea37c485b4ed72cae932be6bae,
    '/modules/attendance/import': importMethod81014b7b93cbb547bc5e4752830d399a,
    '/modules/shifts/import': importMethod276c5f23fc39e4c8660122c67ef18ed6,
    '/modules/leave-types/import': importMethod280bdd04502d7ef9453794f03d192ab0,
    '/modules/schedules/import': importMethod74495e2962a56fa31bb1155de59a2155,
    '/modules/{resource}/import': importMethodb9caa58eadcd002f5f547469b7d82d4c,
    '/modules/salary-components/import': importMethodb60400106e8759f5960df0c6a8273d61,
    '/modules/payroll-periods/import': importMethod8ed332c4da82735b57a7c8d4c5b953d8,
}

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::index
 * @see app/Http/Controllers/MasterData/MasterDataController.php:48
 * @route '/modules/organization/{resource}'
 */
const indexe9cfb36d8867a8c3245613bee9be0abd = (args: { resource: string | number } | [resource: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexe9cfb36d8867a8c3245613bee9be0abd.url(args, options),
    method: 'get',
})

indexe9cfb36d8867a8c3245613bee9be0abd.definition = {
    methods: ["get","head"],
    url: '/modules/organization/{resource}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::index
 * @see app/Http/Controllers/MasterData/MasterDataController.php:48
 * @route '/modules/organization/{resource}'
 */
indexe9cfb36d8867a8c3245613bee9be0abd.url = (args: { resource: string | number } | [resource: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { resource: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    resource: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        resource: args.resource,
                }

    return indexe9cfb36d8867a8c3245613bee9be0abd.definition.url
            .replace('{resource}', parsedArgs.resource.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::index
 * @see app/Http/Controllers/MasterData/MasterDataController.php:48
 * @route '/modules/organization/{resource}'
 */
indexe9cfb36d8867a8c3245613bee9be0abd.get = (args: { resource: string | number } | [resource: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexe9cfb36d8867a8c3245613bee9be0abd.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\MasterData\MasterDataController::index
 * @see app/Http/Controllers/MasterData/MasterDataController.php:48
 * @route '/modules/organization/{resource}'
 */
indexe9cfb36d8867a8c3245613bee9be0abd.head = (args: { resource: string | number } | [resource: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: indexe9cfb36d8867a8c3245613bee9be0abd.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::index
 * @see app/Http/Controllers/MasterData/MasterDataController.php:48
 * @route '/modules/organization/{resource}'
 */
    const indexe9cfb36d8867a8c3245613bee9be0abdForm = (args: { resource: string | number } | [resource: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: indexe9cfb36d8867a8c3245613bee9be0abd.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\MasterData\MasterDataController::index
 * @see app/Http/Controllers/MasterData/MasterDataController.php:48
 * @route '/modules/organization/{resource}'
 */
        indexe9cfb36d8867a8c3245613bee9be0abdForm.get = (args: { resource: string | number } | [resource: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: indexe9cfb36d8867a8c3245613bee9be0abd.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\MasterData\MasterDataController::index
 * @see app/Http/Controllers/MasterData/MasterDataController.php:48
 * @route '/modules/organization/{resource}'
 */
        indexe9cfb36d8867a8c3245613bee9be0abdForm.head = (args: { resource: string | number } | [resource: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: indexe9cfb36d8867a8c3245613bee9be0abd.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    indexe9cfb36d8867a8c3245613bee9be0abd.form = indexe9cfb36d8867a8c3245613bee9be0abdForm
    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::index
 * @see app/Http/Controllers/MasterData/MasterDataController.php:48
 * @route '/modules/shifts'
 */
const indexe5f156e578db144ec34eeaad36155641 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexe5f156e578db144ec34eeaad36155641.url(options),
    method: 'get',
})

indexe5f156e578db144ec34eeaad36155641.definition = {
    methods: ["get","head"],
    url: '/modules/shifts',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::index
 * @see app/Http/Controllers/MasterData/MasterDataController.php:48
 * @route '/modules/shifts'
 */
indexe5f156e578db144ec34eeaad36155641.url = (options?: RouteQueryOptions) => {
    return indexe5f156e578db144ec34eeaad36155641.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::index
 * @see app/Http/Controllers/MasterData/MasterDataController.php:48
 * @route '/modules/shifts'
 */
indexe5f156e578db144ec34eeaad36155641.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexe5f156e578db144ec34eeaad36155641.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\MasterData\MasterDataController::index
 * @see app/Http/Controllers/MasterData/MasterDataController.php:48
 * @route '/modules/shifts'
 */
indexe5f156e578db144ec34eeaad36155641.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: indexe5f156e578db144ec34eeaad36155641.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::index
 * @see app/Http/Controllers/MasterData/MasterDataController.php:48
 * @route '/modules/shifts'
 */
    const indexe5f156e578db144ec34eeaad36155641Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: indexe5f156e578db144ec34eeaad36155641.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\MasterData\MasterDataController::index
 * @see app/Http/Controllers/MasterData/MasterDataController.php:48
 * @route '/modules/shifts'
 */
        indexe5f156e578db144ec34eeaad36155641Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: indexe5f156e578db144ec34eeaad36155641.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\MasterData\MasterDataController::index
 * @see app/Http/Controllers/MasterData/MasterDataController.php:48
 * @route '/modules/shifts'
 */
        indexe5f156e578db144ec34eeaad36155641Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: indexe5f156e578db144ec34eeaad36155641.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    indexe5f156e578db144ec34eeaad36155641.form = indexe5f156e578db144ec34eeaad36155641Form
    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::index
 * @see app/Http/Controllers/MasterData/MasterDataController.php:48
 * @route '/modules/leave-types'
 */
const indexfa8a766c2296be37a10c26cefa644a7f = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexfa8a766c2296be37a10c26cefa644a7f.url(options),
    method: 'get',
})

indexfa8a766c2296be37a10c26cefa644a7f.definition = {
    methods: ["get","head"],
    url: '/modules/leave-types',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::index
 * @see app/Http/Controllers/MasterData/MasterDataController.php:48
 * @route '/modules/leave-types'
 */
indexfa8a766c2296be37a10c26cefa644a7f.url = (options?: RouteQueryOptions) => {
    return indexfa8a766c2296be37a10c26cefa644a7f.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::index
 * @see app/Http/Controllers/MasterData/MasterDataController.php:48
 * @route '/modules/leave-types'
 */
indexfa8a766c2296be37a10c26cefa644a7f.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexfa8a766c2296be37a10c26cefa644a7f.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\MasterData\MasterDataController::index
 * @see app/Http/Controllers/MasterData/MasterDataController.php:48
 * @route '/modules/leave-types'
 */
indexfa8a766c2296be37a10c26cefa644a7f.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: indexfa8a766c2296be37a10c26cefa644a7f.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::index
 * @see app/Http/Controllers/MasterData/MasterDataController.php:48
 * @route '/modules/leave-types'
 */
    const indexfa8a766c2296be37a10c26cefa644a7fForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: indexfa8a766c2296be37a10c26cefa644a7f.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\MasterData\MasterDataController::index
 * @see app/Http/Controllers/MasterData/MasterDataController.php:48
 * @route '/modules/leave-types'
 */
        indexfa8a766c2296be37a10c26cefa644a7fForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: indexfa8a766c2296be37a10c26cefa644a7f.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\MasterData\MasterDataController::index
 * @see app/Http/Controllers/MasterData/MasterDataController.php:48
 * @route '/modules/leave-types'
 */
        indexfa8a766c2296be37a10c26cefa644a7fForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: indexfa8a766c2296be37a10c26cefa644a7f.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    indexfa8a766c2296be37a10c26cefa644a7f.form = indexfa8a766c2296be37a10c26cefa644a7fForm
    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::index
 * @see app/Http/Controllers/MasterData/MasterDataController.php:48
 * @route '/modules/schedules'
 */
const index87d893778bca33b7b29821197b32ca8d = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index87d893778bca33b7b29821197b32ca8d.url(options),
    method: 'get',
})

index87d893778bca33b7b29821197b32ca8d.definition = {
    methods: ["get","head"],
    url: '/modules/schedules',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::index
 * @see app/Http/Controllers/MasterData/MasterDataController.php:48
 * @route '/modules/schedules'
 */
index87d893778bca33b7b29821197b32ca8d.url = (options?: RouteQueryOptions) => {
    return index87d893778bca33b7b29821197b32ca8d.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::index
 * @see app/Http/Controllers/MasterData/MasterDataController.php:48
 * @route '/modules/schedules'
 */
index87d893778bca33b7b29821197b32ca8d.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index87d893778bca33b7b29821197b32ca8d.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\MasterData\MasterDataController::index
 * @see app/Http/Controllers/MasterData/MasterDataController.php:48
 * @route '/modules/schedules'
 */
index87d893778bca33b7b29821197b32ca8d.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index87d893778bca33b7b29821197b32ca8d.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::index
 * @see app/Http/Controllers/MasterData/MasterDataController.php:48
 * @route '/modules/schedules'
 */
    const index87d893778bca33b7b29821197b32ca8dForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index87d893778bca33b7b29821197b32ca8d.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\MasterData\MasterDataController::index
 * @see app/Http/Controllers/MasterData/MasterDataController.php:48
 * @route '/modules/schedules'
 */
        index87d893778bca33b7b29821197b32ca8dForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index87d893778bca33b7b29821197b32ca8d.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\MasterData\MasterDataController::index
 * @see app/Http/Controllers/MasterData/MasterDataController.php:48
 * @route '/modules/schedules'
 */
        index87d893778bca33b7b29821197b32ca8dForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index87d893778bca33b7b29821197b32ca8d.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index87d893778bca33b7b29821197b32ca8d.form = index87d893778bca33b7b29821197b32ca8dForm
    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::index
 * @see app/Http/Controllers/MasterData/MasterDataController.php:48
 * @route '/modules/{resource}'
 */
const indexa27752e2b8a1939bab4cebc457225186 = (args: { resource: string | number } | [resource: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexa27752e2b8a1939bab4cebc457225186.url(args, options),
    method: 'get',
})

indexa27752e2b8a1939bab4cebc457225186.definition = {
    methods: ["get","head"],
    url: '/modules/{resource}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::index
 * @see app/Http/Controllers/MasterData/MasterDataController.php:48
 * @route '/modules/{resource}'
 */
indexa27752e2b8a1939bab4cebc457225186.url = (args: { resource: string | number } | [resource: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { resource: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    resource: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        resource: args.resource,
                }

    return indexa27752e2b8a1939bab4cebc457225186.definition.url
            .replace('{resource}', parsedArgs.resource.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::index
 * @see app/Http/Controllers/MasterData/MasterDataController.php:48
 * @route '/modules/{resource}'
 */
indexa27752e2b8a1939bab4cebc457225186.get = (args: { resource: string | number } | [resource: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexa27752e2b8a1939bab4cebc457225186.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\MasterData\MasterDataController::index
 * @see app/Http/Controllers/MasterData/MasterDataController.php:48
 * @route '/modules/{resource}'
 */
indexa27752e2b8a1939bab4cebc457225186.head = (args: { resource: string | number } | [resource: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: indexa27752e2b8a1939bab4cebc457225186.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::index
 * @see app/Http/Controllers/MasterData/MasterDataController.php:48
 * @route '/modules/{resource}'
 */
    const indexa27752e2b8a1939bab4cebc457225186Form = (args: { resource: string | number } | [resource: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: indexa27752e2b8a1939bab4cebc457225186.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\MasterData\MasterDataController::index
 * @see app/Http/Controllers/MasterData/MasterDataController.php:48
 * @route '/modules/{resource}'
 */
        indexa27752e2b8a1939bab4cebc457225186Form.get = (args: { resource: string | number } | [resource: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: indexa27752e2b8a1939bab4cebc457225186.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\MasterData\MasterDataController::index
 * @see app/Http/Controllers/MasterData/MasterDataController.php:48
 * @route '/modules/{resource}'
 */
        indexa27752e2b8a1939bab4cebc457225186Form.head = (args: { resource: string | number } | [resource: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: indexa27752e2b8a1939bab4cebc457225186.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    indexa27752e2b8a1939bab4cebc457225186.form = indexa27752e2b8a1939bab4cebc457225186Form
    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::index
 * @see app/Http/Controllers/MasterData/MasterDataController.php:48
 * @route '/modules/salary-components'
 */
const indexd455a425e7230b1f22d214bd943081b8 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexd455a425e7230b1f22d214bd943081b8.url(options),
    method: 'get',
})

indexd455a425e7230b1f22d214bd943081b8.definition = {
    methods: ["get","head"],
    url: '/modules/salary-components',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::index
 * @see app/Http/Controllers/MasterData/MasterDataController.php:48
 * @route '/modules/salary-components'
 */
indexd455a425e7230b1f22d214bd943081b8.url = (options?: RouteQueryOptions) => {
    return indexd455a425e7230b1f22d214bd943081b8.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::index
 * @see app/Http/Controllers/MasterData/MasterDataController.php:48
 * @route '/modules/salary-components'
 */
indexd455a425e7230b1f22d214bd943081b8.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexd455a425e7230b1f22d214bd943081b8.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\MasterData\MasterDataController::index
 * @see app/Http/Controllers/MasterData/MasterDataController.php:48
 * @route '/modules/salary-components'
 */
indexd455a425e7230b1f22d214bd943081b8.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: indexd455a425e7230b1f22d214bd943081b8.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::index
 * @see app/Http/Controllers/MasterData/MasterDataController.php:48
 * @route '/modules/salary-components'
 */
    const indexd455a425e7230b1f22d214bd943081b8Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: indexd455a425e7230b1f22d214bd943081b8.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\MasterData\MasterDataController::index
 * @see app/Http/Controllers/MasterData/MasterDataController.php:48
 * @route '/modules/salary-components'
 */
        indexd455a425e7230b1f22d214bd943081b8Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: indexd455a425e7230b1f22d214bd943081b8.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\MasterData\MasterDataController::index
 * @see app/Http/Controllers/MasterData/MasterDataController.php:48
 * @route '/modules/salary-components'
 */
        indexd455a425e7230b1f22d214bd943081b8Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: indexd455a425e7230b1f22d214bd943081b8.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    indexd455a425e7230b1f22d214bd943081b8.form = indexd455a425e7230b1f22d214bd943081b8Form
    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::index
 * @see app/Http/Controllers/MasterData/MasterDataController.php:48
 * @route '/modules/payroll-periods'
 */
const index2c4522e06c82700df3502d1f92a8a207 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index2c4522e06c82700df3502d1f92a8a207.url(options),
    method: 'get',
})

index2c4522e06c82700df3502d1f92a8a207.definition = {
    methods: ["get","head"],
    url: '/modules/payroll-periods',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::index
 * @see app/Http/Controllers/MasterData/MasterDataController.php:48
 * @route '/modules/payroll-periods'
 */
index2c4522e06c82700df3502d1f92a8a207.url = (options?: RouteQueryOptions) => {
    return index2c4522e06c82700df3502d1f92a8a207.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::index
 * @see app/Http/Controllers/MasterData/MasterDataController.php:48
 * @route '/modules/payroll-periods'
 */
index2c4522e06c82700df3502d1f92a8a207.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index2c4522e06c82700df3502d1f92a8a207.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\MasterData\MasterDataController::index
 * @see app/Http/Controllers/MasterData/MasterDataController.php:48
 * @route '/modules/payroll-periods'
 */
index2c4522e06c82700df3502d1f92a8a207.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index2c4522e06c82700df3502d1f92a8a207.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::index
 * @see app/Http/Controllers/MasterData/MasterDataController.php:48
 * @route '/modules/payroll-periods'
 */
    const index2c4522e06c82700df3502d1f92a8a207Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index2c4522e06c82700df3502d1f92a8a207.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\MasterData\MasterDataController::index
 * @see app/Http/Controllers/MasterData/MasterDataController.php:48
 * @route '/modules/payroll-periods'
 */
        index2c4522e06c82700df3502d1f92a8a207Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index2c4522e06c82700df3502d1f92a8a207.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\MasterData\MasterDataController::index
 * @see app/Http/Controllers/MasterData/MasterDataController.php:48
 * @route '/modules/payroll-periods'
 */
        index2c4522e06c82700df3502d1f92a8a207Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index2c4522e06c82700df3502d1f92a8a207.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index2c4522e06c82700df3502d1f92a8a207.form = index2c4522e06c82700df3502d1f92a8a207Form

export const index = {
    '/modules/organization/{resource}': indexe9cfb36d8867a8c3245613bee9be0abd,
    '/modules/shifts': indexe5f156e578db144ec34eeaad36155641,
    '/modules/leave-types': indexfa8a766c2296be37a10c26cefa644a7f,
    '/modules/schedules': index87d893778bca33b7b29821197b32ca8d,
    '/modules/{resource}': indexa27752e2b8a1939bab4cebc457225186,
    '/modules/salary-components': indexd455a425e7230b1f22d214bd943081b8,
    '/modules/payroll-periods': index2c4522e06c82700df3502d1f92a8a207,
}

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::create
 * @see app/Http/Controllers/MasterData/MasterDataController.php:72
 * @route '/modules/organization/{resource}/create'
 */
const createa5c02e554f0c2ae3c8193804ef8bd3bb = (args: { resource: string | number } | [resource: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: createa5c02e554f0c2ae3c8193804ef8bd3bb.url(args, options),
    method: 'get',
})

createa5c02e554f0c2ae3c8193804ef8bd3bb.definition = {
    methods: ["get","head"],
    url: '/modules/organization/{resource}/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::create
 * @see app/Http/Controllers/MasterData/MasterDataController.php:72
 * @route '/modules/organization/{resource}/create'
 */
createa5c02e554f0c2ae3c8193804ef8bd3bb.url = (args: { resource: string | number } | [resource: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { resource: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    resource: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        resource: args.resource,
                }

    return createa5c02e554f0c2ae3c8193804ef8bd3bb.definition.url
            .replace('{resource}', parsedArgs.resource.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::create
 * @see app/Http/Controllers/MasterData/MasterDataController.php:72
 * @route '/modules/organization/{resource}/create'
 */
createa5c02e554f0c2ae3c8193804ef8bd3bb.get = (args: { resource: string | number } | [resource: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: createa5c02e554f0c2ae3c8193804ef8bd3bb.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\MasterData\MasterDataController::create
 * @see app/Http/Controllers/MasterData/MasterDataController.php:72
 * @route '/modules/organization/{resource}/create'
 */
createa5c02e554f0c2ae3c8193804ef8bd3bb.head = (args: { resource: string | number } | [resource: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: createa5c02e554f0c2ae3c8193804ef8bd3bb.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::create
 * @see app/Http/Controllers/MasterData/MasterDataController.php:72
 * @route '/modules/organization/{resource}/create'
 */
    const createa5c02e554f0c2ae3c8193804ef8bd3bbForm = (args: { resource: string | number } | [resource: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: createa5c02e554f0c2ae3c8193804ef8bd3bb.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\MasterData\MasterDataController::create
 * @see app/Http/Controllers/MasterData/MasterDataController.php:72
 * @route '/modules/organization/{resource}/create'
 */
        createa5c02e554f0c2ae3c8193804ef8bd3bbForm.get = (args: { resource: string | number } | [resource: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: createa5c02e554f0c2ae3c8193804ef8bd3bb.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\MasterData\MasterDataController::create
 * @see app/Http/Controllers/MasterData/MasterDataController.php:72
 * @route '/modules/organization/{resource}/create'
 */
        createa5c02e554f0c2ae3c8193804ef8bd3bbForm.head = (args: { resource: string | number } | [resource: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: createa5c02e554f0c2ae3c8193804ef8bd3bb.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    createa5c02e554f0c2ae3c8193804ef8bd3bb.form = createa5c02e554f0c2ae3c8193804ef8bd3bbForm
    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::create
 * @see app/Http/Controllers/MasterData/MasterDataController.php:72
 * @route '/modules/shifts/create'
 */
const create940fea39f9a69f4701f569cf1612793a = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create940fea39f9a69f4701f569cf1612793a.url(options),
    method: 'get',
})

create940fea39f9a69f4701f569cf1612793a.definition = {
    methods: ["get","head"],
    url: '/modules/shifts/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::create
 * @see app/Http/Controllers/MasterData/MasterDataController.php:72
 * @route '/modules/shifts/create'
 */
create940fea39f9a69f4701f569cf1612793a.url = (options?: RouteQueryOptions) => {
    return create940fea39f9a69f4701f569cf1612793a.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::create
 * @see app/Http/Controllers/MasterData/MasterDataController.php:72
 * @route '/modules/shifts/create'
 */
create940fea39f9a69f4701f569cf1612793a.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create940fea39f9a69f4701f569cf1612793a.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\MasterData\MasterDataController::create
 * @see app/Http/Controllers/MasterData/MasterDataController.php:72
 * @route '/modules/shifts/create'
 */
create940fea39f9a69f4701f569cf1612793a.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create940fea39f9a69f4701f569cf1612793a.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::create
 * @see app/Http/Controllers/MasterData/MasterDataController.php:72
 * @route '/modules/shifts/create'
 */
    const create940fea39f9a69f4701f569cf1612793aForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create940fea39f9a69f4701f569cf1612793a.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\MasterData\MasterDataController::create
 * @see app/Http/Controllers/MasterData/MasterDataController.php:72
 * @route '/modules/shifts/create'
 */
        create940fea39f9a69f4701f569cf1612793aForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create940fea39f9a69f4701f569cf1612793a.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\MasterData\MasterDataController::create
 * @see app/Http/Controllers/MasterData/MasterDataController.php:72
 * @route '/modules/shifts/create'
 */
        create940fea39f9a69f4701f569cf1612793aForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create940fea39f9a69f4701f569cf1612793a.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    create940fea39f9a69f4701f569cf1612793a.form = create940fea39f9a69f4701f569cf1612793aForm
    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::create
 * @see app/Http/Controllers/MasterData/MasterDataController.php:72
 * @route '/modules/leave-types/create'
 */
const create5c2b22c4d65618b6f3ab2274973a4aaa = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create5c2b22c4d65618b6f3ab2274973a4aaa.url(options),
    method: 'get',
})

create5c2b22c4d65618b6f3ab2274973a4aaa.definition = {
    methods: ["get","head"],
    url: '/modules/leave-types/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::create
 * @see app/Http/Controllers/MasterData/MasterDataController.php:72
 * @route '/modules/leave-types/create'
 */
create5c2b22c4d65618b6f3ab2274973a4aaa.url = (options?: RouteQueryOptions) => {
    return create5c2b22c4d65618b6f3ab2274973a4aaa.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::create
 * @see app/Http/Controllers/MasterData/MasterDataController.php:72
 * @route '/modules/leave-types/create'
 */
create5c2b22c4d65618b6f3ab2274973a4aaa.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create5c2b22c4d65618b6f3ab2274973a4aaa.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\MasterData\MasterDataController::create
 * @see app/Http/Controllers/MasterData/MasterDataController.php:72
 * @route '/modules/leave-types/create'
 */
create5c2b22c4d65618b6f3ab2274973a4aaa.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create5c2b22c4d65618b6f3ab2274973a4aaa.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::create
 * @see app/Http/Controllers/MasterData/MasterDataController.php:72
 * @route '/modules/leave-types/create'
 */
    const create5c2b22c4d65618b6f3ab2274973a4aaaForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create5c2b22c4d65618b6f3ab2274973a4aaa.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\MasterData\MasterDataController::create
 * @see app/Http/Controllers/MasterData/MasterDataController.php:72
 * @route '/modules/leave-types/create'
 */
        create5c2b22c4d65618b6f3ab2274973a4aaaForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create5c2b22c4d65618b6f3ab2274973a4aaa.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\MasterData\MasterDataController::create
 * @see app/Http/Controllers/MasterData/MasterDataController.php:72
 * @route '/modules/leave-types/create'
 */
        create5c2b22c4d65618b6f3ab2274973a4aaaForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create5c2b22c4d65618b6f3ab2274973a4aaa.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    create5c2b22c4d65618b6f3ab2274973a4aaa.form = create5c2b22c4d65618b6f3ab2274973a4aaaForm
    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::create
 * @see app/Http/Controllers/MasterData/MasterDataController.php:72
 * @route '/modules/schedules/create'
 */
const createa6a5bb0db8a2f5b418573b3f618a4055 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: createa6a5bb0db8a2f5b418573b3f618a4055.url(options),
    method: 'get',
})

createa6a5bb0db8a2f5b418573b3f618a4055.definition = {
    methods: ["get","head"],
    url: '/modules/schedules/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::create
 * @see app/Http/Controllers/MasterData/MasterDataController.php:72
 * @route '/modules/schedules/create'
 */
createa6a5bb0db8a2f5b418573b3f618a4055.url = (options?: RouteQueryOptions) => {
    return createa6a5bb0db8a2f5b418573b3f618a4055.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::create
 * @see app/Http/Controllers/MasterData/MasterDataController.php:72
 * @route '/modules/schedules/create'
 */
createa6a5bb0db8a2f5b418573b3f618a4055.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: createa6a5bb0db8a2f5b418573b3f618a4055.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\MasterData\MasterDataController::create
 * @see app/Http/Controllers/MasterData/MasterDataController.php:72
 * @route '/modules/schedules/create'
 */
createa6a5bb0db8a2f5b418573b3f618a4055.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: createa6a5bb0db8a2f5b418573b3f618a4055.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::create
 * @see app/Http/Controllers/MasterData/MasterDataController.php:72
 * @route '/modules/schedules/create'
 */
    const createa6a5bb0db8a2f5b418573b3f618a4055Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: createa6a5bb0db8a2f5b418573b3f618a4055.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\MasterData\MasterDataController::create
 * @see app/Http/Controllers/MasterData/MasterDataController.php:72
 * @route '/modules/schedules/create'
 */
        createa6a5bb0db8a2f5b418573b3f618a4055Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: createa6a5bb0db8a2f5b418573b3f618a4055.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\MasterData\MasterDataController::create
 * @see app/Http/Controllers/MasterData/MasterDataController.php:72
 * @route '/modules/schedules/create'
 */
        createa6a5bb0db8a2f5b418573b3f618a4055Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: createa6a5bb0db8a2f5b418573b3f618a4055.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    createa6a5bb0db8a2f5b418573b3f618a4055.form = createa6a5bb0db8a2f5b418573b3f618a4055Form
    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::create
 * @see app/Http/Controllers/MasterData/MasterDataController.php:72
 * @route '/modules/{resource}/create'
 */
const create8b72cee87cf0a911c4f23c6f9c827e93 = (args: { resource: string | number } | [resource: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create8b72cee87cf0a911c4f23c6f9c827e93.url(args, options),
    method: 'get',
})

create8b72cee87cf0a911c4f23c6f9c827e93.definition = {
    methods: ["get","head"],
    url: '/modules/{resource}/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::create
 * @see app/Http/Controllers/MasterData/MasterDataController.php:72
 * @route '/modules/{resource}/create'
 */
create8b72cee87cf0a911c4f23c6f9c827e93.url = (args: { resource: string | number } | [resource: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { resource: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    resource: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        resource: args.resource,
                }

    return create8b72cee87cf0a911c4f23c6f9c827e93.definition.url
            .replace('{resource}', parsedArgs.resource.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::create
 * @see app/Http/Controllers/MasterData/MasterDataController.php:72
 * @route '/modules/{resource}/create'
 */
create8b72cee87cf0a911c4f23c6f9c827e93.get = (args: { resource: string | number } | [resource: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create8b72cee87cf0a911c4f23c6f9c827e93.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\MasterData\MasterDataController::create
 * @see app/Http/Controllers/MasterData/MasterDataController.php:72
 * @route '/modules/{resource}/create'
 */
create8b72cee87cf0a911c4f23c6f9c827e93.head = (args: { resource: string | number } | [resource: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create8b72cee87cf0a911c4f23c6f9c827e93.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::create
 * @see app/Http/Controllers/MasterData/MasterDataController.php:72
 * @route '/modules/{resource}/create'
 */
    const create8b72cee87cf0a911c4f23c6f9c827e93Form = (args: { resource: string | number } | [resource: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create8b72cee87cf0a911c4f23c6f9c827e93.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\MasterData\MasterDataController::create
 * @see app/Http/Controllers/MasterData/MasterDataController.php:72
 * @route '/modules/{resource}/create'
 */
        create8b72cee87cf0a911c4f23c6f9c827e93Form.get = (args: { resource: string | number } | [resource: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create8b72cee87cf0a911c4f23c6f9c827e93.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\MasterData\MasterDataController::create
 * @see app/Http/Controllers/MasterData/MasterDataController.php:72
 * @route '/modules/{resource}/create'
 */
        create8b72cee87cf0a911c4f23c6f9c827e93Form.head = (args: { resource: string | number } | [resource: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create8b72cee87cf0a911c4f23c6f9c827e93.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    create8b72cee87cf0a911c4f23c6f9c827e93.form = create8b72cee87cf0a911c4f23c6f9c827e93Form
    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::create
 * @see app/Http/Controllers/MasterData/MasterDataController.php:72
 * @route '/modules/salary-components/create'
 */
const create5c2600ed6303b71d323ce384ec42d0a4 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create5c2600ed6303b71d323ce384ec42d0a4.url(options),
    method: 'get',
})

create5c2600ed6303b71d323ce384ec42d0a4.definition = {
    methods: ["get","head"],
    url: '/modules/salary-components/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::create
 * @see app/Http/Controllers/MasterData/MasterDataController.php:72
 * @route '/modules/salary-components/create'
 */
create5c2600ed6303b71d323ce384ec42d0a4.url = (options?: RouteQueryOptions) => {
    return create5c2600ed6303b71d323ce384ec42d0a4.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::create
 * @see app/Http/Controllers/MasterData/MasterDataController.php:72
 * @route '/modules/salary-components/create'
 */
create5c2600ed6303b71d323ce384ec42d0a4.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create5c2600ed6303b71d323ce384ec42d0a4.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\MasterData\MasterDataController::create
 * @see app/Http/Controllers/MasterData/MasterDataController.php:72
 * @route '/modules/salary-components/create'
 */
create5c2600ed6303b71d323ce384ec42d0a4.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create5c2600ed6303b71d323ce384ec42d0a4.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::create
 * @see app/Http/Controllers/MasterData/MasterDataController.php:72
 * @route '/modules/salary-components/create'
 */
    const create5c2600ed6303b71d323ce384ec42d0a4Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create5c2600ed6303b71d323ce384ec42d0a4.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\MasterData\MasterDataController::create
 * @see app/Http/Controllers/MasterData/MasterDataController.php:72
 * @route '/modules/salary-components/create'
 */
        create5c2600ed6303b71d323ce384ec42d0a4Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create5c2600ed6303b71d323ce384ec42d0a4.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\MasterData\MasterDataController::create
 * @see app/Http/Controllers/MasterData/MasterDataController.php:72
 * @route '/modules/salary-components/create'
 */
        create5c2600ed6303b71d323ce384ec42d0a4Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create5c2600ed6303b71d323ce384ec42d0a4.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    create5c2600ed6303b71d323ce384ec42d0a4.form = create5c2600ed6303b71d323ce384ec42d0a4Form
    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::create
 * @see app/Http/Controllers/MasterData/MasterDataController.php:72
 * @route '/modules/payroll-periods/create'
 */
const create273946993683e3dcac969b77daecfe77 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create273946993683e3dcac969b77daecfe77.url(options),
    method: 'get',
})

create273946993683e3dcac969b77daecfe77.definition = {
    methods: ["get","head"],
    url: '/modules/payroll-periods/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::create
 * @see app/Http/Controllers/MasterData/MasterDataController.php:72
 * @route '/modules/payroll-periods/create'
 */
create273946993683e3dcac969b77daecfe77.url = (options?: RouteQueryOptions) => {
    return create273946993683e3dcac969b77daecfe77.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::create
 * @see app/Http/Controllers/MasterData/MasterDataController.php:72
 * @route '/modules/payroll-periods/create'
 */
create273946993683e3dcac969b77daecfe77.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create273946993683e3dcac969b77daecfe77.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\MasterData\MasterDataController::create
 * @see app/Http/Controllers/MasterData/MasterDataController.php:72
 * @route '/modules/payroll-periods/create'
 */
create273946993683e3dcac969b77daecfe77.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create273946993683e3dcac969b77daecfe77.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::create
 * @see app/Http/Controllers/MasterData/MasterDataController.php:72
 * @route '/modules/payroll-periods/create'
 */
    const create273946993683e3dcac969b77daecfe77Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create273946993683e3dcac969b77daecfe77.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\MasterData\MasterDataController::create
 * @see app/Http/Controllers/MasterData/MasterDataController.php:72
 * @route '/modules/payroll-periods/create'
 */
        create273946993683e3dcac969b77daecfe77Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create273946993683e3dcac969b77daecfe77.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\MasterData\MasterDataController::create
 * @see app/Http/Controllers/MasterData/MasterDataController.php:72
 * @route '/modules/payroll-periods/create'
 */
        create273946993683e3dcac969b77daecfe77Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create273946993683e3dcac969b77daecfe77.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    create273946993683e3dcac969b77daecfe77.form = create273946993683e3dcac969b77daecfe77Form

export const create = {
    '/modules/organization/{resource}/create': createa5c02e554f0c2ae3c8193804ef8bd3bb,
    '/modules/shifts/create': create940fea39f9a69f4701f569cf1612793a,
    '/modules/leave-types/create': create5c2b22c4d65618b6f3ab2274973a4aaa,
    '/modules/schedules/create': createa6a5bb0db8a2f5b418573b3f618a4055,
    '/modules/{resource}/create': create8b72cee87cf0a911c4f23c6f9c827e93,
    '/modules/salary-components/create': create5c2600ed6303b71d323ce384ec42d0a4,
    '/modules/payroll-periods/create': create273946993683e3dcac969b77daecfe77,
}

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::store
 * @see app/Http/Controllers/MasterData/MasterDataController.php:88
 * @route '/modules/organization/{resource}'
 */
const storee9cfb36d8867a8c3245613bee9be0abd = (args: { resource: string | number } | [resource: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storee9cfb36d8867a8c3245613bee9be0abd.url(args, options),
    method: 'post',
})

storee9cfb36d8867a8c3245613bee9be0abd.definition = {
    methods: ["post"],
    url: '/modules/organization/{resource}',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::store
 * @see app/Http/Controllers/MasterData/MasterDataController.php:88
 * @route '/modules/organization/{resource}'
 */
storee9cfb36d8867a8c3245613bee9be0abd.url = (args: { resource: string | number } | [resource: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { resource: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    resource: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        resource: args.resource,
                }

    return storee9cfb36d8867a8c3245613bee9be0abd.definition.url
            .replace('{resource}', parsedArgs.resource.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::store
 * @see app/Http/Controllers/MasterData/MasterDataController.php:88
 * @route '/modules/organization/{resource}'
 */
storee9cfb36d8867a8c3245613bee9be0abd.post = (args: { resource: string | number } | [resource: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storee9cfb36d8867a8c3245613bee9be0abd.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::store
 * @see app/Http/Controllers/MasterData/MasterDataController.php:88
 * @route '/modules/organization/{resource}'
 */
    const storee9cfb36d8867a8c3245613bee9be0abdForm = (args: { resource: string | number } | [resource: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: storee9cfb36d8867a8c3245613bee9be0abd.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\MasterData\MasterDataController::store
 * @see app/Http/Controllers/MasterData/MasterDataController.php:88
 * @route '/modules/organization/{resource}'
 */
        storee9cfb36d8867a8c3245613bee9be0abdForm.post = (args: { resource: string | number } | [resource: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: storee9cfb36d8867a8c3245613bee9be0abd.url(args, options),
            method: 'post',
        })
    
    storee9cfb36d8867a8c3245613bee9be0abd.form = storee9cfb36d8867a8c3245613bee9be0abdForm
    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::store
 * @see app/Http/Controllers/MasterData/MasterDataController.php:88
 * @route '/modules/shifts'
 */
const storee5f156e578db144ec34eeaad36155641 = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storee5f156e578db144ec34eeaad36155641.url(options),
    method: 'post',
})

storee5f156e578db144ec34eeaad36155641.definition = {
    methods: ["post"],
    url: '/modules/shifts',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::store
 * @see app/Http/Controllers/MasterData/MasterDataController.php:88
 * @route '/modules/shifts'
 */
storee5f156e578db144ec34eeaad36155641.url = (options?: RouteQueryOptions) => {
    return storee5f156e578db144ec34eeaad36155641.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::store
 * @see app/Http/Controllers/MasterData/MasterDataController.php:88
 * @route '/modules/shifts'
 */
storee5f156e578db144ec34eeaad36155641.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storee5f156e578db144ec34eeaad36155641.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::store
 * @see app/Http/Controllers/MasterData/MasterDataController.php:88
 * @route '/modules/shifts'
 */
    const storee5f156e578db144ec34eeaad36155641Form = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: storee5f156e578db144ec34eeaad36155641.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\MasterData\MasterDataController::store
 * @see app/Http/Controllers/MasterData/MasterDataController.php:88
 * @route '/modules/shifts'
 */
        storee5f156e578db144ec34eeaad36155641Form.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: storee5f156e578db144ec34eeaad36155641.url(options),
            method: 'post',
        })
    
    storee5f156e578db144ec34eeaad36155641.form = storee5f156e578db144ec34eeaad36155641Form
    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::store
 * @see app/Http/Controllers/MasterData/MasterDataController.php:88
 * @route '/modules/leave-types'
 */
const storefa8a766c2296be37a10c26cefa644a7f = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storefa8a766c2296be37a10c26cefa644a7f.url(options),
    method: 'post',
})

storefa8a766c2296be37a10c26cefa644a7f.definition = {
    methods: ["post"],
    url: '/modules/leave-types',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::store
 * @see app/Http/Controllers/MasterData/MasterDataController.php:88
 * @route '/modules/leave-types'
 */
storefa8a766c2296be37a10c26cefa644a7f.url = (options?: RouteQueryOptions) => {
    return storefa8a766c2296be37a10c26cefa644a7f.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::store
 * @see app/Http/Controllers/MasterData/MasterDataController.php:88
 * @route '/modules/leave-types'
 */
storefa8a766c2296be37a10c26cefa644a7f.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storefa8a766c2296be37a10c26cefa644a7f.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::store
 * @see app/Http/Controllers/MasterData/MasterDataController.php:88
 * @route '/modules/leave-types'
 */
    const storefa8a766c2296be37a10c26cefa644a7fForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: storefa8a766c2296be37a10c26cefa644a7f.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\MasterData\MasterDataController::store
 * @see app/Http/Controllers/MasterData/MasterDataController.php:88
 * @route '/modules/leave-types'
 */
        storefa8a766c2296be37a10c26cefa644a7fForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: storefa8a766c2296be37a10c26cefa644a7f.url(options),
            method: 'post',
        })
    
    storefa8a766c2296be37a10c26cefa644a7f.form = storefa8a766c2296be37a10c26cefa644a7fForm
    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::store
 * @see app/Http/Controllers/MasterData/MasterDataController.php:88
 * @route '/modules/schedules'
 */
const store87d893778bca33b7b29821197b32ca8d = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store87d893778bca33b7b29821197b32ca8d.url(options),
    method: 'post',
})

store87d893778bca33b7b29821197b32ca8d.definition = {
    methods: ["post"],
    url: '/modules/schedules',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::store
 * @see app/Http/Controllers/MasterData/MasterDataController.php:88
 * @route '/modules/schedules'
 */
store87d893778bca33b7b29821197b32ca8d.url = (options?: RouteQueryOptions) => {
    return store87d893778bca33b7b29821197b32ca8d.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::store
 * @see app/Http/Controllers/MasterData/MasterDataController.php:88
 * @route '/modules/schedules'
 */
store87d893778bca33b7b29821197b32ca8d.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store87d893778bca33b7b29821197b32ca8d.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::store
 * @see app/Http/Controllers/MasterData/MasterDataController.php:88
 * @route '/modules/schedules'
 */
    const store87d893778bca33b7b29821197b32ca8dForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store87d893778bca33b7b29821197b32ca8d.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\MasterData\MasterDataController::store
 * @see app/Http/Controllers/MasterData/MasterDataController.php:88
 * @route '/modules/schedules'
 */
        store87d893778bca33b7b29821197b32ca8dForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store87d893778bca33b7b29821197b32ca8d.url(options),
            method: 'post',
        })
    
    store87d893778bca33b7b29821197b32ca8d.form = store87d893778bca33b7b29821197b32ca8dForm
    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::store
 * @see app/Http/Controllers/MasterData/MasterDataController.php:88
 * @route '/modules/{resource}'
 */
const storea27752e2b8a1939bab4cebc457225186 = (args: { resource: string | number } | [resource: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storea27752e2b8a1939bab4cebc457225186.url(args, options),
    method: 'post',
})

storea27752e2b8a1939bab4cebc457225186.definition = {
    methods: ["post"],
    url: '/modules/{resource}',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::store
 * @see app/Http/Controllers/MasterData/MasterDataController.php:88
 * @route '/modules/{resource}'
 */
storea27752e2b8a1939bab4cebc457225186.url = (args: { resource: string | number } | [resource: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { resource: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    resource: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        resource: args.resource,
                }

    return storea27752e2b8a1939bab4cebc457225186.definition.url
            .replace('{resource}', parsedArgs.resource.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::store
 * @see app/Http/Controllers/MasterData/MasterDataController.php:88
 * @route '/modules/{resource}'
 */
storea27752e2b8a1939bab4cebc457225186.post = (args: { resource: string | number } | [resource: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storea27752e2b8a1939bab4cebc457225186.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::store
 * @see app/Http/Controllers/MasterData/MasterDataController.php:88
 * @route '/modules/{resource}'
 */
    const storea27752e2b8a1939bab4cebc457225186Form = (args: { resource: string | number } | [resource: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: storea27752e2b8a1939bab4cebc457225186.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\MasterData\MasterDataController::store
 * @see app/Http/Controllers/MasterData/MasterDataController.php:88
 * @route '/modules/{resource}'
 */
        storea27752e2b8a1939bab4cebc457225186Form.post = (args: { resource: string | number } | [resource: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: storea27752e2b8a1939bab4cebc457225186.url(args, options),
            method: 'post',
        })
    
    storea27752e2b8a1939bab4cebc457225186.form = storea27752e2b8a1939bab4cebc457225186Form
    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::store
 * @see app/Http/Controllers/MasterData/MasterDataController.php:88
 * @route '/modules/salary-components'
 */
const stored455a425e7230b1f22d214bd943081b8 = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: stored455a425e7230b1f22d214bd943081b8.url(options),
    method: 'post',
})

stored455a425e7230b1f22d214bd943081b8.definition = {
    methods: ["post"],
    url: '/modules/salary-components',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::store
 * @see app/Http/Controllers/MasterData/MasterDataController.php:88
 * @route '/modules/salary-components'
 */
stored455a425e7230b1f22d214bd943081b8.url = (options?: RouteQueryOptions) => {
    return stored455a425e7230b1f22d214bd943081b8.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::store
 * @see app/Http/Controllers/MasterData/MasterDataController.php:88
 * @route '/modules/salary-components'
 */
stored455a425e7230b1f22d214bd943081b8.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: stored455a425e7230b1f22d214bd943081b8.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::store
 * @see app/Http/Controllers/MasterData/MasterDataController.php:88
 * @route '/modules/salary-components'
 */
    const stored455a425e7230b1f22d214bd943081b8Form = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: stored455a425e7230b1f22d214bd943081b8.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\MasterData\MasterDataController::store
 * @see app/Http/Controllers/MasterData/MasterDataController.php:88
 * @route '/modules/salary-components'
 */
        stored455a425e7230b1f22d214bd943081b8Form.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: stored455a425e7230b1f22d214bd943081b8.url(options),
            method: 'post',
        })
    
    stored455a425e7230b1f22d214bd943081b8.form = stored455a425e7230b1f22d214bd943081b8Form
    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::store
 * @see app/Http/Controllers/MasterData/MasterDataController.php:88
 * @route '/modules/payroll-periods'
 */
const store2c4522e06c82700df3502d1f92a8a207 = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store2c4522e06c82700df3502d1f92a8a207.url(options),
    method: 'post',
})

store2c4522e06c82700df3502d1f92a8a207.definition = {
    methods: ["post"],
    url: '/modules/payroll-periods',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::store
 * @see app/Http/Controllers/MasterData/MasterDataController.php:88
 * @route '/modules/payroll-periods'
 */
store2c4522e06c82700df3502d1f92a8a207.url = (options?: RouteQueryOptions) => {
    return store2c4522e06c82700df3502d1f92a8a207.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::store
 * @see app/Http/Controllers/MasterData/MasterDataController.php:88
 * @route '/modules/payroll-periods'
 */
store2c4522e06c82700df3502d1f92a8a207.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store2c4522e06c82700df3502d1f92a8a207.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::store
 * @see app/Http/Controllers/MasterData/MasterDataController.php:88
 * @route '/modules/payroll-periods'
 */
    const store2c4522e06c82700df3502d1f92a8a207Form = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store2c4522e06c82700df3502d1f92a8a207.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\MasterData\MasterDataController::store
 * @see app/Http/Controllers/MasterData/MasterDataController.php:88
 * @route '/modules/payroll-periods'
 */
        store2c4522e06c82700df3502d1f92a8a207Form.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store2c4522e06c82700df3502d1f92a8a207.url(options),
            method: 'post',
        })
    
    store2c4522e06c82700df3502d1f92a8a207.form = store2c4522e06c82700df3502d1f92a8a207Form

export const store = {
    '/modules/organization/{resource}': storee9cfb36d8867a8c3245613bee9be0abd,
    '/modules/shifts': storee5f156e578db144ec34eeaad36155641,
    '/modules/leave-types': storefa8a766c2296be37a10c26cefa644a7f,
    '/modules/schedules': store87d893778bca33b7b29821197b32ca8d,
    '/modules/{resource}': storea27752e2b8a1939bab4cebc457225186,
    '/modules/salary-components': stored455a425e7230b1f22d214bd943081b8,
    '/modules/payroll-periods': store2c4522e06c82700df3502d1f92a8a207,
}

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::edit
 * @see app/Http/Controllers/MasterData/MasterDataController.php:108
 * @route '/modules/organization/{resource}/{record}/edit'
 */
const edit42434e808c172522a45bb53a155077a1 = (args: { resource: string | number, record: string | number } | [resource: string | number, record: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit42434e808c172522a45bb53a155077a1.url(args, options),
    method: 'get',
})

edit42434e808c172522a45bb53a155077a1.definition = {
    methods: ["get","head"],
    url: '/modules/organization/{resource}/{record}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::edit
 * @see app/Http/Controllers/MasterData/MasterDataController.php:108
 * @route '/modules/organization/{resource}/{record}/edit'
 */
edit42434e808c172522a45bb53a155077a1.url = (args: { resource: string | number, record: string | number } | [resource: string | number, record: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    resource: args[0],
                    record: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        resource: args.resource,
                                record: args.record,
                }

    return edit42434e808c172522a45bb53a155077a1.definition.url
            .replace('{resource}', parsedArgs.resource.toString())
            .replace('{record}', parsedArgs.record.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::edit
 * @see app/Http/Controllers/MasterData/MasterDataController.php:108
 * @route '/modules/organization/{resource}/{record}/edit'
 */
edit42434e808c172522a45bb53a155077a1.get = (args: { resource: string | number, record: string | number } | [resource: string | number, record: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit42434e808c172522a45bb53a155077a1.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\MasterData\MasterDataController::edit
 * @see app/Http/Controllers/MasterData/MasterDataController.php:108
 * @route '/modules/organization/{resource}/{record}/edit'
 */
edit42434e808c172522a45bb53a155077a1.head = (args: { resource: string | number, record: string | number } | [resource: string | number, record: string | number ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit42434e808c172522a45bb53a155077a1.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::edit
 * @see app/Http/Controllers/MasterData/MasterDataController.php:108
 * @route '/modules/organization/{resource}/{record}/edit'
 */
    const edit42434e808c172522a45bb53a155077a1Form = (args: { resource: string | number, record: string | number } | [resource: string | number, record: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit42434e808c172522a45bb53a155077a1.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\MasterData\MasterDataController::edit
 * @see app/Http/Controllers/MasterData/MasterDataController.php:108
 * @route '/modules/organization/{resource}/{record}/edit'
 */
        edit42434e808c172522a45bb53a155077a1Form.get = (args: { resource: string | number, record: string | number } | [resource: string | number, record: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit42434e808c172522a45bb53a155077a1.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\MasterData\MasterDataController::edit
 * @see app/Http/Controllers/MasterData/MasterDataController.php:108
 * @route '/modules/organization/{resource}/{record}/edit'
 */
        edit42434e808c172522a45bb53a155077a1Form.head = (args: { resource: string | number, record: string | number } | [resource: string | number, record: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit42434e808c172522a45bb53a155077a1.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    edit42434e808c172522a45bb53a155077a1.form = edit42434e808c172522a45bb53a155077a1Form
    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::edit
 * @see app/Http/Controllers/MasterData/MasterDataController.php:108
 * @route '/modules/shifts/{record}/edit'
 */
const edit726dd6bd554d6f80fa18ee8ff847d54b = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit726dd6bd554d6f80fa18ee8ff847d54b.url(args, options),
    method: 'get',
})

edit726dd6bd554d6f80fa18ee8ff847d54b.definition = {
    methods: ["get","head"],
    url: '/modules/shifts/{record}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::edit
 * @see app/Http/Controllers/MasterData/MasterDataController.php:108
 * @route '/modules/shifts/{record}/edit'
 */
edit726dd6bd554d6f80fa18ee8ff847d54b.url = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { record: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    record: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        record: args.record,
                }

    return edit726dd6bd554d6f80fa18ee8ff847d54b.definition.url
            .replace('{record}', parsedArgs.record.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::edit
 * @see app/Http/Controllers/MasterData/MasterDataController.php:108
 * @route '/modules/shifts/{record}/edit'
 */
edit726dd6bd554d6f80fa18ee8ff847d54b.get = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit726dd6bd554d6f80fa18ee8ff847d54b.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\MasterData\MasterDataController::edit
 * @see app/Http/Controllers/MasterData/MasterDataController.php:108
 * @route '/modules/shifts/{record}/edit'
 */
edit726dd6bd554d6f80fa18ee8ff847d54b.head = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit726dd6bd554d6f80fa18ee8ff847d54b.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::edit
 * @see app/Http/Controllers/MasterData/MasterDataController.php:108
 * @route '/modules/shifts/{record}/edit'
 */
    const edit726dd6bd554d6f80fa18ee8ff847d54bForm = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit726dd6bd554d6f80fa18ee8ff847d54b.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\MasterData\MasterDataController::edit
 * @see app/Http/Controllers/MasterData/MasterDataController.php:108
 * @route '/modules/shifts/{record}/edit'
 */
        edit726dd6bd554d6f80fa18ee8ff847d54bForm.get = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit726dd6bd554d6f80fa18ee8ff847d54b.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\MasterData\MasterDataController::edit
 * @see app/Http/Controllers/MasterData/MasterDataController.php:108
 * @route '/modules/shifts/{record}/edit'
 */
        edit726dd6bd554d6f80fa18ee8ff847d54bForm.head = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit726dd6bd554d6f80fa18ee8ff847d54b.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    edit726dd6bd554d6f80fa18ee8ff847d54b.form = edit726dd6bd554d6f80fa18ee8ff847d54bForm
    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::edit
 * @see app/Http/Controllers/MasterData/MasterDataController.php:108
 * @route '/modules/leave-types/{record}/edit'
 */
const edit619c916195d584c23bfc083e4b66935d = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit619c916195d584c23bfc083e4b66935d.url(args, options),
    method: 'get',
})

edit619c916195d584c23bfc083e4b66935d.definition = {
    methods: ["get","head"],
    url: '/modules/leave-types/{record}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::edit
 * @see app/Http/Controllers/MasterData/MasterDataController.php:108
 * @route '/modules/leave-types/{record}/edit'
 */
edit619c916195d584c23bfc083e4b66935d.url = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { record: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    record: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        record: args.record,
                }

    return edit619c916195d584c23bfc083e4b66935d.definition.url
            .replace('{record}', parsedArgs.record.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::edit
 * @see app/Http/Controllers/MasterData/MasterDataController.php:108
 * @route '/modules/leave-types/{record}/edit'
 */
edit619c916195d584c23bfc083e4b66935d.get = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit619c916195d584c23bfc083e4b66935d.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\MasterData\MasterDataController::edit
 * @see app/Http/Controllers/MasterData/MasterDataController.php:108
 * @route '/modules/leave-types/{record}/edit'
 */
edit619c916195d584c23bfc083e4b66935d.head = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit619c916195d584c23bfc083e4b66935d.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::edit
 * @see app/Http/Controllers/MasterData/MasterDataController.php:108
 * @route '/modules/leave-types/{record}/edit'
 */
    const edit619c916195d584c23bfc083e4b66935dForm = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit619c916195d584c23bfc083e4b66935d.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\MasterData\MasterDataController::edit
 * @see app/Http/Controllers/MasterData/MasterDataController.php:108
 * @route '/modules/leave-types/{record}/edit'
 */
        edit619c916195d584c23bfc083e4b66935dForm.get = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit619c916195d584c23bfc083e4b66935d.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\MasterData\MasterDataController::edit
 * @see app/Http/Controllers/MasterData/MasterDataController.php:108
 * @route '/modules/leave-types/{record}/edit'
 */
        edit619c916195d584c23bfc083e4b66935dForm.head = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit619c916195d584c23bfc083e4b66935d.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    edit619c916195d584c23bfc083e4b66935d.form = edit619c916195d584c23bfc083e4b66935dForm
    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::edit
 * @see app/Http/Controllers/MasterData/MasterDataController.php:108
 * @route '/modules/schedules/{record}/edit'
 */
const editf9eb386ebf93d82370daca82a8d70be8 = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: editf9eb386ebf93d82370daca82a8d70be8.url(args, options),
    method: 'get',
})

editf9eb386ebf93d82370daca82a8d70be8.definition = {
    methods: ["get","head"],
    url: '/modules/schedules/{record}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::edit
 * @see app/Http/Controllers/MasterData/MasterDataController.php:108
 * @route '/modules/schedules/{record}/edit'
 */
editf9eb386ebf93d82370daca82a8d70be8.url = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { record: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    record: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        record: args.record,
                }

    return editf9eb386ebf93d82370daca82a8d70be8.definition.url
            .replace('{record}', parsedArgs.record.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::edit
 * @see app/Http/Controllers/MasterData/MasterDataController.php:108
 * @route '/modules/schedules/{record}/edit'
 */
editf9eb386ebf93d82370daca82a8d70be8.get = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: editf9eb386ebf93d82370daca82a8d70be8.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\MasterData\MasterDataController::edit
 * @see app/Http/Controllers/MasterData/MasterDataController.php:108
 * @route '/modules/schedules/{record}/edit'
 */
editf9eb386ebf93d82370daca82a8d70be8.head = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: editf9eb386ebf93d82370daca82a8d70be8.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::edit
 * @see app/Http/Controllers/MasterData/MasterDataController.php:108
 * @route '/modules/schedules/{record}/edit'
 */
    const editf9eb386ebf93d82370daca82a8d70be8Form = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: editf9eb386ebf93d82370daca82a8d70be8.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\MasterData\MasterDataController::edit
 * @see app/Http/Controllers/MasterData/MasterDataController.php:108
 * @route '/modules/schedules/{record}/edit'
 */
        editf9eb386ebf93d82370daca82a8d70be8Form.get = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: editf9eb386ebf93d82370daca82a8d70be8.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\MasterData\MasterDataController::edit
 * @see app/Http/Controllers/MasterData/MasterDataController.php:108
 * @route '/modules/schedules/{record}/edit'
 */
        editf9eb386ebf93d82370daca82a8d70be8Form.head = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: editf9eb386ebf93d82370daca82a8d70be8.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    editf9eb386ebf93d82370daca82a8d70be8.form = editf9eb386ebf93d82370daca82a8d70be8Form
    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::edit
 * @see app/Http/Controllers/MasterData/MasterDataController.php:108
 * @route '/modules/{resource}/{record}/edit'
 */
const edit407ea5b4a588e29b9910aa367f2c89c1 = (args: { resource: string | number, record: string | number } | [resource: string | number, record: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit407ea5b4a588e29b9910aa367f2c89c1.url(args, options),
    method: 'get',
})

edit407ea5b4a588e29b9910aa367f2c89c1.definition = {
    methods: ["get","head"],
    url: '/modules/{resource}/{record}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::edit
 * @see app/Http/Controllers/MasterData/MasterDataController.php:108
 * @route '/modules/{resource}/{record}/edit'
 */
edit407ea5b4a588e29b9910aa367f2c89c1.url = (args: { resource: string | number, record: string | number } | [resource: string | number, record: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    resource: args[0],
                    record: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        resource: args.resource,
                                record: args.record,
                }

    return edit407ea5b4a588e29b9910aa367f2c89c1.definition.url
            .replace('{resource}', parsedArgs.resource.toString())
            .replace('{record}', parsedArgs.record.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::edit
 * @see app/Http/Controllers/MasterData/MasterDataController.php:108
 * @route '/modules/{resource}/{record}/edit'
 */
edit407ea5b4a588e29b9910aa367f2c89c1.get = (args: { resource: string | number, record: string | number } | [resource: string | number, record: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit407ea5b4a588e29b9910aa367f2c89c1.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\MasterData\MasterDataController::edit
 * @see app/Http/Controllers/MasterData/MasterDataController.php:108
 * @route '/modules/{resource}/{record}/edit'
 */
edit407ea5b4a588e29b9910aa367f2c89c1.head = (args: { resource: string | number, record: string | number } | [resource: string | number, record: string | number ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit407ea5b4a588e29b9910aa367f2c89c1.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::edit
 * @see app/Http/Controllers/MasterData/MasterDataController.php:108
 * @route '/modules/{resource}/{record}/edit'
 */
    const edit407ea5b4a588e29b9910aa367f2c89c1Form = (args: { resource: string | number, record: string | number } | [resource: string | number, record: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit407ea5b4a588e29b9910aa367f2c89c1.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\MasterData\MasterDataController::edit
 * @see app/Http/Controllers/MasterData/MasterDataController.php:108
 * @route '/modules/{resource}/{record}/edit'
 */
        edit407ea5b4a588e29b9910aa367f2c89c1Form.get = (args: { resource: string | number, record: string | number } | [resource: string | number, record: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit407ea5b4a588e29b9910aa367f2c89c1.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\MasterData\MasterDataController::edit
 * @see app/Http/Controllers/MasterData/MasterDataController.php:108
 * @route '/modules/{resource}/{record}/edit'
 */
        edit407ea5b4a588e29b9910aa367f2c89c1Form.head = (args: { resource: string | number, record: string | number } | [resource: string | number, record: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit407ea5b4a588e29b9910aa367f2c89c1.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    edit407ea5b4a588e29b9910aa367f2c89c1.form = edit407ea5b4a588e29b9910aa367f2c89c1Form
    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::edit
 * @see app/Http/Controllers/MasterData/MasterDataController.php:108
 * @route '/modules/salary-components/{record}/edit'
 */
const edit1d79d46eb39d326976a8ca0d3f6636c3 = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit1d79d46eb39d326976a8ca0d3f6636c3.url(args, options),
    method: 'get',
})

edit1d79d46eb39d326976a8ca0d3f6636c3.definition = {
    methods: ["get","head"],
    url: '/modules/salary-components/{record}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::edit
 * @see app/Http/Controllers/MasterData/MasterDataController.php:108
 * @route '/modules/salary-components/{record}/edit'
 */
edit1d79d46eb39d326976a8ca0d3f6636c3.url = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { record: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    record: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        record: args.record,
                }

    return edit1d79d46eb39d326976a8ca0d3f6636c3.definition.url
            .replace('{record}', parsedArgs.record.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::edit
 * @see app/Http/Controllers/MasterData/MasterDataController.php:108
 * @route '/modules/salary-components/{record}/edit'
 */
edit1d79d46eb39d326976a8ca0d3f6636c3.get = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit1d79d46eb39d326976a8ca0d3f6636c3.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\MasterData\MasterDataController::edit
 * @see app/Http/Controllers/MasterData/MasterDataController.php:108
 * @route '/modules/salary-components/{record}/edit'
 */
edit1d79d46eb39d326976a8ca0d3f6636c3.head = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit1d79d46eb39d326976a8ca0d3f6636c3.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::edit
 * @see app/Http/Controllers/MasterData/MasterDataController.php:108
 * @route '/modules/salary-components/{record}/edit'
 */
    const edit1d79d46eb39d326976a8ca0d3f6636c3Form = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit1d79d46eb39d326976a8ca0d3f6636c3.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\MasterData\MasterDataController::edit
 * @see app/Http/Controllers/MasterData/MasterDataController.php:108
 * @route '/modules/salary-components/{record}/edit'
 */
        edit1d79d46eb39d326976a8ca0d3f6636c3Form.get = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit1d79d46eb39d326976a8ca0d3f6636c3.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\MasterData\MasterDataController::edit
 * @see app/Http/Controllers/MasterData/MasterDataController.php:108
 * @route '/modules/salary-components/{record}/edit'
 */
        edit1d79d46eb39d326976a8ca0d3f6636c3Form.head = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit1d79d46eb39d326976a8ca0d3f6636c3.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    edit1d79d46eb39d326976a8ca0d3f6636c3.form = edit1d79d46eb39d326976a8ca0d3f6636c3Form
    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::edit
 * @see app/Http/Controllers/MasterData/MasterDataController.php:108
 * @route '/modules/payroll-periods/{record}/edit'
 */
const edit04e2f913fdd821cb1d8236d1c3db6710 = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit04e2f913fdd821cb1d8236d1c3db6710.url(args, options),
    method: 'get',
})

edit04e2f913fdd821cb1d8236d1c3db6710.definition = {
    methods: ["get","head"],
    url: '/modules/payroll-periods/{record}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::edit
 * @see app/Http/Controllers/MasterData/MasterDataController.php:108
 * @route '/modules/payroll-periods/{record}/edit'
 */
edit04e2f913fdd821cb1d8236d1c3db6710.url = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { record: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    record: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        record: args.record,
                }

    return edit04e2f913fdd821cb1d8236d1c3db6710.definition.url
            .replace('{record}', parsedArgs.record.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::edit
 * @see app/Http/Controllers/MasterData/MasterDataController.php:108
 * @route '/modules/payroll-periods/{record}/edit'
 */
edit04e2f913fdd821cb1d8236d1c3db6710.get = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit04e2f913fdd821cb1d8236d1c3db6710.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\MasterData\MasterDataController::edit
 * @see app/Http/Controllers/MasterData/MasterDataController.php:108
 * @route '/modules/payroll-periods/{record}/edit'
 */
edit04e2f913fdd821cb1d8236d1c3db6710.head = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit04e2f913fdd821cb1d8236d1c3db6710.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::edit
 * @see app/Http/Controllers/MasterData/MasterDataController.php:108
 * @route '/modules/payroll-periods/{record}/edit'
 */
    const edit04e2f913fdd821cb1d8236d1c3db6710Form = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit04e2f913fdd821cb1d8236d1c3db6710.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\MasterData\MasterDataController::edit
 * @see app/Http/Controllers/MasterData/MasterDataController.php:108
 * @route '/modules/payroll-periods/{record}/edit'
 */
        edit04e2f913fdd821cb1d8236d1c3db6710Form.get = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit04e2f913fdd821cb1d8236d1c3db6710.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\MasterData\MasterDataController::edit
 * @see app/Http/Controllers/MasterData/MasterDataController.php:108
 * @route '/modules/payroll-periods/{record}/edit'
 */
        edit04e2f913fdd821cb1d8236d1c3db6710Form.head = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit04e2f913fdd821cb1d8236d1c3db6710.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    edit04e2f913fdd821cb1d8236d1c3db6710.form = edit04e2f913fdd821cb1d8236d1c3db6710Form

export const edit = {
    '/modules/organization/{resource}/{record}/edit': edit42434e808c172522a45bb53a155077a1,
    '/modules/shifts/{record}/edit': edit726dd6bd554d6f80fa18ee8ff847d54b,
    '/modules/leave-types/{record}/edit': edit619c916195d584c23bfc083e4b66935d,
    '/modules/schedules/{record}/edit': editf9eb386ebf93d82370daca82a8d70be8,
    '/modules/{resource}/{record}/edit': edit407ea5b4a588e29b9910aa367f2c89c1,
    '/modules/salary-components/{record}/edit': edit1d79d46eb39d326976a8ca0d3f6636c3,
    '/modules/payroll-periods/{record}/edit': edit04e2f913fdd821cb1d8236d1c3db6710,
}

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::update
 * @see app/Http/Controllers/MasterData/MasterDataController.php:127
 * @route '/modules/organization/{resource}/{record}'
 */
const update3acb585e7e946e72f9ad4549c8caa257 = (args: { resource: string | number, record: string | number } | [resource: string | number, record: string | number ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update3acb585e7e946e72f9ad4549c8caa257.url(args, options),
    method: 'put',
})

update3acb585e7e946e72f9ad4549c8caa257.definition = {
    methods: ["put"],
    url: '/modules/organization/{resource}/{record}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::update
 * @see app/Http/Controllers/MasterData/MasterDataController.php:127
 * @route '/modules/organization/{resource}/{record}'
 */
update3acb585e7e946e72f9ad4549c8caa257.url = (args: { resource: string | number, record: string | number } | [resource: string | number, record: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    resource: args[0],
                    record: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        resource: args.resource,
                                record: args.record,
                }

    return update3acb585e7e946e72f9ad4549c8caa257.definition.url
            .replace('{resource}', parsedArgs.resource.toString())
            .replace('{record}', parsedArgs.record.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::update
 * @see app/Http/Controllers/MasterData/MasterDataController.php:127
 * @route '/modules/organization/{resource}/{record}'
 */
update3acb585e7e946e72f9ad4549c8caa257.put = (args: { resource: string | number, record: string | number } | [resource: string | number, record: string | number ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update3acb585e7e946e72f9ad4549c8caa257.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::update
 * @see app/Http/Controllers/MasterData/MasterDataController.php:127
 * @route '/modules/organization/{resource}/{record}'
 */
    const update3acb585e7e946e72f9ad4549c8caa257Form = (args: { resource: string | number, record: string | number } | [resource: string | number, record: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update3acb585e7e946e72f9ad4549c8caa257.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\MasterData\MasterDataController::update
 * @see app/Http/Controllers/MasterData/MasterDataController.php:127
 * @route '/modules/organization/{resource}/{record}'
 */
        update3acb585e7e946e72f9ad4549c8caa257Form.put = (args: { resource: string | number, record: string | number } | [resource: string | number, record: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update3acb585e7e946e72f9ad4549c8caa257.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update3acb585e7e946e72f9ad4549c8caa257.form = update3acb585e7e946e72f9ad4549c8caa257Form
    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::update
 * @see app/Http/Controllers/MasterData/MasterDataController.php:127
 * @route '/modules/shifts/{record}'
 */
const updatefc9faf7c1416e83c99d30d476f0f583d = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updatefc9faf7c1416e83c99d30d476f0f583d.url(args, options),
    method: 'put',
})

updatefc9faf7c1416e83c99d30d476f0f583d.definition = {
    methods: ["put"],
    url: '/modules/shifts/{record}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::update
 * @see app/Http/Controllers/MasterData/MasterDataController.php:127
 * @route '/modules/shifts/{record}'
 */
updatefc9faf7c1416e83c99d30d476f0f583d.url = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { record: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    record: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        record: args.record,
                }

    return updatefc9faf7c1416e83c99d30d476f0f583d.definition.url
            .replace('{record}', parsedArgs.record.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::update
 * @see app/Http/Controllers/MasterData/MasterDataController.php:127
 * @route '/modules/shifts/{record}'
 */
updatefc9faf7c1416e83c99d30d476f0f583d.put = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updatefc9faf7c1416e83c99d30d476f0f583d.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::update
 * @see app/Http/Controllers/MasterData/MasterDataController.php:127
 * @route '/modules/shifts/{record}'
 */
    const updatefc9faf7c1416e83c99d30d476f0f583dForm = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: updatefc9faf7c1416e83c99d30d476f0f583d.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\MasterData\MasterDataController::update
 * @see app/Http/Controllers/MasterData/MasterDataController.php:127
 * @route '/modules/shifts/{record}'
 */
        updatefc9faf7c1416e83c99d30d476f0f583dForm.put = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: updatefc9faf7c1416e83c99d30d476f0f583d.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    updatefc9faf7c1416e83c99d30d476f0f583d.form = updatefc9faf7c1416e83c99d30d476f0f583dForm
    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::update
 * @see app/Http/Controllers/MasterData/MasterDataController.php:127
 * @route '/modules/leave-types/{record}'
 */
const updateeb792070933d9847fd5ecf95e6d9a405 = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateeb792070933d9847fd5ecf95e6d9a405.url(args, options),
    method: 'put',
})

updateeb792070933d9847fd5ecf95e6d9a405.definition = {
    methods: ["put"],
    url: '/modules/leave-types/{record}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::update
 * @see app/Http/Controllers/MasterData/MasterDataController.php:127
 * @route '/modules/leave-types/{record}'
 */
updateeb792070933d9847fd5ecf95e6d9a405.url = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { record: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    record: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        record: args.record,
                }

    return updateeb792070933d9847fd5ecf95e6d9a405.definition.url
            .replace('{record}', parsedArgs.record.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::update
 * @see app/Http/Controllers/MasterData/MasterDataController.php:127
 * @route '/modules/leave-types/{record}'
 */
updateeb792070933d9847fd5ecf95e6d9a405.put = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateeb792070933d9847fd5ecf95e6d9a405.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::update
 * @see app/Http/Controllers/MasterData/MasterDataController.php:127
 * @route '/modules/leave-types/{record}'
 */
    const updateeb792070933d9847fd5ecf95e6d9a405Form = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: updateeb792070933d9847fd5ecf95e6d9a405.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\MasterData\MasterDataController::update
 * @see app/Http/Controllers/MasterData/MasterDataController.php:127
 * @route '/modules/leave-types/{record}'
 */
        updateeb792070933d9847fd5ecf95e6d9a405Form.put = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: updateeb792070933d9847fd5ecf95e6d9a405.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    updateeb792070933d9847fd5ecf95e6d9a405.form = updateeb792070933d9847fd5ecf95e6d9a405Form
    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::update
 * @see app/Http/Controllers/MasterData/MasterDataController.php:127
 * @route '/modules/schedules/{record}'
 */
const update845d1823f534d403768b0dfef31d10fb = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update845d1823f534d403768b0dfef31d10fb.url(args, options),
    method: 'put',
})

update845d1823f534d403768b0dfef31d10fb.definition = {
    methods: ["put"],
    url: '/modules/schedules/{record}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::update
 * @see app/Http/Controllers/MasterData/MasterDataController.php:127
 * @route '/modules/schedules/{record}'
 */
update845d1823f534d403768b0dfef31d10fb.url = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { record: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    record: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        record: args.record,
                }

    return update845d1823f534d403768b0dfef31d10fb.definition.url
            .replace('{record}', parsedArgs.record.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::update
 * @see app/Http/Controllers/MasterData/MasterDataController.php:127
 * @route '/modules/schedules/{record}'
 */
update845d1823f534d403768b0dfef31d10fb.put = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update845d1823f534d403768b0dfef31d10fb.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::update
 * @see app/Http/Controllers/MasterData/MasterDataController.php:127
 * @route '/modules/schedules/{record}'
 */
    const update845d1823f534d403768b0dfef31d10fbForm = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update845d1823f534d403768b0dfef31d10fb.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\MasterData\MasterDataController::update
 * @see app/Http/Controllers/MasterData/MasterDataController.php:127
 * @route '/modules/schedules/{record}'
 */
        update845d1823f534d403768b0dfef31d10fbForm.put = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update845d1823f534d403768b0dfef31d10fb.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update845d1823f534d403768b0dfef31d10fb.form = update845d1823f534d403768b0dfef31d10fbForm
    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::update
 * @see app/Http/Controllers/MasterData/MasterDataController.php:127
 * @route '/modules/{resource}/{record}'
 */
const update1682ba8702f8abe965b7931c7549c16c = (args: { resource: string | number, record: string | number } | [resource: string | number, record: string | number ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update1682ba8702f8abe965b7931c7549c16c.url(args, options),
    method: 'put',
})

update1682ba8702f8abe965b7931c7549c16c.definition = {
    methods: ["put"],
    url: '/modules/{resource}/{record}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::update
 * @see app/Http/Controllers/MasterData/MasterDataController.php:127
 * @route '/modules/{resource}/{record}'
 */
update1682ba8702f8abe965b7931c7549c16c.url = (args: { resource: string | number, record: string | number } | [resource: string | number, record: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    resource: args[0],
                    record: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        resource: args.resource,
                                record: args.record,
                }

    return update1682ba8702f8abe965b7931c7549c16c.definition.url
            .replace('{resource}', parsedArgs.resource.toString())
            .replace('{record}', parsedArgs.record.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::update
 * @see app/Http/Controllers/MasterData/MasterDataController.php:127
 * @route '/modules/{resource}/{record}'
 */
update1682ba8702f8abe965b7931c7549c16c.put = (args: { resource: string | number, record: string | number } | [resource: string | number, record: string | number ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update1682ba8702f8abe965b7931c7549c16c.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::update
 * @see app/Http/Controllers/MasterData/MasterDataController.php:127
 * @route '/modules/{resource}/{record}'
 */
    const update1682ba8702f8abe965b7931c7549c16cForm = (args: { resource: string | number, record: string | number } | [resource: string | number, record: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update1682ba8702f8abe965b7931c7549c16c.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\MasterData\MasterDataController::update
 * @see app/Http/Controllers/MasterData/MasterDataController.php:127
 * @route '/modules/{resource}/{record}'
 */
        update1682ba8702f8abe965b7931c7549c16cForm.put = (args: { resource: string | number, record: string | number } | [resource: string | number, record: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update1682ba8702f8abe965b7931c7549c16c.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update1682ba8702f8abe965b7931c7549c16c.form = update1682ba8702f8abe965b7931c7549c16cForm
    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::update
 * @see app/Http/Controllers/MasterData/MasterDataController.php:127
 * @route '/modules/salary-components/{record}'
 */
const update3e6b80981ab5e4d59324cc7164f65d6e = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update3e6b80981ab5e4d59324cc7164f65d6e.url(args, options),
    method: 'put',
})

update3e6b80981ab5e4d59324cc7164f65d6e.definition = {
    methods: ["put"],
    url: '/modules/salary-components/{record}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::update
 * @see app/Http/Controllers/MasterData/MasterDataController.php:127
 * @route '/modules/salary-components/{record}'
 */
update3e6b80981ab5e4d59324cc7164f65d6e.url = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { record: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    record: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        record: args.record,
                }

    return update3e6b80981ab5e4d59324cc7164f65d6e.definition.url
            .replace('{record}', parsedArgs.record.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::update
 * @see app/Http/Controllers/MasterData/MasterDataController.php:127
 * @route '/modules/salary-components/{record}'
 */
update3e6b80981ab5e4d59324cc7164f65d6e.put = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update3e6b80981ab5e4d59324cc7164f65d6e.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::update
 * @see app/Http/Controllers/MasterData/MasterDataController.php:127
 * @route '/modules/salary-components/{record}'
 */
    const update3e6b80981ab5e4d59324cc7164f65d6eForm = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update3e6b80981ab5e4d59324cc7164f65d6e.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\MasterData\MasterDataController::update
 * @see app/Http/Controllers/MasterData/MasterDataController.php:127
 * @route '/modules/salary-components/{record}'
 */
        update3e6b80981ab5e4d59324cc7164f65d6eForm.put = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update3e6b80981ab5e4d59324cc7164f65d6e.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update3e6b80981ab5e4d59324cc7164f65d6e.form = update3e6b80981ab5e4d59324cc7164f65d6eForm
    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::update
 * @see app/Http/Controllers/MasterData/MasterDataController.php:127
 * @route '/modules/payroll-periods/{record}'
 */
const updatef436b1d2d7ed730c07f705d82c0e5648 = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updatef436b1d2d7ed730c07f705d82c0e5648.url(args, options),
    method: 'put',
})

updatef436b1d2d7ed730c07f705d82c0e5648.definition = {
    methods: ["put"],
    url: '/modules/payroll-periods/{record}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::update
 * @see app/Http/Controllers/MasterData/MasterDataController.php:127
 * @route '/modules/payroll-periods/{record}'
 */
updatef436b1d2d7ed730c07f705d82c0e5648.url = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { record: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    record: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        record: args.record,
                }

    return updatef436b1d2d7ed730c07f705d82c0e5648.definition.url
            .replace('{record}', parsedArgs.record.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::update
 * @see app/Http/Controllers/MasterData/MasterDataController.php:127
 * @route '/modules/payroll-periods/{record}'
 */
updatef436b1d2d7ed730c07f705d82c0e5648.put = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updatef436b1d2d7ed730c07f705d82c0e5648.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::update
 * @see app/Http/Controllers/MasterData/MasterDataController.php:127
 * @route '/modules/payroll-periods/{record}'
 */
    const updatef436b1d2d7ed730c07f705d82c0e5648Form = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: updatef436b1d2d7ed730c07f705d82c0e5648.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\MasterData\MasterDataController::update
 * @see app/Http/Controllers/MasterData/MasterDataController.php:127
 * @route '/modules/payroll-periods/{record}'
 */
        updatef436b1d2d7ed730c07f705d82c0e5648Form.put = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: updatef436b1d2d7ed730c07f705d82c0e5648.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    updatef436b1d2d7ed730c07f705d82c0e5648.form = updatef436b1d2d7ed730c07f705d82c0e5648Form

export const update = {
    '/modules/organization/{resource}/{record}': update3acb585e7e946e72f9ad4549c8caa257,
    '/modules/shifts/{record}': updatefc9faf7c1416e83c99d30d476f0f583d,
    '/modules/leave-types/{record}': updateeb792070933d9847fd5ecf95e6d9a405,
    '/modules/schedules/{record}': update845d1823f534d403768b0dfef31d10fb,
    '/modules/{resource}/{record}': update1682ba8702f8abe965b7931c7549c16c,
    '/modules/salary-components/{record}': update3e6b80981ab5e4d59324cc7164f65d6e,
    '/modules/payroll-periods/{record}': updatef436b1d2d7ed730c07f705d82c0e5648,
}

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::destroy
 * @see app/Http/Controllers/MasterData/MasterDataController.php:149
 * @route '/modules/organization/{resource}/{record}'
 */
const destroy3acb585e7e946e72f9ad4549c8caa257 = (args: { resource: string | number, record: string | number } | [resource: string | number, record: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy3acb585e7e946e72f9ad4549c8caa257.url(args, options),
    method: 'delete',
})

destroy3acb585e7e946e72f9ad4549c8caa257.definition = {
    methods: ["delete"],
    url: '/modules/organization/{resource}/{record}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::destroy
 * @see app/Http/Controllers/MasterData/MasterDataController.php:149
 * @route '/modules/organization/{resource}/{record}'
 */
destroy3acb585e7e946e72f9ad4549c8caa257.url = (args: { resource: string | number, record: string | number } | [resource: string | number, record: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    resource: args[0],
                    record: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        resource: args.resource,
                                record: args.record,
                }

    return destroy3acb585e7e946e72f9ad4549c8caa257.definition.url
            .replace('{resource}', parsedArgs.resource.toString())
            .replace('{record}', parsedArgs.record.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::destroy
 * @see app/Http/Controllers/MasterData/MasterDataController.php:149
 * @route '/modules/organization/{resource}/{record}'
 */
destroy3acb585e7e946e72f9ad4549c8caa257.delete = (args: { resource: string | number, record: string | number } | [resource: string | number, record: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy3acb585e7e946e72f9ad4549c8caa257.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::destroy
 * @see app/Http/Controllers/MasterData/MasterDataController.php:149
 * @route '/modules/organization/{resource}/{record}'
 */
    const destroy3acb585e7e946e72f9ad4549c8caa257Form = (args: { resource: string | number, record: string | number } | [resource: string | number, record: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy3acb585e7e946e72f9ad4549c8caa257.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\MasterData\MasterDataController::destroy
 * @see app/Http/Controllers/MasterData/MasterDataController.php:149
 * @route '/modules/organization/{resource}/{record}'
 */
        destroy3acb585e7e946e72f9ad4549c8caa257Form.delete = (args: { resource: string | number, record: string | number } | [resource: string | number, record: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy3acb585e7e946e72f9ad4549c8caa257.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy3acb585e7e946e72f9ad4549c8caa257.form = destroy3acb585e7e946e72f9ad4549c8caa257Form
    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::destroy
 * @see app/Http/Controllers/MasterData/MasterDataController.php:149
 * @route '/modules/shifts/{record}'
 */
const destroyfc9faf7c1416e83c99d30d476f0f583d = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyfc9faf7c1416e83c99d30d476f0f583d.url(args, options),
    method: 'delete',
})

destroyfc9faf7c1416e83c99d30d476f0f583d.definition = {
    methods: ["delete"],
    url: '/modules/shifts/{record}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::destroy
 * @see app/Http/Controllers/MasterData/MasterDataController.php:149
 * @route '/modules/shifts/{record}'
 */
destroyfc9faf7c1416e83c99d30d476f0f583d.url = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { record: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    record: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        record: args.record,
                }

    return destroyfc9faf7c1416e83c99d30d476f0f583d.definition.url
            .replace('{record}', parsedArgs.record.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::destroy
 * @see app/Http/Controllers/MasterData/MasterDataController.php:149
 * @route '/modules/shifts/{record}'
 */
destroyfc9faf7c1416e83c99d30d476f0f583d.delete = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyfc9faf7c1416e83c99d30d476f0f583d.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::destroy
 * @see app/Http/Controllers/MasterData/MasterDataController.php:149
 * @route '/modules/shifts/{record}'
 */
    const destroyfc9faf7c1416e83c99d30d476f0f583dForm = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroyfc9faf7c1416e83c99d30d476f0f583d.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\MasterData\MasterDataController::destroy
 * @see app/Http/Controllers/MasterData/MasterDataController.php:149
 * @route '/modules/shifts/{record}'
 */
        destroyfc9faf7c1416e83c99d30d476f0f583dForm.delete = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroyfc9faf7c1416e83c99d30d476f0f583d.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroyfc9faf7c1416e83c99d30d476f0f583d.form = destroyfc9faf7c1416e83c99d30d476f0f583dForm
    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::destroy
 * @see app/Http/Controllers/MasterData/MasterDataController.php:149
 * @route '/modules/leave-types/{record}'
 */
const destroyeb792070933d9847fd5ecf95e6d9a405 = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyeb792070933d9847fd5ecf95e6d9a405.url(args, options),
    method: 'delete',
})

destroyeb792070933d9847fd5ecf95e6d9a405.definition = {
    methods: ["delete"],
    url: '/modules/leave-types/{record}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::destroy
 * @see app/Http/Controllers/MasterData/MasterDataController.php:149
 * @route '/modules/leave-types/{record}'
 */
destroyeb792070933d9847fd5ecf95e6d9a405.url = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { record: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    record: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        record: args.record,
                }

    return destroyeb792070933d9847fd5ecf95e6d9a405.definition.url
            .replace('{record}', parsedArgs.record.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::destroy
 * @see app/Http/Controllers/MasterData/MasterDataController.php:149
 * @route '/modules/leave-types/{record}'
 */
destroyeb792070933d9847fd5ecf95e6d9a405.delete = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyeb792070933d9847fd5ecf95e6d9a405.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::destroy
 * @see app/Http/Controllers/MasterData/MasterDataController.php:149
 * @route '/modules/leave-types/{record}'
 */
    const destroyeb792070933d9847fd5ecf95e6d9a405Form = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroyeb792070933d9847fd5ecf95e6d9a405.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\MasterData\MasterDataController::destroy
 * @see app/Http/Controllers/MasterData/MasterDataController.php:149
 * @route '/modules/leave-types/{record}'
 */
        destroyeb792070933d9847fd5ecf95e6d9a405Form.delete = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroyeb792070933d9847fd5ecf95e6d9a405.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroyeb792070933d9847fd5ecf95e6d9a405.form = destroyeb792070933d9847fd5ecf95e6d9a405Form
    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::destroy
 * @see app/Http/Controllers/MasterData/MasterDataController.php:149
 * @route '/modules/schedules/{record}'
 */
const destroy845d1823f534d403768b0dfef31d10fb = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy845d1823f534d403768b0dfef31d10fb.url(args, options),
    method: 'delete',
})

destroy845d1823f534d403768b0dfef31d10fb.definition = {
    methods: ["delete"],
    url: '/modules/schedules/{record}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::destroy
 * @see app/Http/Controllers/MasterData/MasterDataController.php:149
 * @route '/modules/schedules/{record}'
 */
destroy845d1823f534d403768b0dfef31d10fb.url = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { record: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    record: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        record: args.record,
                }

    return destroy845d1823f534d403768b0dfef31d10fb.definition.url
            .replace('{record}', parsedArgs.record.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::destroy
 * @see app/Http/Controllers/MasterData/MasterDataController.php:149
 * @route '/modules/schedules/{record}'
 */
destroy845d1823f534d403768b0dfef31d10fb.delete = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy845d1823f534d403768b0dfef31d10fb.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::destroy
 * @see app/Http/Controllers/MasterData/MasterDataController.php:149
 * @route '/modules/schedules/{record}'
 */
    const destroy845d1823f534d403768b0dfef31d10fbForm = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy845d1823f534d403768b0dfef31d10fb.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\MasterData\MasterDataController::destroy
 * @see app/Http/Controllers/MasterData/MasterDataController.php:149
 * @route '/modules/schedules/{record}'
 */
        destroy845d1823f534d403768b0dfef31d10fbForm.delete = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy845d1823f534d403768b0dfef31d10fb.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy845d1823f534d403768b0dfef31d10fb.form = destroy845d1823f534d403768b0dfef31d10fbForm
    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::destroy
 * @see app/Http/Controllers/MasterData/MasterDataController.php:149
 * @route '/modules/{resource}/{record}'
 */
const destroy1682ba8702f8abe965b7931c7549c16c = (args: { resource: string | number, record: string | number } | [resource: string | number, record: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy1682ba8702f8abe965b7931c7549c16c.url(args, options),
    method: 'delete',
})

destroy1682ba8702f8abe965b7931c7549c16c.definition = {
    methods: ["delete"],
    url: '/modules/{resource}/{record}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::destroy
 * @see app/Http/Controllers/MasterData/MasterDataController.php:149
 * @route '/modules/{resource}/{record}'
 */
destroy1682ba8702f8abe965b7931c7549c16c.url = (args: { resource: string | number, record: string | number } | [resource: string | number, record: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    resource: args[0],
                    record: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        resource: args.resource,
                                record: args.record,
                }

    return destroy1682ba8702f8abe965b7931c7549c16c.definition.url
            .replace('{resource}', parsedArgs.resource.toString())
            .replace('{record}', parsedArgs.record.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::destroy
 * @see app/Http/Controllers/MasterData/MasterDataController.php:149
 * @route '/modules/{resource}/{record}'
 */
destroy1682ba8702f8abe965b7931c7549c16c.delete = (args: { resource: string | number, record: string | number } | [resource: string | number, record: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy1682ba8702f8abe965b7931c7549c16c.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::destroy
 * @see app/Http/Controllers/MasterData/MasterDataController.php:149
 * @route '/modules/{resource}/{record}'
 */
    const destroy1682ba8702f8abe965b7931c7549c16cForm = (args: { resource: string | number, record: string | number } | [resource: string | number, record: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy1682ba8702f8abe965b7931c7549c16c.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\MasterData\MasterDataController::destroy
 * @see app/Http/Controllers/MasterData/MasterDataController.php:149
 * @route '/modules/{resource}/{record}'
 */
        destroy1682ba8702f8abe965b7931c7549c16cForm.delete = (args: { resource: string | number, record: string | number } | [resource: string | number, record: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy1682ba8702f8abe965b7931c7549c16c.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy1682ba8702f8abe965b7931c7549c16c.form = destroy1682ba8702f8abe965b7931c7549c16cForm
    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::destroy
 * @see app/Http/Controllers/MasterData/MasterDataController.php:149
 * @route '/modules/salary-components/{record}'
 */
const destroy3e6b80981ab5e4d59324cc7164f65d6e = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy3e6b80981ab5e4d59324cc7164f65d6e.url(args, options),
    method: 'delete',
})

destroy3e6b80981ab5e4d59324cc7164f65d6e.definition = {
    methods: ["delete"],
    url: '/modules/salary-components/{record}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::destroy
 * @see app/Http/Controllers/MasterData/MasterDataController.php:149
 * @route '/modules/salary-components/{record}'
 */
destroy3e6b80981ab5e4d59324cc7164f65d6e.url = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { record: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    record: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        record: args.record,
                }

    return destroy3e6b80981ab5e4d59324cc7164f65d6e.definition.url
            .replace('{record}', parsedArgs.record.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::destroy
 * @see app/Http/Controllers/MasterData/MasterDataController.php:149
 * @route '/modules/salary-components/{record}'
 */
destroy3e6b80981ab5e4d59324cc7164f65d6e.delete = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy3e6b80981ab5e4d59324cc7164f65d6e.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::destroy
 * @see app/Http/Controllers/MasterData/MasterDataController.php:149
 * @route '/modules/salary-components/{record}'
 */
    const destroy3e6b80981ab5e4d59324cc7164f65d6eForm = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy3e6b80981ab5e4d59324cc7164f65d6e.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\MasterData\MasterDataController::destroy
 * @see app/Http/Controllers/MasterData/MasterDataController.php:149
 * @route '/modules/salary-components/{record}'
 */
        destroy3e6b80981ab5e4d59324cc7164f65d6eForm.delete = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy3e6b80981ab5e4d59324cc7164f65d6e.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy3e6b80981ab5e4d59324cc7164f65d6e.form = destroy3e6b80981ab5e4d59324cc7164f65d6eForm
    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::destroy
 * @see app/Http/Controllers/MasterData/MasterDataController.php:149
 * @route '/modules/payroll-periods/{record}'
 */
const destroyf436b1d2d7ed730c07f705d82c0e5648 = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyf436b1d2d7ed730c07f705d82c0e5648.url(args, options),
    method: 'delete',
})

destroyf436b1d2d7ed730c07f705d82c0e5648.definition = {
    methods: ["delete"],
    url: '/modules/payroll-periods/{record}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::destroy
 * @see app/Http/Controllers/MasterData/MasterDataController.php:149
 * @route '/modules/payroll-periods/{record}'
 */
destroyf436b1d2d7ed730c07f705d82c0e5648.url = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { record: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    record: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        record: args.record,
                }

    return destroyf436b1d2d7ed730c07f705d82c0e5648.definition.url
            .replace('{record}', parsedArgs.record.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::destroy
 * @see app/Http/Controllers/MasterData/MasterDataController.php:149
 * @route '/modules/payroll-periods/{record}'
 */
destroyf436b1d2d7ed730c07f705d82c0e5648.delete = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyf436b1d2d7ed730c07f705d82c0e5648.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::destroy
 * @see app/Http/Controllers/MasterData/MasterDataController.php:149
 * @route '/modules/payroll-periods/{record}'
 */
    const destroyf436b1d2d7ed730c07f705d82c0e5648Form = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroyf436b1d2d7ed730c07f705d82c0e5648.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\MasterData\MasterDataController::destroy
 * @see app/Http/Controllers/MasterData/MasterDataController.php:149
 * @route '/modules/payroll-periods/{record}'
 */
        destroyf436b1d2d7ed730c07f705d82c0e5648Form.delete = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroyf436b1d2d7ed730c07f705d82c0e5648.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroyf436b1d2d7ed730c07f705d82c0e5648.form = destroyf436b1d2d7ed730c07f705d82c0e5648Form

export const destroy = {
    '/modules/organization/{resource}/{record}': destroy3acb585e7e946e72f9ad4549c8caa257,
    '/modules/shifts/{record}': destroyfc9faf7c1416e83c99d30d476f0f583d,
    '/modules/leave-types/{record}': destroyeb792070933d9847fd5ecf95e6d9a405,
    '/modules/schedules/{record}': destroy845d1823f534d403768b0dfef31d10fb,
    '/modules/{resource}/{record}': destroy1682ba8702f8abe965b7931c7549c16c,
    '/modules/salary-components/{record}': destroy3e6b80981ab5e4d59324cc7164f65d6e,
    '/modules/payroll-periods/{record}': destroyf436b1d2d7ed730c07f705d82c0e5648,
}

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::restore
 * @see app/Http/Controllers/MasterData/MasterDataController.php:192
 * @route '/modules/organization/{resource}/{record}/restore'
 */
export const restore = (args: { resource: string | number, record: string | number } | [resource: string | number, record: string | number ], options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: restore.url(args, options),
    method: 'post',
})

restore.definition = {
    methods: ["post"],
    url: '/modules/organization/{resource}/{record}/restore',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::restore
 * @see app/Http/Controllers/MasterData/MasterDataController.php:192
 * @route '/modules/organization/{resource}/{record}/restore'
 */
restore.url = (args: { resource: string | number, record: string | number } | [resource: string | number, record: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    resource: args[0],
                    record: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        resource: args.resource,
                                record: args.record,
                }

    return restore.definition.url
            .replace('{resource}', parsedArgs.resource.toString())
            .replace('{record}', parsedArgs.record.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MasterData\MasterDataController::restore
 * @see app/Http/Controllers/MasterData/MasterDataController.php:192
 * @route '/modules/organization/{resource}/{record}/restore'
 */
restore.post = (args: { resource: string | number, record: string | number } | [resource: string | number, record: string | number ], options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: restore.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\MasterData\MasterDataController::restore
 * @see app/Http/Controllers/MasterData/MasterDataController.php:192
 * @route '/modules/organization/{resource}/{record}/restore'
 */
    const restoreForm = (args: { resource: string | number, record: string | number } | [resource: string | number, record: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: restore.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\MasterData\MasterDataController::restore
 * @see app/Http/Controllers/MasterData/MasterDataController.php:192
 * @route '/modules/organization/{resource}/{record}/restore'
 */
        restoreForm.post = (args: { resource: string | number, record: string | number } | [resource: string | number, record: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: restore.url(args, options),
            method: 'post',
        })
    
    restore.form = restoreForm
const MasterDataController = { template, exportMethod, importMethod, index, create, store, edit, update, destroy, restore, export: exportMethod, import: importMethod }

export default MasterDataController