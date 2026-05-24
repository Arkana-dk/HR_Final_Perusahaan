import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Files\SecureFileController::show
 * @see app/Http/Controllers/Files/SecureFileController.php:76
 * @route '/secure-files/reimburse-attachments/{reimburseRequest}'
 */
export const show = (args: { reimburseRequest: number | { id: number } } | [reimburseRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/secure-files/reimburse-attachments/{reimburseRequest}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Files\SecureFileController::show
 * @see app/Http/Controllers/Files/SecureFileController.php:76
 * @route '/secure-files/reimburse-attachments/{reimburseRequest}'
 */
show.url = (args: { reimburseRequest: number | { id: number } } | [reimburseRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return show.definition.url
            .replace('{reimburseRequest}', parsedArgs.reimburseRequest.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Files\SecureFileController::show
 * @see app/Http/Controllers/Files/SecureFileController.php:76
 * @route '/secure-files/reimburse-attachments/{reimburseRequest}'
 */
show.get = (args: { reimburseRequest: number | { id: number } } | [reimburseRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Files\SecureFileController::show
 * @see app/Http/Controllers/Files/SecureFileController.php:76
 * @route '/secure-files/reimburse-attachments/{reimburseRequest}'
 */
show.head = (args: { reimburseRequest: number | { id: number } } | [reimburseRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Files\SecureFileController::show
 * @see app/Http/Controllers/Files/SecureFileController.php:76
 * @route '/secure-files/reimburse-attachments/{reimburseRequest}'
 */
    const showForm = (args: { reimburseRequest: number | { id: number } } | [reimburseRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Files\SecureFileController::show
 * @see app/Http/Controllers/Files/SecureFileController.php:76
 * @route '/secure-files/reimburse-attachments/{reimburseRequest}'
 */
        showForm.get = (args: { reimburseRequest: number | { id: number } } | [reimburseRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Files\SecureFileController::show
 * @see app/Http/Controllers/Files/SecureFileController.php:76
 * @route '/secure-files/reimburse-attachments/{reimburseRequest}'
 */
        showForm.head = (args: { reimburseRequest: number | { id: number } } | [reimburseRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
const reimburseAttachments = {
    show: Object.assign(show, show),
}

export default reimburseAttachments