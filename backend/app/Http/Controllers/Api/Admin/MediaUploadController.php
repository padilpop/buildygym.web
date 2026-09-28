<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class MediaUploadController extends Controller
{
    /**
     * Upload gym image media (facilities, trainer photos, gallery, etc.)
     */
    public function upload(Request $request): JsonResponse
    {
        $request->validate([
            'image' => ['required', 'file', 'image', 'mimes:jpeg,png,jpg,webp', 'max:2048'],
            'folder' => ['nullable', 'string', 'in:trainers,facilities,branches,gallery,testimonials,branding'],
        ]);

        $file = $request->file('image');

        if (!$file || !$file->isValid()) {
            return response()->json([
                'message' => 'Berkas gambar tidak valid atau rusak.',
            ], 422);
        }

        $allowedExtensions = ['jpeg', 'jpg', 'png', 'webp'];
        $extension = strtolower($file->guessExtension() ?: $file->getClientOriginalExtension());

        if (!in_array($extension, $allowedExtensions, true)) {
            return response()->json([
                'message' => 'Format berkas hanya boleh berupa JPG, PNG, atau WebP.',
            ], 422);
        }

        $folder = $request->input('folder', 'general');
        $filename = Str::uuid() . '.' . $extension;
        $path = $file->storeAs("uploads/{$folder}", $filename, 'public');

        $url = asset('storage/' . $path);

        return response()->json([
            'message' => 'Upload berhasil.',
            'url' => $url,
            'path' => $path,
            'filename' => $filename,
        ], 201);
    }
}
