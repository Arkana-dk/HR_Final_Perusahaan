import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\Auth\TokenAuthController::login
 * @see app/Http/Controllers/Api/Auth/TokenAuthController.php:13
 * @route '/api/v1/auth/login'
 */
export const login = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: login.url(options),
    method: 'post',
})

login.definition = {
    methods: ["post"],
    url: '/api/v1/auth/login',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\Auth\TokenAuthController::login
 * @see app/Http/Controllers/Api/Auth/TokenAuthController.php:13
 * @route '/api/v1/auth/login'
 */
login.url = (options?: RouteQueryOptions) => {
    return login.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\Auth\TokenAuthController::login
 * @see app/Http/Controllers/Api/Auth/TokenAuthController.php:13
 * @route '/api/v1/auth/login'
 */
login.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: login.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Api\Auth\TokenAuthController::login
 * @see app/Http/Controllers/Api/Auth/TokenAuthController.php:13
 * @route '/api/v1/auth/login'
 */
    const loginForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: login.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\Auth\TokenAuthController::login
 * @see app/Http/Controllers/Api/Auth/TokenAuthController.php:13
 * @route '/api/v1/auth/login'
 */
        loginForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: login.url(options),
            method: 'post',
        })
    
    login.form = loginForm
/**
* @see \App\Http\Controllers\Api\Auth\TokenAuthController::me
 * @see app/Http/Controllers/Api/Auth/TokenAuthController.php:63
 * @route '/api/v1/auth/me'
 */
export const me = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: me.url(options),
    method: 'get',
})

me.definition = {
    methods: ["get","head"],
    url: '/api/v1/auth/me',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\Auth\TokenAuthController::me
 * @see app/Http/Controllers/Api/Auth/TokenAuthController.php:63
 * @route '/api/v1/auth/me'
 */
me.url = (options?: RouteQueryOptions) => {
    return me.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\Auth\TokenAuthController::me
 * @see app/Http/Controllers/Api/Auth/TokenAuthController.php:63
 * @route '/api/v1/auth/me'
 */
me.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: me.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\Auth\TokenAuthController::me
 * @see app/Http/Controllers/Api/Auth/TokenAuthController.php:63
 * @route '/api/v1/auth/me'
 */
me.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: me.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\Auth\TokenAuthController::me
 * @see app/Http/Controllers/Api/Auth/TokenAuthController.php:63
 * @route '/api/v1/auth/me'
 */
    const meForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: me.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\Auth\TokenAuthController::me
 * @see app/Http/Controllers/Api/Auth/TokenAuthController.php:63
 * @route '/api/v1/auth/me'
 */
        meForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: me.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\Auth\TokenAuthController::me
 * @see app/Http/Controllers/Api/Auth/TokenAuthController.php:63
 * @route '/api/v1/auth/me'
 */
        meForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: me.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    me.form = meForm
/**
* @see \App\Http\Controllers\Api\Auth\TokenAuthController::logout
 * @see app/Http/Controllers/Api/Auth/TokenAuthController.php:88
 * @route '/api/v1/auth/logout'
 */
export const logout = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: logout.url(options),
    method: 'post',
})

logout.definition = {
    methods: ["post"],
    url: '/api/v1/auth/logout',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\Auth\TokenAuthController::logout
 * @see app/Http/Controllers/Api/Auth/TokenAuthController.php:88
 * @route '/api/v1/auth/logout'
 */
logout.url = (options?: RouteQueryOptions) => {
    return logout.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\Auth\TokenAuthController::logout
 * @see app/Http/Controllers/Api/Auth/TokenAuthController.php:88
 * @route '/api/v1/auth/logout'
 */
logout.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: logout.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Api\Auth\TokenAuthController::logout
 * @see app/Http/Controllers/Api/Auth/TokenAuthController.php:88
 * @route '/api/v1/auth/logout'
 */
    const logoutForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: logout.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\Auth\TokenAuthController::logout
 * @see app/Http/Controllers/Api/Auth/TokenAuthController.php:88
 * @route '/api/v1/auth/logout'
 */
        logoutForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: logout.url(options),
            method: 'post',
        })
    
    logout.form = logoutForm
const TokenAuthController = { login, me, logout }

export default TokenAuthController