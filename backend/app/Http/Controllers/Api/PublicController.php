<?php

namespace App\Http\Controllers\Api;

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

class PublicController extends Controller
{
    /**
     * High-performance single roundtrip payload for complete public landing page.
     */
    public function landingData(): JsonResponse
    {
        $settings = WebsiteSetting::firstOrCreate(
            ['id' => 1],
            [
                'brand_name' => 'BUILDY GYM',
                'tag_line' => 'Station & Equipment',
                'hero_headline' => 'BANGUN TUBUH & CAPAI PERFORMA MAKSIMAL',
                'hero_subheadline' => 'Pusat kebugaran berstandar tinggi dengan peralatan beban lengkap, higienitas terjaga, dan bimbingan pelatih profesional tanpa biaya tersembunyi.',
                'contact_whatsapp' => '6281234567890',
                'contact_email' => 'info@buildygym.com',
                'social_instagram' => 'https://instagram.com/buildygym',
                'social_tiktok' => 'https://tiktok.com/@buildygym',
                'footer_text' => '© ' . date('Y') . ' BUILDY GYM. Hak cipta dilindungi undang-undang.',
            ]
        );

        $memberships = Membership::where('is_active', true)
            ->orderBy('display_order', 'asc')
            ->get();

        $trainers = PersonalTrainer::where('is_active', true)
            ->orderBy('display_order', 'asc')
            ->get();

        $branches = Branch::where('is_active', true)
            ->orderBy('display_order', 'asc')
            ->get();

        $facilities = Facility::where('is_active', true)
            ->orderBy('display_order', 'asc')
            ->get();

        $testimonials = Testimonial::where('is_published', true)
            ->orderBy('display_order', 'asc')
            ->get();

        $gallery = Gallery::where('is_active', true)
            ->orderBy('display_order', 'asc')
            ->get();

        $faqs = Faq::where('is_active', true)
            ->orderBy('display_order', 'asc')
            ->get();

        return response()->json([
            'data' => [
                'settings' => $settings,
                'memberships' => $memberships,
                'trainers' => $trainers,
                'branches' => $branches,
                'facilities' => $facilities,
                'testimonials' => $testimonials,
                'gallery' => $gallery,
                'faqs' => $faqs,
            ],
        ]);
    }

    public function settings(): JsonResponse
    {
        $settings = WebsiteSetting::first();
        return response()->json(['data' => $settings]);
    }

    public function memberships(): JsonResponse
    {
        $memberships = Membership::where('is_active', true)->orderBy('display_order', 'asc')->get();
        return response()->json(['data' => $memberships]);
    }

    public function trainers(): JsonResponse
    {
        $trainers = PersonalTrainer::where('is_active', true)->orderBy('display_order', 'asc')->get();
        return response()->json(['data' => $trainers]);
    }

    public function branches(): JsonResponse
    {
        $branches = Branch::where('is_active', true)->orderBy('display_order', 'asc')->get();
        return response()->json(['data' => $branches]);
    }

    public function facilities(): JsonResponse
    {
        $facilities = Facility::where('is_active', true)->orderBy('display_order', 'asc')->get();
        return response()->json(['data' => $facilities]);
    }

    public function testimonials(): JsonResponse
    {
        $testimonials = Testimonial::where('is_published', true)->orderBy('display_order', 'asc')->get();
        return response()->json(['data' => $testimonials]);
    }

    public function gallery(): JsonResponse
    {
        $gallery = Gallery::where('is_active', true)->orderBy('display_order', 'asc')->get();
        return response()->json(['data' => $gallery]);
    }

    public function faqs(): JsonResponse
    {
        $faqs = Faq::where('is_active', true)->orderBy('display_order', 'asc')->get();
        return response()->json(['data' => $faqs]);
    }
}
