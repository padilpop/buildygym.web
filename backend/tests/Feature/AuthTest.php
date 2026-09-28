<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class AuthTest extends TestCase
{
    use RefreshDatabase;

    public function test_login_successful_with_valid_credentials(): void
    {
        $user = User::create([
            'name' => 'Admin Test',
            'email' => 'admin@buildygym.com',
            'password' => Hash::make('password123'),
            'role' => 'admin',
        ]);

        $response = $this->postJson('/api/v1/auth/login', [
            'email' => 'admin@buildygym.com',
            'password' => 'password123',
        ]);

        $response->assertStatus(200)
            ->assertJsonStructure([
                'message',
                'user' => ['id', 'name', 'email', 'role'],
                'token',
            ])
            ->assertHeader('X-Content-Type-Options', 'nosniff')
            ->assertHeader('X-Frame-Options', 'SAMEORIGIN');
    }

    public function test_login_fails_with_invalid_password(): void
    {
        User::create([
            'name' => 'Admin Test',
            'email' => 'admin@buildygym.com',
            'password' => Hash::make('password123'),
            'role' => 'admin',
        ]);

        $response = $this->postJson('/api/v1/auth/login', [
            'email' => 'admin@buildygym.com',
            'password' => 'wrongpassword',
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['email']);
    }

    public function test_login_validation_requires_email_and_password(): void
    {
        $response = $this->postJson('/api/v1/auth/login', []);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['email', 'password']);
    }

    public function test_authenticated_user_can_access_me_endpoint(): void
    {
        $user = User::create([
            'name' => 'Admin Test',
            'email' => 'admin@buildygym.com',
            'password' => Hash::make('password123'),
            'role' => 'admin',
        ]);

        $token = $user->createToken('test_token')->plainTextToken;

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->getJson('/api/v1/auth/me');

        $response->assertStatus(200)
            ->assertJson([
                'user' => [
                    'id' => $user->id,
                    'email' => 'admin@buildygym.com',
                ],
            ]);
    }

    public function test_unauthenticated_request_to_me_returns_401(): void
    {
        $response = $this->getJson('/api/v1/auth/me');

        $response->assertStatus(401);
    }

    public function test_logout_revokes_current_access_token(): void
    {
        $user = User::create([
            'name' => 'Admin Test',
            'email' => 'admin@buildygym.com',
            'password' => Hash::make('password123'),
            'role' => 'admin',
        ]);

        $token = $user->createToken('test_token')->plainTextToken;

        $logoutResponse = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->postJson('/api/v1/auth/logout');

        $logoutResponse->assertStatus(200)
            ->assertJson([
                'message' => 'Logout berhasil.',
            ]);

        $this->app['auth']->forgetGuards();

        $meResponse = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->getJson('/api/v1/auth/me');

        $meResponse->assertStatus(401);
    }

    public function test_login_rate_limiting_triggers_after_max_attempts(): void
    {
        for ($i = 0; $i < 5; $i++) {
            $this->postJson('/api/v1/auth/login', [
                'email' => 'random@buildygym.com',
                'password' => 'wrong',
            ]);
        }

        $sixthAttempt = $this->postJson('/api/v1/auth/login', [
            'email' => 'random@buildygym.com',
            'password' => 'wrong',
        ]);

        $sixthAttempt->assertStatus(429);
    }
}
