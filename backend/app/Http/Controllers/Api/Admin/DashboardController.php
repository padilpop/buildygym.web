<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Branch;
use App\Models\Facility;
use App\Models\Faq;
use App\Models\Gallery;
use App\Models\Membership;
use App\Models\PersonalTrainer;
use App\Models\Testimonial;
use App\Models\WebsiteSetting;
use Illuminate\Http\JsonResponse;

class DashboardController extends Controller
{
    /**
     * Get aggregate statistics for CMS dashboard.
     */
    public function stats(): JsonResponse
    {
        return response()->json([
            'memberships' => [
                'total' => Membership::count(),
                'active' => Membership::where('is_active', true)->count(),
            ],
            'trainers' => [
                'total' => PersonalTrainer::count(),
                'active' => PersonalTrainer::where('is_active', true)->count(),
            ],
            'branches' => [
                'total' => Branch::count(),
                'active' => Branch::where('is_active', true)->count(),
            ],
            'facilities' => [
                'total' => Facility::count(),
                'featured' => Facility::where('is_featured', true)->count(),
            ],
            'testimonials' => [
                'total' => Testimonial::count(),
                'published' => Testimonial::where('is_published', true)->count(),
            ],
            'gallery' => [
                'total' => Gallery::count(),
                'active' => Gallery::where('is_active', true)->count(),
            ],
            'faqs' => [
                'total' => Faq::count(),
                'active' => Faq::where('is_active', true)->count(),
            ],
            'settings' => WebsiteSetting::first(),
        ]);
    }
}
