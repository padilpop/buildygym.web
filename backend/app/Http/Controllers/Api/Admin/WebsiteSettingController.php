<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\WebsiteSetting;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class WebsiteSettingController extends Controller
{
    public function show(): JsonResponse
    {
        $settings = WebsiteSetting::firstOrCreate(
            ['id' => 1],
            [
                'brand_name' => 'BUILDY GYM',
                'tag_line' => 'Station & Equipment',
            ]
        );

        return response()->json([
            'data' => $settings,
        ]);
    }

    public function update(Request $request): JsonResponse
    {
        $settings = WebsiteSetting::firstOrCreate(['id' => 1]);

        $validated = $request->validate([
            'brand_name' => ['sometimes', 'required', 'string', 'max:255'],
            'tag_line' => ['nullable', 'string', 'max:255'],
            'logo_url' => ['nullable', 'string', 'max:500'],
            'favicon_url' => ['nullable', 'string', 'max:500'],
            'hero_headline' => ['nullable', 'string'],
            'hero_subheadline' => ['nullable', 'string'],
            'contact_whatsapp' => ['nullable', 'string', 'max:50'],
            'contact_email' => ['nullable', 'string', 'email'],
            'social_instagram' => ['nullable', 'string', 'max:255'],
            'social_tiktok' => ['nullable', 'string', 'max:255'],
            'footer_text' => ['nullable', 'string'],
        ]);

        $settings->update($validated);

        return response()->json([
            'message' => 'Pengaturan website berhasil disimpan.',
            'data' => $settings,
        ]);
    }
}
