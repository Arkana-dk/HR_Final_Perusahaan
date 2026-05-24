<?php

return [
    'attendance' => [
        // Check-in is allowed from this many minutes before shift start.
        'early_check_in_limit_minutes' => (int) env('HR_ATTENDANCE_EARLY_CHECKIN_LIMIT_MINUTES', 30),
        // If false, checkout before shift end will be rejected.
        'allow_early_checkout' => (bool) env('HR_ATTENDANCE_ALLOW_EARLY_CHECKOUT', true),
        // If true, employees must have a schedule to check-in/out.
        'require_schedule' => (bool) env('HR_ATTENDANCE_REQUIRE_SCHEDULE', true),
        // Optional compatibility toggle for legacy flow.
        'allow_fallback_work_location' => (bool) env('HR_ATTENDANCE_ALLOW_FALLBACK_WORK_LOCATION', false),
        // If true, geofence radius validation is mandatory when location has coordinates.
        'enforce_geofence' => (bool) env('HR_ATTENDANCE_ENFORCE_GEOFENCE', true),
    ],

    'overtime' => [
        'min_minutes' => (int) env('HR_OVERTIME_MIN_MINUTES', 30),
        'max_minutes' => (int) env('HR_OVERTIME_MAX_MINUTES', 360),
    ],

    'mobile' => [
        'login_rate_limit_per_minute' => (int) env('HR_MOBILE_LOGIN_RATE_LIMIT_PER_MINUTE', 5),
    ],

    'payroll' => [
        'only_active_employee' => (bool) env('HR_PAYROLL_ONLY_ACTIVE_EMPLOYEE', true),
    ],
];
