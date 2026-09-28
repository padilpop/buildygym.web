<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class MediaUploadTest extends TestCase
{
    use RefreshDatabase;

    private function authenticateAdmin(): string
    {
        $admin = User::create([
            'name' => 'Admin Security Test',
            'email' => 'admin-upload@buildygym.com',
            'password' => Hash::make('secret123'),
            'role' => 'admin',
        ]);

        return $admin->createToken('upload-test-token')->plainTextToken;
    }

    public function test_unauthenticated_user_cannot_upload_media(): void
    {
        Storage::fake('public');

        $file = UploadedFile::fake()->image('test.jpg');

        $response = $this->postJson('/api/v1/admin/upload', [
            'image' => $file,
        ]);

        $response->assertStatus(401);
    }

    public function test_rejects_non_image_files(): void
    {
        Storage::fake('public');
        $token = $this->authenticateAdmin();

        $file = UploadedFile::fake()->create('malicious.pdf', 500, 'application/pdf');

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->postJson('/api/v1/admin/upload', [
                'image' => $file,
            ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['image']);
    }

    public function test_rejects_oversized_images(): void
    {
        Storage::fake('public');
        $token = $this->authenticateAdmin();

        // 3MB image (exceeds 2048KB max)
        $file = UploadedFile::fake()->image('large.jpg')->size(3000);

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->postJson('/api/v1/admin/upload', [
                'image' => $file,
            ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['image']);
    }

    public function test_accepts_valid_image_and_stores_safely(): void
    {
        Storage::fake('public');
        $token = $this->authenticateAdmin();

        $file = UploadedFile::fake()->image('bench-press.webp', 800, 600)->size(800);

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->postJson('/api/v1/admin/upload', [
                'image' => $file,
                'folder' => 'facilities',
            ]);

        $response->assertStatus(201)
            ->assertJsonStructure([
                'message',
                'url',
                'path',
                'filename',
            ]);

        $path = $response->json('path');
        Storage::disk('public')->assertExists($path);
    }
}
