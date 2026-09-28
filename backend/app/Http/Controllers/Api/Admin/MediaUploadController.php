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
            'image' => ['required', 'image', 'mimes:jpeg,png,jpg,webp', 'max:2048'],
            'folder' => ['nullable', 'string', 'in:trainers,facilities,branches,gallery,testimonials,branding'],
        ]);

        $folder = $request->input('folder', 'general');
        $file = $request->file('image');
        
        $filename = Str::uuid() . '.' . $file->getClientOriginalExtension();
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
