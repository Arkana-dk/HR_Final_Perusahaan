import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Files\SecureFileController::attendancePhoto
 * @see app/Http/Controllers/Files/SecureFileController.php:25
 * @route '/api/v1/secure-files/attendance-photos/{photo}'
 */
const attendancePhoto8f9df0bcf0748361ee92fab73c9d5938 = (args: { photo: number | { id: number } } | [photo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: attendancePhoto8f9df0bcf0748361ee92fab73c9d5938.url(args, options),
    method: 'get',
})

attendancePhoto8f9df0bcf0748361ee92fab73c9d5938.definition = {
    methods: ["get","head"],
    url: '/api/v1/secure-files/attendance-photos/{photo}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Files\SecureFileController::attendancePhoto
 * @see app/Http/Controllers/Files/SecureFileController.php:25
 * @route '/api/v1/secure-files/attendance-photos/{photo}'
 */
attendancePhoto8f9df0bcf0748361ee92fab73c9d5938.url = (args: { photo: number | { id: number } } | [photo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { photo: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { photo: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    photo: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        photo: typeof args.photo === 'object'
                ? args.photo.id
                : args.photo,
                }

    return attendancePhoto8f9df0bcf0748361ee92fab73c9d5938.definition.url
            .replace('{photo}', parsedArgs.photo.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Files\SecureFileController::attendancePhoto
 * @see app/Http/Controllers/Files/SecureFileController.php:25
 * @route '/api/v1/secure-files/attendance-photos/{photo}'
 */
attendancePhoto8f9df0bcf0748361ee92fab73c9d5938.get = (args: { photo: number | { id: number } } | [photo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: attendancePhoto8f9df0bcf0748361ee92fab73c9d5938.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Files\SecureFileController::attendancePhoto
 * @see app/Http/Controllers/Files/SecureFileController.php:25
 * @route '/api/v1/secure-files/attendance-photos/{photo}'
 */
attendancePhoto8f9df0bcf0748361ee92fab73c9d5938.head = (args: { photo: number | { id: number } } | [photo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: attendancePhoto8f9df0bcf0748361ee92fab73c9d5938.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Files\SecureFileController::attendancePhoto
 * @see app/Http/Controllers/Files/SecureFileController.php:25
 * @route '/api/v1/secure-files/attendance-photos/{photo}'
 */
    const attendancePhoto8f9df0bcf0748361ee92fab73c9d5938Form = (args: { photo: number | { id: number } } | [photo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: attendancePhoto8f9df0bcf0748361ee92fab73c9d5938.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Files\SecureFileController::attendancePhoto
 * @see app/Http/Controllers/Files/SecureFileController.php:25
 * @route '/api/v1/secure-files/attendance-photos/{photo}'
 */
        attendancePhoto8f9df0bcf0748361ee92fab73c9d5938Form.get = (args: { photo: number | { id: number } } | [photo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: attendancePhoto8f9df0bcf0748361ee92fab73c9d5938.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Files\SecureFileController::attendancePhoto
 * @see app/Http/Controllers/Files/SecureFileController.php:25
 * @route '/api/v1/secure-files/attendance-photos/{photo}'
 */
        attendancePhoto8f9df0bcf0748361ee92fab73c9d5938Form.head = (args: { photo: number | { id: number } } | [photo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: attendancePhoto8f9df0bcf0748361ee92fab73c9d5938.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    attendancePhoto8f9df0bcf0748361ee92fab73c9d5938.form = attendancePhoto8f9df0bcf0748361ee92fab73c9d5938Form
    /**
* @see \App\Http\Controllers\Files\SecureFileController::attendancePhoto
 * @see app/Http/Controllers/Files/SecureFileController.php:25
 * @route '/secure-files/attendance-photos/{photo}'
 */
const attendancePhotoad65f419e1cff5d6407c3bf102abff48 = (args: { photo: number | { id: number } } | [photo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: attendancePhotoad65f419e1cff5d6407c3bf102abff48.url(args, options),
    method: 'get',
})

attendancePhotoad65f419e1cff5d6407c3bf102abff48.definition = {
    methods: ["get","head"],
    url: '/secure-files/attendance-photos/{photo}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Files\SecureFileController::attendancePhoto
 * @see app/Http/Controllers/Files/SecureFileController.php:25
 * @route '/secure-files/attendance-photos/{photo}'
 */
attendancePhotoad65f419e1cff5d6407c3bf102abff48.url = (args: { photo: number | { id: number } } | [photo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { photo: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { photo: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    photo: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        photo: typeof args.photo === 'object'
                ? args.photo.id
                : args.photo,
                }

    return attendancePhotoad65f419e1cff5d6407c3bf102abff48.definition.url
            .replace('{photo}', parsedArgs.photo.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Files\SecureFileController::attendancePhoto
 * @see app/Http/Controllers/Files/SecureFileController.php:25
 * @route '/secure-files/attendance-photos/{photo}'
 */
attendancePhotoad65f419e1cff5d6407c3bf102abff48.get = (args: { photo: number | { id: number } } | [photo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: attendancePhotoad65f419e1cff5d6407c3bf102abff48.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Files\SecureFileController::attendancePhoto
 * @see app/Http/Controllers/Files/SecureFileController.php:25
 * @route '/secure-files/attendance-photos/{photo}'
 */
attendancePhotoad65f419e1cff5d6407c3bf102abff48.head = (args: { photo: number | { id: number } } | [photo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: attendancePhotoad65f419e1cff5d6407c3bf102abff48.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Files\SecureFileController::attendancePhoto
 * @see app/Http/Controllers/Files/SecureFileController.php:25
 * @route '/secure-files/attendance-photos/{photo}'
 */
    const attendancePhotoad65f419e1cff5d6407c3bf102abff48Form = (args: { photo: number | { id: number } } | [photo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: attendancePhotoad65f419e1cff5d6407c3bf102abff48.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Files\SecureFileController::attendancePhoto
 * @see app/Http/Controllers/Files/SecureFileController.php:25
 * @route '/secure-files/attendance-photos/{photo}'
 */
        attendancePhotoad65f419e1cff5d6407c3bf102abff48Form.get = (args: { photo: number | { id: number } } | [photo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: attendancePhotoad65f419e1cff5d6407c3bf102abff48.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Files\SecureFileController::attendancePhoto
 * @see app/Http/Controllers/Files/SecureFileController.php:25
 * @route '/secure-files/attendance-photos/{photo}'
 */
        attendancePhotoad65f419e1cff5d6407c3bf102abff48Form.head = (args: { photo: number | { id: number } } | [photo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: attendancePhotoad65f419e1cff5d6407c3bf102abff48.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    attendancePhotoad65f419e1cff5d6407c3bf102abff48.form = attendancePhotoad65f419e1cff5d6407c3bf102abff48Form

export const attendancePhoto = {
    '/api/v1/secure-files/attendance-photos/{photo}': attendancePhoto8f9df0bcf0748361ee92fab73c9d5938,
    '/secure-files/attendance-photos/{photo}': attendancePhotoad65f419e1cff5d6407c3bf102abff48,
}

/**
* @see \App\Http\Controllers\Files\SecureFileController::employeeDocument
 * @see app/Http/Controllers/Files/SecureFileController.php:40
 * @route '/api/v1/secure-files/documents/{document}'
 */
const employeeDocument95f7fb3ca4d26b893c1783d4d37f9886 = (args: { document: number | { id: number } } | [document: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: employeeDocument95f7fb3ca4d26b893c1783d4d37f9886.url(args, options),
    method: 'get',
})

employeeDocument95f7fb3ca4d26b893c1783d4d37f9886.definition = {
    methods: ["get","head"],
    url: '/api/v1/secure-files/documents/{document}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Files\SecureFileController::employeeDocument
 * @see app/Http/Controllers/Files/SecureFileController.php:40
 * @route '/api/v1/secure-files/documents/{document}'
 */
employeeDocument95f7fb3ca4d26b893c1783d4d37f9886.url = (args: { document: number | { id: number } } | [document: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { document: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { document: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    document: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        document: typeof args.document === 'object'
                ? args.document.id
                : args.document,
                }

    return employeeDocument95f7fb3ca4d26b893c1783d4d37f9886.definition.url
            .replace('{document}', parsedArgs.document.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Files\SecureFileController::employeeDocument
 * @see app/Http/Controllers/Files/SecureFileController.php:40
 * @route '/api/v1/secure-files/documents/{document}'
 */
employeeDocument95f7fb3ca4d26b893c1783d4d37f9886.get = (args: { document: number | { id: number } } | [document: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: employeeDocument95f7fb3ca4d26b893c1783d4d37f9886.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Files\SecureFileController::employeeDocument
 * @see app/Http/Controllers/Files/SecureFileController.php:40
 * @route '/api/v1/secure-files/documents/{document}'
 */
employeeDocument95f7fb3ca4d26b893c1783d4d37f9886.head = (args: { document: number | { id: number } } | [document: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: employeeDocument95f7fb3ca4d26b893c1783d4d37f9886.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Files\SecureFileController::employeeDocument
 * @see app/Http/Controllers/Files/SecureFileController.php:40
 * @route '/api/v1/secure-files/documents/{document}'
 */
    const employeeDocument95f7fb3ca4d26b893c1783d4d37f9886Form = (args: { document: number | { id: number } } | [document: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: employeeDocument95f7fb3ca4d26b893c1783d4d37f9886.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Files\SecureFileController::employeeDocument
 * @see app/Http/Controllers/Files/SecureFileController.php:40
 * @route '/api/v1/secure-files/documents/{document}'
 */
        employeeDocument95f7fb3ca4d26b893c1783d4d37f9886Form.get = (args: { document: number | { id: number } } | [document: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: employeeDocument95f7fb3ca4d26b893c1783d4d37f9886.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Files\SecureFileController::employeeDocument
 * @see app/Http/Controllers/Files/SecureFileController.php:40
 * @route '/api/v1/secure-files/documents/{document}'
 */
        employeeDocument95f7fb3ca4d26b893c1783d4d37f9886Form.head = (args: { document: number | { id: number } } | [document: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: employeeDocument95f7fb3ca4d26b893c1783d4d37f9886.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    employeeDocument95f7fb3ca4d26b893c1783d4d37f9886.form = employeeDocument95f7fb3ca4d26b893c1783d4d37f9886Form
    /**
* @see \App\Http\Controllers\Files\SecureFileController::employeeDocument
 * @see app/Http/Controllers/Files/SecureFileController.php:40
 * @route '/secure-files/documents/{document}'
 */
const employeeDocumentfc36a2bf62475f8d4dea9f943b3edb93 = (args: { document: number | { id: number } } | [document: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: employeeDocumentfc36a2bf62475f8d4dea9f943b3edb93.url(args, options),
    method: 'get',
})

employeeDocumentfc36a2bf62475f8d4dea9f943b3edb93.definition = {
    methods: ["get","head"],
    url: '/secure-files/documents/{document}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Files\SecureFileController::employeeDocument
 * @see app/Http/Controllers/Files/SecureFileController.php:40
 * @route '/secure-files/documents/{document}'
 */
employeeDocumentfc36a2bf62475f8d4dea9f943b3edb93.url = (args: { document: number | { id: number } } | [document: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { document: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { document: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    document: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        document: typeof args.document === 'object'
                ? args.document.id
                : args.document,
                }

    return employeeDocumentfc36a2bf62475f8d4dea9f943b3edb93.definition.url
            .replace('{document}', parsedArgs.document.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Files\SecureFileController::employeeDocument
 * @see app/Http/Controllers/Files/SecureFileController.php:40
 * @route '/secure-files/documents/{document}'
 */
employeeDocumentfc36a2bf62475f8d4dea9f943b3edb93.get = (args: { document: number | { id: number } } | [document: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: employeeDocumentfc36a2bf62475f8d4dea9f943b3edb93.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Files\SecureFileController::employeeDocument
 * @see app/Http/Controllers/Files/SecureFileController.php:40
 * @route '/secure-files/documents/{document}'
 */
employeeDocumentfc36a2bf62475f8d4dea9f943b3edb93.head = (args: { document: number | { id: number } } | [document: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: employeeDocumentfc36a2bf62475f8d4dea9f943b3edb93.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Files\SecureFileController::employeeDocument
 * @see app/Http/Controllers/Files/SecureFileController.php:40
 * @route '/secure-files/documents/{document}'
 */
    const employeeDocumentfc36a2bf62475f8d4dea9f943b3edb93Form = (args: { document: number | { id: number } } | [document: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: employeeDocumentfc36a2bf62475f8d4dea9f943b3edb93.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Files\SecureFileController::employeeDocument
 * @see app/Http/Controllers/Files/SecureFileController.php:40
 * @route '/secure-files/documents/{document}'
 */
        employeeDocumentfc36a2bf62475f8d4dea9f943b3edb93Form.get = (args: { document: number | { id: number } } | [document: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: employeeDocumentfc36a2bf62475f8d4dea9f943b3edb93.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Files\SecureFileController::employeeDocument
 * @see app/Http/Controllers/Files/SecureFileController.php:40
 * @route '/secure-files/documents/{document}'
 */
        employeeDocumentfc36a2bf62475f8d4dea9f943b3edb93Form.head = (args: { document: number | { id: number } } | [document: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: employeeDocumentfc36a2bf62475f8d4dea9f943b3edb93.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    employeeDocumentfc36a2bf62475f8d4dea9f943b3edb93.form = employeeDocumentfc36a2bf62475f8d4dea9f943b3edb93Form

export const employeeDocument = {
    '/api/v1/secure-files/documents/{document}': employeeDocument95f7fb3ca4d26b893c1783d4d37f9886,
    '/secure-files/documents/{document}': employeeDocumentfc36a2bf62475f8d4dea9f943b3edb93,
}

/**
* @see \App\Http\Controllers\Files\SecureFileController::employeeContract
 * @see app/Http/Controllers/Files/SecureFileController.php:52
 * @route '/api/v1/secure-files/contracts/{contract}'
 */
const employeeContracted6edb043478f50813f72af712094967 = (args: { contract: number | { id: number } } | [contract: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: employeeContracted6edb043478f50813f72af712094967.url(args, options),
    method: 'get',
})

employeeContracted6edb043478f50813f72af712094967.definition = {
    methods: ["get","head"],
    url: '/api/v1/secure-files/contracts/{contract}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Files\SecureFileController::employeeContract
 * @see app/Http/Controllers/Files/SecureFileController.php:52
 * @route '/api/v1/secure-files/contracts/{contract}'
 */
employeeContracted6edb043478f50813f72af712094967.url = (args: { contract: number | { id: number } } | [contract: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { contract: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { contract: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    contract: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        contract: typeof args.contract === 'object'
                ? args.contract.id
                : args.contract,
                }

    return employeeContracted6edb043478f50813f72af712094967.definition.url
            .replace('{contract}', parsedArgs.contract.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Files\SecureFileController::employeeContract
 * @see app/Http/Controllers/Files/SecureFileController.php:52
 * @route '/api/v1/secure-files/contracts/{contract}'
 */
employeeContracted6edb043478f50813f72af712094967.get = (args: { contract: number | { id: number } } | [contract: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: employeeContracted6edb043478f50813f72af712094967.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Files\SecureFileController::employeeContract
 * @see app/Http/Controllers/Files/SecureFileController.php:52
 * @route '/api/v1/secure-files/contracts/{contract}'
 */
employeeContracted6edb043478f50813f72af712094967.head = (args: { contract: number | { id: number } } | [contract: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: employeeContracted6edb043478f50813f72af712094967.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Files\SecureFileController::employeeContract
 * @see app/Http/Controllers/Files/SecureFileController.php:52
 * @route '/api/v1/secure-files/contracts/{contract}'
 */
    const employeeContracted6edb043478f50813f72af712094967Form = (args: { contract: number | { id: number } } | [contract: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: employeeContracted6edb043478f50813f72af712094967.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Files\SecureFileController::employeeContract
 * @see app/Http/Controllers/Files/SecureFileController.php:52
 * @route '/api/v1/secure-files/contracts/{contract}'
 */
        employeeContracted6edb043478f50813f72af712094967Form.get = (args: { contract: number | { id: number } } | [contract: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: employeeContracted6edb043478f50813f72af712094967.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Files\SecureFileController::employeeContract
 * @see app/Http/Controllers/Files/SecureFileController.php:52
 * @route '/api/v1/secure-files/contracts/{contract}'
 */
        employeeContracted6edb043478f50813f72af712094967Form.head = (args: { contract: number | { id: number } } | [contract: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: employeeContracted6edb043478f50813f72af712094967.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    employeeContracted6edb043478f50813f72af712094967.form = employeeContracted6edb043478f50813f72af712094967Form
    /**
* @see \App\Http\Controllers\Files\SecureFileController::employeeContract
 * @see app/Http/Controllers/Files/SecureFileController.php:52
 * @route '/secure-files/contracts/{contract}'
 */
const employeeContract1e0c795affc3ff6be0b9b73ff1305843 = (args: { contract: number | { id: number } } | [contract: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: employeeContract1e0c795affc3ff6be0b9b73ff1305843.url(args, options),
    method: 'get',
})

employeeContract1e0c795affc3ff6be0b9b73ff1305843.definition = {
    methods: ["get","head"],
    url: '/secure-files/contracts/{contract}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Files\SecureFileController::employeeContract
 * @see app/Http/Controllers/Files/SecureFileController.php:52
 * @route '/secure-files/contracts/{contract}'
 */
employeeContract1e0c795affc3ff6be0b9b73ff1305843.url = (args: { contract: number | { id: number } } | [contract: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { contract: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { contract: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    contract: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        contract: typeof args.contract === 'object'
                ? args.contract.id
                : args.contract,
                }

    return employeeContract1e0c795affc3ff6be0b9b73ff1305843.definition.url
            .replace('{contract}', parsedArgs.contract.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Files\SecureFileController::employeeContract
 * @see app/Http/Controllers/Files/SecureFileController.php:52
 * @route '/secure-files/contracts/{contract}'
 */
employeeContract1e0c795affc3ff6be0b9b73ff1305843.get = (args: { contract: number | { id: number } } | [contract: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: employeeContract1e0c795affc3ff6be0b9b73ff1305843.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Files\SecureFileController::employeeContract
 * @see app/Http/Controllers/Files/SecureFileController.php:52
 * @route '/secure-files/contracts/{contract}'
 */
employeeContract1e0c795affc3ff6be0b9b73ff1305843.head = (args: { contract: number | { id: number } } | [contract: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: employeeContract1e0c795affc3ff6be0b9b73ff1305843.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Files\SecureFileController::employeeContract
 * @see app/Http/Controllers/Files/SecureFileController.php:52
 * @route '/secure-files/contracts/{contract}'
 */
    const employeeContract1e0c795affc3ff6be0b9b73ff1305843Form = (args: { contract: number | { id: number } } | [contract: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: employeeContract1e0c795affc3ff6be0b9b73ff1305843.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Files\SecureFileController::employeeContract
 * @see app/Http/Controllers/Files/SecureFileController.php:52
 * @route '/secure-files/contracts/{contract}'
 */
        employeeContract1e0c795affc3ff6be0b9b73ff1305843Form.get = (args: { contract: number | { id: number } } | [contract: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: employeeContract1e0c795affc3ff6be0b9b73ff1305843.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Files\SecureFileController::employeeContract
 * @see app/Http/Controllers/Files/SecureFileController.php:52
 * @route '/secure-files/contracts/{contract}'
 */
        employeeContract1e0c795affc3ff6be0b9b73ff1305843Form.head = (args: { contract: number | { id: number } } | [contract: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: employeeContract1e0c795affc3ff6be0b9b73ff1305843.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    employeeContract1e0c795affc3ff6be0b9b73ff1305843.form = employeeContract1e0c795affc3ff6be0b9b73ff1305843Form

export const employeeContract = {
    '/api/v1/secure-files/contracts/{contract}': employeeContracted6edb043478f50813f72af712094967,
    '/secure-files/contracts/{contract}': employeeContract1e0c795affc3ff6be0b9b73ff1305843,
}

/**
* @see \App\Http\Controllers\Files\SecureFileController::leaveAttachment
 * @see app/Http/Controllers/Files/SecureFileController.php:64
 * @route '/api/v1/secure-files/leave-attachments/{leaveRequest}'
 */
const leaveAttachment26d08e943254cfb1829183347578f3c7 = (args: { leaveRequest: number | { id: number } } | [leaveRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: leaveAttachment26d08e943254cfb1829183347578f3c7.url(args, options),
    method: 'get',
})

leaveAttachment26d08e943254cfb1829183347578f3c7.definition = {
    methods: ["get","head"],
    url: '/api/v1/secure-files/leave-attachments/{leaveRequest}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Files\SecureFileController::leaveAttachment
 * @see app/Http/Controllers/Files/SecureFileController.php:64
 * @route '/api/v1/secure-files/leave-attachments/{leaveRequest}'
 */
leaveAttachment26d08e943254cfb1829183347578f3c7.url = (args: { leaveRequest: number | { id: number } } | [leaveRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return leaveAttachment26d08e943254cfb1829183347578f3c7.definition.url
            .replace('{leaveRequest}', parsedArgs.leaveRequest.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Files\SecureFileController::leaveAttachment
 * @see app/Http/Controllers/Files/SecureFileController.php:64
 * @route '/api/v1/secure-files/leave-attachments/{leaveRequest}'
 */
leaveAttachment26d08e943254cfb1829183347578f3c7.get = (args: { leaveRequest: number | { id: number } } | [leaveRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: leaveAttachment26d08e943254cfb1829183347578f3c7.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Files\SecureFileController::leaveAttachment
 * @see app/Http/Controllers/Files/SecureFileController.php:64
 * @route '/api/v1/secure-files/leave-attachments/{leaveRequest}'
 */
leaveAttachment26d08e943254cfb1829183347578f3c7.head = (args: { leaveRequest: number | { id: number } } | [leaveRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: leaveAttachment26d08e943254cfb1829183347578f3c7.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Files\SecureFileController::leaveAttachment
 * @see app/Http/Controllers/Files/SecureFileController.php:64
 * @route '/api/v1/secure-files/leave-attachments/{leaveRequest}'
 */
    const leaveAttachment26d08e943254cfb1829183347578f3c7Form = (args: { leaveRequest: number | { id: number } } | [leaveRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: leaveAttachment26d08e943254cfb1829183347578f3c7.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Files\SecureFileController::leaveAttachment
 * @see app/Http/Controllers/Files/SecureFileController.php:64
 * @route '/api/v1/secure-files/leave-attachments/{leaveRequest}'
 */
        leaveAttachment26d08e943254cfb1829183347578f3c7Form.get = (args: { leaveRequest: number | { id: number } } | [leaveRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: leaveAttachment26d08e943254cfb1829183347578f3c7.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Files\SecureFileController::leaveAttachment
 * @see app/Http/Controllers/Files/SecureFileController.php:64
 * @route '/api/v1/secure-files/leave-attachments/{leaveRequest}'
 */
        leaveAttachment26d08e943254cfb1829183347578f3c7Form.head = (args: { leaveRequest: number | { id: number } } | [leaveRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: leaveAttachment26d08e943254cfb1829183347578f3c7.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    leaveAttachment26d08e943254cfb1829183347578f3c7.form = leaveAttachment26d08e943254cfb1829183347578f3c7Form
    /**
* @see \App\Http\Controllers\Files\SecureFileController::leaveAttachment
 * @see app/Http/Controllers/Files/SecureFileController.php:64
 * @route '/secure-files/leave-attachments/{leaveRequest}'
 */
const leaveAttachment9ed0752bd560f1b069cbbc0a075bc9b3 = (args: { leaveRequest: number | { id: number } } | [leaveRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: leaveAttachment9ed0752bd560f1b069cbbc0a075bc9b3.url(args, options),
    method: 'get',
})

leaveAttachment9ed0752bd560f1b069cbbc0a075bc9b3.definition = {
    methods: ["get","head"],
    url: '/secure-files/leave-attachments/{leaveRequest}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Files\SecureFileController::leaveAttachment
 * @see app/Http/Controllers/Files/SecureFileController.php:64
 * @route '/secure-files/leave-attachments/{leaveRequest}'
 */
leaveAttachment9ed0752bd560f1b069cbbc0a075bc9b3.url = (args: { leaveRequest: number | { id: number } } | [leaveRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return leaveAttachment9ed0752bd560f1b069cbbc0a075bc9b3.definition.url
            .replace('{leaveRequest}', parsedArgs.leaveRequest.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Files\SecureFileController::leaveAttachment
 * @see app/Http/Controllers/Files/SecureFileController.php:64
 * @route '/secure-files/leave-attachments/{leaveRequest}'
 */
leaveAttachment9ed0752bd560f1b069cbbc0a075bc9b3.get = (args: { leaveRequest: number | { id: number } } | [leaveRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: leaveAttachment9ed0752bd560f1b069cbbc0a075bc9b3.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Files\SecureFileController::leaveAttachment
 * @see app/Http/Controllers/Files/SecureFileController.php:64
 * @route '/secure-files/leave-attachments/{leaveRequest}'
 */
leaveAttachment9ed0752bd560f1b069cbbc0a075bc9b3.head = (args: { leaveRequest: number | { id: number } } | [leaveRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: leaveAttachment9ed0752bd560f1b069cbbc0a075bc9b3.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Files\SecureFileController::leaveAttachment
 * @see app/Http/Controllers/Files/SecureFileController.php:64
 * @route '/secure-files/leave-attachments/{leaveRequest}'
 */
    const leaveAttachment9ed0752bd560f1b069cbbc0a075bc9b3Form = (args: { leaveRequest: number | { id: number } } | [leaveRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: leaveAttachment9ed0752bd560f1b069cbbc0a075bc9b3.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Files\SecureFileController::leaveAttachment
 * @see app/Http/Controllers/Files/SecureFileController.php:64
 * @route '/secure-files/leave-attachments/{leaveRequest}'
 */
        leaveAttachment9ed0752bd560f1b069cbbc0a075bc9b3Form.get = (args: { leaveRequest: number | { id: number } } | [leaveRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: leaveAttachment9ed0752bd560f1b069cbbc0a075bc9b3.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Files\SecureFileController::leaveAttachment
 * @see app/Http/Controllers/Files/SecureFileController.php:64
 * @route '/secure-files/leave-attachments/{leaveRequest}'
 */
        leaveAttachment9ed0752bd560f1b069cbbc0a075bc9b3Form.head = (args: { leaveRequest: number | { id: number } } | [leaveRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: leaveAttachment9ed0752bd560f1b069cbbc0a075bc9b3.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    leaveAttachment9ed0752bd560f1b069cbbc0a075bc9b3.form = leaveAttachment9ed0752bd560f1b069cbbc0a075bc9b3Form

export const leaveAttachment = {
    '/api/v1/secure-files/leave-attachments/{leaveRequest}': leaveAttachment26d08e943254cfb1829183347578f3c7,
    '/secure-files/leave-attachments/{leaveRequest}': leaveAttachment9ed0752bd560f1b069cbbc0a075bc9b3,
}

/**
* @see \App\Http\Controllers\Files\SecureFileController::reimburseAttachment
 * @see app/Http/Controllers/Files/SecureFileController.php:76
 * @route '/api/v1/secure-files/reimburse-attachments/{reimburseRequest}'
 */
const reimburseAttachment55dafa60ad9bea0e88eeac0a4b0f75c6 = (args: { reimburseRequest: number | { id: number } } | [reimburseRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: reimburseAttachment55dafa60ad9bea0e88eeac0a4b0f75c6.url(args, options),
    method: 'get',
})

reimburseAttachment55dafa60ad9bea0e88eeac0a4b0f75c6.definition = {
    methods: ["get","head"],
    url: '/api/v1/secure-files/reimburse-attachments/{reimburseRequest}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Files\SecureFileController::reimburseAttachment
 * @see app/Http/Controllers/Files/SecureFileController.php:76
 * @route '/api/v1/secure-files/reimburse-attachments/{reimburseRequest}'
 */
reimburseAttachment55dafa60ad9bea0e88eeac0a4b0f75c6.url = (args: { reimburseRequest: number | { id: number } } | [reimburseRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return reimburseAttachment55dafa60ad9bea0e88eeac0a4b0f75c6.definition.url
            .replace('{reimburseRequest}', parsedArgs.reimburseRequest.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Files\SecureFileController::reimburseAttachment
 * @see app/Http/Controllers/Files/SecureFileController.php:76
 * @route '/api/v1/secure-files/reimburse-attachments/{reimburseRequest}'
 */
reimburseAttachment55dafa60ad9bea0e88eeac0a4b0f75c6.get = (args: { reimburseRequest: number | { id: number } } | [reimburseRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: reimburseAttachment55dafa60ad9bea0e88eeac0a4b0f75c6.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Files\SecureFileController::reimburseAttachment
 * @see app/Http/Controllers/Files/SecureFileController.php:76
 * @route '/api/v1/secure-files/reimburse-attachments/{reimburseRequest}'
 */
reimburseAttachment55dafa60ad9bea0e88eeac0a4b0f75c6.head = (args: { reimburseRequest: number | { id: number } } | [reimburseRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: reimburseAttachment55dafa60ad9bea0e88eeac0a4b0f75c6.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Files\SecureFileController::reimburseAttachment
 * @see app/Http/Controllers/Files/SecureFileController.php:76
 * @route '/api/v1/secure-files/reimburse-attachments/{reimburseRequest}'
 */
    const reimburseAttachment55dafa60ad9bea0e88eeac0a4b0f75c6Form = (args: { reimburseRequest: number | { id: number } } | [reimburseRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: reimburseAttachment55dafa60ad9bea0e88eeac0a4b0f75c6.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Files\SecureFileController::reimburseAttachment
 * @see app/Http/Controllers/Files/SecureFileController.php:76
 * @route '/api/v1/secure-files/reimburse-attachments/{reimburseRequest}'
 */
        reimburseAttachment55dafa60ad9bea0e88eeac0a4b0f75c6Form.get = (args: { reimburseRequest: number | { id: number } } | [reimburseRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: reimburseAttachment55dafa60ad9bea0e88eeac0a4b0f75c6.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Files\SecureFileController::reimburseAttachment
 * @see app/Http/Controllers/Files/SecureFileController.php:76
 * @route '/api/v1/secure-files/reimburse-attachments/{reimburseRequest}'
 */
        reimburseAttachment55dafa60ad9bea0e88eeac0a4b0f75c6Form.head = (args: { reimburseRequest: number | { id: number } } | [reimburseRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: reimburseAttachment55dafa60ad9bea0e88eeac0a4b0f75c6.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    reimburseAttachment55dafa60ad9bea0e88eeac0a4b0f75c6.form = reimburseAttachment55dafa60ad9bea0e88eeac0a4b0f75c6Form
    /**
* @see \App\Http\Controllers\Files\SecureFileController::reimburseAttachment
 * @see app/Http/Controllers/Files/SecureFileController.php:76
 * @route '/secure-files/reimburse-attachments/{reimburseRequest}'
 */
const reimburseAttachmentdc016918eef142bece5b5280e3384b9d = (args: { reimburseRequest: number | { id: number } } | [reimburseRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: reimburseAttachmentdc016918eef142bece5b5280e3384b9d.url(args, options),
    method: 'get',
})

reimburseAttachmentdc016918eef142bece5b5280e3384b9d.definition = {
    methods: ["get","head"],
    url: '/secure-files/reimburse-attachments/{reimburseRequest}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Files\SecureFileController::reimburseAttachment
 * @see app/Http/Controllers/Files/SecureFileController.php:76
 * @route '/secure-files/reimburse-attachments/{reimburseRequest}'
 */
reimburseAttachmentdc016918eef142bece5b5280e3384b9d.url = (args: { reimburseRequest: number | { id: number } } | [reimburseRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return reimburseAttachmentdc016918eef142bece5b5280e3384b9d.definition.url
            .replace('{reimburseRequest}', parsedArgs.reimburseRequest.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Files\SecureFileController::reimburseAttachment
 * @see app/Http/Controllers/Files/SecureFileController.php:76
 * @route '/secure-files/reimburse-attachments/{reimburseRequest}'
 */
reimburseAttachmentdc016918eef142bece5b5280e3384b9d.get = (args: { reimburseRequest: number | { id: number } } | [reimburseRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: reimburseAttachmentdc016918eef142bece5b5280e3384b9d.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Files\SecureFileController::reimburseAttachment
 * @see app/Http/Controllers/Files/SecureFileController.php:76
 * @route '/secure-files/reimburse-attachments/{reimburseRequest}'
 */
reimburseAttachmentdc016918eef142bece5b5280e3384b9d.head = (args: { reimburseRequest: number | { id: number } } | [reimburseRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: reimburseAttachmentdc016918eef142bece5b5280e3384b9d.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Files\SecureFileController::reimburseAttachment
 * @see app/Http/Controllers/Files/SecureFileController.php:76
 * @route '/secure-files/reimburse-attachments/{reimburseRequest}'
 */
    const reimburseAttachmentdc016918eef142bece5b5280e3384b9dForm = (args: { reimburseRequest: number | { id: number } } | [reimburseRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: reimburseAttachmentdc016918eef142bece5b5280e3384b9d.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Files\SecureFileController::reimburseAttachment
 * @see app/Http/Controllers/Files/SecureFileController.php:76
 * @route '/secure-files/reimburse-attachments/{reimburseRequest}'
 */
        reimburseAttachmentdc016918eef142bece5b5280e3384b9dForm.get = (args: { reimburseRequest: number | { id: number } } | [reimburseRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: reimburseAttachmentdc016918eef142bece5b5280e3384b9d.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Files\SecureFileController::reimburseAttachment
 * @see app/Http/Controllers/Files/SecureFileController.php:76
 * @route '/secure-files/reimburse-attachments/{reimburseRequest}'
 */
        reimburseAttachmentdc016918eef142bece5b5280e3384b9dForm.head = (args: { reimburseRequest: number | { id: number } } | [reimburseRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: reimburseAttachmentdc016918eef142bece5b5280e3384b9d.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    reimburseAttachmentdc016918eef142bece5b5280e3384b9d.form = reimburseAttachmentdc016918eef142bece5b5280e3384b9dForm

export const reimburseAttachment = {
    '/api/v1/secure-files/reimburse-attachments/{reimburseRequest}': reimburseAttachment55dafa60ad9bea0e88eeac0a4b0f75c6,
    '/secure-files/reimburse-attachments/{reimburseRequest}': reimburseAttachmentdc016918eef142bece5b5280e3384b9d,
}

/**
* @see \App\Http\Controllers\Files\SecureFileController::attendanceCorrectionAttachment
 * @see app/Http/Controllers/Files/SecureFileController.php:88
 * @route '/api/v1/secure-files/attendance-correction-attachments/{attendanceCorrection}'
 */
const attendanceCorrectionAttachmente99ca9e45a54fbbed92b6e0c1bd2910e = (args: { attendanceCorrection: number | { id: number } } | [attendanceCorrection: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: attendanceCorrectionAttachmente99ca9e45a54fbbed92b6e0c1bd2910e.url(args, options),
    method: 'get',
})

attendanceCorrectionAttachmente99ca9e45a54fbbed92b6e0c1bd2910e.definition = {
    methods: ["get","head"],
    url: '/api/v1/secure-files/attendance-correction-attachments/{attendanceCorrection}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Files\SecureFileController::attendanceCorrectionAttachment
 * @see app/Http/Controllers/Files/SecureFileController.php:88
 * @route '/api/v1/secure-files/attendance-correction-attachments/{attendanceCorrection}'
 */
attendanceCorrectionAttachmente99ca9e45a54fbbed92b6e0c1bd2910e.url = (args: { attendanceCorrection: number | { id: number } } | [attendanceCorrection: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return attendanceCorrectionAttachmente99ca9e45a54fbbed92b6e0c1bd2910e.definition.url
            .replace('{attendanceCorrection}', parsedArgs.attendanceCorrection.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Files\SecureFileController::attendanceCorrectionAttachment
 * @see app/Http/Controllers/Files/SecureFileController.php:88
 * @route '/api/v1/secure-files/attendance-correction-attachments/{attendanceCorrection}'
 */
attendanceCorrectionAttachmente99ca9e45a54fbbed92b6e0c1bd2910e.get = (args: { attendanceCorrection: number | { id: number } } | [attendanceCorrection: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: attendanceCorrectionAttachmente99ca9e45a54fbbed92b6e0c1bd2910e.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Files\SecureFileController::attendanceCorrectionAttachment
 * @see app/Http/Controllers/Files/SecureFileController.php:88
 * @route '/api/v1/secure-files/attendance-correction-attachments/{attendanceCorrection}'
 */
attendanceCorrectionAttachmente99ca9e45a54fbbed92b6e0c1bd2910e.head = (args: { attendanceCorrection: number | { id: number } } | [attendanceCorrection: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: attendanceCorrectionAttachmente99ca9e45a54fbbed92b6e0c1bd2910e.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Files\SecureFileController::attendanceCorrectionAttachment
 * @see app/Http/Controllers/Files/SecureFileController.php:88
 * @route '/api/v1/secure-files/attendance-correction-attachments/{attendanceCorrection}'
 */
    const attendanceCorrectionAttachmente99ca9e45a54fbbed92b6e0c1bd2910eForm = (args: { attendanceCorrection: number | { id: number } } | [attendanceCorrection: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: attendanceCorrectionAttachmente99ca9e45a54fbbed92b6e0c1bd2910e.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Files\SecureFileController::attendanceCorrectionAttachment
 * @see app/Http/Controllers/Files/SecureFileController.php:88
 * @route '/api/v1/secure-files/attendance-correction-attachments/{attendanceCorrection}'
 */
        attendanceCorrectionAttachmente99ca9e45a54fbbed92b6e0c1bd2910eForm.get = (args: { attendanceCorrection: number | { id: number } } | [attendanceCorrection: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: attendanceCorrectionAttachmente99ca9e45a54fbbed92b6e0c1bd2910e.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Files\SecureFileController::attendanceCorrectionAttachment
 * @see app/Http/Controllers/Files/SecureFileController.php:88
 * @route '/api/v1/secure-files/attendance-correction-attachments/{attendanceCorrection}'
 */
        attendanceCorrectionAttachmente99ca9e45a54fbbed92b6e0c1bd2910eForm.head = (args: { attendanceCorrection: number | { id: number } } | [attendanceCorrection: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: attendanceCorrectionAttachmente99ca9e45a54fbbed92b6e0c1bd2910e.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    attendanceCorrectionAttachmente99ca9e45a54fbbed92b6e0c1bd2910e.form = attendanceCorrectionAttachmente99ca9e45a54fbbed92b6e0c1bd2910eForm
    /**
* @see \App\Http\Controllers\Files\SecureFileController::attendanceCorrectionAttachment
 * @see app/Http/Controllers/Files/SecureFileController.php:88
 * @route '/secure-files/attendance-correction-attachments/{attendanceCorrection}'
 */
const attendanceCorrectionAttachment4da70f7504907eed0c632b3e089521c7 = (args: { attendanceCorrection: number | { id: number } } | [attendanceCorrection: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: attendanceCorrectionAttachment4da70f7504907eed0c632b3e089521c7.url(args, options),
    method: 'get',
})

attendanceCorrectionAttachment4da70f7504907eed0c632b3e089521c7.definition = {
    methods: ["get","head"],
    url: '/secure-files/attendance-correction-attachments/{attendanceCorrection}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Files\SecureFileController::attendanceCorrectionAttachment
 * @see app/Http/Controllers/Files/SecureFileController.php:88
 * @route '/secure-files/attendance-correction-attachments/{attendanceCorrection}'
 */
attendanceCorrectionAttachment4da70f7504907eed0c632b3e089521c7.url = (args: { attendanceCorrection: number | { id: number } } | [attendanceCorrection: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return attendanceCorrectionAttachment4da70f7504907eed0c632b3e089521c7.definition.url
            .replace('{attendanceCorrection}', parsedArgs.attendanceCorrection.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Files\SecureFileController::attendanceCorrectionAttachment
 * @see app/Http/Controllers/Files/SecureFileController.php:88
 * @route '/secure-files/attendance-correction-attachments/{attendanceCorrection}'
 */
attendanceCorrectionAttachment4da70f7504907eed0c632b3e089521c7.get = (args: { attendanceCorrection: number | { id: number } } | [attendanceCorrection: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: attendanceCorrectionAttachment4da70f7504907eed0c632b3e089521c7.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Files\SecureFileController::attendanceCorrectionAttachment
 * @see app/Http/Controllers/Files/SecureFileController.php:88
 * @route '/secure-files/attendance-correction-attachments/{attendanceCorrection}'
 */
attendanceCorrectionAttachment4da70f7504907eed0c632b3e089521c7.head = (args: { attendanceCorrection: number | { id: number } } | [attendanceCorrection: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: attendanceCorrectionAttachment4da70f7504907eed0c632b3e089521c7.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Files\SecureFileController::attendanceCorrectionAttachment
 * @see app/Http/Controllers/Files/SecureFileController.php:88
 * @route '/secure-files/attendance-correction-attachments/{attendanceCorrection}'
 */
    const attendanceCorrectionAttachment4da70f7504907eed0c632b3e089521c7Form = (args: { attendanceCorrection: number | { id: number } } | [attendanceCorrection: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: attendanceCorrectionAttachment4da70f7504907eed0c632b3e089521c7.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Files\SecureFileController::attendanceCorrectionAttachment
 * @see app/Http/Controllers/Files/SecureFileController.php:88
 * @route '/secure-files/attendance-correction-attachments/{attendanceCorrection}'
 */
        attendanceCorrectionAttachment4da70f7504907eed0c632b3e089521c7Form.get = (args: { attendanceCorrection: number | { id: number } } | [attendanceCorrection: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: attendanceCorrectionAttachment4da70f7504907eed0c632b3e089521c7.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Files\SecureFileController::attendanceCorrectionAttachment
 * @see app/Http/Controllers/Files/SecureFileController.php:88
 * @route '/secure-files/attendance-correction-attachments/{attendanceCorrection}'
 */
        attendanceCorrectionAttachment4da70f7504907eed0c632b3e089521c7Form.head = (args: { attendanceCorrection: number | { id: number } } | [attendanceCorrection: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: attendanceCorrectionAttachment4da70f7504907eed0c632b3e089521c7.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    attendanceCorrectionAttachment4da70f7504907eed0c632b3e089521c7.form = attendanceCorrectionAttachment4da70f7504907eed0c632b3e089521c7Form

export const attendanceCorrectionAttachment = {
    '/api/v1/secure-files/attendance-correction-attachments/{attendanceCorrection}': attendanceCorrectionAttachmente99ca9e45a54fbbed92b6e0c1bd2910e,
    '/secure-files/attendance-correction-attachments/{attendanceCorrection}': attendanceCorrectionAttachment4da70f7504907eed0c632b3e089521c7,
}

const SecureFileController = { attendancePhoto, employeeDocument, employeeContract, leaveAttachment, reimburseAttachment, attendanceCorrectionAttachment }

export default SecureFileController