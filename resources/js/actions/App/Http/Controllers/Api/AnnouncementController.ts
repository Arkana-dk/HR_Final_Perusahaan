import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\AnnouncementController::index
 * @see app/Http/Controllers/Api/AnnouncementController.php:25
 * @route '/api/v1/announcements'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/v1/announcements',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\AnnouncementController::index
 * @see app/Http/Controllers/Api/AnnouncementController.php:25
 * @route '/api/v1/announcements'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\AnnouncementController::index
 * @see app/Http/Controllers/Api/AnnouncementController.php:25
 * @route '/api/v1/announcements'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\AnnouncementController::index
 * @see app/Http/Controllers/Api/AnnouncementController.php:25
 * @route '/api/v1/announcements'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\AnnouncementController::index
 * @see app/Http/Controllers/Api/AnnouncementController.php:25
 * @route '/api/v1/announcements'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\AnnouncementController::index
 * @see app/Http/Controllers/Api/AnnouncementController.php:25
 * @route '/api/v1/announcements'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\AnnouncementController::index
 * @see app/Http/Controllers/Api/AnnouncementController.php:25
 * @route '/api/v1/announcements'
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
* @see \App\Http\Controllers\Api\AnnouncementController::store
 * @see app/Http/Controllers/Api/AnnouncementController.php:71
 * @route '/api/v1/announcements'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/v1/announcements',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\AnnouncementController::store
 * @see app/Http/Controllers/Api/AnnouncementController.php:71
 * @route '/api/v1/announcements'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\AnnouncementController::store
 * @see app/Http/Controllers/Api/AnnouncementController.php:71
 * @route '/api/v1/announcements'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Api\AnnouncementController::store
 * @see app/Http/Controllers/Api/AnnouncementController.php:71
 * @route '/api/v1/announcements'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\AnnouncementController::store
 * @see app/Http/Controllers/Api/AnnouncementController.php:71
 * @route '/api/v1/announcements'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Api\AnnouncementController::update
 * @see app/Http/Controllers/Api/AnnouncementController.php:120
 * @route '/api/v1/announcements/{announcement}'
 */
export const update = (args: { announcement: string | number | { id: string | number } } | [announcement: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/api/v1/announcements/{announcement}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Api\AnnouncementController::update
 * @see app/Http/Controllers/Api/AnnouncementController.php:120
 * @route '/api/v1/announcements/{announcement}'
 */
update.url = (args: { announcement: string | number | { id: string | number } } | [announcement: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { announcement: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { announcement: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    announcement: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        announcement: typeof args.announcement === 'object'
                ? args.announcement.id
                : args.announcement,
                }

    return update.definition.url
            .replace('{announcement}', parsedArgs.announcement.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\AnnouncementController::update
 * @see app/Http/Controllers/Api/AnnouncementController.php:120
 * @route '/api/v1/announcements/{announcement}'
 */
update.put = (args: { announcement: string | number | { id: string | number } } | [announcement: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\Api\AnnouncementController::update
 * @see app/Http/Controllers/Api/AnnouncementController.php:120
 * @route '/api/v1/announcements/{announcement}'
 */
    const updateForm = (args: { announcement: string | number | { id: string | number } } | [announcement: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\AnnouncementController::update
 * @see app/Http/Controllers/Api/AnnouncementController.php:120
 * @route '/api/v1/announcements/{announcement}'
 */
        updateForm.put = (args: { announcement: string | number | { id: string | number } } | [announcement: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \App\Http\Controllers\Api\AnnouncementController::destroy
 * @see app/Http/Controllers/Api/AnnouncementController.php:162
 * @route '/api/v1/announcements/{announcement}'
 */
export const destroy = (args: { announcement: string | number | { id: string | number } } | [announcement: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/v1/announcements/{announcement}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Api\AnnouncementController::destroy
 * @see app/Http/Controllers/Api/AnnouncementController.php:162
 * @route '/api/v1/announcements/{announcement}'
 */
destroy.url = (args: { announcement: string | number | { id: string | number } } | [announcement: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { announcement: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { announcement: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    announcement: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        announcement: typeof args.announcement === 'object'
                ? args.announcement.id
                : args.announcement,
                }

    return destroy.definition.url
            .replace('{announcement}', parsedArgs.announcement.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\AnnouncementController::destroy
 * @see app/Http/Controllers/Api/AnnouncementController.php:162
 * @route '/api/v1/announcements/{announcement}'
 */
destroy.delete = (args: { announcement: string | number | { id: string | number } } | [announcement: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Api\AnnouncementController::destroy
 * @see app/Http/Controllers/Api/AnnouncementController.php:162
 * @route '/api/v1/announcements/{announcement}'
 */
    const destroyForm = (args: { announcement: string | number | { id: string | number } } | [announcement: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\AnnouncementController::destroy
 * @see app/Http/Controllers/Api/AnnouncementController.php:162
 * @route '/api/v1/announcements/{announcement}'
 */
        destroyForm.delete = (args: { announcement: string | number | { id: string | number } } | [announcement: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const AnnouncementController = { index, store, update, destroy }

export default AnnouncementController