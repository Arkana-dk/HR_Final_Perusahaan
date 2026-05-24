import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Files\SecureFileController::show
 * @see app/Http/Controllers/Files/SecureFileController.php:52
 * @route '/secure-files/contracts/{contract}'
 */
export const show = (args: { contract: number | { id: number } } | [contract: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/secure-files/contracts/{contract}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Files\SecureFileController::show
 * @see app/Http/Controllers/Files/SecureFileController.php:52
 * @route '/secure-files/contracts/{contract}'
 */
show.url = (args: { contract: number | { id: number } } | [contract: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return show.definition.url
            .replace('{contract}', parsedArgs.contract.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Files\SecureFileController::show
 * @see app/Http/Controllers/Files/SecureFileController.php:52
 * @route '/secure-files/contracts/{contract}'
 */
show.get = (args: { contract: number | { id: number } } | [contract: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Files\SecureFileController::show
 * @see app/Http/Controllers/Files/SecureFileController.php:52
 * @route '/secure-files/contracts/{contract}'
 */
show.head = (args: { contract: number | { id: number } } | [contract: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Files\SecureFileController::show
 * @see app/Http/Controllers/Files/SecureFileController.php:52
 * @route '/secure-files/contracts/{contract}'
 */
    const showForm = (args: { contract: number | { id: number } } | [contract: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Files\SecureFileController::show
 * @see app/Http/Controllers/Files/SecureFileController.php:52
 * @route '/secure-files/contracts/{contract}'
 */
        showForm.get = (args: { contract: number | { id: number } } | [contract: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Files\SecureFileController::show
 * @see app/Http/Controllers/Files/SecureFileController.php:52
 * @route '/secure-files/contracts/{contract}'
 */
        showForm.head = (args: { contract: number | { id: number } } | [contract: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
const contracts = {
    show: Object.assign(show, show),
}

export default contracts