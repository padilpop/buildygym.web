<?php

use App\Http\Controllers\Api\Admin\BranchController;
use App\Http\Controllers\Api\Admin\DashboardController;
use App\Http\Controllers\Api\Admin\FacilityController;
use App\Http\Controllers\Api\Admin\FaqController;
use App\Http\Controllers\Api\Admin\GalleryController;
use App\Http\Controllers\Api\Admin\MediaUploadController;
use App\Http\Controllers\Api\Admin\MembershipController;
use App\Http\Controllers\Api\Admin\PersonalTrainerController;
use App\Http\Controllers\Api\Admin\TestimonialController;
use App\Http\Controllers\Api\Admin\WebsiteSettingController;
use App\Http\Controllers\Api\AuthController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes — BUILDY GYM
|--------------------------------------------------------------------------
*/

// Public Health Check
Route::get('/health', function () {
    return response()->json([
        'status' => 'ok',
        'app' => 'BUILDY GYM API',
        'environment' => config('app.env'),
        'timestamp' => now()->toIso8601String(),
    ]);
});

// Admin Authentication Routes
Route::prefix('auth')->group(function () {
    Route::post('/login', [AuthController::class, 'login']);

    // Protected Auth Routes
    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/me', [AuthController::class, 'me']);
        Route::post('/logout', [AuthController::class, 'logout']);
    });
});

// Admin CMS CRUD Routes (Protected)
Route::prefix('admin')->middleware('auth:sanctum')->group(function () {
    // Stats & Upload
    Route::get('/stats', [DashboardController::class, 'stats']);
    Route::post('/upload', [MediaUploadController::class, 'upload']);

    // Memberships
    Route::apiResource('memberships', MembershipController::class);
    Route::patch('memberships/{id}/toggle-status', [MembershipController::class, 'toggleStatus']);

    // Personal Trainers
    Route::apiResource('personal-trainers', PersonalTrainerController::class);
    Route::patch('personal-trainers/{id}/toggle-status', [PersonalTrainerController::class, 'toggleStatus']);

    // Branches
    Route::apiResource('branches', BranchController::class);
    Route::patch('branches/{id}/toggle-status', [BranchController::class, 'toggleStatus']);

    // Facilities
    Route::apiResource('facilities', FacilityController::class);
    Route::patch('facilities/{id}/toggle-status', [FacilityController::class, 'toggleStatus']);

    // Testimonials
    Route::apiResource('testimonials', TestimonialController::class);
    Route::patch('testimonials/{id}/toggle-publish', [TestimonialController::class, 'togglePublish']);

    // Gallery
    Route::apiResource('gallery', GalleryController::class);
    Route::patch('gallery/{id}/toggle-status', [GalleryController::class, 'toggleStatus']);

    // FAQs
    Route::apiResource('faqs', FaqController::class);
    Route::patch('faqs/{id}/toggle-status', [FaqController::class, 'toggleStatus']);

    // Website Settings
    Route::get('/settings', [WebsiteSettingController::class, 'show']);
    Route::put('/settings', [WebsiteSettingController::class, 'update']);
});
