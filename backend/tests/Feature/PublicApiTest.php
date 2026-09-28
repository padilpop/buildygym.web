<?php

namespace Tests\Feature;

use App\Models\Branch;
use App\Models\Facility;
use App\Models\Faq;
use App\Models\Gallery;
use App\Models\Membership;
use App\Models\PersonalTrainer;
use App\Models\Testimonial;
use App\Models\WebsiteSetting;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PublicApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_landing_data_returns_comprehensive_payload_and_security_headers(): void
    {
        // Seed sample records
        Membership::create([
            'name' => 'Pro Athlete',
            'price' => 450000,
            'duration_months' => 1,
            'duration_label' => '1 Bulan',
            'benefits' => ['All Access', 'Locker Room'],
            'is_popular' => true,
            'is_active' => true,
            'display_order' => 1,
        ]);

        WebsiteSetting::create([
            'key' => 'gym_name',
            'value' => 'BUILDY GYM',
            'group' => 'general',
        ]);

        $response = $this->getJson('/api/v1/public/landing-data');

        $response->assertStatus(200)
            ->assertJsonStructure([
                'data' => [
                    'settings',
                    'memberships',
                    'trainers',
                    'branches',
                    'facilities',
                    'testimonials',
                    'gallery',
                    'faqs',
                ],
            ])
            ->assertHeader('X-Content-Type-Options', 'nosniff')
            ->assertHeader('X-Frame-Options', 'SAMEORIGIN')
            ->assertHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    }

    public function test_public_memberships_endpoint_returns_active_plans(): void
    {
        Membership::create([
            'name' => 'Active Plan',
            'price' => 350000,
            'duration_months' => 1,
            'duration_label' => '1 Bulan',
            'benefits' => ['Gym Access'],
            'is_popular' => false,
            'is_active' => true,
            'display_order' => 1,
        ]);

        Membership::create([
            'name' => 'Inactive Plan',
            'price' => 200000,
            'duration_months' => 1,
            'duration_label' => '1 Bulan',
            'benefits' => ['Gym Access'],
            'is_popular' => false,
            'is_active' => false,
            'display_order' => 2,
        ]);

        $response = $this->getJson('/api/v1/public/memberships');

        $response->assertStatus(200);
        $data = $response->json('data');
        $this->assertCount(1, $data);
        $this->assertEquals('Active Plan', $data[0]['name']);
    }

    public function test_public_branches_endpoint_returns_active_locations(): void
    {
        Branch::create([
            'name' => 'Buildy Central',
            'slug' => 'buildy-central',
            'city' => 'Jakarta Selatan',
            'address' => 'Jl. Senopati No. 88',
            'phone' => '+6281234567890',
            'whatsapp' => '+6281234567890',
            'opening_hours' => '24 Jam',
            'is_active' => true,
            'display_order' => 1,
        ]);

        $response = $this->getJson('/api/v1/public/branches');

        $response->assertStatus(200)
            ->assertJsonPath('data.0.name', 'Buildy Central');
    }

    public function test_public_health_check_endpoint(): void
    {
        $response = $this->getJson('/api/v1/health');

        $response->assertStatus(200)
            ->assertJson([
                'status' => 'ok',
                'app' => 'BUILDY GYM API',
            ]);
    }
}
