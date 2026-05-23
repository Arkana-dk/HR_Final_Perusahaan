import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\DeviceController::index
 * @see app/Http/Controllers/Api/DeviceController.php:21
 * @route '/api/v1/devices'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/v1/devices',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\DeviceController::index
 * @see app/Http/Controllers/Api/DeviceController.php:21
 * @route '/api/v1/devices'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\DeviceController::index
 * @see app/Http/Controllers/Api/DeviceController.php:21
 * @route '/api/v1/devices'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\DeviceController::index
 * @see app/Http/Controllers/Api/DeviceController.php:21
 * @route '/api/v1/devices'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\DeviceController::index
 * @see app/Http/Controllers/Api/DeviceController.php:21
 * @route '/api/v1/devices'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\DeviceController::index
 * @see app/Http/Controllers/Api/DeviceController.php:21
 * @route '/api/v1/devices'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\DeviceController::index
 * @see app/Http/Controllers/Api/DeviceController.php:21
 * @route '/api/v1/devices'
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
* @see \App\Http\Controllers\Api\DeviceController::register
 * @see app/Http/Controllers/Api/DeviceController.php:35
 * @route '/api/v1/devices/register'
 */
export const register = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: register.url(options),
    method: 'post',
})

register.definition = {
    methods: ["post"],
    url: '/api/v1/devices/register',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\DeviceController::register
 * @see app/Http/Controllers/Api/DeviceController.php:35
 * @route '/api/v1/devices/register'
 */
register.url = (options?: RouteQueryOptions) => {
    return register.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\DeviceController::register
 * @see app/Http/Controllers/Api/DeviceController.php:35
 * @route '/api/v1/devices/register'
 */
register.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: register.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Api\DeviceController::register
 * @see app/Http/Controllers/Api/DeviceController.php:35
 * @route '/api/v1/devices/register'
 */
    const registerForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: register.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\DeviceController::register
 * @see app/Http/Controllers/Api/DeviceController.php:35
 * @route '/api/v1/devices/register'
 */
        registerForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: register.url(options),
            method: 'post',
        })
    
    register.form = registerForm
/**
* @see \App\Http\Controllers\Api\DeviceController::unregister
 * @see app/Http/Controllers/Api/DeviceController.php:93
 * @route '/api/v1/devices/unregister'
 */
export const unregister = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: unregister.url(options),
    method: 'post',
})

unregister.definition = {
    methods: ["post"],
    url: '/api/v1/devices/unregister',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\DeviceController::unregister
 * @see app/Http/Controllers/Api/DeviceController.php:93
 * @route '/api/v1/devices/unregister'
 */
unregister.url = (options?: RouteQueryOptions) => {
    return unregister.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\DeviceController::unregister
 * @see app/Http/Controllers/Api/DeviceController.php:93
 * @route '/api/v1/devices/unregister'
 */
unregister.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: unregister.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Api\DeviceController::unregister
 * @see app/Http/Controllers/Api/DeviceController.php:93
 * @route '/api/v1/devices/unregister'
 */
    const unregisterForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: unregister.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\DeviceController::unregister
 * @see app/Http/Controllers/Api/DeviceController.php:93
 * @route '/api/v1/devices/unregister'
 */
        unregisterForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: unregister.url(options),
            method: 'post',
        })
    
    unregister.form = unregisterForm
const DeviceController = { index, register, unregister }

export default DeviceController