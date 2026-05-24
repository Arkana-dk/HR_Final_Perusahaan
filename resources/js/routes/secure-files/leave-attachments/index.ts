import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Files\SecureFileController::show
 * @see app/Http/Controllers/Files/SecureFileController.php:64
 * @route '/secure-files/leave-attachments/{leaveRequest}'
 */
export const show = (args: { leaveRequest: number | { id: number } } | [leaveRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/secure-files/leave-attachments/{leaveRequest}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Files\SecureFileController::show
 * @see app/Http/Controllers/Files/SecureFileController.php:64
 * @route '/secure-files/leave-attachments/{leaveRequest}'
 */
show.url = (args: { leaveRequest: number | { id: number } } | [leaveRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return show.definition.url
            .replace('{leaveRequest}', parsedArgs.leaveRequest.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Files\SecureFileController::show
 * @see app/Http/Controllers/Files/SecureFileController.php:64
 * @route '/secure-files/leave-attachments/{leaveRequest}'
 */
show.get = (args: { leaveRequest: number | { id: number } } | [leaveRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Files\SecureFileController::show
 * @see app/Http/Controllers/Files/SecureFileController.php:64
 * @route '/secure-files/leave-attachments/{leaveRequest}'
 */
show.head = (args: { leaveRequest: number | { id: number } } | [leaveRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Files\SecureFileController::show
 * @see app/Http/Controllers/Files/SecureFileController.php:64
 * @route '/secure-files/leave-attachments/{leaveRequest}'
 */
    const showForm = (args: { leaveRequest: number | { id: number } } | [leaveRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Files\SecureFileController::show
 * @see app/Http/Controllers/Files/SecureFileController.php:64
 * @route '/secure-files/leave-attachments/{leaveRequest}'
 */
        showForm.get = (args: { leaveRequest: number | { id: number } } | [leaveRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Files\SecureFileController::show
 * @see app/Http/Controllers/Files/SecureFileController.php:64
 * @route '/secure-files/leave-attachments/{leaveRequest}'
 */
        showForm.head = (args: { leaveRequest: number | { id: number } } | [leaveRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
const leaveAttachments = {
    show: Object.assign(show, show),
}

export default leaveAttachments