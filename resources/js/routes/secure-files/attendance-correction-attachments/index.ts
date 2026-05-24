import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Files\SecureFileController::show
 * @see app/Http/Controllers/Files/SecureFileController.php:88
 * @route '/secure-files/attendance-correction-attachments/{attendanceCorrection}'
 */
export const show = (args: { attendanceCorrection: number | { id: number } } | [attendanceCorrection: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/secure-files/attendance-correction-attachments/{attendanceCorrection}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Files\SecureFileController::show
 * @see app/Http/Controllers/Files/SecureFileController.php:88
 * @route '/secure-files/attendance-correction-attachments/{attendanceCorrection}'
 */
show.url = (args: { attendanceCorrection: number | { id: number } } | [attendanceCorrection: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return show.definition.url
            .replace('{attendanceCorrection}', parsedArgs.attendanceCorrection.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Files\SecureFileController::show
 * @see app/Http/Controllers/Files/SecureFileController.php:88
 * @route '/secure-files/attendance-correction-attachments/{attendanceCorrection}'
 */
show.get = (args: { attendanceCorrection: number | { id: number } } | [attendanceCorrection: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Files\SecureFileController::show
 * @see app/Http/Controllers/Files/SecureFileController.php:88
 * @route '/secure-files/attendance-correction-attachments/{attendanceCorrection}'
 */
show.head = (args: { attendanceCorrection: number | { id: number } } | [attendanceCorrection: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Files\SecureFileController::show
 * @see app/Http/Controllers/Files/SecureFileController.php:88
 * @route '/secure-files/attendance-correction-attachments/{attendanceCorrection}'
 */
    const showForm = (args: { attendanceCorrection: number | { id: number } } | [attendanceCorrection: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Files\SecureFileController::show
 * @see app/Http/Controllers/Files/SecureFileController.php:88
 * @route '/secure-files/attendance-correction-attachments/{attendanceCorrection}'
 */
        showForm.get = (args: { attendanceCorrection: number | { id: number } } | [attendanceCorrection: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Files\SecureFileController::show
 * @see app/Http/Controllers/Files/SecureFileController.php:88
 * @route '/secure-files/attendance-correction-attachments/{attendanceCorrection}'
 */
        showForm.head = (args: { attendanceCorrection: number | { id: number } } | [attendanceCorrection: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
const attendanceCorrectionAttachments = {
    show: Object.assign(show, show),
}

export default attendanceCorrectionAttachments