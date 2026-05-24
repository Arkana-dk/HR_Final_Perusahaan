<?php

use App\Models\User;

test('mobile login endpoint is rate limited', function () {
    config([
        'hr.mobile.login_rate_limit_per_minute' => 2,
    ]);

    $user = User::factory()->create([
        'role' => 'employee',
    ]);

    $payload = [
        'email' => $user->email,
        'password' => 'wrong-password',
        'device_name' => 'android-test-device',
    ];

    $this->postJson('/api/v1/auth/login', $payload)
        ->assertStatus(422);

    $this->postJson('/api/v1/auth/login', $payload)
        ->assertStatus(422);

    $this->postJson('/api/v1/auth/login', $payload)
        ->assertStatus(429)
        ->assertJsonPath('success', false)
        ->assertJsonPath('message', 'Terlalu banyak percobaan login. Coba lagi dalam 1 menit.');
});

